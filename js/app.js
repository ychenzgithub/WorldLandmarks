/**
 * Application Logic for World Landmarks 3D Gallery & Architectural Explorer
 */

(function () {
  'use strict';

  // State
  let currentLang = 'zh';
  let currentTheme = localStorage.getItem('wl3d_theme') || 'dark';
  let activeFilterDim = 'curated';
  let activeFilterVal = 'all';
  let searchQuery = '';
  let viewMode = 'gallery'; // 'gallery' | 'map'
  let leafletMap = null;
  let leafletMarkers = [];
  let threeViewer = null;
  let activeLandmark = null;
  let isSpeaking = false;

  // DOM
  const gridContainer = document.getElementById('landmarks-grid');
  const countDisplay = document.getElementById('landmarks-count');
  const searchInput = document.getElementById('search-input');
  const langToggleBtn = document.getElementById('btn-lang-toggle');
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const randomBtn = document.getElementById('btn-random-explore');
  const galleryViewBtn = document.getElementById('btn-view-gallery');
  const mapViewBtn = document.getElementById('btn-view-map');
  const mapContainer = document.getElementById('map-view-container');
  const modalBackdrop = document.getElementById('landmark-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const audioGuideBtn = document.getElementById('btn-audio-guide');
  const externalLinkBtn = document.getElementById('btn-external-link');

  // Three.js modal control buttons
  const btnWireframe = document.getElementById('btn-toggle-wireframe');
  const btnRotate = document.getElementById('btn-toggle-rotate');
  const btnResetVp = document.getElementById('btn-reset-view');

  // Translations
  const I18N = {
    hero_pill: { zh: "世界经典建筑巡礼 · 4,500年人类文明结晶", en: "World Architecture Odyssey · 4,500 Years of Human Civilizations" },
    hero_title: { zh: "世界著名建筑与地标画廊", en: "World Landmarks 3D" },
    hero_sub: { zh: "探索人类历史上最壮丽的建筑奇迹。每座地标均配有可交互3D模型、建筑力学解构、历史背景与中英双语语音导赏。", en: "Explore the most magnificent architectural wonders in human history. Featuring interactive 3D models, structural engineering deconstructions, and bilingual audio guides." },
    view_gallery: { zh: "3D画廊", en: "3D Gallery" },
    view_map: { zh: "世界地图", en: "World Map" },
    search_placeholder: { zh: "搜索建筑、地标、城市、国家或建筑风格...", en: "Search landmark, city, country, style or era..." },
    btn_random: { zh: "随机漫游", en: "Random Wander" },
    explore_3d: { zh: "探索3D模型", en: "Explore 3D" },
    view_details: { zh: "详细图录", en: "Details" },
    model_tip: { zh: "拖拽旋转 · 滚轮缩放 3D 几何", en: "Drag to rotate · Scroll to zoom 3D geometry" },
    wireframe: { zh: "线框模式", en: "Wireframe" },
    rotate: { zh: "自动旋转", en: "Auto Rotate" },
    reset_view: { zh: "重置视角", en: "Reset View" },
    listen_guide: { zh: "朗读语音导赏", en: "Listen Audio Guide" },
    stop_guide: { zh: "停止朗读", en: "Stop Audio" },
    maps_view: { zh: "谷歌卫星图", en: "Google Satellite" },
    unesco_badge: { zh: "世界文化遗产", en: "UNESCO World Heritage" },
    footer_text: { zh: "世界著名建筑与地标画廊 (World Landmarks 3D) · 开源探索项目", en: "World Landmarks 3D · Open Source Architectural Explorer" }
  };

  function init() {
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    bindEvents();
    renderGallery();
  }

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('wl3d_theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }
  }

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

    if (langToggleBtn) {
      const txt = langToggleBtn.querySelector('.lang-txt');
      if (txt) txt.textContent = lang === 'zh' ? 'EN' : '中文';
    }

    if (searchInput) {
      searchInput.setAttribute('placeholder', I18N.search_placeholder[lang]);
    }

    // Update text for all i18n nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (I18N[key] && I18N[key][lang]) {
        el.textContent = I18N[key][lang];
      }
    });

    renderGallery();
    if (viewMode === 'map') {
      updateMapMarkers();
    }
    if (activeLandmark) {
      updateModalContent(activeLandmark);
    }
  }

  function getFilteredLandmarks() {
    return LANDMARKS_DATA.filter(item => {
      // 1. Dimension filters
      if (activeFilterDim === 'curated') {
        if (activeFilterVal === 'new7' && item.wonder !== 'new7') return false;
        if (activeFilterVal === 'ancient' && item.category !== 'ancient') return false;
        if (activeFilterVal === 'modern' && item.category !== 'modern') return false;
        if (activeFilterVal === 'unesco' && (!item.unesco || item.unesco === 0)) return false;
      } else if (activeFilterDim === 'continent') {
        if (activeFilterVal !== 'all' && item.continent !== activeFilterVal) return false;
      } else if (activeFilterDim === 'style') {
        if (activeFilterVal !== 'all' && item.category !== activeFilterVal) return false;
      }

      // 2. Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const nameZh = item.name.zh.toLowerCase();
        const nameEn = item.name.en.toLowerCase();
        const countryZh = item.country.zh.toLowerCase();
        const countryEn = item.country.en.toLowerCase();
        const cityZh = item.city.zh.toLowerCase();
        const cityEn = item.city.en.toLowerCase();
        const styleZh = item.style.zh.toLowerCase();
        const styleEn = item.style.en.toLowerCase();
        const descZh = item.desc.zh.toLowerCase();
        const descEn = item.desc.en.toLowerCase();

        return (
          nameZh.includes(q) || nameEn.includes(q) ||
          countryZh.includes(q) || countryEn.includes(q) ||
          cityZh.includes(q) || cityEn.includes(q) ||
          styleZh.includes(q) || styleEn.includes(q) ||
          descZh.includes(q) || descEn.includes(q)
        );
      }

      return true;
    });
  }

  function renderGallery() {
    if (!gridContainer) return;

    const list = getFilteredLandmarks();

    if (countDisplay) {
      if (currentLang === 'zh') {
        countDisplay.textContent = `共展示 ${list.length} / ${LANDMARKS_DATA.length} 座世界地标与建筑奇迹`;
      } else {
        countDisplay.textContent = `Showing ${list.length} of ${LANDMARKS_DATA.length} iconic world landmarks`;
      }
    }

    if (list.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <i class="fa-solid fa-archway" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-subtle);"></i>
          <h3>${currentLang === 'zh' ? '未找到匹配的地标' : 'No matching landmarks found'}</h3>
          <p>${currentLang === 'zh' ? '请尝试更换关键词或重置筛选条件' : 'Try another search term or reset category filters'}</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = list.map(item => {
      const name = item.name[currentLang] || item.name.en;
      const subName = currentLang === 'zh' ? item.name.en : item.name.zh;
      const country = item.country[currentLang] || item.country.en;
      const city = item.city[currentLang] || item.city.en;
      const style = item.style[currentLang] || item.style.en;
      const desc = item.desc[currentLang] || item.desc.en;

      return `
        <div class="landmark-card" data-id="${item.id}">
          <div class="card-media">
            <img src="${item.image}" alt="${name}" loading="lazy">
            <div class="card-flag-badge">
              <span>${item.flag}</span>
              <span>${country}</span>
            </div>
            <div class="card-3d-tag">
              <i class="fa-solid fa-cube"></i>
              <span>3D</span>
            </div>
          </div>

          <div class="card-body">
            <div class="card-meta-tags">
              <span class="card-pill style">${style}</span>
              <span class="card-pill">${item.year}</span>
              <span class="card-pill">${city}</span>
            </div>

            <h3 class="card-title">${name}</h3>
            <div class="card-subtitle">${subName}</div>
            <p class="card-desc">${desc}</p>

            <div class="card-footer">
              <span style="font-size: 0.8rem; font-weight: 600; color: var(--accent-gold);"><i class="fa-solid fa-arrows-up-down"></i> ${item.height}</span>
              <span class="btn-card-explore">
                <span>${I18N.explore_3d[currentLang]}</span>
                <i class="fa-solid fa-arrow-right"></i>
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach card click handlers and 3D tilt effects
    attachCardInteractions();
  }

  function attachCardInteractions() {
    const cards = document.querySelectorAll('.landmark-card');
    cards.forEach(card => {
      const id = card.getAttribute('data-id');
      const item = LANDMARKS_DATA.find(x => x.id === id);

      card.addEventListener('click', () => {
        openModal(item);
      });

      // 3D perspective mouse tilt effect
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // =========================================================================
  // Leaflet Interactive Map View
  // =========================================================================
  function initMap() {
    if (leafletMap || typeof L === 'undefined') return;

    leafletMap = L.map('landmarks-map', {
      center: [25, 10],
      zoom: 2,
      minZoom: 2,
      maxZoom: 16
    });

    // Dark-themed CartoDB tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(leafletMap);

    updateMapMarkers();
  }

  function updateMapMarkers() {
    if (!leafletMap) return;

    // Clear previous markers
    leafletMarkers.forEach(m => leafletMap.removeLayer(m));
    leafletMarkers = [];

    const list = getFilteredLandmarks();

    list.forEach(item => {
      const name = item.name[currentLang] || item.name.en;
      const country = item.country[currentLang] || item.country.en;

      const customIcon = L.divIcon({
        className: 'custom-pin-wrap',
        html: `<div class="custom-landmark-pin" title="${name} (${country})"><i class="fa-solid fa-landmark"></i></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(item.coords, { icon: customIcon }).addTo(leafletMap);

      const popupContent = `
        <div style="font-family: var(--font-sans); padding: 4px; max-width: 220px;">
          <img src="${item.image}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;">
          <div style="font-weight: 700; font-size: 0.95rem; color: #0f172a; line-height: 1.2;">${name}</div>
          <div style="font-size: 0.78rem; color: #64748b; margin-bottom: 6px;">${item.flag} ${country} · ${item.city[currentLang]}</div>
          <button onclick="window.__openLandmarkModal('${item.id}')" style="width: 100%; padding: 4px 8px; background: #f59e0b; color: #ffffff; border-radius: 4px; font-size: 0.8rem; font-weight: 600; cursor: pointer; border: none;">
            ${I18N.explore_3d[currentLang]}
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      leafletMarkers.push(marker);
    });
  }

  // Global helper for map popup button
  window.__openLandmarkModal = function (id) {
    const item = LANDMARKS_DATA.find(x => x.id === id);
    if (item) openModal(item);
  };

  // =========================================================================
  // Detailed 3D Modal & Architectural Explorer
  // =========================================================================
  function openModal(item) {
    if (!item || !modalBackdrop) return;
    activeLandmark = item;

    updateModalContent(item);
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Initialize or load 3D Model
    setTimeout(() => {
      if (!threeViewer) {
        threeViewer = new Landmark3DViewer('three-canvas-container');
      }
      threeViewer.loadModel(item.modelType);
      threeViewer.resetView();
    }, 50);
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    stopSpeech();
    activeLandmark = null;
  }

  function updateModalContent(item) {
    const name = item.name[currentLang] || item.name.en;
    const subName = currentLang === 'zh' ? item.name.en : item.name.zh;
    const country = item.country[currentLang] || item.country.en;
    const city = item.city[currentLang] || item.city.en;
    const style = item.style[currentLang] || item.style.en;
    const desc = item.desc[currentLang] || item.desc.en;
    const highlight = item.highlight[currentLang] || item.highlight.en;

    document.getElementById('modal-title').textContent = name;
    document.getElementById('modal-subname').textContent = subName;
    document.getElementById('modal-country').textContent = `${item.flag} ${country}`;
    document.getElementById('modal-city').textContent = city;
    document.getElementById('modal-year').textContent = item.year;
    document.getElementById('modal-height').textContent = item.height;
    document.getElementById('modal-style').textContent = style;
    document.getElementById('modal-unesco').textContent = item.unesco > 0 ? `${I18N.unesco_badge[currentLang]} (${item.unesco})` : (currentLang === 'zh' ? '国家级地标' : 'National Landmark');
    document.getElementById('modal-desc').textContent = desc;
    document.getElementById('modal-highlight').textContent = highlight;

    if (externalLinkBtn) {
      externalLinkBtn.href = `https://www.google.com/maps/search/?api=1&query=${item.coords[0]},${item.coords[1]}`;
    }
  }

  // Text to Speech Audio Guide
  function toggleSpeech() {
    if (!activeLandmark || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      stopSpeech();
    } else {
      const text = `${activeLandmark.name[currentLang]}。${activeLandmark.desc[currentLang]}。建筑特色：${activeLandmark.highlight[currentLang]}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLang === 'zh' ? 'zh-CN' : 'en-US';
      utterance.rate = 0.95;

      utterance.onend = () => {
        isSpeaking = false;
        updateAudioButtonState();
      };

      utterance.onerror = () => {
        isSpeaking = false;
        updateAudioButtonState();
      };

      window.speechSynthesis.speak(utterance);
      isSpeaking = true;
      updateAudioButtonState();
    }
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isSpeaking = false;
    updateAudioButtonState();
  }

  function updateAudioButtonState() {
    if (!audioGuideBtn) return;
    if (isSpeaking) {
      audioGuideBtn.classList.add('playing');
      audioGuideBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i> <span>${I18N.stop_guide[currentLang]}</span>`;
    } else {
      audioGuideBtn.classList.remove('playing');
      audioGuideBtn.innerHTML = `<i class="fa-solid fa-headphones"></i> <span>${I18N.listen_guide[currentLang]}</span>`;
    }
  }

  // =========================================================================
  // Event Bindings
  // =========================================================================
  function bindEvents() {
    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', () => {
        applyLanguage(currentLang === 'zh' ? 'en' : 'zh');
      });
    }

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderGallery();
        if (viewMode === 'map') updateMapMarkers();
      });
    }

    // Filter pills
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const dim = pill.getAttribute('data-dim');
        const val = pill.getAttribute('data-val');

        // Update active class on siblings in the same row
        const row = pill.closest('.filter-row');
        row.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        activeFilterDim = dim;
        activeFilterVal = val;

        renderGallery();
        if (viewMode === 'map') updateMapMarkers();
      });
    });

    // Random explore
    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        const list = getFilteredLandmarks();
        if (list.length > 0) {
          const rand = list[Math.floor(Math.random() * list.length)];
          openModal(rand);
        }
      });
    }

    // View switcher: Gallery vs Map
    if (galleryViewBtn && mapViewBtn) {
      galleryViewBtn.addEventListener('click', () => {
        galleryViewBtn.classList.add('active');
        mapViewBtn.classList.remove('active');
        viewMode = 'gallery';
        gridContainer.style.display = 'grid';
        mapContainer.style.display = 'none';
      });

      mapViewBtn.addEventListener('click', () => {
        mapViewBtn.classList.add('active');
        galleryViewBtn.classList.remove('active');
        viewMode = 'map';
        gridContainer.style.display = 'none';
        mapContainer.style.display = 'block';
        initMap();
        setTimeout(() => {
          if (leafletMap) leafletMap.invalidateSize();
        }, 100);
      });
    }

    // Modal close
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        closeModal();
      }
    });

    // 3D Viewport Controls
    if (btnWireframe) {
      btnWireframe.addEventListener('click', () => {
        if (threeViewer) {
          const isWire = threeViewer.toggleWireframe();
          btnWireframe.classList.toggle('active', isWire);
        }
      });
    }

    if (btnRotate) {
      btnRotate.addEventListener('click', () => {
        if (threeViewer) {
          const isRot = threeViewer.toggleAutoRotate();
          btnRotate.classList.toggle('active', isRot);
        }
      });
    }

    if (btnResetVp) {
      btnResetVp.addEventListener('click', () => {
        if (threeViewer) threeViewer.resetView();
      });
    }

    // Audio Guide Button
    if (audioGuideBtn) {
      audioGuideBtn.addEventListener('click', toggleSpeech);
    }
  }

  // Launch on ready
  document.addEventListener('DOMContentLoaded', init);
})();
