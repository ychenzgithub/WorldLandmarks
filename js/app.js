/**
 * Application Logic for World Landmarks 3D - Fullscreen Immersive Explorer
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

  // DOM Elements
  const langToggleBtn = document.getElementById('btn-lang-toggle');
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const randomBtn = document.getElementById('btn-random-explore');
  const searchInput = document.getElementById('search-input');
  const searchDropdown = document.getElementById('search-dropdown');

  // Stage DOM
  const stageTitle = document.getElementById('stage-landmark-name');
  const btnRotate = document.getElementById('stage-btn-rotate');
  const btnWireframe = document.getElementById('stage-btn-wireframe');
  const btnReset = document.getElementById('stage-btn-reset');

  // Translations
  const I18N = {
    hero_title: { zh: "世界著名建筑与地标画廊", en: "World Landmarks 3D" },
    search_placeholder: { zh: "搜索建筑、地标、城市、国家或流派...", en: "Search landmark, city, country, style or era..." },
    btn_random: { zh: "随机漫游", en: "Random Landmark" },
    stage_tip: { zh: "拖拽鼠标左键 360° 旋转 · 滚轮缩放 · 点击下方地图图钉实时切换 3D 建筑", en: "Drag left-click to rotate 360° · Scroll to zoom · Click any map pin below to switch 3D model" },
    rotate: { zh: "旋转", en: "Rotate" },
    wireframe: { zh: "线框", en: "Wireframe" },
    reset_view: { zh: "复位", en: "Reset" }
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
    if (leafletMap) {
      updateMapMarkers();
    }
  }

  // =========================================================================
  // Immersive Full-Width 3D Stage
  // =========================================================================

  function init3DStage() {
    const container = document.getElementById('hero-three-canvas');
    if (!container || typeof THREE === 'undefined') return;

    heroViewer = new Landmark3DViewer('hero-three-canvas', {
      autoRotate: true,
      cameraZ: 21,
      cameraY: 8.5,
      fov: 38
    });

    // Default to 万里长城 (Great Wall of China)
    currentLandmark = LANDMARKS_DATA[0];
    heroViewer.loadModel(currentLandmark.modelType);
    updateStageContent(currentLandmark);

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
  }

  function setFocusLandmark(landmark) {
    if (!landmark || !heroViewer) return;
    currentLandmark = landmark;

    // Load 3D model into the stage
    heroViewer.loadModel(landmark.modelType);
    heroViewer.resetView();

    // Update UI Title (Chinese & English names only)
    updateStageContent(landmark);

    // Highlight active pin on map
    if (leafletMap) {
      updateMapMarkers();
      if (landmark.coords) {
        leafletMap.panTo(landmark.coords, { animate: true, duration: 0.8 });
      }
    }
  }

  function updateStageContent(item) {
    if (!item || !stageTitle) return;
    const name = item.name[currentLang] || item.name.en;
    const subName = currentLang === 'zh' ? item.name.en : item.name.zh;
    stageTitle.innerHTML = `${name} <span class="subname">${subName}</span>`;
  }

  // =========================================================================
  // Seamlessly Connected World Map (100% Free OpenStreetMap & Esri Layers)
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

    // 100% Free Base Layers (No API Key Required)
    const esriDark = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; <a href="https://www.esri.com" target="_blank">Esri</a>',
      maxZoom: 16
    });

    const esriSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; <a href="https://www.esri.com" target="_blank">Esri</a>',
      maxZoom: 18
    });

    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      maxZoom: 19
    });

    // Default to Dark Canvas
    esriDark.addTo(leafletMap);

    const baseLayers = {
      "暗色地图 / Dark": esriDark,
      "卫星影像 / Satellite": esriSatellite,
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
      const isActive = currentLandmark && currentLandmark.id === item.id;

      const customIcon = L.divIcon({
        className: 'custom-pin-wrap',
        html: `
          <div class="custom-landmark-pin ${isActive ? 'active' : ''}" title="${name} (${country})">
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

      // Direct click on marker updates the 3D stage immediately
      marker.on('click', () => {
        setFocusLandmark(item);
      });

      leafletMarkers.push(marker);
    });
  }

  window.__selectLandmarkFromMap = function (id) {
    const item = LANDMARKS_DATA.find(x => x.id === id);
    if (item) {
      setFocusLandmark(item);
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
            setFocusLandmark(landmark);
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
        setFocusLandmark(rand);
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
