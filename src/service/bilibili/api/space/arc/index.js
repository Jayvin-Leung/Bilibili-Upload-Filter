import request from '@/service/bilibili/request';

export const search = (
  {
    mid,
    pn = 1,
    ps = 40,
    tid = 0,
    order = 'pubdate',
    orderAvoided = true,
    specialType = '',
  },
  success,
  failure
) => {
  if (!mid) return;

  let url = 'https://api.bilibili.com/x/space/wbi/arc/search';
  let params = {
    mid,
    pn,
    ps,
    tid,
    order,
    order_avoided: orderAvoided,
    special_type: specialType,
  };
  return request.wbiGet(url, params, success, failure);
};
