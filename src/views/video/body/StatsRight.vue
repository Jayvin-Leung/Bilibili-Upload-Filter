<script setup>
import { computed } from 'vue';
import dateUtil from '@/utils/dateUtil';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const isYesterday = (timestamp) => {
  // 获取当前日期和传入的日期
  const today = new Date();
  const input = new Date(timestamp);

  // 将时间都设置为午夜00:00:00，只比较日期部分
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const inputMidnight = new Date(input.getFullYear(), input.getMonth(), input.getDate());

  // 计算两个日期的毫秒差
  const timeDiff = todayMidnight - inputMidnight;

  // 一天的毫秒数
  const oneDayMs = 24 * 60 * 60 * 1000;

  // 如果时间差正好是一天，则是昨天
  return timeDiff === oneDayMs;
};

const convert = (time) => {
  const diff = Math.floor(Date.now() / 1000) - time;
  if (diff <= 24 * 60 * 60) return Math.floor(diff / (60 * 60)) + '小时前';
  if (isYesterday(time * 1000)) return '昨天';
  return new Date().getFullYear() === new Date(time * 1000).getFullYear()
    ? dateUtil.timestampToDate[3](time * 1000)
    : dateUtil.timestampToDate[2](time * 1000);
};

const obj = computed(() => {
  const _ = {};

  _.isAvoidedOrLesson = props.item.is_avoided === 1 || props.item.is_lesson_video === 1;
  _.play = _.isAvoidedOrLesson ? props.item.meta.stat.view : props.item.play;
  _.playText = _.play < 10000 ? _.play : (_.play / 10000).toFixed(1) + '万';
  _.danmu = _.isAvoidedOrLesson ? props.item.meta.stat.danmaku : props.item.video_review;
  _.danmuText = _.danmu < 10000 ? _.danmu : (_.danmu / 10000).toFixed(1) + '万';
  _.time = props.item.is_avoided === 1 ? props.item.meta.ptime : props.item.created;
  _.timeText = convert(_.time);

  return _;
});
</script>

<template>
  <div class="upload-video-card__stats">
    <div class="stat">
      <i class="vui_icon sic-BDC-playdata_square_line icon" style="font-size: 18px"></i>
      <span>{{ obj.playText }}</span>
    </div>

    <div class="stat">
      <i class="vui_icon sic-BDC-danmu_square_line icon" style="font-size: 18px"></i>
      <span>{{ obj.danmuText }}</span>
    </div>

    <div class="stat">
      <!---->
      {{ obj.timeText }}
    </div>
  </div>
</template>

<style scoped></style>
