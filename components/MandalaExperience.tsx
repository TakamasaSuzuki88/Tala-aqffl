'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import FooterSocials from './FooterSocials';
import type { Post } from '../lib/posts';
import { archiveExcludingLatest, getAllPosts, LATEST_POST_COUNT, latestNByCategory } from '../lib/posts';

gsap.defaults({ overwrite: 'auto' });

type SectionConfig = {
  id: string;
  number: string;
  name: string;
  description: string;
  position: { x: number; y: number; z: number };
  color: number;
  imageFile: string;
  href?: string;
};

const SECTION_DATA: SectionConfig[] = [
  {
    id: 'music',
    number: '1',
    name: '音楽',
    description: '音の宇宙、リズムの曼荼羅',
    position: { x: -1.05, y: 1.05, z: 0 },
    color: 0xfaf0e6,
    imageFile: '/mandala/01.jpg',
    href: '/music-page.html'
  },
  {
    id: 'video',
    number: '2',
    name: '映像',
    description: '動く光、時間の芸術',
    position: { x: 0, y: 1.05, z: 0 },
    color: 0xfaf0e6,
    imageFile: '/mandala/02.jpg',
    href: '/movie/index.html'
  },
  {
    id: 'painting',
    number: '3',
    name: '絵画',
    description: '色彩の瞑想、形の詩',
    position: { x: 1.05, y: 1.05, z: 0 },
    color: 0xfaf0e6,
    imageFile: '/mandala/03.jpg',
    href: '/painting/index.html'
  },
  {
    id: 'photo',
    number: '4',
    name: '写真',
    description: '瞬間の永遠、光の記憶',
    position: { x: -1.05, y: 0, z: 0 },
    color: 0xfaf0e6,
    imageFile: '/mandala/04.jpg',
    href: '/photo/index.html'
  },
  {
    id: 'philosophy',
    number: '5',
    name: '思想',
    description: '魂の中心、存在の核',
    position: { x: 0, y: 0, z: 0 },
    color: 0xfaf0e6,
    imageFile: '/mandala/05.jpg',
    href: '/idea/index.html'
  },
  {
    id: 'words',
    number: '6',
    name: '言葉',
    description: '意識の結晶、思考の形',
    position: { x: 1.05, y: 0, z: 0 },
    color: 0xfaf0e6,
    imageFile: '/mandala/06.jpg',
    href: '/words/index.html'
  },
  {
    id: 'monetize',
    number: '7',
    name: '販売',
    description: '価値の創造、豊かさの循環',
    position: { x: -1.05, y: -1.05, z: 0 },
    color: 0xfaf0e6,
    imageFile: '/mandala/07.jpg',
    href: '/money/index.html'
  },
  {
    id: 'game',
    number: '8',
    name: 'ゲーム',
    description: '遊びの哲学、インタラクティブアート',
    position: { x: 0, y: -1.05, z: 0 },
    color: 0xfaf0e6,
    imageFile: '/mandala/08.jpg',
    href: '/game/index.html'
  },
  {
    id: 'links',
    number: '9',
    name: 'リンク集',
    description: '繋がりの網、共鳴の場',
    position: { x: 1.05, y: -1.05, z: 0 },
    color: 0xfaf0e6,
    imageFile: '/mandala/09.jpg',
    href: '/links/index.html'
  }
];

const PARTICLE_COUNT = 200;

export function MandalaExperience() {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const transitionOverlayRef = useRef<HTMLDivElement | null>(null);
  const loadingScreenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    const loadingScreen = loadingScreenRef.current;
    const transitionOverlay = transitionOverlayRef.current;

    if (!container) {
      return;
    }

    let animationFrameId = 0;
    let resizeHandler: (() => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let pointerMoveHandler: ((event: PointerEvent) => void) | null = null;
    let pointerLeaveHandler: ((event: PointerEvent) => void) | null = null;
    let pointerCancelHandler: ((event: PointerEvent) => void) | null = null;
    let pointerDownHandler: ((event: PointerEvent) => void) | null = null;

    const labelSprites: Array<{
      sprite: THREE.Sprite;
      label: string;
      isMobileView: boolean;
    }> = [];

    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let raycaster: THREE.Raycaster | null = null;
    let hoveredSection: THREE.Mesh | null = null;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const sections: THREE.Mesh[] = [];
    const pointer = new THREE.Vector2();
    let pointerOverCanvas = false;
    let needsRaycast = false;

    const getContainerSize = () => {
      if (!container) {
        return null;
      }
      const bounds = container.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) {
        return null;
      }
      return { width: bounds.width, height: bounds.height };
    };

    const applyRendererSize = () => {
      if (!camera || !renderer) {
        return;
      }

      const size = getContainerSize();
      const width = size?.width ?? window.innerWidth;
      const height = size?.height ?? Math.max(window.innerHeight * 0.75, 480);

      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
    };

    const updatePointerState = (clientX: number, clientY: number): boolean => {
      if (!renderer) {
        pointerOverCanvas = false;
        return false;
      }

      const bounds = renderer.domElement.getBoundingClientRect();

      if (bounds.width === 0 || bounds.height === 0) {
        pointerOverCanvas = false;
        return false;
      }

      const insideBounds =
        clientX >= bounds.left &&
        clientX <= bounds.right &&
        clientY >= bounds.top &&
        clientY <= bounds.bottom;

      if (!insideBounds) {
        pointerOverCanvas = false;
        targetMouseX = 0;
        targetMouseY = 0;
        return false;
      }

      const normalizedX = ((clientX - bounds.left) / bounds.width) * 2 - 1;
      const normalizedY = -((clientY - bounds.top) / bounds.height) * 2 + 1;

      targetMouseX = normalizedX;
      targetMouseY = normalizedY;

      pointer.set(normalizedX, normalizedY);
      pointerOverCanvas = true;

      return true;
    };

    const findSectionFromObject = (object: THREE.Object3D | null): THREE.Mesh | null => {
      if (!object) {
        return null;
      }

      let current: THREE.Object3D | null = object;
      while (current) {
        if (sections.includes(current as THREE.Mesh) && current.userData?.href) {
          return current as THREE.Mesh;
        }
        current = current.parent;
      }

      return null;
    };

    const updateHoveredSection = (next: THREE.Object3D | null) => {
      const nextSection = findSectionFromObject(next);

      if (hoveredSection === nextSection) {
        return;
      }

      if (hoveredSection) {
        animateHoverOut(hoveredSection);
      }

      hoveredSection = nextSection;

      if (hoveredSection) {
        animateHoverIn(hoveredSection);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!renderer) {
        return;
      }

      const targetNode = event.target as Node | null;
      if (targetNode && targetNode !== renderer.domElement && !renderer.domElement.contains(targetNode)) {
        pointerOverCanvas = false;
        targetMouseX = 0;
        targetMouseY = 0;
        needsRaycast = false;
        updateHoveredSection(null);
        return;
      }

      const inside = updatePointerState(event.clientX, event.clientY);
      if (!inside) {
        needsRaycast = false;
        updateHoveredSection(null);
        return;
      }

      needsRaycast = true;
    };

    const onPointerLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
      pointerOverCanvas = false;
      needsRaycast = false;
      if (hoveredSection) {
        updateHoveredSection(null);
      }
    };

    const onPointerCancel = () => {
      targetMouseX = 0;
      targetMouseY = 0;
      pointerOverCanvas = false;
      needsRaycast = false;
      if (hoveredSection) {
        updateHoveredSection(null);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!raycaster || !camera) {
        return;
      }

      if (!updatePointerState(event.clientX, event.clientY)) {
        return;
      }

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(sections, false);
      if (intersects.length === 0) {
        updateHoveredSection(null);
        return;
      }

      const intersected = findSectionFromObject(intersects[0].object);

      if (!intersected) {
        return;
      }

      updateHoveredSection(intersected);

      const targetUrl = intersected.userData.href as string | undefined;
      if (!targetUrl) {
        return;
      }

      if (transitionOverlay) {
        transitionOverlay.classList.add('active');
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 200);
      } else {
        window.location.href = targetUrl;
      }
    };

    function animateHoverIn(mesh: THREE.Mesh) {
      const baseZ = mesh.userData.baseZ ?? mesh.userData.position?.z ?? 0;
      const scaleZRatio = mesh.userData.scaleZRatio ?? 1;
      const hoverScale = mesh.userData.id === 'philosophy' ? 1.15 : 1.02;
      const hoverScaleZ = hoverScale * scaleZRatio;

      mesh.userData.state = 'hover';
      mesh.userData.animToken = (mesh.userData.animToken ?? 0) + 1;
      const currentToken = mesh.userData.animToken;

      gsap.killTweensOf([mesh.scale, mesh.position]);
      mesh.userData.tlPulse?.pause(0);

      gsap.to(mesh.position, {
        z: baseZ + 0.15,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(mesh.scale, {
        x: hoverScale,
        y: hoverScale,
        z: hoverScaleZ,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          // Ignore stale callbacks
          if (mesh.userData.animToken !== currentToken || mesh.userData.state !== 'hover') {
            return;
          }
        }
      });

      if (mesh.material && 'emissiveIntensity' in mesh.material) {
        const material = mesh.material as THREE.MeshLambertMaterial;
        material.emissiveIntensity = mesh.userData.id === 'philosophy' ? 0.08 : 0.03;
      }
    }

    function animateHoverOut(mesh: THREE.Mesh) {
      const baseZ = mesh.userData.baseZ ?? mesh.userData.position?.z ?? 0;
      const baseScale = mesh.userData.baseScale ?? (mesh.userData.id === 'philosophy' ? 1.05 : 1);
      const scaleZRatio = mesh.userData.scaleZRatio ?? 1;
      const baseScaleZ = baseScale * scaleZRatio;

      mesh.userData.state = 'idle';
      mesh.userData.animToken = (mesh.userData.animToken ?? 0) + 1;
      const currentToken = mesh.userData.animToken;

      gsap.killTweensOf([mesh.scale, mesh.position]);

      gsap.to(mesh.position, {
        z: baseZ,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(mesh.scale, {
        x: baseScale,
        y: baseScale,
        z: baseScaleZ,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          if (mesh.userData.animToken === currentToken && mesh.userData.state === 'idle') {
            mesh.userData.tlPulse?.play(0);
          }
        }
      });

      if (mesh.material && 'emissiveIntensity' in mesh.material) {
        const material = mesh.material as THREE.MeshLambertMaterial;
        material.emissiveIntensity = mesh.userData.id === 'philosophy' ? 0.05 : 0.01;
      }
    }

    function renderLabelTexture(text: string, isMobileView: boolean) {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');

      if (!context) {
        return null;
      }

      context.clearRect(0, 0, 256, 256);

      const baseFontSize = text.length >= 4 ? 46 : text.length === 3 ? 52 : 60;
      const fontScale = isMobileView ? 1.2 : 1;
      const labelFontSize = Math.round(baseFontSize * fontScale);
      const fontSpec = `700 ${labelFontSize}px "Noto Serif JP"`;
      context.font = fontSpec;
      context.fillStyle = '#040914';
      context.strokeStyle = '#FFFFFF';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.lineJoin = 'round';
      context.miterLimit = 2;
      context.lineWidth = 4;
      const labelCenterY = isMobileView ? 138 : 135;
      context.strokeText(text, 128, labelCenterY);
      context.fillText(text, 128, labelCenterY);

      return new THREE.CanvasTexture(canvas);
    }

    function refreshLabelTextures() {
      labelSprites.forEach(({ sprite, label, isMobileView }) => {
        const newTexture = renderLabelTexture(label, isMobileView);
        if (!newTexture) {
          return;
        }

        if (sprite.material.map) {
          sprite.material.map.dispose();
        }
        sprite.material.map = newTexture;
        sprite.material.needsUpdate = true;
        newTexture.needsUpdate = true;
      });
    }

    function scheduleLabelRefresh(attempt = 0) {
      const MAX_ATTEMPTS = 4;
      const refresh = () => {
        refreshLabelTextures();
        if (
          attempt < MAX_ATTEMPTS &&
          document.fonts &&
          !document.fonts.check('700 48px "Noto Serif JP"')
        ) {
          setTimeout(() => scheduleLabelRefresh(attempt + 1), 400);
        }
      };

      if (document.fonts && document.fonts.ready) {
        document.fonts
          .ready.then(refresh)
          .catch(() => {
            if (attempt < MAX_ATTEMPTS) {
              setTimeout(() => scheduleLabelRefresh(attempt + 1), 400);
            }
          });
      } else if (attempt < MAX_ATTEMPTS) {
        setTimeout(() => {
          refresh();
        }, 400);
      }
    }

    function setupLights(targetScene: THREE.Scene) {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      targetScene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(5, 8, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 4096;
      directionalLight.shadow.mapSize.height = 4096;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      directionalLight.shadow.camera.left = -10;
      directionalLight.shadow.camera.right = 10;
      directionalLight.shadow.camera.top = 10;
      directionalLight.shadow.camera.bottom = -10;
      targetScene.add(directionalLight);

      const spotLight = new THREE.SpotLight(0xdc143c, 0.3);
      spotLight.position.set(0, 5, 5);
      spotLight.target.position.set(0, 0, 0);
      spotLight.angle = Math.PI / 6;
      spotLight.penumbra = 0.8;
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 2048;
      spotLight.shadow.mapSize.height = 2048;
      targetScene.add(spotLight);
      targetScene.add(spotLight.target);
    }

    function createParticles(targetScene: THREE.Scene) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(PARTICLE_COUNT * 3);

      for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 15;
        positions[i + 1] = (Math.random() - 0.5) * 15;
        positions[i + 2] = -2 - Math.random() * 10;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0xdc143c,
        size: 0.03,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        depthWrite: false
      });

      const particles = new THREE.Points(geometry, material);
      particles.renderOrder = -1;
      targetScene.add(particles);
      targetScene.userData.particles = particles;
    }

    function createSections(targetScene: THREE.Scene) {
      const gridGroup = new THREE.Group();
      const isMobileView = window.innerWidth <= 768;

      const plateGeometry = new THREE.BoxGeometry(3.3, 3.3, 0.1);
      const plateMaterial = new THREE.MeshLambertMaterial({ color: 0xdc143c, emissive: 0xdc143c, emissiveIntensity: 0.02 });
      const basePlate = new THREE.Mesh(plateGeometry, plateMaterial);
      basePlate.position.z = -0.1;
      basePlate.castShadow = true;
      basePlate.receiveShadow = true;
      gridGroup.add(basePlate);

      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(256, 256, 40, 256, 256, 215);
        gradient.addColorStop(0, 'rgba(75, 45, 30, 0.65)');
        gradient.addColorStop(0.48, 'rgba(75, 45, 30, 0.32)');
        gradient.addColorStop(0.75, 'rgba(75, 45, 30, 0.12)');
        gradient.addColorStop(1, 'rgba(75, 45, 30, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
      }

      if (renderer && camera) {
        const shadowTexture = new THREE.CanvasTexture(canvas);
        const shadowGeometry = new THREE.PlaneGeometry(4.8, 4.8);
        const shadowMaterial = new THREE.MeshBasicMaterial({
          map: shadowTexture,
          transparent: true,
          opacity: 0.92,
          depthWrite: false,
          blending: THREE.NormalBlending
        });
        const shadowPlane = new THREE.Mesh(shadowGeometry, shadowMaterial);
        shadowPlane.rotation.x = -Math.PI / 2;
        shadowPlane.position.y = -2.5;
        targetScene.add(shadowPlane);
      }

      SECTION_DATA.forEach((data) => {
        const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.08);
        const material = new THREE.MeshLambertMaterial({
          color: data.color,
          emissive: data.id === 'philosophy' ? 0xdc143c : 0x000000,
          emissiveIntensity: data.id === 'philosophy' ? 0.05 : 0.01
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(data.position.x, data.position.y, data.position.z);
        const isPhilosophy = data.id === 'philosophy';
        const baseScale = isPhilosophy ? 1.05 : 1;
        const scaleZRatio = isPhilosophy ? 1.14 : 1;
        mesh.scale.set(baseScale, baseScale, baseScale * scaleZRatio);
        mesh.userData = {
          ...data,
          baseScale,
          scaleZRatio,
          baseZ: data.position.z ?? 0,
          animToken: 0,
          state: 'idle'
        };
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (data.imageFile) {
          const textureLoader = new THREE.TextureLoader();
          textureLoader.load(
            data.imageFile,
            (texture) => {
              const overlayGeometry = new THREE.PlaneGeometry(0.94, 0.94);
              const overlayMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0.4,
                side: THREE.FrontSide
              });
              const overlayMesh = new THREE.Mesh(overlayGeometry, overlayMaterial);
              overlayMesh.position.z = 0.041;
              mesh.add(overlayMesh);
              if (renderer && camera) {
                renderer.render(targetScene, camera);
              }
            },
            undefined,
            () => {
              // Texture load failure: keep base color
            }
          );
        }

        const edges = new THREE.EdgesGeometry(geometry);
        const edgeMaterial = new THREE.LineBasicMaterial({
          color: data.id === 'philosophy' ? 0xdc143c : 0x8b8b8b,
          linewidth: 1,
          transparent: true,
          opacity: 0.4
        });
        const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
        mesh.add(edgeLines);

        const textTexture = renderLabelTexture(data.name, isMobileView);
        if (textTexture) {
          const spriteMaterial = new THREE.SpriteMaterial({ map: textTexture, transparent: true });
          const sprite = new THREE.Sprite(spriteMaterial);
          const spriteScale = isMobileView ? 1.08 : 0.92;
          sprite.scale.set(spriteScale, spriteScale, 1);
          sprite.position.z = 0.05;
          mesh.add(sprite);
          labelSprites.push({ sprite, label: data.name, isMobileView });
        }

        if (isPhilosophy) {
          const pulseAmplitude = 0.03;
          const pulseTimeline = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
          pulseTimeline
            .to(mesh.scale, {
              x: baseScale + pulseAmplitude,
              y: baseScale + pulseAmplitude,
              z: (baseScale + pulseAmplitude) * scaleZRatio,
              duration: 0.9,
              ease: 'sine.inOut'
            })
            .to(mesh.scale, {
              x: baseScale,
              y: baseScale,
              z: baseScale * scaleZRatio,
              duration: 0.9,
              ease: 'sine.inOut'
            });
          pulseTimeline.play(0);
          mesh.userData.tlPulse = pulseTimeline;
        }

        sections.push(mesh);
        gridGroup.add(mesh);
      });

      targetScene.add(gridGroup);
      targetScene.userData.gridGroup = gridGroup;
      gridGroup.userData.baseY = 0.05;
    }

    function hideLoadingScreen() {
      if (!loadingScreen) {
        return;
      }
      const timeoutId = window.setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        window.setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 1000);

      return () => window.clearTimeout(timeoutId);
    }

    function animateScene() {
      if (!scene || !camera || !renderer) {
        return;
      }

      animationFrameId = requestAnimationFrame(animateScene);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const maxMovementLeft = 0.12;
      const maxMovementRight = 0.05;
      const maxMovementUp = 0.07;
      const maxMovementDown = 0.055;

      const targetX = mouseX * 0.26;
      camera.position.x = targetX > 0 ? Math.min(maxMovementRight, targetX) : Math.max(-maxMovementLeft, targetX);

      const targetY = mouseY * 0.26;
      camera.position.y = targetY > 0 ? Math.min(maxMovementUp, targetY) : Math.max(-maxMovementDown, targetY);

      camera.lookAt(0, 0, 0);

      const gridGroup = scene.userData.gridGroup as THREE.Group | undefined;
      if (gridGroup) {
        const floatTime = Date.now() * 0.0008;
        const baseY = gridGroup.userData.baseY ?? 0;
        gridGroup.position.y = baseY + Math.sin(floatTime) * 0.05;
        gridGroup.rotation.y = Math.sin(floatTime * 0.5) * 0.02;
      }

      const particles = scene.userData.particles as THREE.Points | undefined;
      if (particles) {
        particles.rotation.y += 0.0002;
        particles.rotation.x += 0.0001;
      }

      if (needsRaycast && raycaster && camera) {
        needsRaycast = false;

        if (!pointerOverCanvas) {
          updateHoveredSection(null);
        } else {
          raycaster.setFromCamera(pointer, camera);
          const intersects = raycaster.intersectObjects(sections, false);
          updateHoveredSection(intersects.length > 0 ? intersects[0].object : null);
        }
      }

      renderer.render(scene, camera);
    }

    function initializeScene() {
      if (!container) {
        return undefined;
      }

      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xaa8f23, 5, 20);

      const size = getContainerSize();
      const initialAspect =
        size && size.height > 0 ? size.width / size.height : window.innerWidth / Math.max(window.innerHeight, 1);

      camera = new THREE.PerspectiveCamera(75, initialAspect, 0.1, 1000);
      camera.position.set(0, 0, 4.75);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.shadowMap.autoUpdate = true;
      renderer.shadowMap.needsUpdate = true;

      container.appendChild(renderer.domElement);

      raycaster = new THREE.Raycaster();

      setupLights(scene);

      if (document.fonts && document.fonts.ready) {
        document.fonts
          .ready.then(() => {
            return Promise.race([
              document.fonts.load('700 48px "Noto Serif JP"'),
              new Promise((resolve) => setTimeout(resolve, 2500))
            ]);
          })
          .catch(() => undefined);
      }

      createSections(scene);
      createParticles(scene);
      scheduleLabelRefresh();

      const hideLoaderCleanup = hideLoadingScreen();

      if (transitionOverlay) {
        window.setTimeout(() => {
          transitionOverlay.classList.remove('active');
        }, 250);
      }

      pointerMoveHandler = onPointerMove;
      pointerLeaveHandler = onPointerLeave;
      pointerCancelHandler = onPointerCancel;
      pointerDownHandler = onPointerDown;
      applyRendererSize();

      resizeHandler = () => {
        applyRendererSize();
      };

      window.addEventListener('pointermove', pointerMoveHandler);
      window.addEventListener('pointerleave', pointerLeaveHandler);
      window.addEventListener('pointercancel', pointerCancelHandler);
      window.addEventListener('pointerdown', pointerDownHandler);
      window.addEventListener('resize', resizeHandler);

      if ('ResizeObserver' in window && container) {
        resizeObserver = new ResizeObserver(() => {
          applyRendererSize();
        });
        resizeObserver.observe(container);
      }

      animateScene();

      return () => {
        hideLoaderCleanup && hideLoaderCleanup();
      };
    }

    const cleanupLoader = initializeScene();

    return () => {
      cleanupLoader && cleanupLoader();

      if (pointerMoveHandler) {
        window.removeEventListener('pointermove', pointerMoveHandler);
      }
      if (pointerLeaveHandler) {
        window.removeEventListener('pointerleave', pointerLeaveHandler);
      }
      if (pointerCancelHandler) {
        window.removeEventListener('pointercancel', pointerCancelHandler);
      }
      if (pointerDownHandler) {
        window.removeEventListener('pointerdown', pointerDownHandler);
      }
      if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      labelSprites.forEach(({ sprite }) => {
        sprite.material.map?.dispose();
        sprite.material.dispose();
      });
      sections.forEach((section) => {
        if (section.userData?.tlPulse) {
          section.userData.tlPulse.kill();
        }
        gsap.killTweensOf([section.scale, section.position]);
        section.geometry.dispose();
        if (Array.isArray(section.material)) {
          section.material.forEach((mat) => mat.dispose());
        } else {
          section.material.dispose();
        }
      });

      renderer?.dispose();
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      raycaster = null;
      camera = null;
      scene = null;
    };
  }, []);

  return (
    <>
      <div ref={loadingScreenRef} id="loading-screen">
        <div className="loading-spinner" />
        <p className="loading-text">準備中...</p>
      </div>
      <div ref={transitionOverlayRef} id="page-overlay" className="page-crossfade active" />
      <div ref={canvasContainerRef} id="canvas-container" />
    </>
  );
}

const COMING_SOON_LABEL = 'coming soon';
const OTHERS_DISPLAY_COUNT = 10;

type FeedRow = {
  key: string;
  dateLabel: string;
  title: string;
  href?: string;
  isPlaceholder?: boolean;
};

const formatDisplayDate = (isoLikeDate: string): string => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoLikeDate);
  if (!match) {
    return isoLikeDate;
  }
  return `${match[1]}.${match[2]}.${match[3]}`;
};

const buildFeedRows = (posts: Post[], targetCount: number): FeedRow[] => {
  const rows: FeedRow[] = posts.slice(0, targetCount).map((post) => ({
    key: post.id,
    dateLabel: formatDisplayDate(post.date),
    title: post.title,
    href: `/posts/${post.slug}`
  }));

  while (rows.length < targetCount) {
    const placeholderIndex = rows.length;
    rows.push({
      key: `placeholder-${targetCount}-${placeholderIndex}`,
      dateLabel: COMING_SOON_LABEL,
      title: COMING_SOON_LABEL,
      isPlaceholder: true
    });
  }

  return rows;
};

export function MandalaPage() {
  const allPosts = getAllPosts();
  const latestTopics = latestNByCategory(allPosts, 'topic', LATEST_POST_COUNT);
  const latestNews = latestNByCategory(allPosts, 'news', LATEST_POST_COUNT);
  const topicRows = buildFeedRows(latestTopics, LATEST_POST_COUNT);
  const newsRows = buildFeedRows(latestNews, LATEST_POST_COUNT);
  const archivePosts = archiveExcludingLatest(allPosts);
  const otherRows = buildFeedRows(archivePosts, OTHERS_DISPLAY_COUNT);

  return (
    <main id="content-root" className="page-wrapper" aria-label="トピックとニュース一覧">
      <section id="topics" className="home-feed home-feed--topics" aria-labelledby="topics-heading">
        <div className="home-feed__container">
          <div className="home-feed__heading">
            <h2 id="topics-heading" className="home-feed__title" aria-label="トピック">
              TOPIC
            </h2>
          </div>

          <ul className="home-feed__list" role="list">
            {topicRows.map((row) => {
              const isPlaceholder = row.isPlaceholder || !row.href;
              const itemClassName = ['home-feed__item', isPlaceholder ? 'home-feed__item--static' : '']
                .filter(Boolean)
                .join(' ');

              return (
                <li key={row.key} className={itemClassName}>
                  {isPlaceholder ? (
                    <div className="home-feed__link home-feed__link--static">
                      <span className="home-feed__date">{row.dateLabel}</span>
                      <span className="home-feed__title-text">{row.title}</span>
                    </div>
                  ) : (
                    <a className="home-feed__link" href={row.href}>
                      <span className="home-feed__date">{row.dateLabel}</span>
                      <span className="home-feed__title-text">{row.title}</span>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

        </div>
      </section>

      <section id="news" className="home-feed home-feed--news" aria-labelledby="news-heading">
        <div className="home-feed__container">
          <div className="home-feed__heading">
            <h2 id="news-heading" className="home-feed__title" aria-label="ニュース">
              NEWS
            </h2>
          </div>

          <ul className="home-feed__list" role="list">
            {newsRows.map((row) => {
              const isPlaceholder = row.isPlaceholder || !row.href;
              const itemClassName = ['home-feed__item', isPlaceholder ? 'home-feed__item--static' : '']
                .filter(Boolean)
                .join(' ');

              return (
                <li key={row.key} className={itemClassName}>
                  {isPlaceholder ? (
                    <div className="home-feed__link home-feed__link--static">
                      <span className="home-feed__date">{row.dateLabel}</span>
                      <span className="home-feed__title-text">{row.title}</span>
                    </div>
                  ) : (
                    <a className="home-feed__link" href={row.href}>
                      <span className="home-feed__date">{row.dateLabel}</span>
                      <span className="home-feed__title-text">{row.title}</span>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

        </div>
      </section>

      <section id="others" className="home-feed home-feed--others" aria-labelledby="others-heading">
        <div className="home-feed__container">
          <div className="home-feed__heading">
            <h2 id="others-heading" className="home-feed__title" aria-label="その他">
              その他
            </h2>
          </div>
          <ul className="home-feed__list" role="list">
            {otherRows.map((row) => {
              const isPlaceholder = row.isPlaceholder || !row.href;
              const itemClassName = ['home-feed__item', isPlaceholder ? 'home-feed__item--static' : '']
                .filter(Boolean)
                .join(' ');

              return (
                <li key={row.key} className={itemClassName}>
                  {isPlaceholder ? (
                    <div className="home-feed__link home-feed__link--static">
                      <span className="home-feed__date">{row.dateLabel}</span>
                      <span className="home-feed__title-text">{row.title}</span>
                    </div>
                  ) : (
                    <a className="home-feed__link" href={row.href}>
                      <span className="home-feed__date">{row.dateLabel}</span>
                      <span className="home-feed__title-text">{row.title}</span>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          <a className="home-feed__more" href="/archive">
            すべての過去記事を見る
          </a>
        </div>
      </section>

      <FooterSocials variant="home" />

      <section className="home-credit" aria-label="サイトクレジット">
        <div className="home-credit__inner">
          <p className="home-credit__text">©︎2008鈴木たかまさ(まるいそら音楽出版)-All Rights Reserved</p>
        </div>
      </section>
    </main>
  );
}

export default function MandalaHome() {
  return (
    <>
      <section id="hero" className="hero-section" aria-label="曼荼羅ナビゲーション">
        <MandalaExperience />
        <div id="ui-overlay">
          <header className="site-header">
            <h1 className="site-title">まるいそら音楽出版</h1>
            <p className="site-subtitle">Sharp Snow ART House</p>
            <p className="site-tagline">Multi artist portfolio</p>
            <p className="site-caption">鈴木たかまさ</p>
          </header>
        </div>
      </section>
      <MandalaPage />
    </>
  );
}
