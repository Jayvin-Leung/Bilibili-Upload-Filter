<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

// 最新、[充电专属、课堂]、[互动、合作、直播回放]
const tags = computed(() => {
  const _ = [];

  const time = props.item.is_avoided === 1 ? props.item.meta.ptime : props.item.created;
  if (Math.floor(Date.now() / 1000) - time < 24 * 60 * 60) {
    _.push({ type: 'new-tag', text: '最新' });
  }
  if (props.item.is_charging_arc) {
    _.push({ type: 'charge-tag', text: '充电专属' });
  }
  if (props.item.is_lesson_video === 1) {
    _.push({ type: 'pugv-tag', text: '课堂' });
  }
  if (props.item.is_steins_gate === 1) {
    _.push({ type: 'interactive-tag', text: '互动' });
  }
  if (props.item.is_union_video === 1) {
    _.push({ type: 'union-tag', text: '合作' });
  }
  if (props.item.is_live_playback === 1) {
    _.push({ type: 'live-tag', text: '直播回放' });
  }

  return _;
});
</script>

<template>
  <div class="bili-cover-card__tags" v-if="tags.length && tags.length > 0">
    <template v-for="(obj, index) in tags" :key="index">
      <div v-if="index < 2" :class="['bili-cover-card__tag', obj.type]">
        <i v-if="obj.type === 'charge-tag'" class="sic-BDC-battery_charge_simple_fill" />
        <span>{{ obj.text }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
