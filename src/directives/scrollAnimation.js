export default {
  mounted(el) {
    el.classList.add('before-enter');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add('enter');
          obs.unobserve(entry.target);
        }
      });
    });
    observer.observe(el);
    el.__scrollObserver = observer;
  },
  unmounted(el) {
    if (el.__scrollObserver) {
      el.__scrollObserver.disconnect();
      delete el.__scrollObserver;
    }
  }
};
