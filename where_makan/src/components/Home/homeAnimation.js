export default {
  scrollTrigger(selector, options = {}) {
    const elements = document.querySelectorAll(selector); // Select elements by class name
    elements.forEach(el => {
      this.addObserver(el, options);
    });
  },
  scrollTriggerAll(selector, options = {}) {
    const elements = document.querySelectorAll(selector); // Select elements by class name
    elements.forEach(el => {
      this.addObserver(el, options);
    });
  },
  addObserver(el, options) {
    if (!('IntersectionObserver' in window)) {
      this.handleIntersection(el, options);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.handleIntersection(entry.target, options);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    observer.observe(el);
  },
  handleIntersection(el, options) {
    if (options.cb) {
      options.cb(el);
    } else {
      el.classList.add('active');
    }
  },
};