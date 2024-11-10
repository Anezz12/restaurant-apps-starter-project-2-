const SkeletonLoader = `
  <div class="skeleton-item">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-line" style="width: 60%;"></div>
      <div class="skeleton-line" style="width: 40%;"></div>
      <div class="skeleton-line" style="width: 80%;"></div>
    </div>
  </div>
`;

// Generate multiple skeleton items
const generateSkeletonLoader = (count = 6) => {
  let skeletons = '';
  for (let i = 0; i < count; i++) {
    skeletons += SkeletonLoader;
  }
  return `<div class="skeleton-container">${skeletons}</div>`;
};

export default generateSkeletonLoader;
