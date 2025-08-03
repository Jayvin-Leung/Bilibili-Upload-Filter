import { createApp, h } from 'vue';
import Video from './views/video/Video.vue';

const mid = location.pathname.split('/')[1];
let spaceMainElement = null;

const render = () => {
  let attr = null;

  createApp({
    render: () => {
      return h(Video, {
        [attr.name]: attr.value,
        mid,
      });
    },
  }).mount(
    (() => {
      const videoElement = spaceMainElement.querySelector('.video');

      attr = Object.values(videoElement.attributes).find((item) => {
        return item.name.startsWith('data-v-');
      });

      return videoElement.parentNode;
    })()
  );
};

(() => {
  const load_observer = new MutationObserver(() => {
    spaceMainElement = document.body.querySelector('div#app > main.space-main');
    if (!spaceMainElement) return;

    load_observer.disconnect();

    const _ = () => {
      if (!spaceMainElement.classList.contains('route_uploadVideo')) return;
      render();
    };

    _();
    new MutationObserver(_).observe(spaceMainElement, {
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true,
    });
  });
  load_observer.observe(document.body, { childList: true, subtree: true });
})();
