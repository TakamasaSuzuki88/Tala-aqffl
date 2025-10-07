const DEFAULT_IMAGE_PREFIX = '/';

const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

// レイジーロード用のIntersection Observer
let imageObserver = null;

const initLazyLoading = (container) => {
  if (!imageObserver) {
    imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          if (src && !img.src) {
            img.classList.add('loading');
            img.src = src;
            img.onload = () => {
              img.classList.remove('loading');
              img.classList.add('loaded');
              const wrapper = img.closest('.photo-wrapper');
              if (wrapper) {
                wrapper.classList.add('loaded');
              }
            };
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
  }

  const lazyImages = container.querySelectorAll('img[data-src]');
  lazyImages.forEach((img) => {
    imageObserver.observe(img);
  });
};

const escapeHtml = (value = '') => value.replace(/[&<>"']/g, (char) => htmlEscapes[char]);

const formatStat = (label, count, unit) => `${label} ${count}${unit}`;

const select = (root, selector) => root.querySelector(selector);

const createImagePath = (src) => {
  const normalized = src.replace(/\\/g, '/').replace(/^(\.\.\/)+/, '');
  return `${DEFAULT_IMAGE_PREFIX}${encodeURI(normalized)}`;
};

const createPaintingCard = (item, variant) => {
  const altTitle = item.title ? `「${item.title}」` : item.id;
  const description = item.title ? `「${escapeHtml(item.title)}」` : '';
  const variantClass = variant === 'featured' ? 'is-featured' : 'is-archive';
  const imageUrl = createImagePath(item.src);

  return `
    <article class="art-card ${variantClass}" data-art-id="${escapeHtml(item.id)}">
      <a class="art-link" href="${imageUrl}" target="_blank" rel="noopener" aria-label="${escapeHtml(altTitle)} を拡大表示">
        <figure class="art-figure">
          <img src="${imageUrl}" alt="${escapeHtml(altTitle)}" loading="lazy">
          <figcaption class="art-caption">
            <span class="art-code">${escapeHtml(item.id)}</span>
            ${description ? `<span class="art-title">${description}</span>` : ''}
          </figcaption>
        </figure>
      </a>
    </article>
  `;
};

const createPhotoCard = (item, index) => {
  const delay = (index % 20) * 50;
  const imageUrl = createImagePath(item.src);
  const label = item.label || 'Untitled';
  return `
    <article class="photo-card" data-photo-id="${escapeHtml(item.id)}" style="animation-delay: ${delay}ms">
      <a class="photo-link" href="${imageUrl}" target="_blank" rel="noopener" aria-label="${escapeHtml(label)} を拡大表示">
        <figure class="photo-figure">
          <div class="photo-wrapper">
            <img 
              class="photo-image" 
              data-src="${imageUrl}" 
              alt="${escapeHtml(item.label)}" 
              loading="lazy"
            >
            <div class="photo-noise"></div>
          </div>
        </figure>
      </a>
    </article>
  `;
};

const wireTabs = (root, defaultPanel) => {
  const tabs = Array.from(root.querySelectorAll('.gallery-tab'));
  const panels = Array.from(root.querySelectorAll('.gallery-panel'));

  if (!tabs.length || !panels.length) {
    return;
  }

  const activate = (panelName) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.panel === panelName;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === panelName;
      panel.classList.toggle('hidden', !isActive);
      if (isActive) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  };

  tabs.forEach((tab) => {
    if (tab.getAttribute('tabindex') === null) {
      tab.setAttribute('tabindex', tab.dataset.panel === defaultPanel ? '0' : '-1');
    }

    tab.addEventListener('click', () => activate(tab.dataset.panel));
    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
        return;
      }
      event.preventDefault();
      const currentIndex = tabs.indexOf(tab);
      const delta = event.key === 'ArrowLeft' ? -1 : 1;
      const nextIndex = (currentIndex + delta + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];
      nextTab.focus();
      activate(nextTab.dataset.panel);
    });
  });

  activate(defaultPanel);
};

const updateStats = (root, updates) => {
  Object.entries(updates).forEach(([key, { label, count, unit }]) => {
    const node = select(root, `[data-stat="${key}"]`);
    if (!node) {
      return;
    }
    node.textContent = formatStat(label, count, unit);
  });
};

const renderCollection = (container, items, createCard) => {
  if (!container) {
    return;
  }
  const markup = items.map((item, index) => createCard(item, index)).join('');
  container.innerHTML = markup;

  if (container.querySelector('.photo-image')) {
    initLazyLoading(container);
  }
};

const renderPhotoBatch = (container, items, startIndex, batchSize) => {
  const slice = items.slice(startIndex, startIndex + batchSize);
  const markup = slice.map((item, index) => createPhotoCard(item, startIndex + index)).join('');
  container.insertAdjacentHTML('beforeend', markup);
  initLazyLoading(container);
  return startIndex + slice.length;
};

const fetchJsonSafe = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const showFallbackMessage = (root, message) => {
  const container = document.createElement('p');
  container.className = 'gallery-fallback';
  container.textContent = message;
  root.appendChild(container);
};

export const initPaintingGallery = async ({ dataUrl, rootSelector }) => {
  const root = document.querySelector(rootSelector);
  if (!root) {
    return;
  }

  const data = await fetchJsonSafe(dataUrl);
  if (!Array.isArray(data)) {
    showFallbackMessage(root, '作品リストを読み込めませんでした。時間をおいて再度ご確認ください。');
    return;
  }

  const featured = data.filter((item) => Boolean(item.title));
  const featuredContainer = select(root, '[data-gallery="featured"]');
  const archiveContainer = select(root, '[data-gallery="archive"]');

  renderCollection(featuredContainer, featured, (item) => createPaintingCard(item, 'featured'));
  renderCollection(archiveContainer, data, (item) => createPaintingCard(item, 'archive'));

  updateStats(root, {
    'featured-count': { label: '代表作', count: featured.length, unit: '点' },
    'total-count': { label: '全作品', count: data.length, unit: '点' }
  });

  wireTabs(root, 'featured');
};

export const initPhotoGallery = async ({ dataUrl, rootSelector, highlightCount = 12, batchSize = 60 }) => {
  const root = document.querySelector(rootSelector);
  if (!root) {
    return;
  }

  const data = await fetchJsonSafe(dataUrl);
  if (!Array.isArray(data)) {
    showFallbackMessage(root, '写真アーカイブを取得できませんでした。時間をおいて再度お試しください。');
    return;
  }

  const highlight = data.slice(0, highlightCount);
  const archive = data;
  const highlightContainer = select(root, '[data-gallery="highlight"]');
  const archiveContainer = select(root, '[data-gallery="archive"]');
  const loadMoreButton = select(root, '[data-action="load-more"]');

  renderCollection(highlightContainer, highlight, createPhotoCard);

  let nextIndex = 0;
  const total = archive.length;

  const renderNextBatch = () => {
    nextIndex = renderPhotoBatch(archiveContainer, archive, nextIndex, batchSize);
    if (nextIndex >= total && loadMoreButton) {
      loadMoreButton.classList.add('hidden');
      loadMoreButton.setAttribute('hidden', '');
    }
  };

  renderNextBatch();

  if (loadMoreButton) {
    if (batchSize >= total) {
      loadMoreButton.classList.add('hidden');
      loadMoreButton.setAttribute('hidden', '');
    } else {
      loadMoreButton.addEventListener('click', () => {
        renderNextBatch();
      });
    }
  }

  updateStats(root, {
    'highlight-count': { label: 'ハイライト', count: highlight.length, unit: '枚' },
    'total-count': { label: '全アーカイブ', count: total, unit: '枚' }
  });

  wireTabs(root, 'highlight');
};
