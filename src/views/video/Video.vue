<script setup>
import { ref, watch } from 'vue';
import { search as searchApi } from '@/service/bilibili/api/space/arc';
import Top from './header/Top.vue';
import Bottom from './header/Bottom.vue';
import List from './body/List.vue';
import Pagination from './footer/Pagination.vue';

const props = defineProps({
  mid: {
    type: String,
    required: true,
    default: '',
  },
});

const mode = ref('grid-mode'); //list-mode
const params = ref({
  pn: 1,
  ps: 42,
  tid: 0,
  order: 'pubdate',
  orderAvoided: true,
  specialType: '',
});
const total = ref(0);
const slist = ref([]);
const tlist = ref({});
const vlist = ref([]);

const search = () => {
  searchApi({ mid: props.mid, ...params.value }, (result) => {
    total.value = result.page.count;
    slist.value = result.list.slist;
    tlist.value = result.list.tlist;
    vlist.value = result.list.vlist;
  });
};
const handleChangeOrder = (order) => {
  params.value.order = order;
  params.value.pn = 1;
  search();
};
const handleChangeMode = () => {
  mode.value = mode.value === 'grid-mode' ? 'list-mode' : 'grid-mode';
};
const handleFilter = (type, tid) => {
  params.value.specialType = type;
  params.value.tid = tid;
  params.value.pn = 1;
  search();
};
const handleJump = (to) => {
  params.value.pn = to;
  search();
  document.documentElement.scrollTop = 0;
};

search();
</script>

<template>
  <div v-bind="$attrs" class="video">
    <div v-bind="$attrs" class="video-header">
      <Top v-bind="$attrs" :mid="props.mid" :tid="params.tid" :order="params.order" />
      <Bottom
        v-bind="$attrs"
        :order="params.order"
        @changeOrder="handleChangeOrder"
        :mode="mode"
        @changeMode="handleChangeMode"
        :type="params.specialType"
        :slist="slist || []"
        :tid="params.tid"
        :tlist="tlist ? Object.values(tlist) : []"
        @filter="handleFilter"
      />
    </div>
    <div v-bind="$attrs" class="video-body">
      <div v-bind="$attrs" :class="['video-list', mode]">
        <List v-bind="$attrs" :list="vlist || []" :mode="mode" />
      </div>
    </div>
    <div v-bind="$attrs" class="video-footer">
      <Pagination
        v-bind="$attrs"
        :total="total"
        :currPage="params.pn"
        :pageSize="params.ps"
        @change="handleJump"
      />
    </div>
  </div>
</template>

<style scoped></style>
