import { ytIdFromUrl, ytThumb } from './youtube.js';

const TAGS = ['All', 'Short', 'Excerpt', 'MV', 'Behind', 'Live'];
const state = {
    items: [],
    currentTag: 'All'
};

document.addEventListener('DOMContentLoaded', () => {
    initVideoPage().catch((error) => {
        console.error('Failed to initialize video page:', error);
    });
});

async function initVideoPage() {
    const response = await fetch('../content/video.json', { cache: 'no-cache' });
    if (!response.ok) {
        throw new Error(`video.json load failed: ${response.status}`);
    }

    const data = await response.json();
    renderHero(data.lead);

    const featured = (data.featured || []).filter((item) => Boolean(item?.url));
    renderFeatured(featured);

    const items = (data.items || []).filter((item) => Boolean(item?.url));
    state.items = items;
    renderFilters();
    renderGrid();

    renderChannels(data.channels || []);
}

function renderHero(leadText) {
    const heroLead = document.querySelector('[data-video-lead]');
    if (heroLead) {
        heroLead.textContent = leadText || '代表映像で世界観を掴み、下段に全動画とチャンネルを一覧化します。';
    }
}

function renderFeatured(items) {
    const container = document.querySelector('[data-featured-grid]');
    if (!container) return;

    container.innerHTML = '';
    if (!items.length) {
        const empty = document.createElement('p');
        empty.textContent = '公開準備中の映像です。';
        empty.className = 'video-note';
        container.appendChild(empty);
        return;
    }

    items.slice(0, 4).forEach((item) => {
        const card = createVideoCard(item);
        container.appendChild(card);
    });
}

function renderFilters() {
    const container = document.querySelector('[data-filter-chips]');
    if (!container) return;
    container.innerHTML = '';

    TAGS.forEach((tag) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'filter-chip';
        button.textContent = tag;
        button.setAttribute('data-tag', tag);
        button.setAttribute('aria-pressed', tag === state.currentTag ? 'true' : 'false');

        button.addEventListener('click', () => {
            state.currentTag = tag;
            syncFilterState(container);
            renderGrid();
        });

        container.appendChild(button);
    });
}

function syncFilterState(container) {
    const buttons = container.querySelectorAll('.filter-chip');
    buttons.forEach((button) => {
        const tag = button.getAttribute('data-tag');
        const isActive = tag === state.currentTag;
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}

function renderGrid() {
    const container = document.querySelector('[data-video-grid]');
    if (!container) return;

    container.innerHTML = '';

    const filtered = state.currentTag === 'All'
        ? state.items
        : state.items.filter((item) => item.tag === state.currentTag);

    if (!filtered.length) {
        const message = document.createElement('p');
        message.className = 'video-note';
        message.textContent = '該当する映像は現在準備中です。';
        container.appendChild(message);
        return;
    }

    filtered.forEach((item) => {
        const card = createVideoCard(item);
        container.appendChild(card);
    });
}

function renderChannels(channels) {
    const container = document.querySelector('[data-channel-list]');
    if (!container) return;

    container.innerHTML = '';
    container.classList.add('video-card-surface');
    if (!channels.length) {
        const message = document.createElement('p');
        message.className = 'video-note';
        message.textContent = '公式チャンネル情報は現在準備中です。';
        container.appendChild(message);
        return;
    }

    const list = document.createElement('ul');
    list.className = 'channel-list';

    channels.forEach((channel) => {
        const item = document.createElement('li');
        const label = document.createElement('span');
        label.textContent = '▌';
        const link = document.createElement('a');
        link.href = channel.url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = channel.label;

        item.appendChild(label);
        item.appendChild(link);
        list.appendChild(item);
    });

    container.appendChild(list);
}

function createVideoCard(item) {
    const wrapper = document.createElement('div');
    wrapper.className = 'video-card-surface';

    const article = document.createElement('article');
    article.className = 'video-card';

    const link = document.createElement('a');
    link.className = 'video-card-link';
    link.href = item.url || '#';
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', `${item.title} をYouTubeで再生`);

    const thumbUrl = resolveThumbnail(item);
    if (thumbUrl) {
        const img = document.createElement('img');
        img.src = thumbUrl;
        img.alt = item.title;
        link.appendChild(img);
    } else {
        link.classList.add('no-thumb');
        const span = document.createElement('span');
        span.textContent = 'Preview coming soon';
        link.appendChild(span);
    }

    const meta = document.createElement('div');
    meta.className = 'video-meta';
    meta.textContent = formatMeta(item.tag, item.year);

    const title = document.createElement('h3');
    title.textContent = item.title;

    article.appendChild(link);
    article.appendChild(meta);
    article.appendChild(title);

    if (item.note) {
        const note = document.createElement('p');
        note.className = 'video-note';
        note.textContent = item.note;
        article.appendChild(note);
    }

    const cta = document.createElement('div');
    const ctaLink = document.createElement('a');
    ctaLink.className = 'video-link';
    ctaLink.href = item.url || '#';
    ctaLink.target = '_blank';
    ctaLink.rel = 'noopener';
    ctaLink.textContent = 'YouTubeで見る';
    cta.appendChild(ctaLink);
    article.appendChild(cta);

    wrapper.appendChild(article);
    return wrapper;
}

function resolveThumbnail(item) {
    if (item.thumbOverride) return item.thumbOverride;
    return ytThumb(item.url || '', 'hq');
}

function formatMeta(tag, year) {
    if (tag && year) {
        return `${tag} · ${year}`;
    }
    return tag || year || '';
}
