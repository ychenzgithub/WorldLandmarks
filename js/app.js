/**
 * Application Logic for World Landmarks 3D - Immersive Architectural Explorer
 */

(function () {
  'use strict';

  // State
  let currentLang = 'zh';
  let currentTheme = localStorage.getItem('wl3d_theme') || 'dark';
  let leafletMap = null;
  let leafletMarkers = [];
  let heroViewer = null;
  let currentLandmark = null;
  let isSpeaking = false;
  let activeMarker = null;

  // DOM Elements
  const langToggleBtn = document.getElementById('btn-lang-toggle');
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const randomBtn = document.getElementById('btn-random-explore');
  const searchInput = document.getElementById('search-input');
  const searchDropdown = document.getElementById('search-dropdown');

  // Stage DOM
  const heroStage = document.getElementById('hero-3d-stage');
  const stageTitle = document.getElementById('stage-landmark-name');
  const stageMeta = document.getElementById('stage-landmark-meta');
  const stageRibbon = document.getElementById('stage-quick-ribbon');
  const btnAudio = document.getElementById('stage-btn-audio');
  const audioBtnTxt = document.getElementById('audio-btn-txt');
  const btnRotate = document.getElementById('stage-btn-rotate');
  const btnWireframe = document.getElementById('stage-btn-wireframe');
  const btnReset = document.getElementById('stage-btn-reset');

  // Intel Side Panel DOM
  const intelPane = document.getElementById('stage-hud-intel');
  const intelToggleBtn = document.getElementById('intel-toggle-btn');
  const intelImg = document.getElementById('intel-landmark-img');
  const intelDesc = document.getElementById('intel-landmark-desc');
  const intelHighlight = document.getElementById('intel-landmark-highlight');
  const intelMapLink = document.getElementById('intel-map-link');

  // Ribbon landmark selection (Curated diversity across continents)
  const RIBBON_LANDMARK_IDS = [
    'great-wall',
    'eiffel-tower',
    'taj-mahal',
    'sydney-opera-house',
    'colosseum',
    'pyramids-giza',
    'stonehenge',
    'parthenon',
    'statue-of-liberty',
    'sagrada-familia',
    'himeji-castle',
    'burj-khalifa',
    'golden-gate-bridge',
    'arc-de-triomphe',
    'petra',
    'machu-picchu',
    'angkor-wat',
    'shwedagon-pagoda',
    'leaning-tower-pisa',
    'big-ben'
  ];

  // Translations
  const I18N = {
    hero_title: { zh: "世界著名建筑与地标画廊", en: "World Landmarks 3D" },
    search_placeholder: { zh: "搜索建筑、地标、城市、国家或流派...", en: "Search landmark, city, country, style or era..." },
    btn_random: { zh: "随机漫游", en: "Random Landmark" },
    live_3d: { zh: "实时 3D 建筑几何视角 · Live WebGL", en: "Live 3D Architectural Geometry · WebGL" },
    stage_tip: { zh: "按住鼠标左键 360° 旋转 · 滚轮缩放 · 右键平移 | 点击下方地图图钉或快捷栏实时切换：", en: "Drag left-click to rotate 360° · Scroll to zoom · Right-click to pan | Click map pins or ribbon below:" },
    arch_intel: { zh: "建筑解构与历史背景", en: "Architectural Intel & History" },
    engineering_highlight: { zh: "工程力学亮点", en: "Engineering Highlight" },
    maps_view: { zh: "谷歌卫星图", en: "Google Satellite" },
    listen_guide: { zh: "语音导赏", en: "Audio Guide" },
    stop_guide: { zh: "停止朗读", en: "Stop Audio" },
    rotate: { zh: "旋转", en: "Rotate" },
    wireframe: { zh: "线框", en: "Wireframe" },
    reset_view: { zh: "复位", en: "Reset" },
    map_pill: { zh: "空间探索 · 42 座世界地标地理坐标", en: "Spatial Atlas · 42 World Heritage Landmarks" },
    map_title: { zh: "全球地标空间分布地图", en: "World Landmarks Interactive Map" },
    map_sub: { zh: "点击地图中任意金色地标图钉，上方 3D 沉浸式舞台将即时加载该建筑的立体几何模型与建筑解构。", en: "Click any golden pin on the map to instantly focus the 3D showcase stage on its architectural geometry and engineering story." },
    unesco_badge: { zh: "世界文化遗产", en: "UNESCO World Heritage" },
    national_badge: { zh: "国家级地标", en: "National Heritage" }
  };

  function init() {
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    init3DStage();
    initWorldMap();
    bindEvents();
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

    // Update text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (I18N[key] && I18N[key][lang]) {
        el.textContent = I18N[key][lang];
      }
    });

    if (currentLandmark) {
      updateStageContent(currentLandmark);
    }
    renderRibbon();
    if (leafletMap) {
      updateMapMarkers();
    }
  }

  // =========================================================================
  // Immersive 3D Stage
  // =========================================================================

  function init3DStage() {
    const container = document.getElementById('hero-three-canvas');
    if (!container || typeof THREE === 'undefined') return;

    heroViewer = new Landmark3DViewer('hero-three-canvas', {
      autoRotate: true,
      cameraZ: 21,
      cameraY: 8.5,
      fov: 40
    });

    // Default to 万里长城 (Great Wall)
    currentLandmark = LANDMARKS_DATA[0];
    heroViewer.loadModel(currentLandmark.modelType);
    updateStageContent(currentLandmark);
    renderRibbon();

    // Stage Controls
    if (btnRotate) {
      btnRotate.addEventListener('click', () => {
        if (heroViewer) {
          const isRot = heroViewer.toggleAutoRotate();
          btnRotate.classList.toggle('active', isRot);
        }
      });
    }

    if (btnWireframe) {
      btnWireframe.addEventListener('click', () => {
        if (heroViewer) {
          const isWire = heroViewer.toggleWireframe();
          btnWireframe.classList.toggle('active', isWire);
        }
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (heroViewer) heroViewer.resetView();
      });
    }

    if (btnAudio) {
      btnAudio.addEventListener('click', toggleAudioGuide);
    }

    if (intelToggleBtn && intelPane) {
      intelToggleBtn.addEventListener('click', () => {
        intelPane.classList.toggle('collapsed');
        const isCollapsed = intelPane.classList.contains('collapsed');
        intelToggleBtn.innerHTML = isCollapsed ? '<i class="fa-solid fa-chevron-left"></i>' : '<i class="fa-solid fa-chevron-right"></i>';
      });
    }
  }

  function setFocusLandmark(landmark, shouldScrollToStage = true) {
    if (!landmark || !heroViewer) return;
    currentLandmark = landmark;

    // Load 3D model
    heroViewer.loadModel(landmark.modelType);
    heroViewer.resetView();

    // Update UI HUD
    updateStageContent(landmark);

    // Update active ribbon button
    document.querySelectorAll('.stage-ribbon-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-id') === landmark.id);
    });

    // Stop previous audio guide if speaking
    stopAudioGuide();

    // Scroll to 3D stage if invoked from map
    if (shouldScrollToStage && heroStage) {
      heroStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Pan map to landmark
    if (leafletMap && landmark.coords) {
      leafletMap.panTo(landmark.coords, { animate: true, duration: 1.0 });
    }
  }

  function updateStageContent(item) {
    if (!item) return;
    const name = item.name[currentLang] || item.name.en;
    const subName = currentLang === 'zh' ? item.name.en : item.name.zh;
    const country = item.country[currentLang] || item.country.en;
    const city = item.city[currentLang] || item.city.en;
    const style = item.style[currentLang] || item.style.en;
    const desc = item.desc[currentLang] || item.desc.en;
    const highlight = item.highlight[currentLang] || item.highlight.en;
    const unescoLabel = item.unesco > 0 ? `${I18N.unesco_badge[currentLang]} (${item.unesco})` : I.national_badge[currentLang];

    if (stageTitle) {
      stageTitle.innerHTML = `${name} <span class="subname">${subName}</span>`;
    }

    if (stageMeta) {
      stageMeta.innerHTML = `
        <span class="meta-chip"><i class="fa-solid fa-earth-americas"></i> ${item.flag} ${country} · ${city}</span>
        <span class="meta-chip"><i class="fa-solid fa-timeline"></i> ${item.year}</span>
        <span class="meta-chip"><i class="fa-solid fa-compass-drafting"></i> ${style}</span>
        <span class="meta-chip gold"><i class="fa-solid fa-arrows-up-down"></i> ${item.height}</span>
        ${item.unesco > 0 ? `<span class="meta-chip unesco"><i class="fa-solid fa-award"></i> UNESCO ${item.unesco}</span>` : ''}
      `;
    }

    // Update Intel side pane
    if (intelImg) {
      intelImg.src = item.image;
      intelImg.alt = name;
    }
    if (intelDesc) {
      intelDesc.textContent = desc;
    }
    if (intelHighlight) {
      intelHighlight.textContent = highlight;
    }
    if (intelMapLink) {
      intelMapLink.href = `https://www.google.com/maps/search/?api=1&query=${item.coords[0]},${item.coords[1]}`;
    }
  }

  function renderRibbon() {
    if (!stageRibbon) return;

    stageRibbon.innerHTML = RIBBON_LANDMARK_IDS.map(id => {
      const item = LANDMARKS_DATA.find(x => x.id === id);
      if (!item) return '';
      const name = item.name[currentLang] || item.name.en;
      const isActive = currentLandmark && currentLandmark.id === id ? 'active' : '';

      return `
        <button type="button" class="stage-ribbon-btn ${isActive}" data-id="${item.id}">
          <span class="flag">${item.flag}</span>
          <span class="txt">${name}</span>
        </button>
      `;
    }).join('');

    stageRibbon.querySelectorAll('.stage-ribbon-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = LANDMARKS_DATA.find(x => x.id === id);
        if (item) setFocusLandmark(item, false);
      });
    });
  }

  // =========================================================================
  // Audio Guide (Web Speech API)
  // =========================================================================

  function toggleAudioGuide() {
    if (!currentLandmark || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      stopAudioGuide();
    } else {
      const text = `${currentLandmark.name[currentLang]}。${currentLandmark.desc[currentLang]}。工程与力学亮点：${currentLandmark.highlight[currentLang]}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLang === 'zh' ? 'zh-CN' : 'en-US';
      utterance.rate = 0.95;

      utterance.onend = stopAudioGuide;
      utterance.onerror = stopAudioGuide;

      window.speechSynthesis.speak(utterance);
      isSpeaking = true;
      if (btnAudio) btnAudio.classList.add('playing');
      if (audioBtnTxt) audioBtnTxt.textContent = I18N.stop_guide[currentLang];
    }
  }

  function stopAudioGuide() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isSpeaking = false;
    if (btnAudio) btnAudio.classList.remove('playing');
    if (audioBtnTxt) audioBtnTxt.textContent = I18N.listen_guide[currentLang];
  }

  // =========================================================================
  // Interactive World Map (100% Free OpenStreetMap & Esri Tiles, No API Key)
  // =========================================================================

  function initWorldMap() {
    const mapEl = document.getElementById('landmarks-map');
    if (!mapEl || typeof L === 'undefined') return;

    leafletMap = L.map('landmarks-map', {
      center: [28, 12],
      zoom: 2,
      minZoom: 2,
      maxZoom: 16,
      scrollWheelZoom: false
    });

    // 100% Free Base Layers (No API Key required)
    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      maxZoom: 19
    });

    const esriDark = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; <a href="https://www.esri.com" target="_blank">Esri</a>',
      maxZoom: 16
    });

    const esriSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; <a href="https://www.esri.com" target="_blank">Esri</a>',
      maxZoom: 18
    });

    // Default to Esri Dark Canvas for immersive look, or fallback to OSM
    esriDark.addTo(leafletMap);

    const baseLayers = {
      "暗色地图 / Dark Canvas": esriDark,
      "卫星影像 / Esri Satellite": esriSatellite,
      "标准街道 / OpenStreetMap": osmLayer
    };

    L.control.layers(baseLayers, null, { position: 'topright' }).addTo(leafletMap);

    updateMapMarkers();
  }

  function updateMapMarkers() {
    if (!leafletMap) return;

    leafletMarkers.forEach(m => leafletMap.removeLayer(m));
    leafletMarkers = [];

    LANDMARKS_DATA.forEach(item => {
      const name = item.name[currentLang] || item.name.en;
      const country = item.country[currentLang] || item.country.en;
      const city = item.city[currentLang] || item.city.en;
      const style = item.style[currentLang] || item.style.en;

      const customIcon = L.divIcon({
        className: 'custom-pin-wrap',
        html: `
          <div class="custom-landmark-pin ${currentLandmark && currentLandmark.id === item.id ? 'active' : ''}" title="${name} (${country})">
            <i class="fa-solid fa-landmark"></i>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const marker = L.marker(item.coords, { icon: customIcon }).addTo(leafletMap);

      const popupContent = `
        <div class="map-popup-card">
          <img src="${item.image}" alt="${name}" class="map-popup-img">
          <div class="map-popup-title">${name}</div>
          <div class="map-popup-meta">${item.flag} ${country} · ${city}</div>
          <div class="map-popup-style">${style} (${item.year})</div>
          <button type="button" class="map-popup-btn" onclick="window.__selectLandmarkFromMap('${item.id}')">
            <i class="fa-solid fa-cube"></i> ${currentLang === 'zh' ? '在 3D 舞台查看此建筑' : 'View in 3D Showcase'}
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 260, offset: [0, -10] });

      // Direct click on marker updates the 3D stage and smoothly scrolls up
      marker.on('click', () => {
        setFocusLandmark(item, true);
      });

      leafletMarkers.push(marker);
    });
  }

  // Global helper for map popup button
  window.__selectLandmarkFromMap = function (id) {
    const item = LANDMARKS_DATA.find(x => x.id === id);
    if (item) {
      setFocusLandmark(item, true);
    }
  };

  // =========================================================================
  // Search & Navigation
  // =========================================================================

  function handleSearch(query) {
    if (!searchDropdown) return;
    const q = query.trim().toLowerCase();

    if (!q) {
      searchDropdown.style.display = 'none';
      searchDropdown.innerHTML = '';
      return;
    }

    const matches = LANDMARKS_DATA.filter(item => {
      const nZh = item.name.zh.toLowerCase();
      const nEn = item.name.en.toLowerCase();
      const cZh = item.country.zh.toLowerCase();
      const cEn = item.country.en.toLowerCase();
      const cityZh = item.city.zh.toLowerCase();
      const cityEn = item.city.en.toLowerCase();
      const sZh = item.style.zh.toLowerCase();
      const sEn = item.style.en.toLowerCase();

      return nZh.includes(q) || nEn.includes(q) ||
             cZh.includes(q) || cEn.includes(q) ||
             cityZh.includes(q) || cityEn.includes(q) ||
             sZh.includes(q) || sEn.includes(q);
    });

    if (matches.length === 0) {
      searchDropdown.innerHTML = `<div class="search-item empty">${currentLang === 'zh' ? '未找到相关建筑' : 'No landmarks found'}</div>`;
    } else {
      searchDropdown.innerHTML = matches.slice(0, 8).map(item => {
        const name = item.name[currentLang] || item.name.en;
        const country = item.country[currentLang] || item.country.en;
        return `
          <div class="search-item" data-id="${item.id}">
            <span class="s-flag">${item.flag}</span>
            <span class="s-name">${name}</span>
            <span class="s-country">${country}</span>
          </div>
        `;
      }).join('');

      searchDropdown.querySelectorAll('.search-item:not(.empty)').forEach(el => {
        el.addEventListener('click', () => {
          const id = el.getAttribute('data-id');
          const landmark = LANDMARKS_DATA.find(x => x.id === id);
          if (landmark) {
            setFocusLandmark(landmark, true);
            searchDropdown.style.display = 'none';
            if (searchInput) searchInput.value = '';
          }
        });
      });
    }

    searchDropdown.style.display = 'block';
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

    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        const rand = LANDMARKS_DATA[Math.floor(Math.random() * LANDMARKS_DATA.length)];
        setFocusLandmark(rand, true);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
      });

      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
          searchDropdown.style.display = 'none';
        }
      });
    }
  }

  // Launch on ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
