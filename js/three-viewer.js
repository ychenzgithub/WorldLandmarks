/**
 * Three.js Interactive 3D Architectural Viewer for World Landmarks
 * Renders procedural 3D architectural models with interactive orbit controls,
 * wireframe/solid modes, and smooth lighting.
 */

class Landmark3DViewer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.currentMeshGroup = null;
    this.animationFrameId = null;
    this.isRotating = true;
    this.isWireframe = false;
    this.currentModelType = 'dome';

    // Interaction state
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };

    this.init();
  }

  init() {
    if (!this.container || typeof THREE === 'undefined') return;

    const width = this.container.clientWidth || 450;
    const height = this.container.clientHeight || 450;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 8, 22);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xf59e0b, 1.2);
    dirLight1.position.set(15, 25, 20);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 0.8);
    dirLight2.position.set(-15, -10, -15);
    this.scene.add(dirLight2);

    // Mouse Interaction
    this.bindEvents();

    // Start loop
    this.animate();
  }

  bindEvents() {
    const el = this.renderer.domElement;

    el.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.isRotating = false;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    el.addEventListener('mousemove', (e) => {
      if (!this.isDragging || !this.currentMeshGroup) return;

      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.currentMeshGroup.rotation.y += deltaX * 0.008;
      this.currentMeshGroup.rotation.x += deltaY * 0.008;

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.camera.position.z += e.deltaY * 0.02;
      this.camera.position.z = Math.max(8, Math.min(45, this.camera.position.z));
    }, { passive: false });

    // Touch support for mobile
    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.isRotating = false;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    el.addEventListener('touchmove', (e) => {
      if (!this.isDragging || !this.currentMeshGroup || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.currentMeshGroup.rotation.y += deltaX * 0.008;
      this.currentMeshGroup.rotation.x += deltaY * 0.008;

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (!this.container || !this.camera || !this.renderer) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    if (this.currentMeshGroup) {
      this.currentMeshGroup.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.wireframe = this.isWireframe;
        }
      });
    }
    return this.isWireframe;
  }

  toggleAutoRotate() {
    this.isRotating = !this.isRotating;
    return this.isRotating;
  }

  resetView() {
    this.camera.position.set(0, 8, 22);
    if (this.currentMeshGroup) {
      this.currentMeshGroup.rotation.set(0.2, 0, 0);
    }
  }

  loadModel(type) {
    this.currentModelType = type || 'dome';

    if (this.currentMeshGroup) {
      this.scene.remove(this.currentMeshGroup);
    }

    const group = new THREE.Group();
    group.rotation.x = 0.2;

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.35,
      roughness: 0.4,
      wireframe: this.isWireframe
    });

    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.15,
      roughness: 0.6,
      wireframe: this.isWireframe
    });

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.5,
      roughness: 0.3,
      wireframe: this.isWireframe
    });

    // Circular pedestal platform
    const baseGeo = new THREE.CylinderGeometry(8, 8.5, 0.6, 32);
    const baseMesh = new THREE.Mesh(baseGeo, darkMat);
    baseMesh.position.y = -4;
    group.add(baseMesh);

    // Build specialized procedural geometry based on architecture type
    switch (type) {
      case 'pyramid':
        // Stepped / Classical Pyramid
        for (let i = 0; i < 5; i++) {
          const s = 10 - i * 1.8;
          const stepGeo = new THREE.BoxGeometry(s, 1.2, s);
          const stepMesh = new THREE.Mesh(stepGeo, stoneMat);
          stepMesh.position.y = -3.4 + i * 1.2;
          group.add(stepMesh);
        }
        const topTemple = new THREE.BoxGeometry(2, 1.5, 2);
        const topMesh = new THREE.Mesh(topTemple, goldMat);
        topMesh.position.y = 2.8;
        group.add(topMesh);
        break;

      case 'tower':
        // Eiffel / CN Tower style
        const leg1 = new THREE.ConeGeometry(3.5, 8, 4);
        const legMesh = new THREE.Mesh(leg1, darkMat);
        legMesh.position.y = 0;
        group.add(legMesh);

        const plat1 = new THREE.BoxGeometry(4, 0.4, 4);
        const platMesh = new THREE.Mesh(plat1, goldMat);
        platMesh.position.y = 1;
        group.add(platMesh);

        const mastGeo = new THREE.CylinderGeometry(0.3, 1.5, 8, 8);
        const mastMesh = new THREE.Mesh(mastGeo, goldMat);
        mastMesh.position.y = 5;
        group.add(mastMesh);

        const needleGeo = new THREE.CylinderGeometry(0.05, 0.3, 4, 8);
        const needleMesh = new THREE.Mesh(needleGeo, stoneMat);
        needleMesh.position.y = 11;
        group.add(needleMesh);
        break;

      case 'dome':
      case 'temple':
        // Classical Rotunda & Pantheon/Taj Mahal dome
        const drumGeo = new THREE.CylinderGeometry(4.5, 4.5, 3.5, 24);
        const drumMesh = new THREE.Mesh(drumGeo, stoneMat);
        drumMesh.position.y = -1.8;
        group.add(drumMesh);

        // Columns surrounding
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
          const colGeo = new THREE.CylinderGeometry(0.35, 0.35, 3.8, 12);
          const colMesh = new THREE.Mesh(colGeo, goldMat);
          colMesh.position.set(Math.cos(a) * 5.2, -1.8, Math.sin(a) * 5.2);
          group.add(colMesh);
        }

        const domeGeo = new THREE.SphereGeometry(4.6, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMesh = new THREE.Mesh(domeGeo, goldMat);
        domeMesh.position.y = 0;
        group.add(domeMesh);

        const lanternGeo = new THREE.CylinderGeometry(0.5, 0.5, 1.8, 12);
        const lanternMesh = new THREE.Mesh(lanternGeo, stoneMat);
        lanternMesh.position.y = 5.2;
        group.add(lanternMesh);
        break;

      case 'colosseum':
        // Elliptical multi-tiered amphitheatre
        for (let ring = 0; ring < 3; ring++) {
          const ringGeo = new THREE.CylinderGeometry(6 - ring * 0.4, 6.2 - ring * 0.4, 1.8, 28, 1, true);
          const ringMesh = new THREE.Mesh(ringGeo, ring % 2 === 0 ? stoneMat : goldMat);
          ringMesh.position.y = -2.6 + ring * 1.9;
          group.add(ringMesh);
        }
        const arenaFloor = new THREE.CylinderGeometry(4.5, 4.5, 0.3, 24);
        const arenaMesh = new THREE.Mesh(arenaFloor, darkMat);
        arenaMesh.position.y = -3.5;
        group.add(arenaMesh);
        break;

      case 'cathedral':
        // Gothic twin spire cathedral
        const nave = new THREE.BoxGeometry(4.5, 4.5, 8);
        const naveMesh = new THREE.Mesh(nave, stoneMat);
        naveMesh.position.set(0, -1.5, 0);
        group.add(naveMesh);

        const spire1 = new THREE.ConeGeometry(1.2, 7, 8);
        const spireMesh1 = new THREE.Mesh(spire1, goldMat);
        spireMesh1.position.set(-1.8, 3.8, 3.2);
        group.add(spireMesh1);

        const spire2 = new THREE.ConeGeometry(1.2, 7, 8);
        const spireMesh2 = new THREE.Mesh(spire2, goldMat);
        spireMesh2.position.set(1.8, 3.8, 3.2);
        group.add(spireMesh2);

        const centralSpire = new THREE.ConeGeometry(0.8, 9, 8);
        const centralMesh = new THREE.Mesh(centralSpire, darkMat);
        centralMesh.position.set(0, 5, -0.5);
        group.add(centralMesh);
        break;

      case 'pagoda':
        // Multi-tiered oriental pagoda
        for (let p = 0; p < 5; p++) {
          const block = new THREE.BoxGeometry(4 - p * 0.5, 1.2, 4 - p * 0.5);
          const bMesh = new THREE.Mesh(block, stoneMat);
          bMesh.position.y = -3 + p * 1.6;
          group.add(bMesh);

          const roof = new THREE.ConeGeometry(5 - p * 0.5, 0.7, 4);
          const rMesh = new THREE.Mesh(roof, goldMat);
          rMesh.rotation.y = Math.PI / 4;
          rMesh.position.y = -2.2 + p * 1.6;
          group.add(rMesh);
        }
        break;

      case 'spire':
        // Modern skyscraper (Burj Khalifa / Empire State)
        for (let s = 0; s < 6; s++) {
          const sW = 3.5 - s * 0.5;
          const sGeo = new THREE.CylinderGeometry(sW * 0.8, sW, 2.5, 12);
          const sMesh = new THREE.Mesh(sGeo, s % 2 === 0 ? stoneMat : darkMat);
          sMesh.position.y = -3 + s * 2.3;
          group.add(sMesh);
        }
        const antenna = new THREE.CylinderGeometry(0.08, 0.2, 5, 8);
        const aMesh = new THREE.Mesh(antenna, goldMat);
        aMesh.position.y = 11.5;
        group.add(aMesh);
        break;

      case 'bridge':
        // Golden Gate Suspension Bridge
        for (let b = -3; b <= 3; b += 6) {
          const tower = new THREE.BoxGeometry(0.8, 9, 0.8);
          const tMesh = new THREE.Mesh(tower, goldMat);
          tMesh.position.set(b, 0.5, 0);
          group.add(tMesh);
        }
        const deck = new THREE.BoxGeometry(14, 0.3, 1.8);
        const dMesh = new THREE.Mesh(deck, darkMat);
        dMesh.position.y = -1;
        group.add(dMesh);
        break;

      case 'arch':
        // Triumphal Arch
        const pLeft = new THREE.BoxGeometry(1.8, 6, 2.5);
        const mLeft = new THREE.Mesh(pLeft, stoneMat);
        mLeft.position.set(-2.2, -0.8, 0);
        group.add(mLeft);

        const pRight = new THREE.BoxGeometry(1.8, 6, 2.5);
        const mRight = new THREE.Mesh(pRight, stoneMat);
        mRight.position.set(2.2, -0.8, 0);
        group.add(mRight);

        const topAttic = new THREE.BoxGeometry(6.5, 2.2, 2.8);
        const mAttic = new THREE.Mesh(topAttic, goldMat);
        mAttic.position.set(0, 3.2, 0);
        group.add(mAttic);
        break;

      case 'statue':
        // Monumental Statue (Statue of Liberty / Christ)
        const pedestal = new THREE.BoxGeometry(3, 4, 3);
        const pMesh = new THREE.Mesh(pedestal, stoneMat);
        pMesh.position.y = -1.8;
        group.add(pMesh);

        const body = new THREE.CylinderGeometry(0.8, 1.2, 5, 12);
        const bdMesh = new THREE.Mesh(body, goldMat);
        bdMesh.position.y = 2.5;
        group.add(bdMesh);

        const head = new THREE.SphereGeometry(0.65, 16, 16);
        const hMesh = new THREE.Mesh(head, goldMat);
        hMesh.position.y = 5.6;
        group.add(hMesh);

        const arms = new THREE.BoxGeometry(6.5, 0.4, 0.4);
        const armMesh = new THREE.Mesh(arms, goldMat);
        armMesh.position.y = 4.2;
        group.add(armMesh);
        break;

      default:
        const defGeo = new THREE.DodecahedronGeometry(4);
        const defMesh = new THREE.Mesh(defGeo, goldMat);
        group.add(defMesh);
    }

    this.scene.add(group);
    this.currentMeshGroup = group;
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    if (this.currentMeshGroup && this.isRotating) {
      this.currentMeshGroup.rotation.y += 0.007;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}

window.Landmark3DViewer = Landmark3DViewer;
