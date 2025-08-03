<script setup>
import { computed } from 'vue';

const props = defineProps({
  mid: {
    type: String,
    required: true,
    default: '',
  },
  tid: {
    type: Number,
    required: false,
  },
  order: {
    type: String,
    required: false,
  },
});

const mapping = {
  pubdate: 'pubtime',
  click: 'play',
  stow: 'fav',
};
const url = computed(() => {
  let _ = `http://www.bilibili.com/medialist/play/${props.mid}?from=space`;
  if (props.tid) _ += `&tid=${props.tid}`;
  if (props.order) _ += `&sort_field=${mapping[props.order]}`;
  return _;
});

const handleClick = () => {
  window.open(url.value);
};
</script>

<template>
  <div v-bind="$attrs" class="video-header__top">
    <div v-bind="$attrs" class="title">TA的视频</div>
    <button
      v-bind="$attrs"
      class="vui_button action-btn playall-btn play-all"
      @click="handleClick"
    >
      <i class="vui_icon sic-fsp-play_fill icon" style="font-size: 12px"></i>
      <span>播放全部</span>
    </button>
  </div>
</template>

<style scoped></style>
