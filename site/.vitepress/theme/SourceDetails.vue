<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useData } from "vitepress";
import {
  isSiteSourceId,
  readSiteSource,
  SiteSourceError,
  type SiteSource,
} from "@ahw/source-reader";

const failureMessages: Record<string, string> = {
  invalid_id: "这个来源链接不合法。",
  not_found: "当前发布没有保留这个来源。",
  read_failed: "来源读取失败，请稍后重试。",
  invalid_data: "来源与当前发布不匹配。",
  too_large: "来源内容超出可显示的大小。",
};

const { site, theme } = useData();
const releaseId = computed(
  () => (theme.value as { release?: { id: string } }).release?.id ?? "",
);
const referenceId = ref("");
const malformed = ref(false);
const loading = ref(false);
const failure = ref("");
const source = ref<SiteSource | null>(null);
let pending: AbortController | null = null;

const record = computed(() => source.value?.reference.record);
const isChapter = computed(() => source.value?.reference.kind === "chapter");
const snapshot = computed(() => {
  const value = record.value;
  if (!value) return "";
  if ("snapshot" in value)
    return [value.snapshot.kind, value.snapshot.sha256, value.snapshot.revision]
      .filter(Boolean)
      .join(" · ");
  return value.snapshot_id;
});
const locator = computed(() => {
  const value = record.value?.locator;
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value.kind === "document_section") return value.heading;
  if (value.kind === "symbol") return `${value.file} → ${value.symbol}`;
  return `${value.file}:${value.start}-${value.end}`;
});

async function load() {
  pending?.abort();
  pending = null;
  const id = window.location.hash.slice(1);
  referenceId.value = id;
  source.value = null;
  failure.value = "";
  malformed.value = false;
  loading.value = false;
  if (!id || !isSiteSourceId(id)) {
    malformed.value = Boolean(id);
    return;
  }
  if (!releaseId.value) {
    failure.value = "来源暂时无法读取。";
    return;
  }
  const controller = new AbortController();
  pending = controller;
  loading.value = true;
  try {
    const result = await readSiteSource({
      base: site.value.base,
      releaseId: releaseId.value,
      referenceId: id,
      signal: controller.signal,
    });
    // A newer hash already owns the page; only its result is displayed.
    if (pending !== controller) return;
    source.value = result;
  } catch (error) {
    if (pending !== controller) return;
    failure.value =
      error instanceof SiteSourceError
        ? (failureMessages[error.code] ?? failureMessages.read_failed ?? "")
        : (failureMessages.read_failed ?? "");
  } finally {
    if (pending === controller) loading.value = false;
  }
}

onMounted(() => {
  window.addEventListener("hashchange", load);
  void load();
});

onBeforeUnmount(() => {
  window.removeEventListener("hashchange", load);
  pending?.abort();
});
</script>

<template>
  <section class="ahw-source">
    <p v-if="!referenceId" class="ahw-source__empty" role="status">
      从章节或产品目录中选择一个固定来源查看详情。
    </p>
    <p v-else-if="malformed" class="ahw-source__failure" role="alert">
      地址中的来源 ID <code>{{ referenceId }}</code> 不合法。
    </p>
    <p v-else-if="loading" class="ahw-source__status" role="status">
      正在读取来源 {{ referenceId }}…
    </p>
    <div v-else-if="failure" class="ahw-source__failure" role="alert">
      <p>{{ failure }}</p>
      <button type="button" class="ahw-source__retry" @click="load">
        重试
      </button>
    </div>
    <article v-else-if="record" class="ahw-source__detail">
      <h2 class="ahw-source__title">
        <code>{{ record.reference_id }}</code>
      </h2>
      <dl class="ahw-source__list">
        <dt>产品</dt>
        <dd>
          <code>{{ record.harness_id }}</code>
        </dd>
        <dt>来源类型</dt>
        <dd>{{ isChapter ? "章节来源引用" : "目录身份来源" }}</dd>
        <dt>{{ isChapter ? "快照 ID" : "固定快照" }}</dt>
        <dd>
          <code>{{ snapshot }}</code>
        </dd>
        <dt>定位</dt>
        <dd>
          <code>{{ locator }}</code>
        </dd>
        <dt>官方来源</dt>
        <dd>
          <a :href="record.official_url" target="_blank" rel="noreferrer">{{
            record.official_url
          }}</a>
        </dd>
        <dt>短摘录</dt>
        <dd>
          <blockquote class="ahw-source__excerpt">
            {{ record.excerpt }}
          </blockquote>
        </dd>
      </dl>
    </article>
  </section>
</template>

<style scoped>
.ahw-source {
  margin: 0;
}

.ahw-source__empty,
.ahw-source__status {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.ahw-source__failure {
  margin: 0;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-danger-1);
  border-radius: 10px;
  background-color: var(--vp-c-danger-soft);
  font-size: 14px;
  line-height: 1.7;
}

.ahw-source__failure p {
  margin: 0 0 8px;
}

.ahw-source__retry {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.ahw-source__title {
  margin: 0 0 12px;
  padding-top: 0;
  border-top: none;
  font-size: 20px;
  overflow-wrap: anywhere;
}

.ahw-source__list {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 10px 16px;
  margin: 0;
  font-size: 14px;
}

.ahw-source__list dt {
  color: var(--vp-c-text-2);
}

.ahw-source__list dd {
  margin: 0;
  overflow-wrap: anywhere;
}

.ahw-source__excerpt {
  margin: 0;
  padding-left: 12px;
  border-left: 3px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
}

@media (max-width: 640px) {
  .ahw-source__list {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}
</style>
