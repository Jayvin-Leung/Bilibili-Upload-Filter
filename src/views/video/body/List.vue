<script setup>
import Tags from './Tags.vue';
import Stats from './Stats.vue';
import StatsRight from './StatsRight.vue';
import PublicTime from './PublicTime.vue';
import WatchLater from './WatchLater.vue';

const props = defineProps({
  list: {
    type: Array,
    required: true,
    default: [],
  },
  mode: {
    type: String,
    required: true,
    default: 'grid-mode',
  },
});

const mouseenterCover = (event) => {
  event.target
    .querySelector('.bili-card-watch-later')
    ?.classList.add('bili-card-watch-later--visible');
};
const mouseleaveCover = (event) => {
  event.target
    .querySelector('.bili-card-watch-later')
    ?.classList.remove('bili-card-watch-later--visible');
};
</script>

<template>
  <div v-bind="$attrs" :class="['upload-video-card', mode]" v-for="item in list">
    <div class="upload-video-card__left">
      <div class="upload-video-card__main">
        <div class="bili-video-card">
          <div class="bili-video-card__wrap">
            <div
              class="bili-video-card__cover"
              @mouseenter="mouseenterCover"
              @mouseleave="mouseleaveCover"
            >
              <a
                :class="{
                  'bili-cover-card': true,
                  'bili-cover-card--frozen': item.is_charging_arc || item.is_lesson_video,
                }"
                :href="`//www.bilibili.com/video/${item.bvid}/?spm_id_from=333.1387.upload.video_card.click`"
                target="_blank"
              >
                <div class="bili-cover-card__thumbnail">
                  <img
                    :src="
                      item.is_avoided === 1
                        ? item.meta.cover.slice(item.meta.cover.indexOf('//')) +
                          '@672w_378h_1c.avif'
                        : item.pic.slice(item.pic.indexOf('//')) + '@672w_378h_1c.avif'
                    "
                    class=""
                    :alt="item.is_avoided === 1 ? item.meta.title : item.title"
                    onload="typeof window.bmgCmptOnload === 'function' &amp;&amp; window.bmgCmptOnload(this)"
                    onerror="typeof window.bmgCmptOnerror === 'function' &amp;&amp; window.bmgCmptOnerror(this)"
                  />
                </div>
                <Tags :item="item" />
                <Stats :item="item" :mode="mode" />
              </a>
              <WatchLater :item="item" v-if="!item.is_lesson_video" />
            </div>
            <div class="bili-video-card__details" v-if="mode === 'grid-mode'">
              <div
                class="bili-video-card__title"
                :title="item.is_avoided === 1 ? item.meta.title : item.title"
              >
                <a
                  :href="`//www.bilibili.com/video/${item.bvid}/?spm_id_from=333.1387.upload.video_card.click`"
                  target="_blank"
                >
                  {{ item.is_avoided === 1 ? item.meta.title : item.title }}
                </a>
              </div>
              <PublicTime :item="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="upload-video-card__right" v-if="mode === 'list-mode'">
      <div class="info__top">
        <a
          class="title"
          :href="`//www.bilibili.com/video/${item.bvid}/`"
          target="_blank"
          :title="item.is_avoided === 1 ? item.meta.title : item.title"
        >
          {{ item.is_avoided === 1 ? item.meta.title : item.title }}
        </a>
        <div class="desc">
          <div class="vui_ellipsis multi-mode" style="-webkit-line-clamp: 2">
            {{ item.is_avoided === 1 ? item.meta.intro : item.description }}
          </div>
        </div>
      </div>
      <div class="info__bottom">
        <StatsRight :item="item" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
