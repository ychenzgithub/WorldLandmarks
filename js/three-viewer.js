/**
 * Three.js High-Fidelity 3D Architectural Viewer for World Landmarks
 * Features:
 * - OrbitControls with smooth damping & inertia
 * - Realistic PBR architectural materials (Stone, Brick, Gold, Marble, Tile, Metal, Glass)
 * - 15 specialized procedural architectural archetypes (Great Wall, Taj Mahal,
 *   Eiffel Tower, Colosseum, Sydney Opera House, Stonehenge, Gothic Cathedrals,
 *   Oriental Pagodas, Ancient Temples, Fortified Castles, Pyramids, etc.)
 * - Wireframe mode, auto-rotation, smooth camera transitions
 */

class Landmark3DViewer {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = Object.assign({
      autoRotate: true,
      cameraZ: 20,
      cameraY: 9,
      fov: 42
    }, options);

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.currentMeshGroup = null;
    this.animationFrameId = null;
    this.isRotating = this.options.autoRotate;
    this.isWireframe = false;
    this.currentModelType = 'wall';
    this.materials = {};

    this.init();
  }

  init() {
    if (!this.container || typeof THREE === 'undefined') return;

    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 450;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(this.options.fov, width / height, 0.1, 1000);
    this.camera.position.set(0, this.options.cameraY, this.options.cameraZ);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // OrbitControls if available
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.autoRotate = this.isRotating;
      this.controls.autoRotateSpeed = 1.4;
      this.controls.minDistance = 6;
      this.controls.maxDistance = 65;
      this.controls.maxPolarAngle = Math.PI / 2 + 0.02; // Don't flip below ground
      this.controls.target.set(0, 0, 0);
    } else {
      // Fallback manual mouse controls
      this.setupFallbackControls();
    }

    // Studio Lighting
    this.setupLighting();

    // Materials Palette
    this.setupMaterials();

    // Window Resize
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.container);

    // Start render loop
    this.animate();
  }

  setupLighting() {
    // Soft Ambient Light
    const ambient = new THREE.AmbientLight(0xfff8ed, 0.7);
    this.scene.add(ambient);

    // Main Warm Sun Light
    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.4);
    sunLight.position.set(18, 28, 22);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0005;
    this.scene.add(sunLight);

    // Cool Sky Fill Light
    const fillLight = new THREE.DirectionalLight(0x60a5fa, 0.75);
    fillLight.position.set(-20, 15, -15);
    this.scene.add(fillLight);

    // Rim/Accent Light from below-back
    const rimLight = new THREE.DirectionalLight(0xf59e0b, 0.6);
    rimLight.position.set(0, -10, -20);
    this.scene.add(rimLight);
  }

  setupMaterials() {
    this.materials = {
      // Weathered Great Wall Stone / Fortress Granite
      wallStone: new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.85,
        metalness: 0.1,
        wireframe: this.isWireframe
      }),
      // Terracotta & Mountain Terrain
      mountain: new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.9,
        metalness: 0.05,
        wireframe: this.isWireframe
      }),
      mountainGreen: new THREE.MeshStandardMaterial({
        color: 0x2e4a3e,
        roughness: 0.95,
        metalness: 0.05,
        wireframe: this.isWireframe
      }),
      // Chinese Imperial Roof Tile / Lacquer
      chineseTile: new THREE.MeshStandardMaterial({
        color: 0xd97706,
        roughness: 0.35,
        metalness: 0.25,
        wireframe: this.isWireframe
      }),
      chineseRed: new THREE.MeshStandardMaterial({
        color: 0xb91c1c,
        roughness: 0.45,
        metalness: 0.15,
        wireframe: this.isWireframe
      }),
      // Polished Architectural Gold / Brass
      gold: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.25,
        metalness: 0.8,
        wireframe: this.isWireframe
      }),
      // Taj Mahal & Classical Carrera Marble
      whiteMarble: new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.3,
        metalness: 0.15,
        wireframe: this.isWireframe
      }),
      // Ancient Sandstone / Roman Travertine
      sandstone: new THREE.MeshStandardMaterial({
        color: 0xd6c29a,
        roughness: 0.8,
        metalness: 0.08,
        wireframe: this.isWireframe
      }),
      // Gothic Cathedral Weathered Limestone
      cathedralStone: new THREE.MeshStandardMaterial({
        color: 0xa1a1aa,
        roughness: 0.75,
        metalness: 0.15,
        wireframe: this.isWireframe
      }),
      // Dark Base Pedestal
      pedestal: new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.6,
        metalness: 0.4,
        wireframe: this.isWireframe
      }),
      // Steel & Iron Lattice (Eiffel Tower / Bridge)
      wroughtIron: new THREE.MeshStandardMaterial({
        color: 0x78716c,
        roughness: 0.5,
        metalness: 0.65,
        wireframe: this.isWireframe
      }),
      // Red Bridge Steel (Golden Gate)
      internationalOrange: new THREE.MeshStandardMaterial({
        color: 0xc2410c,
        roughness: 0.4,
        metalness: 0.4,
        wireframe: this.isWireframe
      }),
      // Modern Glass Curtain
      glass: new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.15,
        metalness: 0.85,
        wireframe: this.isWireframe
      }),
      // Ancient Megalith (Stonehenge)
      megalith: new THREE.MeshStandardMaterial({
        color: 0x71717a,
        roughness: 0.9,
        metalness: 0.1,
        wireframe: this.isWireframe
      }),
      // Patina Bronze (Statue of Liberty)
      patinaBronze: new THREE.MeshStandardMaterial({
        color: 0x2dd4bf,
        roughness: 0.45,
        metalness: 0.35,
        wireframe: this.isWireframe
      }),
      // Water Reflective Base
      water: new THREE.MeshStandardMaterial({
        color: 0x0369a1,
        roughness: 0.1,
        metalness: 0.8,
        wireframe: this.isWireframe
      })
    };
  }

  setupFallbackControls() {
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const el = this.renderer.domElement;

    el.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('mouseup', () => { isDragging = false; });
    el.addEventListener('mousemove', (e) => {
      if (!isDragging || !this.currentMeshGroup) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      this.currentMeshGroup.rotation.y += dx * 0.008;
      this.currentMeshGroup.rotation.x += dy * 0.008;
      prevMouse = { x: e.clientX, y: e.clientY };
    });
    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.camera.position.z = Math.max(6, Math.min(50, this.camera.position.z + e.deltaY * 0.02));
    }, { passive: false });
  }

  onResize() {
    if (!this.container || !this.camera || !this.renderer) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    Object.values(this.materials).forEach(mat => {
      mat.wireframe = this.isWireframe;
    });
    return this.isWireframe;
  }

  toggleAutoRotate() {
    this.isRotating = !this.isRotating;
    if (this.controls) {
      this.controls.autoRotate = this.isRotating;
    }
    return this.isRotating;
  }

  resetView() {
    this.camera.position.set(0, this.options.cameraY, this.options.cameraZ);
    if (this.controls) {
      this.controls.target.set(0, 0, 0);
      this.controls.reset();
    }
    if (this.currentMeshGroup) {
      this.currentMeshGroup.rotation.set(0, 0, 0);
    }
  }

  // =========================================================================
  // Architectural Archetype 3D Builders
  // =========================================================================

  loadModel(type) {
    this.currentModelType = type || 'wall';

    if (this.currentMeshGroup) {
      this.scene.remove(this.currentMeshGroup);
    }

    const group = new THREE.Group();
    const M = this.materials;

    // Standard Circular Base Plinth
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(9, 9.4, 0.6, 48), M.pedestal);
    plinth.position.y = -4.3;
    plinth.receiveShadow = true;
    group.add(plinth);

    // Subtle Ground Grid Ring
    const ringGeo = new THREE.RingGeometry(8.9, 9.05, 48);
    const ringMesh = new THREE.Mesh(ringGeo, M.gold);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -3.99;
    group.add(ringMesh);

    switch (type) {
      // ---------------------------------------------------------------------
      // 1. 万里长城 (Great Wall of China) - Winding Ridge, Stepped Ramparts,
      //    Crenellated Battlements & Dual Watchtowers with Chinese Eaves
      // ---------------------------------------------------------------------
      case 'wall':
        this.buildGreatWall(group, M);
        break;

      // ---------------------------------------------------------------------
      // 2. 泰姬陵 & 经典大穹顶 (Taj Mahal & Great Classical Domes)
      // ---------------------------------------------------------------------
      case 'dome':
        this.buildTajMahalDome(group, M);
        break;

      // ---------------------------------------------------------------------
      // 3. 悉尼歌剧院 & 扬帆结构 (Sydney Opera House & Vaulted Shells)
      // ---------------------------------------------------------------------
      case 'shells':
        this.buildSydneyOperaHouse(group, M);
        break;

      // ---------------------------------------------------------------------
      // 4. 巨石阵 (Stonehenge) - Concentric Sarsen Circle & Horseshoe Trilithons
      // ---------------------------------------------------------------------
      case 'ring':
        this.buildStonehenge(group, M);
        break;

      // ---------------------------------------------------------------------
      // 5. 罗马斗兽场 (Roman Colosseum) - Multi-Tiered Arcades & Broken Rim
      // ---------------------------------------------------------------------
      case 'colosseum':
        this.buildColosseum(group, M);
        break;

      // ---------------------------------------------------------------------
      // 6. 埃菲尔铁塔 & 经典塔楼 (Eiffel Tower, Big Ben, Pisa, CN Tower)
      // ---------------------------------------------------------------------
      case 'tower':
        this.buildEiffelTower(group, M);
        break;

      // ---------------------------------------------------------------------
      // 7. 哥特大教堂 (Notre-Dame & Sagrada Família)
      // ---------------------------------------------------------------------
      case 'cathedral':
        this.buildCathedral(group, M);
        break;

      // ---------------------------------------------------------------------
      // 8. 东方古建筑与宝塔 (Forbidden City, Pagodas, Shwedagon)
      // ---------------------------------------------------------------------
      case 'pagoda':
        this.buildPagoda(group, M);
        break;

      // ---------------------------------------------------------------------
      // 9. 古典神殿 (Parthenon, Angkor Wat, Petra)
      // ---------------------------------------------------------------------
      case 'temple':
        this.buildParthenonTemple(group, M);
        break;

      // ---------------------------------------------------------------------
      // 10. 金字塔奇迹 (Pyramids of Giza & Chichén Itzá)
      // ---------------------------------------------------------------------
      case 'pyramid':
        this.buildPyramids(group, M);
        break;

      // ---------------------------------------------------------------------
      // 11. 城堡要塞 (Himeji, Neuschwanstein, Potala Palace)
      // ---------------------------------------------------------------------
      case 'castle':
        this.buildFortifiedCastle(group, M);
        break;

      // ---------------------------------------------------------------------
      // 12. 现代摩天巨塔 (Burj Khalifa, Empire State, Petronas)
      // ---------------------------------------------------------------------
      case 'spire':
        this.buildSkyscraperSpire(group, M);
        break;

      // ---------------------------------------------------------------------
      // 13. 宏伟悬索桥 (Golden Gate & Sydney Harbour Bridge)
      // ---------------------------------------------------------------------
      case 'bridge':
        this.buildSuspensionBridge(group, M);
        break;

      // ---------------------------------------------------------------------
      // 14. 经典凯旋门 (Arc de Triomphe & Brandenburg Gate)
      // ---------------------------------------------------------------------
      case 'arch':
        this.buildTriumphalArch(group, M);
        break;

      // ---------------------------------------------------------------------
      // 15. 丰碑巨像 (Statue of Liberty & Christ the Redeemer)
      // ---------------------------------------------------------------------
      case 'statue':
        this.buildMonumentalStatue(group, M);
        break;

      default:
        this.buildGreatWall(group, M);
    }

    this.scene.add(group);
    this.currentMeshGroup = group;
  }

  // =========================================================================
  // Detailed Geometry Builders
  // =========================================================================

  // 1. 万里长城 (Great Wall of China)
  buildGreatWall(group, M) {
    // A. Undulating Mountain Ridge (Green-grey peaks & slopes)
    const ridgePoints = [
      [-7, -3.8, 4, 3.2],
      [-4, -3.2, 1.5, 4.2],
      [-1, -2.4, -1, 5.0],
      [2.5, -2.0, -2, 5.8],
      [6, -1.2, -0.5, 6.4],
      [8, -2.5, 2, 4.0]
    ];

    ridgePoints.forEach(([x, y, z, r]) => {
      const mountain = new THREE.Mesh(
        new THREE.ConeGeometry(r * 1.5, 3.8, 12),
        M.mountainGreen
      );
      mountain.position.set(x, y - 0.5, z);
      mountain.castShadow = true;
      mountain.receiveShadow = true;
      group.add(mountain);
    });

    // B. S-Curving Wall Ramparts Following the Mountain Ridge
    const wallSegments = [
      { x1: -7, y1: -2.8, z1: 3.5, x2: -4, y2: -2.0, z2: 1.2 },
      { x1: -4, y1: -2.0, z1: 1.2, x2: -1.5, y2: -1.2, z2: -0.8 },
      { x1: -1.5, y1: -1.2, z2: -0.8, x2: 2.0, y2: -0.6, z2: -1.8 },
      { x1: 2.0, y1: -0.6, z1: -1.8, x2: 5.5, y2: 0.2, z2: -0.6 },
      { x1: 5.5, y1: 0.2, z1: -0.6, x2: 7.5, y2: -1.2, z2: 1.8 }
    ];

    wallSegments.forEach(seg => {
      const p1 = new THREE.Vector3(seg.x1, seg.y1, seg.z1);
      const p2 = new THREE.Vector3(seg.x2, seg.y2, seg.z2);
      const dist = p1.distanceTo(p2);
      const mid = p1.clone().add(p2).multiplyScalar(0.5);

      // Main Stone Wall Body
      const wallGeo = new THREE.BoxGeometry(1.6, 1.5, dist);
      const wallMesh = new THREE.Mesh(wallGeo, M.wallStone);
      wallMesh.position.copy(mid);
      wallMesh.lookAt(p2);
      wallMesh.castShadow = true;
      group.add(wallMesh);

      // Outer Crenellated Battlement Parapet (垛口 with teeth)
      const numTeeth = Math.floor(dist / 0.7);
      for (let t = 0; t < numTeeth; t++) {
        if (t % 2 === 0) {
          const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.45, 0.45), M.wallStone);
          const tPos = p1.clone().lerp(p2, (t + 0.5) / numTeeth);
          // Offset to left and right parapets
          const leftOffset = new THREE.Vector3(-0.7, 0.95, 0).applyQuaternion(wallMesh.quaternion);
          const rightOffset = new THREE.Vector3(0.7, 0.95, 0).applyQuaternion(wallMesh.quaternion);

          const toothL = tooth.clone();
          toothL.position.copy(tPos).add(leftOffset);
          group.add(toothL);

          const toothR = tooth.clone();
          toothR.position.copy(tPos).add(rightOffset);
          group.add(toothR);
        }
      }
    });

    // C. Watchtower 1: Main Two-Story Fortified Watchtower (主敌楼 / 烽火台)
    const tower1 = new THREE.Group();
    tower1.position.set(-1.5, -0.6, -0.8);

    // Base stone bastion
    const bBase = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.2, 3.0), M.wallStone);
    bBase.position.y = 0;
    bBase.castShadow = true;
    tower1.add(bBase);

    // Arched Gate Portal
    const archPortal = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.2, 16), M.pedestal);
    archPortal.rotation.x = Math.PI / 2;
    archPortal.position.set(0, -0.3, 1.5);
    tower1.add(archPortal);

    // Upper Watch Pavilion (Second Story)
    const upperRoom = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 2.2), M.chineseRed);
    upperRoom.position.y = 1.8;
    upperRoom.castShadow = true;
    tower1.add(upperRoom);

    // Arched Windows
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.6, 0.1), M.pedestal);
      win.position.set(Math.sin(angle) * 1.12, 1.8, Math.cos(angle) * 1.12);
      win.rotation.y = angle;
      tower1.add(win);
    }

    // Chinese Curved Hipped Roof (歇山顶 with sweeping eaves)
    const roofBase = new THREE.Mesh(new THREE.ConeGeometry(2.5, 0.8, 4), M.chineseTile);
    roofBase.rotation.y = Math.PI / 4;
    roofBase.position.y = 2.8;
    roofBase.castShadow = true;
    tower1.add(roofBase);

    // Roof Finial Ridge (正脊)
    const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.2, 0.6, 8), M.gold);
    finial.position.y = 3.4;
    tower1.add(finial);

    // Signal Beacon Fire Platform / Brazier
    const brazier = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.2, 0.5, 12), M.pedestal);
    brazier.position.set(1.1, 1.35, 1.1);
    tower1.add(brazier);

    // Red Flag / Pennant
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.5, 8), M.gold);
    pole.position.set(-1.1, 1.8, -1.1);
    tower1.add(pole);

    const flag = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.02), M.chineseRed);
    flag.position.set(-0.8, 2.3, -1.1);
    tower1.add(flag);

    group.add(tower1);

    // D. Watchtower 2: High Ridge Lookout Fort (高山敌台)
    const tower2 = new THREE.Group();
    tower2.position.set(5.5, 0.8, -0.6);

    const bBase2 = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.0, 2.6), M.wallStone);
    bBase2.castShadow = true;
    tower2.add(bBase2);

    // Upper crenellations for tower 2
    for (let side = -1; side <= 1; side += 2) {
      for (let k = -1; k <= 1; k += 1) {
        const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.3), M.wallStone);
        c1.position.set(k * 0.9, 1.2, side * 1.2);
        tower2.add(c1);

        const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.3), M.wallStone);
        c2.position.set(side * 1.2, 1.2, k * 0.9);
        tower2.add(c2);
      }
    }
    group.add(tower2);
  }

  // 2. 泰姬陵 (Taj Mahal Dome & Minarets)
  buildTajMahalDome(group, M) {
    // Plinth
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.8, 8.5), M.whiteMarble);
    plinth.position.y = -3.5;
    plinth.castShadow = true;
    group.add(plinth);

    // Central Mausoleum Body (chamfered square)
    const mainHall = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.8, 5.2), M.whiteMarble);
    mainHall.position.y = -1.2;
    mainHall.castShadow = true;
    group.add(mainHall);

    // Grand Arched Iwan Portals (All 4 facades)
    for (let r = 0; r < 4; r++) {
      const arch = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.8, 0.4), M.pedestal);
      arch.position.set(0, -1.4, 2.65);
      const pivot = new THREE.Group();
      pivot.rotation.y = (Math.PI / 2) * r;
      pivot.add(arch);
      group.add(pivot);
    }

    // High Drum
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 1.6, 32), M.whiteMarble);
    drum.position.y = 1.3;
    drum.castShadow = true;
    group.add(drum);

    // Bulbous Onion Dome (The Taj's signature silhouette)
    const domeGeo = new THREE.SphereGeometry(2.35, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7);
    const domeMesh = new THREE.Mesh(domeGeo, M.whiteMarble);
    domeMesh.position.y = 2.1;
    domeMesh.scale.set(1.0, 1.35, 1.0);
    domeMesh.castShadow = true;
    group.add(domeMesh);

    // Golden Lotus Spire Finial
    const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.4, 2.0, 16), M.gold);
    finial.position.y = 4.9;
    group.add(finial);

    // 4 Corner Chattris (Small Domed Pavilions on roof)
    for (let x of [-1.8, 1.8]) {
      for (let z of [-1.8, 1.8]) {
        const chattri = new THREE.Group();
        chattri.position.set(x, 1.4, z);
        const pillars = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.2, 8), M.whiteMarble);
        chattri.add(pillars);
        const cupola = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 12), M.whiteMarble);
        cupola.position.y = 0.9;
        chattri.add(cupola);
        group.add(chattri);
      }
    }

    // 4 Freestanding Three-Tiered Minarets
    for (let mx of [-3.8, 3.8]) {
      for (let mz of [-3.8, 3.8]) {
        const minaret = new THREE.Group();
        minaret.position.set(mx, -3.1, mz);

        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.48, 7.2, 16), M.whiteMarble);
        shaft.position.y = 3.6;
        shaft.castShadow = true;
        minaret.add(shaft);

        for (let b of [2.2, 4.4, 6.6]) {
          const balc = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.4, 0.25, 16), M.whiteMarble);
          balc.position.y = b;
          minaret.add(balc);
        }

        const mDome = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), M.gold);
        mDome.position.y = 7.5;
        minaret.add(mDome);

        group.add(minaret);
      }
    }
  }

  // 3. 悉尼歌剧院 (Sydney Opera House Vaulted Shells)
  buildSydneyOperaHouse(group, M) {
    const waterPlinth = new THREE.Mesh(new THREE.BoxGeometry(14, 0.4, 10), M.water);
    waterPlinth.position.y = -3.8;
    group.add(waterPlinth);

    const podium = new THREE.Mesh(new THREE.BoxGeometry(11, 1.2, 7.5), M.cathedralStone);
    podium.position.y = -3.1;
    podium.castShadow = true;
    group.add(podium);

    const steps = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.8, 2.5), M.cathedralStone);
    steps.position.set(-3.2, -2.7, 0);
    group.add(steps);

    const shellRows = [-1.5, 1.5];
    shellRows.forEach((zOffset, idx) => {
      const scale = idx === 0 ? 1.0 : 0.85;
      const shellConfigs = [
        { x: -1.2, y: -1.8, h: 3.5, r: 2.4, rotZ: 0.15 },
        { x: 0.8, y: -1.5, h: 4.8, r: 3.0, rotZ: 0.05 },
        { x: 2.8, y: -1.7, h: 3.8, r: 2.6, rotZ: -0.1 },
        { x: 4.2, y: -2.1, h: 2.5, r: 1.8, rotZ: -0.2 }
      ];

      shellConfigs.forEach(cfg => {
        const shell = new THREE.Group();
        shell.position.set(cfg.x, cfg.y, zOffset);
        shell.scale.set(scale, scale, scale);

        const shellGeo = new THREE.ConeGeometry(cfg.r, cfg.h, 16, 1, false, 0, Math.PI);
        const shellMesh = new THREE.Mesh(shellGeo, M.whiteMarble);
        shellMesh.rotation.z = Math.PI / 2 + cfg.rotZ;
        shellMesh.rotation.y = Math.PI / 2;
        shellMesh.castShadow = true;
        shell.add(shellMesh);

        const glassGeo = new THREE.CircleGeometry(cfg.r * 0.9, 16, 0, Math.PI);
        const glassMesh = new THREE.Mesh(glassGeo, M.glass);
        glassMesh.rotation.y = Math.PI / 2;
        glassMesh.position.x = -0.1;
        shell.add(glassMesh);

        group.add(shell);
      });
    });
  }

  // 4. 巨石阵 (Stonehenge Concentric Ring & Trilithons)
  buildStonehenge(group, M) {
    const earthwork = new THREE.Mesh(new THREE.CylinderGeometry(7.8, 8.2, 0.5, 40), M.mountainGreen);
    earthwork.position.y = -3.7;
    group.add(earthwork);

    const outerRadius = 5.2;
    const countOuter = 16;
    for (let i = 0; i < countOuter; i++) {
      const angle = (i / countOuter) * Math.PI * 2;
      const x = Math.cos(angle) * outerRadius;
      const z = Math.sin(angle) * outerRadius;

      const stone = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.8, 0.5), M.megalith);
      stone.position.set(x, -2.1, z);
      stone.rotation.y = -angle;
      stone.castShadow = true;
      group.add(stone);

      const nextAngle = ((i + 1) / countOuter) * Math.PI * 2;
      const nx = Math.cos(nextAngle) * outerRadius;
      const nz = Math.sin(nextAngle) * outerRadius;
      const midX = (x + nx) / 2;
      const midZ = (z + nz) / 2;

      const lintel = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 0.6), M.megalith);
      lintel.position.set(midX, -0.5, midZ);
      lintel.lookAt(new THREE.Vector3(nx, -0.5, nz));
      lintel.castShadow = true;
      group.add(lintel);
    }

    const trilithonAngles = [-1.3, -0.7, 0, 0.7, 1.3];
    const triHeights = [3.6, 4.2, 4.8, 4.2, 3.6];

    trilithonAngles.forEach((ang, idx) => {
      const r = 2.6;
      const cx = Math.cos(ang + Math.PI / 2) * r;
      const cz = Math.sin(ang + Math.PI / 2) * r;
      const h = triHeights[idx];

      const trilithon = new THREE.Group();
      trilithon.position.set(cx, -3.5 + h / 2, cz);
      trilithon.rotation.y = -ang;

      const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.65, h, 0.5), M.megalith);
      p1.position.x = -0.6;
      p1.castShadow = true;
      trilithon.add(p1);

      const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.65, h, 0.5), M.megalith);
      p2.position.x = 0.6;
      p2.castShadow = true;
      trilithon.add(p2);

      const l = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.6, 0.7), M.megalith);
      l.position.y = h / 2 + 0.3;
      l.castShadow = true;
      trilithon.add(l);

      group.add(trilithon);
    });

    const altar = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.25, 0.7), M.megalith);
    altar.position.set(0, -3.3, 0.2);
    group.add(altar);
  }

  // 5. 罗马斗兽场 (Roman Colosseum)
  buildColosseum(group, M) {
    const tiers = [
      { r: 6.2, h: 1.6, y: -2.7, openings: 24, mat: M.sandstone },
      { r: 6.0, h: 1.6, y: -1.1, openings: 24, mat: M.sandstone },
      { r: 5.8, h: 1.6, y: 0.5, openings: 24, mat: M.sandstone },
      { r: 5.6, h: 1.4, y: 2.0, openings: 12, mat: M.sandstone, broken: true }
    ];

    tiers.forEach(tier => {
      const step = (Math.PI * 2) / tier.openings;
      const count = tier.broken ? Math.floor(tier.openings * 0.65) : tier.openings;

      for (let i = 0; i < count; i++) {
        const a = i * step;
        const x = Math.cos(a) * tier.r;
        const z = Math.sin(a) * (tier.r * 0.82);

        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.6, tier.h, 0.7), tier.mat);
        pillar.position.set(x, tier.y, z);
        pillar.rotation.y = -a;
        pillar.castShadow = true;
        group.add(pillar);

        if (i < count - 1 || !tier.broken) {
          const arch = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.25, 0.6), M.gold);
          const na = (i + 0.5) * step;
          arch.position.set(Math.cos(na) * tier.r, tier.y + tier.h / 2 - 0.12, Math.sin(na) * (tier.r * 0.82));
          arch.rotation.y = -na;
          group.add(arch);
        }
      }
    });

    const arena = new THREE.Mesh(new THREE.CylinderGeometry(4.3, 4.3, 0.3, 32), M.sandstone);
    arena.scale.set(1.0, 1.0, 0.82);
    arena.position.y = -3.4;
    group.add(arena);

    for (let t = -2; t <= 2; t += 1.2) {
      const trench = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.4, 4.5), M.pedestal);
      trench.position.set(t, -3.2, 0);
      group.add(trench);
    }
  }

  // 6. 埃菲尔铁塔 (Eiffel Tower Lattice)
  buildEiffelTower(group, M) {
    const iron = M.wroughtIron;

    const legPositions = [
      [-3.2, -3.2], [3.2, -3.2], [3.2, 3.2], [-3.2, 3.2]
    ];

    legPositions.forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.85, 4.2, 8), iron);
      leg.position.set(lx * 0.65, -2.1, lz * 0.65);
      leg.rotation.x = (lz > 0 ? -1 : 1) * 0.22;
      leg.rotation.z = (lx > 0 ? 1 : -1) * 0.22;
      leg.castShadow = true;
      group.add(leg);
    });

    for (let r = 0; r < 4; r++) {
      const arch = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.18, 8, 16, Math.PI), iron);
      arch.rotation.y = (Math.PI / 2) * r;
      arch.position.set(0, -2.2, 0);
      group.add(arch);
    }

    const plat1 = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.5, 4.5), iron);
    plat1.position.y = -0.3;
    group.add(plat1);

    const midTower = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 2.0, 4.2, 8), iron);
    midTower.position.y = 2.0;
    midTower.castShadow = true;
    group.add(midTower);

    const plat2 = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.4, 2.6), M.gold);
    plat2.position.y = 4.2;
    group.add(plat2);

    const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 1.1, 7.5, 8), iron);
    spire.position.y = 8.1;
    spire.castShadow = true;
    group.add(spire);

    const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 12), M.gold);
    lantern.position.y = 12.0;
    group.add(lantern);

    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.15, 2.8, 8), iron);
    mast.position.y = 13.5;
    group.add(mast);
  }

  // 7. 哥特大教堂 (Notre-Dame & Gothic Cathedrals)
  buildCathedral(group, M) {
    const stone = M.cathedralStone;

    const nave = new THREE.Mesh(new THREE.BoxGeometry(4.6, 4.5, 8.5), stone);
    nave.position.set(0, -1.4, 0);
    nave.castShadow = true;
    group.add(nave);

    const roof = new THREE.Mesh(new THREE.ConeGeometry(3.6, 2.2, 4), M.pedestal);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, 1.9, 0);
    roof.scale.set(1.0, 1.0, 2.2);
    group.add(roof);

    for (let tx of [-1.8, 1.8]) {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(1.8, 7.2, 2.2), stone);
      tower.position.set(tx, 0.4, 4.0);
      tower.castShadow = true;
      group.add(tower);

      const belfry = new THREE.Mesh(new THREE.ConeGeometry(0.9, 2.5, 8), M.gold);
      belfry.position.set(tx, 5.2, 4.0);
      group.add(belfry);
    }

    const roseGeo = new THREE.TorusGeometry(0.9, 0.15, 12, 24);
    const roseMesh = new THREE.Mesh(roseGeo, M.gold);
    roseMesh.position.set(0, 1.2, 5.12);
    group.add(roseMesh);

    for (let px of [-1.5, 0, 1.5]) {
      const portal = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.6, 0.2), M.pedestal);
      portal.position.set(px, -2.7, 5.15);
      group.add(portal);
    }

    const fleche = new THREE.Mesh(new THREE.ConeGeometry(0.55, 7.5, 8), M.gold);
    fleche.position.set(0, 6.2, 0);
    group.add(fleche);

    for (let side of [-1, 1]) {
      for (let z of [-2.5, -0.8, 0.8, 2.5]) {
        const buttress = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.5, 0.35), stone);
        buttress.position.set(side * 3.4, -1.8, z);
        group.add(buttress);

        const strut = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.18, 0.2), stone);
        strut.position.set(side * 2.8, 0.2, z);
        strut.rotation.z = side * 0.45;
        group.add(strut);
      }
    }
  }

  // 8. 东方古建筑与宝塔 (Forbidden City & Tiered Pagodas)
  buildPagoda(group, M) {
    const tiers = 5;
    for (let p = 0; p < tiers; p++) {
      const scale = 1 - p * 0.14;
      const py = -3.2 + p * 2.1;

      const body = new THREE.Mesh(new THREE.BoxGeometry(4.2 * scale, 1.3, 4.2 * scale), M.chineseRed);
      body.position.y = py + 0.65;
      body.castShadow = true;
      group.add(body);

      for (let side = 0; side < 4; side++) {
        const door = new THREE.Mesh(new THREE.BoxGeometry(1.2 * scale, 0.9, 0.05), M.gold);
        door.position.set(0, py + 0.55, 2.12 * scale);
        const pivot = new THREE.Group();
        pivot.rotation.y = (Math.PI / 2) * side;
        pivot.add(door);
        group.add(pivot);
      }

      const roof = new THREE.Mesh(new THREE.ConeGeometry(5.4 * scale, 0.85, 4), M.chineseTile);
      roof.rotation.y = Math.PI / 4;
      roof.position.y = py + 1.5;
      roof.castShadow = true;
      group.add(roof);

      for (let c = 0; c < 4; c++) {
        const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.6), M.gold);
        const ca = (Math.PI / 2) * c + Math.PI / 4;
        bracket.position.set(Math.cos(ca) * 3.4 * scale, py + 1.25, Math.sin(ca) * 3.4 * scale);
        bracket.rotation.y = ca;
        group.add(bracket);
      }
    }

    const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.35, 3.2, 16), M.gold);
    finial.position.y = 8.5;
    group.add(finial);

    for (let r = 0; r < 5; r++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.35 - r * 0.04, 0.06, 8, 24), M.gold);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 7.5 + r * 0.45;
      group.add(ring);
    }
  }

  // 9. 帕特农神庙 & 古典柱廊 (Parthenon Temple & Colonnade)
  buildParthenonTemple(group, M) {
    const marble = M.sandstone;

    for (let s = 0; s < 3; s++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(11 - s * 0.4, 0.35, 6.8 - s * 0.4), marble);
      step.position.y = -3.6 + s * 0.35;
      group.add(step);
    }

    const colsX = 7;
    const colsZ = 4;
    const spacingX = 1.35;
    const spacingZ = 1.35;

    for (let ix = -colsX / 2; ix <= colsX / 2; ix++) {
      for (let iz = -colsZ / 2; iz <= colsZ / 2; iz++) {
        const isPerimeter = Math.abs(ix) === colsX / 2 || Math.abs(iz) === colsZ / 2;
        if (isPerimeter) {
          const col = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 3.8, 16), marble);
          col.position.set(ix * spacingX, -0.7, iz * spacingZ);
          col.castShadow = true;
          group.add(col);

          const cap = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.15, 0.65), marble);
          cap.position.set(ix * spacingX, 1.25, iz * spacingZ);
          group.add(cap);
        }
      }
    }

    const cella = new THREE.Mesh(new THREE.BoxGeometry(6.5, 3.6, 3.2), marble);
    cella.position.set(0, -0.7, 0);
    group.add(cella);

    const entablature = new THREE.Mesh(new THREE.BoxGeometry(10.2, 0.65, 6.0), marble);
    entablature.position.y = 1.65;
    group.add(entablature);

    for (let side of [-1, 1]) {
      const pediment = new THREE.Mesh(new THREE.ConeGeometry(5.2, 1.4, 4), M.gold);
      pediment.rotation.y = Math.PI / 4;
      pediment.position.set(0, 2.5, side * 2.8);
      pediment.scale.set(1.0, 1.0, 0.1);
      group.add(pediment);
    }

    const roof = new THREE.Mesh(new THREE.ConeGeometry(5.4, 1.4, 4), marble);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, 2.5, 0);
    roof.scale.set(1.0, 1.0, 0.55);
    group.add(roof);
  }

  // 10. 金字塔群 (Pyramids of Giza & Chichén Itzá)
  buildPyramids(group, M) {
    const greatPyramid = new THREE.Mesh(new THREE.ConeGeometry(7.2, 7.8, 4), M.sandstone);
    greatPyramid.rotation.y = Math.PI / 4;
    greatPyramid.position.set(-1.8, 0.1, -1.0);
    greatPyramid.castShadow = true;
    group.add(greatPyramid);

    const capstone = new THREE.Mesh(new THREE.ConeGeometry(1.6, 1.6, 4), M.gold);
    capstone.rotation.y = Math.PI / 4;
    capstone.position.set(-1.8, 3.2, -1.0);
    group.add(capstone);

    const pyr2 = new THREE.Mesh(new THREE.ConeGeometry(4.8, 5.4, 4), M.sandstone);
    pyr2.rotation.y = Math.PI / 4;
    pyr2.position.set(3.8, -1.1, 1.8);
    pyr2.castShadow = true;
    group.add(pyr2);

    const sphinxBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 1.0), M.sandstone);
    sphinxBase.position.set(3.2, -3.4, -2.8);
    group.add(sphinxBase);

    const sphinxHead = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 12), M.gold);
    sphinxHead.position.set(2.4, -2.7, -2.8);
    group.add(sphinxHead);
  }

  // 11. 城堡要塞 (Castles & Fortresses)
  buildFortifiedCastle(group, M) {
    const stone = M.wallStone;

    const mainKeep = new THREE.Mesh(new THREE.BoxGeometry(4.8, 4.2, 4.2), stone);
    mainKeep.position.set(0, -1.4, 0);
    mainKeep.castShadow = true;
    group.add(mainKeep);

    for (let cx of [-2.4, 2.4]) {
      for (let cz of [-2.4, 2.4]) {
        const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.85, 6.2, 16), stone);
        turret.position.set(cx, -0.4, cz);
        turret.castShadow = true;
        group.add(turret);

        const spire = new THREE.Mesh(new THREE.ConeGeometry(1.15, 3.0, 16), M.chineseTile);
        spire.position.set(cx, 4.2, cz);
        group.add(spire);
      }
    }

    const highTower = new THREE.Mesh(new THREE.BoxGeometry(2.4, 4.8, 2.4), M.whiteMarble);
    highTower.position.set(0, 2.2, 0);
    highTower.castShadow = true;
    group.add(highTower);

    const keepRoof = new THREE.Mesh(new THREE.ConeGeometry(2.2, 1.8, 4), M.gold);
    keepRoof.rotation.y = Math.PI / 4;
    keepRoof.position.set(0, 5.5, 0);
    group.add(keepRoof);

    for (let i = -1.8; i <= 1.8; i += 0.9) {
      const merlon1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.3), stone);
      merlon1.position.set(i, 0.9, 2.2);
      group.add(merlon1);
      const merlon2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.3), stone);
      merlon2.position.set(i, 0.9, -2.2);
      group.add(merlon2);
    }
  }

  // 12. 现代摩天巨塔 (Burj Khalifa / Modern Skyscraper)
  buildSkyscraperSpire(group, M) {
    const tiers = 8;
    for (let s = 0; s < tiers; s++) {
      const radius = 3.6 - s * 0.4;
      const h = 2.0;
      const y = -3.2 + s * 1.8;

      const tier = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.85, radius, h, 16), M.glass);
      tier.position.y = y;
      tier.castShadow = true;
      group.add(tier);

      const fin = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.08, 6, 24), M.gold);
      fin.rotation.x = Math.PI / 2;
      fin.position.y = y + h / 2;
      group.add(fin);
    }

    const pinnacle = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.6, 6.5, 12), M.wroughtIron);
    pinnacle.position.y = 14.2;
    pinnacle.castShadow = true;
    group.add(pinnacle);

    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), M.gold);
    beacon.position.y = 17.6;
    group.add(beacon);
  }

  // 13. 悬索桥 (Golden Gate & Sydney Harbour Bridge)
  buildSuspensionBridge(group, M) {
    const bridgeMat = M.internationalOrange;

    const water = new THREE.Mesh(new THREE.BoxGeometry(16, 0.4, 6), M.water);
    water.position.y = -3.8;
    group.add(water);

    for (let tx of [-3.8, 3.8]) {
      const tower = new THREE.Group();
      tower.position.set(tx, 0.8, 0);

      for (let tz of [-0.9, 0.9]) {
        const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.65, 9.2, 0.65), bridgeMat);
        shaft.position.z = tz;
        shaft.castShadow = true;
        tower.add(shaft);
      }

      for (let sy of [-2.5, 0, 2.5, 4.2]) {
        const strut = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 2.1), bridgeMat);
        strut.position.y = sy;
        tower.add(strut);
      }
      group.add(tower);
    }

    const deck = new THREE.Mesh(new THREE.BoxGeometry(15.5, 0.35, 2.4), M.pedestal);
    deck.position.y = -1.2;
    deck.castShadow = true;
    group.add(deck);

    for (let cz of [-0.9, 0.9]) {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-7.5, 4.8, cz),
        new THREE.Vector3(0, -1.0, cz),
        new THREE.Vector3(7.5, 4.8, cz)
      );
      const cableGeo = new THREE.TubeGeometry(curve, 32, 0.08, 8, false);
      const cableMesh = new THREE.Mesh(cableGeo, bridgeMat);
      group.add(cableMesh);

      for (let vx = -6.5; vx <= 6.5; vx += 0.9) {
        if (Math.abs(vx) !== 3.8) {
          const t = (vx + 7.5) / 15.0;
          const pt = curve.getPoint(t);
          const ropeLen = Math.max(0.2, pt.y - (-1.2));
          const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, ropeLen, 6), M.wroughtIron);
          rope.position.set(vx, -1.2 + ropeLen / 2, cz);
          group.add(rope);
        }
      }
    }
  }

  // 14. 凯旋门 (Triumphal Arch)
  buildTriumphalArch(group, M) {
    const stone = M.sandstone;

    for (let px of [-2.4, 2.4]) {
      const pylon = new THREE.Mesh(new THREE.BoxGeometry(1.8, 6.2, 3.2), stone);
      pylon.position.set(px, -0.6, 0);
      pylon.castShadow = true;
      group.add(pylon);

      const relief = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.0, 1.8), M.gold);
      relief.position.set(px > 0 ? px + 0.95 : px - 0.95, -0.5, 0);
      group.add(relief);
    }

    const archTop = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.8, 12, 24, Math.PI), stone);
    archTop.position.set(0, 1.6, 0);
    archTop.scale.set(1.0, 1.0, 1.8);
    group.add(archTop);

    const frieze = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.8, 3.6), stone);
    frieze.position.y = 2.8;
    group.add(frieze);

    const attic = new THREE.Mesh(new THREE.BoxGeometry(6.6, 1.8, 3.2), stone);
    attic.position.y = 4.1;
    attic.castShadow = true;
    group.add(attic);

    const crest = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.9, 0.1), M.gold);
    crest.position.set(0, 4.1, 1.65);
    group.add(crest);
  }

  // 15. 丰碑巨像 (Statue of Liberty & Christ)
  buildMonumentalStatue(group, M) {
    const base1 = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.2, 5.2), M.sandstone);
    base1.position.y = -3.2;
    group.add(base1);

    const base2 = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.4, 3.6), M.sandstone);
    base2.position.y = -1.6;
    base2.castShadow = true;
    group.add(base2);

    const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.4, 4.8, 16), M.patinaBronze);
    robe.position.y = 2.0;
    robe.castShadow = true;
    group.add(robe);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), M.patinaBronze);
    head.position.y = 4.9;
    group.add(head);

    for (let c = 0; c < 7; c++) {
      const angle = (c / 6) * Math.PI - Math.PI / 2;
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.8, 6), M.gold);
      spike.position.set(Math.sin(angle) * 0.75, 5.4, Math.cos(angle) * 0.3);
      spike.rotation.z = -angle * 0.7;
      group.add(spike);
    }

    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 2.4, 8), M.patinaBronze);
    arm.position.set(1.1, 5.6, 0.3);
    arm.rotation.z = -0.35;
    group.add(arm);

    const torchHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.8, 8), M.patinaBronze);
    torchHandle.position.set(1.6, 6.8, 0.3);
    group.add(torchHandle);

    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.9, 8), M.gold);
    flame.position.set(1.6, 7.4, 0.3);
    group.add(flame);

    const tablet = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.2, 0.8), M.gold);
    tablet.position.set(-1.0, 3.2, 0.5);
    tablet.rotation.z = 0.2;
    group.add(tablet);
  }

  // =========================================================================
  // Render Loop & Lifecycle
  // =========================================================================

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    if (this.controls) {
      this.controls.update();
    } else if (this.currentMeshGroup && this.isRotating) {
      this.currentMeshGroup.rotation.y += 0.008;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.controls) {
      this.controls.dispose();
    }
    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}

window.Landmark3DViewer = Landmark3DViewer;
