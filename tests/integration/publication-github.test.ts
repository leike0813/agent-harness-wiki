import { createServer, type Server, type RequestListener } from "node:http";
import { afterEach, expect, test } from "vitest";
import { PublicationGithub } from "../../src/publication/github.js";
import { initialState } from "../../src/publication/state.js";

const servers: Server[] = [];
afterEach(async () => {
  for (const server of servers.splice(0)) {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

async function server(handler: RequestListener): Promise<string> {
  const listener = createServer(handler);
  servers.push(listener);
  await new Promise<void>((resolve) =>
    listener.listen(0, "127.0.0.1", resolve),
  );
  const address = listener.address();
  if (!address || typeof address === "string") throw new Error("No address");
  return `http://127.0.0.1:${address.port}/`;
}

test("ledger updates bind the prior SHA and report conflicts without retry", async () => {
  const state = initialState();
  const sha = "a".repeat(40);
  let writes = 0;
  const base = await server(async (request, response) => {
    if (request.method === "GET") {
      response.end(
        JSON.stringify({
          sha,
          encoding: "base64",
          content: Buffer.from(JSON.stringify(state)).toString("base64"),
        }),
      );
      return;
    }
    let text = "";
    for await (const chunk of request) text += String(chunk);
    const body = JSON.parse(text);
    expect(body.sha).toBe(sha);
    expect(body.branch).toBe("publication-state");
    writes += 1;
    response.writeHead(409);
    response.end("conflict");
  });
  const client = new PublicationGithub({
    repository: "demo/wiki",
    token: "fixture",
    apiBase: base,
  });
  const snapshot = await client.readState();
  await expect(
    client.writeState(snapshot, "fixture update"),
  ).rejects.toMatchObject({ code: "state_conflict" });
  expect(writes).toBe(1);
});

test.each([404, 200])(
  "missing or malformed ledger fails without implicit initialization (%s)",
  async (status) => {
    let mutations = 0;
    const base = await server((request, response) => {
      if (request.method !== "GET") mutations += 1;
      response.writeHead(status);
      response.end(
        status === 200
          ? JSON.stringify({
              sha: "a".repeat(40),
              encoding: "base64",
              content: Buffer.from('{"schema_version":1}').toString("base64"),
            })
          : "missing",
      );
    });
    const client = new PublicationGithub({
      repository: "demo/wiki",
      token: "fixture",
      apiBase: base,
    });
    await expect(client.readState()).rejects.toThrow();
    expect(mutations).toBe(0);
  },
);

test("published Release assets cannot be uploaded or republished", async () => {
  let requests = 0;
  const base = await server((_request, response) => {
    requests += 1;
    response.end("{}");
  });
  const client = new PublicationGithub({
    repository: "demo/wiki",
    token: "fixture",
    apiBase: base,
  });
  const release = {
    id: 1,
    tag_name: "web-v1-" + "a".repeat(40),
    draft: false,
    immutable: true,
    upload_url: base + "upload",
    assets: [],
  };
  await expect(
    client.uploadArchive(release, Buffer.from("fixture")),
  ).rejects.toMatchObject({ code: "immutable_archive" });
  expect(await client.publishArchive(release)).toBe(release);
  expect(requests).toBe(0);
});

test.each([409, 500])(
  "failed archive upload does not replace or seal the draft (%s)",
  async (status) => {
    let uploads = 0;
    let mutations = 0;
    const base = await server((request, response) => {
      if (request.method === "POST") uploads += 1;
      else mutations += 1;
      response.writeHead(status).end("upload failed");
    });
    const client = new PublicationGithub({
      repository: "demo/wiki",
      token: "fixture",
      apiBase: base,
    });
    await expect(
      client.uploadArchive(
        {
          id: 1,
          tag_name: "web-v1-" + "a".repeat(40),
          draft: true,
          upload_url: base + "upload",
          assets: [],
        },
        Buffer.from("fixture"),
      ),
    ).rejects.toThrow();
    expect(uploads).toBe(1);
    expect(mutations).toBe(0);
  },
);

test("sealing a draft is immutable and repeated retrieval does not mutate it", async () => {
  let seals = 0;
  const tag = "web-v1-" + "a".repeat(40);
  const bytes = Buffer.from("verified archive fixture");
  const base = await server((request, response) => {
    if (request.url?.endsWith("assets/2")) {
      response.end(bytes);
      return;
    }
    if (request.method === "PATCH") seals += 1;
    response.end(
      JSON.stringify({
        id: 1,
        tag_name: tag,
        draft: false,
        immutable: true,
        upload_url: base + "upload",
        assets: [{ id: 2, name: "site.tar.gz", size: bytes.length }],
      }),
    );
  });
  const client = new PublicationGithub({
    repository: "demo/wiki",
    token: "fixture",
    apiBase: base,
  });
  const draft = {
    id: 1,
    tag_name: tag,
    draft: true,
    upload_url: base + "upload",
    assets: [],
  };
  const sealed = await client.publishArchive(draft);
  expect(sealed.immutable).toBe(true);
  const retrieved = await client.archive(tag);
  expect(await client.publishArchive(retrieved!)).toEqual(sealed);
  expect(seals).toBe(1);
});
