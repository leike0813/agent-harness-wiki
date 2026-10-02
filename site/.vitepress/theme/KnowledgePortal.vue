<script setup lang="ts">
import { computed, ref } from "vue";
import { useData, withBase } from "vitepress";

type Topic = { id: string; name: string; href: string };
type Surface = { id: string; name: string; kind: string };
type Source = { id: string; href: string };
type Runtime = { id: string; name: string };
type Binding = { surface_id: string; runtime_id?: string; status: string };
type Product = {
  id: string;
  name: string;
  aliases: string[];
  surfaces: Surface[];
  topics: Topic[];
  href?: string;
  candidate: boolean;
  sources: Source[];
  runtimes: Runtime[];
  bindings: Binding[];
};
type Portal =
  | {
      kind: "directory";
      heading: string;
      intro: string;
      products: Product[];
      summary?: { products: number; chapters: number; topics: number };
    }
  | { kind: "product"; product: Product };

const { frontmatter } = useData();
const portal = computed(() => frontmatter.value.portal as Portal | undefined);
const query = ref("");

const directory = computed(() =>
  portal.value?.kind === "directory" ? portal.value : undefined,
);
const overview = computed(() =>
  portal.value?.kind === "product" ? portal.value.product : undefined,
);
const allProducts = computed(() => directory.value?.products ?? []);
const products = computed(() => {
  const term = query.value.trim().toLowerCase();
  if (!term) return allProducts.value;
  return allProducts.value.filter((product) =>
    [product.name, product.id, ...product.aliases].some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(term),
    ),
  );
});

// `layout: home` already renders the hero h1, so the directory heading is an h2.
const headingTag = computed(() =>
  frontmatter.value.layout === "home" ? "h2" : "h1",
);
const surfaceKindLabels: Record<string, string> = {
  cli: "命令行",
  ide: "IDE",
  desktop: "桌面",
  web: "网页",
  sdk: "SDK",
};
const bindingStatusLabels: Record<string, string> = {
  documented: "有文档",
  conflict: "有冲突",
  unknown: "未知",
};
const surfaceKind = (kind: string): string => surfaceKindLabels[kind] ?? kind;
const bindingStatus = (status: string): string =>
  bindingStatusLabels[status] ?? status;
const link = (target?: string): string | undefined =>
  target ? withBase(target) : undefined;
// One product can declare several surfaces of the same kind.
const surfaceKinds = (product: Product): string[] =>
  [...new Set(product.surfaces.map((surface) => surface.kind))].map(
    surfaceKind,
  );
const topicCount = (product: Product): string =>
  product.topics.length
    ? product.topics.length + " 个可读主题"
    : "暂无主题章节";
</script>

<template>
  <section v-if="directory" class="ahw-portal">
    <component :is="headingTag" id="products" class="ahw-portal__heading">
      {{ directory.heading }}
    </component>
    <p v-if="directory.intro" class="ahw-portal__intro">
      {{ directory.intro }}
    </p>
    <ul v-if="directory.summary" class="ahw-summary">
      <li>
        <strong>{{ directory.summary.products }}</strong>
        <span>已收录产品</span>
      </li>
      <li>
        <strong>{{ directory.summary.chapters }}</strong>
        <span>当前章节</span>
      </li>
      <li>
        <strong>{{ directory.summary.topics }}</strong>
        <span>类主题</span>
      </li>
    </ul>

    <div class="ahw-filters">
      <label class="ahw-filters__label" for="ahw-product-filter"
        >筛选产品</label
      >
      <input
        id="ahw-product-filter"
        v-model="query"
        class="ahw-filters__input"
        type="search"
        autocomplete="off"
        placeholder="输入名称、ID 或别名"
      />
      <button
        v-if="query"
        class="ahw-filters__clear"
        type="button"
        @click="query = ''"
      >
        清空
      </button>
      <p class="ahw-filters__count" role="status">
        {{ products.length }} / {{ allProducts.length }}
      </p>
    </div>

    <ul v-if="products.length" class="ahw-cards">
      <li
        v-for="product in products"
        :key="product.id"
        class="ahw-card"
        :class="{ 'ahw-card--candidate': product.candidate }"
      >
        <h3 class="ahw-card__title">
          <a v-if="product.href" :href="link(product.href)">{{
            product.name
          }}</a>
          <span v-else>{{ product.name }}</span>
        </h3>
        <p class="ahw-card__meta">
          <code>{{ product.id }}</code>
          <span
            class="ahw-badge"
            :class="
              product.candidate ? 'ahw-badge--candidate' : 'ahw-badge--active'
            "
          >
            {{ product.candidate ? "候选项" : "已收录" }}
          </span>
        </p>
        <p v-if="product.aliases.length" class="ahw-card__aliases">
          别名 {{ product.aliases.join("、") }}
        </p>
        <ul v-if="product.surfaces.length" class="ahw-card__kinds">
          <li v-for="kind in surfaceKinds(product)" :key="kind" class="ahw-tag">
            {{ kind }}
          </li>
        </ul>
        <p class="ahw-card__topics">
          {{ topicCount(product) }}
        </p>
        <p
          v-if="product.candidate && product.sources.length"
          class="ahw-card__sources"
        >
          <span class="ahw-card__sources-label">固定来源</span>
          <a
            v-for="source in product.sources"
            :key="source.id"
            :href="link(source.href)"
          >
            <code>{{ source.id }}</code>
          </a>
        </p>
      </li>
    </ul>
    <p v-else class="ahw-empty" role="status">
      没有匹配的产品，请试试名称、ID 或别名。
    </p>
  </section>

  <section v-else-if="overview" class="ahw-portal">
    <h1 id="product-overview" class="ahw-portal__heading">
      {{ overview.name }}
    </h1>
    <p class="ahw-portal__identity">
      <code>{{ overview.id }}</code>
      <span
        class="ahw-badge"
        :class="
          overview.candidate ? 'ahw-badge--candidate' : 'ahw-badge--active'
        "
      >
        {{ overview.candidate ? "候选项" : "已收录" }}
      </span>
      <span v-if="overview.aliases.length">
        别名 {{ overview.aliases.join("、") }}
      </span>
    </p>

    <h2 class="ahw-portal__subheading">主题章节</h2>
    <ul v-if="overview.topics.length" class="ahw-topics">
      <li v-for="topic in overview.topics" :key="topic.id" class="ahw-topic">
        <a class="ahw-topic__link" :href="link(topic.href)">
          <span class="ahw-topic__name">{{ topic.name }}</span>
          <code class="ahw-topic__id">{{ topic.id }}</code>
        </a>
      </li>
    </ul>
    <p v-else class="ahw-empty">该产品当前没有已发布的主题章节。</p>

    <h2 class="ahw-portal__subheading">界面范围</h2>
    <p class="ahw-portal__note">
      以下界面是目录中声明的产品范围，不代表都已完成调查；是否有答案以各主题章节的界面范围为准。
    </p>
    <ul v-if="overview.surfaces.length" class="ahw-surfaces">
      <li
        v-for="surface in overview.surfaces"
        :key="surface.id"
        class="ahw-surface"
      >
        <span class="ahw-surface__name">{{ surface.name }}</span>
        <span class="ahw-tag">{{ surfaceKind(surface.kind) }}</span>
        <code class="ahw-surface__id">{{ surface.id }}</code>
      </li>
    </ul>
    <p v-else class="ahw-empty">该产品尚未声明界面。</p>

    <h2 class="ahw-portal__subheading">固定来源</h2>
    <ul v-if="overview.sources.length" class="ahw-sources">
      <li v-for="source in overview.sources" :key="source.id">
        <a :href="link(source.href)"
          ><code>{{ source.id }}</code></a
        >
      </li>
    </ul>
    <p v-else class="ahw-empty">该产品尚未登记固定来源。</p>

    <details
      v-if="
        overview.runtimes.length ||
        overview.bindings.length ||
        overview.aliases.length
      "
      class="ahw-details"
    >
      <summary>详细身份与界面绑定</summary>
      <dl class="ahw-details__list">
        <template v-if="overview.aliases.length">
          <dt>别名</dt>
          <dd>{{ overview.aliases.join("、") }}</dd>
        </template>
        <template v-if="overview.runtimes.length">
          <dt>运行时</dt>
          <dd>
            <span
              v-for="runtime in overview.runtimes"
              :key="runtime.id"
              class="ahw-tag"
            >
              {{ runtime.name }} <code>{{ runtime.id }}</code>
            </span>
          </dd>
        </template>
        <template v-if="overview.bindings.length">
          <dt>界面绑定</dt>
          <dd>
            <ul class="ahw-bindings">
              <li
                v-for="binding in overview.bindings"
                :key="binding.surface_id"
              >
                <code>{{ binding.surface_id }}</code>
                <span aria-hidden="true">→</span>
                <code v-if="binding.runtime_id">{{ binding.runtime_id }}</code>
                <em v-else>运行时未确认</em>
                <span>（{{ bindingStatus(binding.status) }}）</span>
              </li>
            </ul>
          </dd>
        </template>
      </dl>
    </details>
  </section>
</template>

<style scoped>
.ahw-portal {
  margin: 0;
}

.ahw-portal__heading {
  margin: 0 0 12px;
  padding-top: 0;
  border-top: none;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
}

.ahw-portal__intro {
  margin: 0;
  max-width: 62ch;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.ahw-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.ahw-summary li {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 0;
}

.ahw-summary strong {
  color: var(--vp-c-brand-1);
  font-size: 22px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.ahw-summary span {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.ahw-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin: 24px 0 20px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.ahw-filters__label {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.ahw-filters__input {
  flex: 1 1 200px;
  min-width: 0;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  appearance: none;
}

.ahw-filters__clear {
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.ahw-filters__clear:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.ahw-filters__count {
  margin-left: auto;
  color: var(--vp-c-text-3);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

.ahw-cards {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ahw-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition:
    border-color 0.25s,
    box-shadow 0.25s;
}

.ahw-card:hover {
  border-color: var(--vp-c-brand-2);
  box-shadow: 0 6px 20px rgba(2, 44, 40, 0.08);
}

.ahw-card__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.ahw-card__title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.ahw-card__title a:hover {
  color: var(--vp-c-brand-1);
}

/* Stretch the title link over the card; candidate source links stay clickable. */
.ahw-card__title a::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.ahw-card__sources a {
  position: relative;
  z-index: 1;
}

.ahw-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.ahw-card__meta code {
  overflow-wrap: anywhere;
}

.ahw-card__aliases {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 13px;
  overflow-wrap: anywhere;
}

.ahw-card__kinds {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 2px 0 0;
  padding: 0;
  list-style: none;
}

.ahw-card__topics {
  margin: auto 0 0;
  padding-top: 4px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.ahw-card__sources {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 10px;
  margin: 0;
  font-size: 13px;
}

.ahw-card__sources-label {
  color: var(--vp-c-text-3);
}

.ahw-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 999px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
}

.ahw-tag code {
  color: inherit;
  font-size: 12px;
}

.ahw-badge {
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
}

.ahw-badge--active {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.ahw-badge--candidate {
  background-color: var(--vp-c-yellow-soft);
  color: var(--vp-c-yellow-1);
}

.ahw-empty {
  margin: 12px 0 0;
  color: var(--vp-c-text-2);
}

.ahw-portal__identity {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.ahw-portal__identity code {
  overflow-wrap: anywhere;
}

.ahw-portal__subheading {
  margin: 32px 0 12px;
  padding-top: 0;
  border-top: none;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
}

.ahw-portal__note {
  margin: 0 0 12px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
}

.ahw-topics {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ahw-topic {
  margin: 0;
}

.ahw-topic__link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  height: 100%;
  padding: 14px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition:
    border-color 0.25s,
    color 0.25s;
}

.ahw-topic__link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
}

.ahw-topic__name {
  font-weight: 600;
}

.ahw-topic__id {
  color: var(--vp-c-text-3);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.ahw-surfaces {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ahw-surface {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}

.ahw-surface__name {
  font-size: 14px;
}

.ahw-surface__id {
  color: var(--vp-c-text-3);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.ahw-sources {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ahw-sources li {
  margin: 0;
}

.ahw-sources code {
  overflow-wrap: anywhere;
}

.ahw-details {
  margin-top: 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.ahw-details summary {
  padding: 12px 16px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.ahw-details__list {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 10px 16px;
  margin: 0;
  padding: 4px 16px 16px;
}

.ahw-details__list dt {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.ahw-details__list dd {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  margin: 0;
  font-size: 14px;
  overflow-wrap: anywhere;
}

.ahw-bindings {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ahw-bindings li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 0;
}

.ahw-bindings em {
  color: var(--vp-c-text-3);
  font-style: normal;
}

@media (min-width: 640px) {
  .ahw-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ahw-topics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .ahw-cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .ahw-topics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
