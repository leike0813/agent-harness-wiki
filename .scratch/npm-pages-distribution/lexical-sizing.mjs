// Planning experiment only: measures term blocks; not a production search engine.
// Run from the repository root: node .scratch/npm-pages-distribution/lexical-sizing.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const release = JSON.parse(readFileSync('releases/current.json', 'utf8')).release_id;
const sections = JSON.parse(readFileSync(`releases/${release}/search.json`, 'utf8')).sections;
const copies = Number(process.argv[2] ?? 1);
assert.ok(Number.isInteger(copies) && copies > 0 && copies <= 1000);
const segmenter = new Intl.Segmenter('zh', { granularity: 'word' });
const bytes = value => Buffer.byteLength(JSON.stringify(value));
const lexicalTerms = text => [...new Set([...segmenter.segment(text)]
  .filter(x => x.isWordLike).map(x => x.segment.toLowerCase()))];
const maps = { exact: new Map(), lexical: new Map() };
function add(map, term, id) {
  if (!map.has(term)) map.set(term, []);
  const ids = map.get(term);
  if (ids.at(-1) !== id) ids.push(id);
}
sections.forEach((section, id) => {
  for (const term of new Set([
    ...section.question_ids, ...section.exact_terms,
    ...section.aliases, ...section.question_wording,
  ].map(x => x.toLowerCase()))) add(maps.exact, term, id);
  for (const term of lexicalTerms([
    section.title, section.body, ...section.question_wording,
  ].join(' '))) add(maps.lexical, term, id);
});
if (copies > 1) for (const map of Object.values(maps)) for (const [term, ids] of map)
  map.set(term, Array.from({length: copies}, (_, copy) => ids.map(id => id + copy * sections.length)).flat());
const document = id => ({...sections[id % sections.length],
  harness_id: `${sections[id % sections.length].harness_id}${Math.floor(id / sections.length) ? `-copy${Math.floor(id / sections.length)}` : ''}`});

function blocks(map) {
  const result = [];
  let block = [];
  const entries = [];
  for (const [term, ids] of [...map].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)) {
    let fragment = [], size = bytes([term, []]) + 2;
    for (const id of ids) {
      const added = String(id).length + (fragment.length ? 1 : 0);
      if (fragment.length && size + added > 64 * 1024) {
        entries.push([term, fragment]); fragment = []; size = bytes([term, []]) + 2;
      }
      fragment.push(id); size += String(id).length + (fragment.length > 1 ? 1 : 0);
    }
    entries.push([term, fragment]);
  }
  for (const entry of entries) {
    if (block.length && bytes([...block, entry]) > 64 * 1024) {
      result.push(block);
      block = [];
    }
    block.push(entry);
  }
  if (block.length) result.push(block);
  return result.map(entries => ({
    first: entries[0][0], last: entries.at(-1)[0], entries,
    bytes: bytes(entries),
  }));
}
const packed = Object.fromEntries(Object.entries(maps).map(([kind, map]) => [kind, blocks(map)]));
const directory = Object.fromEntries(Object.entries(packed).map(([kind, pages]) => [kind,
  pages.map(({first, last, bytes}, i) => ({first, last, bytes, page: i})),
]));

function query(text, harness, topic) {
  const accesses = new Map();
  function lookup(kind, term) {
    return packed[kind].flatMap((block, i) => {
      if (block.first > term || term > block.last) return [];
      accesses.set(`${kind}:${i}`, block.bytes);
      return block.entries.filter(([word]) => word === term).flatMap(([, ids]) => ids);
    });
  }
  const exact = lookup('exact', text.toLowerCase());
  const terms = lexicalTerms(text);
  const lists = terms.map(term => lookup('lexical', term));
  const candidates = new Set([...exact, ...lists.flat()]);
  const allowed = id => (!harness || document(id).harness_id === harness)
    && (!topic || document(id).topic === topic);
  const all = candidates.size;
  const filtered = [...candidates].filter(allowed);
  const strong = lists.length ? filtered.filter(id => lists.every(list => list.includes(id))) : [];
  return {
    text, harness: harness ?? null, topic: topic ?? null, terms,
    blocks: accesses.size, index_bytes: [...accesses.values()].reduce((a,b) => a+b, 0),
    candidates_before_filter: all, candidates_after_filter: filtered.length,
    exact_after_filter: exact.filter(allowed).length, all_terms_after_filter: strong.length,
  };
}

for (const kind of Object.keys(maps)) {
  const restored = new Map();
  for (const [term, ids] of packed[kind].flatMap(x => JSON.parse(JSON.stringify(x.entries))))
    restored.set(term, [...(restored.get(term) ?? []), ...ids]);
  assert.deepEqual([...restored].sort(([a],[b]) => a < b ? -1 : a > b ? 1 : 0),
    [...maps[kind]].sort(([a],[b]) => a < b ? -1 : a > b ? 1 : 0));
  assert.ok(packed[kind].every(x => x.bytes <= 64 * 1024));
}
const configQuery = query('mcpServers');
assert.equal(configQuery.exact_after_filter, sections.filter(s => s.exact_terms
  .some(t => t.toLowerCase() === 'mcpservers')).length * copies);
const pathTerm = [...maps.exact.keys()].find(x => x.includes('/') && x.includes('.json'));
assert.ok(pathTerm);
assert.equal(query(pathTerm).exact_after_filter, maps.exact.get(pathTerm).length);
console.log(JSON.stringify({
  release_id: release, copies, sections: sections.length * copies,
  note: 'Synthetic copies repeat vocabulary and create distinct product/doc IDs. Compact UTF-8 sizing only; excludes envelopes, online filter/doc lookup, ranking, result metadata, body reads, HTTP and compression. Not a future-corpus forecast or completed search implementation. Intl segmentation can vary with ICU versions.',
  directory_bytes: bytes(directory),
  indexes: Object.fromEntries(Object.entries(packed).map(([kind, pages]) => [kind, {
    unique_terms: maps[kind].size, blocks: pages.length,
    bytes: pages.reduce((sum, page) => sum + page.bytes, 0),
    maximum_term_bytes: Math.max(...[...maps[kind]].map(entry => bytes(entry))),
  }])),
  queries: [configQuery, query(pathTerm), query('配置来源'), query('优先级'),
    query('配置优先级', 'codex', 'configuration'), query('MCP'),
    query('怎样让代理调用外部工具？'), query('工具 tool')],
  assertions: 'passed: lossless term packing, current block size, exact config and path lookups',
}, null, 2));
