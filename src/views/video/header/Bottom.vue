<script setup>
import { ref } from 'vue';

const props = defineProps({
  order: {
    type: String,
    required: true,
    default: 'pubdate',
  },
  type: {
    type: String,
    required: true,
    default: '',
  },
  slist: {
    type: Array,
    required: true,
    default: [],
  },
  tid: {
    type: Number,
    required: true,
    default: 0,
  },
  tlist: {
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
const emits = defineEmits(['changeOrder', 'filter', 'changeMode']);

const open = ref(false);

const handleClickOrder = (order) => {
  if (order === props.order) return;
  emits('changeOrder', order);
};
const handleClickRadio = (type, tid) => {
  if (type === props.type && tid === props.tid) return;
  emits('filter', type, tid);
};
const handleClickMode = () => {
  emits('changeMode');
};
</script>

<template>
  <div v-bind="$attrs" class="video-header__bottom">
    <div v-bind="$attrs" class="breadcrumb">
      <div v-bind="$attrs" class="radio-filter video-order-filter">
        <div
          :class="{
            'radio-filter__item': true,
            'radio-filter__item--active': order === 'pubdate',
          }"
          @click="handleClickOrder('pubdate')"
        >
          <!---->
          最新发布
        </div>
        <div
          :class="{
            'radio-filter__item': true,
            'radio-filter__item--active': order === 'click',
          }"
          @click="handleClickOrder('click')"
        >
          <!---->
          最多播放
        </div>
        <div
          :class="{
            'radio-filter__item': true,
            'radio-filter__item--active': order === 'stow',
          }"
          @click="handleClickOrder('stow')"
        >
          <!---->
          最多收藏
        </div>
      </div>

      <button
        v-bind="$attrs"
        class="vui_button video-type-filter-switcher"
        v-if="slist.length > 0 || tlist.length > 0"
        @click="open = !open"
      >
        更多筛选
        <i
          v-bind="$attrs"
          :class="{
            vui_icon: true,
            'sic-BDC-arrow_expand_line': true,
            'video-type-filter-switcher--icon': true,
            revert: open,
          }"
          style="font-size: 12px"
        ></i>
      </button>

      <div data-v-0c0350ba="" v-bind="$attrs" class="lists-view-mode video-mode-switcher">
        <div data-v-0c0350ba="" class="lists-view-mode__action" @click="handleClickMode">
          <i
            data-v-0c0350ba=""
            :class="{
              vui_icon: true,
              'sic-fsp-grid_line': mode === 'list-mode',
              'sic-fsp-list_line': mode === 'grid-mode',
            }"
            style="font-size: 28px"
          ></i>
        </div>
      </div>
    </div>

    <div
      v-bind="$attrs"
      class="radio-filter video-type-filter"
      style=""
      v-if="slist.length > 0 || tlist.length > 0"
      v-show="open"
    >
      <div
        :class="{
          'radio-filter__item': true,
          'radio-filter__item--active': type === '' && tid === 0,
        }"
        @click="handleClickRadio('', 0)"
      >
        <!---->
        全部类型 {{ tlist.reduce((sum, item) => sum + item.count, 0) }}
      </div>

      <template v-if="slist.length > 0">
        <div
          :class="{
            'radio-filter__item': true,
            'radio-filter__item--active': type === 'charging' && tid === 0,
          }"
          @click="handleClickRadio('charging', 0)"
        >
          <i
            class="vui_icon sic-BDC-battery_charge_simple_fill radio-filter__item-icon"
            style="font-size: 16px"
          ></i>
          充电专属 {{ slist[0].count }}
        </div>
      </template>
      <template v-if="tlist.length > 0">
        <div
          v-for="item in tlist"
          :class="{
            'radio-filter__item': true,
            'radio-filter__item--active': tid === item.tid && type === '',
          }"
          @click="handleClickRadio('', item.tid)"
        >
          <!---->
          {{ item.name }} {{ item.count }}
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
