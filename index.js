//懒加载
let imgList = [...document.querySelectorAll('img')];
let num = imgList.length;

let lazyLoad = (function() {
  let count = 0;
  return function() {
    let deleteIndexList = [];
    imgList.forEach((img, index) => {
      let rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        img.src = img.dataset.src;
        deleteIndexList.push(index);
        count++;
        if (count === num) {
          document.removeEventListener('scroll', lazyLoad);
        }
      }
    });
    imgList = imgList.filter((_, index) => !deleteIndexList.includes(index));
  };
})();

document.addEventListener('scroll', lazyLoad, false);
// 第二种
let lazyLoadIntersection = function() {
  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
    imgList.forEach(img => {
      observer.observe(img);
    });
  });
};

// Object.assign

const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null;
const selfAssign = (target, ...source) => {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  return source.reduce((acc, cur) => {
    isComplexDataType(acc) || (acc = new Object(acc));
    if (cur == null) return acc;
    [...Object.keys(cur), ...Object.getOwnPropertySymbols(cur)].forEach(key => {
      acc[key] = cur[key];
    });
    return acc;
  }, target);
};


