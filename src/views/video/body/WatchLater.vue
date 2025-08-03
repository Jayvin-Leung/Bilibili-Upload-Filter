<script setup>
import {
  add as addToviewApi,
  del as delToviewApi,
} from '@/service/bilibili/api/history/toview';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const handleWatchLater = (event) => {
  event.stopPropagation();

  if (props.item.is_steins_gate === 1) return;

  if (props.item.toview) {
    delToviewApi({ bvid: props.item.bvid }, () => {
      props.item.toview = false;
    });
  } else {
    addToviewApi({ bvid: props.item.bvid }, () => {
      props.item.toview = true;
    });
  }
};
</script>

<template>
  <div class="bili-card-watch-later">
    <div class="bili-card-watch-later__btn" @click="(event) => handleWatchLater(event)">
      <i
        :class="item.toview ? 'sic-BDC-checkmark_line' : 'sic-BDC-arrow_play_next_line'"
        style="font-variation-settings: 'strk' 1.5"
      ></i>
    </div>
    <span class="bili-card-watch-later__tip">
      {{ item.toview ? '移除' : '稍后再看' }}
    </span>
  </div>
</template>

<style scoped></style>
