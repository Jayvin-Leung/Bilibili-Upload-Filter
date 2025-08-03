<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    default: 'grid-mode',
  },
});

const convert = (length) => {
  const [minutes, seconds] = length.split(':').map(Number);
  if (minutes < 60) return length;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return [
    hours.toString().padStart(2, '0'),
    remainingMinutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');
};

const obj = computed(() => {
  const _ = {};

  _.isAvoidedOrLesson = props.item.is_avoided === 1 || props.item.is_lesson_video === 1;
  _.play = _.isAvoidedOrLesson ? props.item.meta.stat.view : props.item.play;
  _.playText = _.play < 10000 ? _.play : (_.play / 10000).toFixed(1) + '万';
  _.danmu = _.isAvoidedOrLesson ? props.item.meta.stat.danmaku : props.item.video_review;
  _.danmuText = _.danmu < 10000 ? _.danmu : (_.danmu / 10000).toFixed(1) + '万';
  _.lengthOrLessonInfo = _.isAvoidedOrLesson
    ? props.item.is_avoided === 1
      ? props.item.meta.ep_count
      : props.item.lesson_update_info
    : convert(props.item.length);

  return _;
});
</script>

<template>
  <div class="bili-cover-card__stats">
    <div class="bili-cover-card__stat" v-if="mode === 'list-mode' && item.is_self_view">
      <i class="sic-BDC-lock_locked_line"></i>
      <span>仅自己可见</span>
    </div>

    <div class="bili-cover-card__stat" v-if="mode === 'grid-mode'">
      <i class="sic-BDC-playdata_square_line"></i>
      <span>{{ obj.playText }}</span>
    </div>

    <div class="bili-cover-card__stat" v-if="mode === 'grid-mode'">
      <i class="sic-BDC-danmu_square_line"></i>
      <span>{{ obj.danmuText }}</span>
    </div>

    <div class="bili-cover-card__stat">
      <i v-if="obj.isAvoidedOrLesson" class="sic-BDC-video_archive_line" />
      <span>{{ obj.lengthOrLessonInfo }}</span>
    </div>
  </div>
</template>

<style scoped></style>
