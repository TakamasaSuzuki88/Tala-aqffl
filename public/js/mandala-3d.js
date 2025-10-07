// 3D Mandala Menu Implementation
// Author: まるいそら (鈴木貴雅)

// Check if Three.js is loaded
console.log('Three.js loaded:', typeof THREE !== 'undefined');
console.log('GSAP loaded:', typeof gsap !== 'undefined');

// Global variables
let scene, camera, renderer;
let sections = [];
const labelSprites = [];
let raycaster, mouse;
let hoveredSection = null;
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
let transitionOverlay = null;

const navigationTargets = {
    music: 'music-page.html'
};

// Section data - Keypad style 3x3 grid (tight spacing)
// Button mapping: 1→01.jpg, 2→02.jpg, 3→03.jpg, 4→04.jpg, 5→05.jpg, 6→06.jpg, 7→07.jpg, 8→08.jpg, 9→09.jpg
const sectionData = [
    { id: 'music', number: '1', name: '音楽', description: '音の宇宙、リズムの曼荼羅', position: { x: -1.05, y: 1.05, z: 0 }, color: 0xFAF0E6, imageFile: '/mandala/01.jpg', href: 'music-page.html' },
    { id: 'video', number: '2', name: '映像', description: '動く光、時間の芸術', position: { x: 0, y: 1.05, z: 0 }, color: 0xFAF0E6, imageFile: '/mandala/02.jpg', href: 'movie/index.html' },
    { id: 'painting', number: '3', name: '絵画', description: '色彩の瞑想、形の詩', position: { x: 1.05, y: 1.05, z: 0 }, color: 0xFAF0E6, imageFile: '/mandala/03.jpg', href: '/painting' },
    { id: 'photo', number: '4', name: '写真', description: '瞬間の永遠、光の記憶', position: { x: -1.05, y: 0, z: 0 }, color: 0xFAF0E6, imageFile: '/mandala/04.jpg', href: '/photo' },
    { id: 'philosophy', number: '5', name: '思想', description: '魂の中心、存在の核', position: { x: 0, y: 0, z: 0 }, color: 0xFAF0E6, imageFile: '/mandala/05.jpg', href: '/idea' },
    { id: 'words', number: '6', name: '言葉', description: '意識の結晶、思考の形', position: { x: 1.05, y: 0, z: 0 }, color: 0xFAF0E6, imageFile: '/mandala/06.jpg', href: '/words' },
    { id: 'monetize', number: '7', name: '販売', description: '価値の創造、豊かさの循環', position: { x: -1.05, y: -1.05, z: 0 }, color: 0xFAF0E6, imageFile: '/mandala/07.jpg', href: '/money' },
    { id: 'game', number: '8', name: 'ゲーム', description: '遊びの哲学、インタラクティブアート', position: { x: 0, y: -1.05, z: 0 }, color: 0xFAF0E6, imageFile: '/mandala/08.jpg', href: '/game' },
    { id: 'links', number: '9', name: 'リンク集', description: '繋がりの網、共鳴の場', position: { x: 1.05, y: -1.05, z: 0 }, color: 0xFAF0E6, imageFile: '/mandala/09.jpg', href: '/links' }
];

// Initialize Three.js
async function init() {
    console.log('Initializing 3D scene...');
    console.log('Three.js version:', typeof THREE !== 'undefined' ? THREE.REVISION : 'NOT LOADED');

    // Update loading text for debugging
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        loadingText.textContent = 'Initializing...';
    }
    
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded!');
        if (loadingText) {
            loadingText.textContent = 'Error: Three.js not loaded';
        }
        setTimeout(() => {
            hideLoadingScreen();
        }, 2000);
        return;
    }
    
    // Test texture loading capability
    const testLoader = new THREE.TextureLoader();
    console.log('TextureLoader available:', testLoader !== undefined);

    transitionOverlay = document.getElementById('transition-overlay');

    try {
        // Scene setup
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xAA8F23, 5, 20);
    
        // Camera setup
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 4.75);
        camera.lookAt(0, 0, 0);
        
        // Renderer setup
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
        renderer.shadowMap.autoUpdate = true;
        renderer.shadowMap.needsUpdate = true;
        
        // Add renderer to DOM
        const container = document.getElementById('canvas-container');
        container.appendChild(renderer.domElement);
        
        // Raycaster for mouse interaction
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        
        // Lights setup
        setupLights();
        
        // Wait for web fonts to load before rendering canvas text to avoid fallbacks
        if (document.fonts && document.fonts.ready) {
            try {
                await document.fonts.ready;
                await Promise.race([
                    document.fonts.load('700 48px "Noto Serif JP"'),
                    new Promise((resolve) => setTimeout(resolve, 2500))
                ]);
            } catch (fontError) {
                console.warn('Font loading check failed:', fontError);
            }
        }

        // Create sections
        createSections();

        // Add particles for atmosphere
        createParticles();

        // Event listeners
        setupEventListeners();

        // Re-render labels once fonts are confirmed
        scheduleLabelRefresh();

        // Update loading text before hiding
        if (loadingText) {
            loadingText.textContent = 'Ready!';
        }
        
        // Cache transition overlay and reveal page
        transitionOverlay = document.getElementById('transition-overlay');

        // Hide loading screen
        hideLoadingScreen();

        if (transitionOverlay) {
            setTimeout(() => {
                transitionOverlay.classList.remove('active');
            }, 250);
        }
        
        // Start animation loop
        animate();
        
        console.log('3D scene initialized successfully!');
    } catch (error) {
        console.error('Error initializing 3D scene:', error);
        // Update loading text with error
        if (loadingText) {
            loadingText.textContent = 'Error: ' + error.message;
        }
        // Fallback: hide loading screen even on error after a delay
        setTimeout(() => {
            hideLoadingScreen();
        }, 2000);

        if (transitionOverlay) {
            setTimeout(() => {
                transitionOverlay.classList.remove('active');
            }, 300);
        }
    }
}

// Setup lighting - Vincent Gallo style minimal lighting
function setupLights() {
    // Ambient light - soft and bright
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7);
    scene.add(ambientLight);
    
    // Main directional light with soft shadows
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    directionalLight.position.set(5, 8, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4096; // Higher resolution for softer shadows
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);
    
    // Subtle spotlight on center with soft shadows
    const spotLight = new THREE.SpotLight(0xDC143C, 0.3);
    spotLight.position.set(0, 5, 5);
    spotLight.target.position.set(0, 0, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.8;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    scene.add(spotLight);
    scene.add(spotLight.target);
}

// Create 3D sections with text labels - Single Plate Design
function createSections() {
    // Create group for entire grid
    const gridGroup = new THREE.Group();
    const isMobileView = window.innerWidth <= 768;
    
    // Create base plate for unified look - Cherry Red frame
    const plateGeometry = new THREE.BoxGeometry(3.3, 3.3, 0.1);
    const plateMaterial = new THREE.MeshLambertMaterial({
        color: 0xDC143C, // Cherry red
        emissive: 0xDC143C,
        emissiveIntensity: 0.02
    });
    const basePlate = new THREE.Mesh(plateGeometry, plateMaterial);
    basePlate.position.z = -0.1;
    basePlate.castShadow = true;
    basePlate.receiveShadow = true;
    gridGroup.add(basePlate);
    
    // Simple blur effect shadow beneath the menu
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Create visible radial gradient for shadow - dark chocolate color
    const gradient = ctx.createRadialGradient(256, 256, 40, 256, 256, 215);
    gradient.addColorStop(0, 'rgba(75, 45, 30, 0.65)'); // Weightier center tone
    gradient.addColorStop(0.48, 'rgba(75, 45, 30, 0.32)');
    gradient.addColorStop(0.75, 'rgba(75, 45, 30, 0.12)'); // Controlled falloff
    gradient.addColorStop(1, 'rgba(75, 45, 30, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
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
    shadowPlane.position.y = -2.5; // Much lower, beneath the menu
    scene.add(shadowPlane);
    
    sectionData.forEach((data, index) => {
        // Create geometry for keypad button
        const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.08);
        
        // Create material with white/light beige color
        const material = new THREE.MeshLambertMaterial({
            color: 0xFAF0E6, // Light beige/white color for all buttons
            emissive: data.id === 'philosophy' ? 0xDC143C : 0x000000,
            emissiveIntensity: data.id === 'philosophy' ? 0.05 : 0.01
        });
        
        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);
        
        // Debug log to confirm we're attempting to load
        console.log(`Attempting to load texture for button ${data.number}: ${data.imageFile}`);
        
        // Load and apply texture
        if (data.imageFile) {
            const textureLoader = new THREE.TextureLoader();
            
            // Load texture and apply with 20% opacity
            textureLoader.load(
                data.imageFile,
                // Success callback
                (texture) => {
                    console.log(`✓ Texture loaded successfully for button ${data.number}`);
                    
                    // Create a plane mesh for the texture overlay
                    const overlayGeometry = new THREE.PlaneGeometry(0.94, 0.94);
                    const overlayMaterial = new THREE.MeshBasicMaterial({
                        map: texture,
                        transparent: true,
                        opacity: 0.4, // Balanced texture visibility
                        side: THREE.FrontSide
                    });
                    const overlayMesh = new THREE.Mesh(overlayGeometry, overlayMaterial);
                    overlayMesh.position.z = 0.041; // Slightly in front of button
                    mesh.add(overlayMesh);
                    
                    // Force a render update
                    if (renderer) {
                        renderer.render(scene, camera);
                    }
                },
                // Progress callback
                undefined,
                // Error callback
                (error) => {
                    console.error(`✗ Failed to load texture for button ${data.number}:`, error);
                    // Keep white color on error
                }
            );
        }
        mesh.position.set(data.position.x, data.position.y, data.position.z);
        mesh.userData = data;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Add subtle edge geometry for border
        const edges = new THREE.EdgesGeometry(geometry);
        const edgeMaterial = new THREE.LineBasicMaterial({ 
            color: data.id === 'philosophy' ? 0xDC143C : 0x8B8B8B,
            linewidth: 1,
            transparent: true,
            opacity: 0.4
        });
        const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
        mesh.add(edgeLines);
        
        // Create text sprite for number and name
        const textTexture = renderLabelTexture(data.name, isMobileView);
        const spriteMaterial = new THREE.SpriteMaterial({ 
            map: textTexture,
            transparent: true
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        const spriteScale = isMobileView ? 1.08 : 0.92;
        sprite.scale.set(spriteScale, spriteScale, 1);
        sprite.position.z = 0.05; // In front of button and texture
        mesh.add(sprite);
        labelSprites.push({ sprite, label: data.name, isMobileView });
        
        // Special treatment for center "Philosophy" section
        if (data.id === 'philosophy') {
            mesh.scale.set(1.05, 1.05, 1.2);
            material.emissiveIntensity = 0.05;
            
            // Add pulsing animation
            mesh.userData.pulse = true;
            mesh.userData.pulseTime = 0;
        }
        
        // Store reference
        sections.push(mesh);
        gridGroup.add(mesh);
    });
    
    // Add entire grid to scene
    scene.add(gridGroup);
    
    // Store grid group for unified floating
    scene.userData.gridGroup = gridGroup;
    gridGroup.userData.baseY = 0.05;
}

// Create particle system for atmosphere (background only)
function createParticles() {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    // Position particles behind the main grid (z < -1)
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 15;
        positions[i + 1] = (Math.random() - 0.5) * 15;
        positions[i + 2] = -2 - Math.random() * 10; // Behind main content
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Create subtle particles - Vincent Gallo minimal style
    const material = new THREE.PointsMaterial({
        color: 0xDC143C, // Cherry red particles
        size: 0.03,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        depthWrite: false
    });
    
    const particles = new THREE.Points(geometry, material);
    particles.renderOrder = -1; // Render behind everything
    scene.add(particles);
    
    // Store for animation
    scene.userData.particles = particles;
}

function renderLabelTexture(text, isMobileView) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');

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
        const texture = renderLabelTexture(label, isMobileView);
        if (sprite.material.map) {
            sprite.material.map.dispose();
        }
        sprite.material.map = texture;
        sprite.material.needsUpdate = true;
        texture.needsUpdate = true;
    });
}

function scheduleLabelRefresh(attempt = 0) {
    const MAX_ATTEMPTS = 4;
    const refresh = () => {
        refreshLabelTextures();
        if (attempt < MAX_ATTEMPTS && document.fonts && !document.fonts.check('700 48px "Noto Serif JP"')) {
            setTimeout(() => scheduleLabelRefresh(attempt + 1), 400);
        }
    };

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready
            .then(refresh)
            .catch(() => {
                if (attempt < MAX_ATTEMPTS) {
                    setTimeout(() => scheduleLabelRefresh(attempt + 1), 400);
                }
            });
    } else if (attempt < MAX_ATTEMPTS) {
        setTimeout(() => {
            refresh();
            if (attempt + 1 <= MAX_ATTEMPTS) {
                scheduleLabelRefresh(attempt + 1);
            }
        }, 500);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mouse move
    window.addEventListener('mousemove', onMouseMove, false);
    
    // Click
    window.addEventListener('click', onClick, false);
    
    // Touch events for mobile
    window.addEventListener('touchstart', onTouchStart, false);
    window.addEventListener('touchmove', onTouchMove, false);
    
    // Window resize
    window.addEventListener('resize', onWindowResize, false);
}

// Mouse move handler
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    targetMouseX = mouse.x;
    targetMouseY = mouse.y;
    
    checkHover();
}

// Touch handlers for mobile
function onTouchStart(event) {
    if (event.touches.length === 1) {
        const touch = event.touches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        
        checkHover();
    }
}

function onTouchMove(event) {
    if (event.touches.length === 1) {
        const touch = event.touches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        
        targetMouseX = mouse.x;
        targetMouseY = mouse.y;
        
        checkHover();
    }
}

// Check hover state
function checkHover() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(sections);
    
    if (intersects.length > 0) {
        const newHovered = intersects[0].object;
        
        if (hoveredSection !== newHovered) {
            // Reset previous hover
            if (hoveredSection) {
                animateHoverOut(hoveredSection);
            }
            
            // Apply new hover
            hoveredSection = newHovered;
            animateHoverIn(hoveredSection);
        }
    } else {
        if (hoveredSection) {
            animateHoverOut(hoveredSection);
            hoveredSection = null;
        }
    }
}

// Hover animations
function animateHoverIn(mesh) {
    gsap.to(mesh.position, {
        z: mesh.userData.position.z + 0.15,
        duration: 0.3,
        ease: "power2.out"
    });
    
    const hoverScale = mesh.userData.id === 'philosophy' ? 1.04 : 1.02;
    gsap.to(mesh.scale, {
        x: hoverScale,
        y: hoverScale,
        z: hoverScale,
        duration: 0.3,
        ease: "power2.out"
    });
    
    mesh.material.emissiveIntensity = mesh.userData.id === 'philosophy' ? 0.08 : 0.03;
}

function animateHoverOut(mesh) {
    gsap.to(mesh.position, {
        z: mesh.userData.position.z,
        duration: 0.3,
        ease: "power2.out"
    });
    
    const baseScale = mesh.userData.id === 'philosophy' ? 1.05 : 1;
    gsap.to(mesh.scale, {
        x: baseScale,
        y: baseScale,
        z: baseScale,
        duration: 0.3,
        ease: "power2.out"
    });
    
    mesh.material.emissiveIntensity = mesh.userData.id === 'philosophy' ? 0.05 : 0.01;
}

// Click handler - Prepare for page navigation
function onClick(event) {
    if (hoveredSection) {
        const sectionData = hoveredSection.userData;
        console.log('Clicked section:', sectionData.name);
        console.log('Section ID:', sectionData.id);
        console.log('Target URL:', sectionData.href);

        // Use href directly from the section data
        const targetUrl = sectionData.href;

        if (targetUrl) {
            console.log('Navigating to:', targetUrl);
            startPageTransition(targetUrl);
        } else {
            console.log('No navigation target defined for this section.');
        }
    }
}

// Image viewer functions removed - will navigate to dedicated pages instead

// Window resize handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function startPageTransition(targetUrl) {
    console.log('Starting page transition to:', targetUrl);
    if (transitionOverlay) {
        transitionOverlay.classList.add('active');
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 200);
    } else {
        window.location.href = targetUrl;
    }
}

// Hide loading screen
function hideLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Smooth camera follow mouse
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    
    // Asymmetric limits for all directions to prevent text cutoff
    const maxMovementLeft = 0.12;
    const maxMovementRight = 0.05;
    const maxMovementUp = 0.07;
    const maxMovementDown = 0.055;
    
    // Apply different limits for left/right movement
    const targetX = mouseX * 0.26;
    if (targetX > 0) {
        // Moving right - apply stricter limit
        camera.position.x = Math.min(maxMovementRight, targetX);
    } else {
        // Moving left - slightly less strict
        camera.position.x = Math.max(-maxMovementLeft, targetX);
    }
    
    // Apply different limits for up/down movement
    const targetY = mouseY * 0.26;
    if (targetY > 0) {
        // Moving up - apply stricter limit
        camera.position.y = Math.min(maxMovementUp, targetY);
    } else {
        // Moving down - also limited to prevent bottom cutoff
        camera.position.y = Math.max(-maxMovementDown, targetY);
    }
    
    camera.lookAt(0, 0, 0);
    
    // Unified grid floating animation
    if (scene.userData.gridGroup) {
        const floatTime = Date.now() * 0.0008;
        const baseY = scene.userData.gridGroup.userData.baseY || 0;
        scene.userData.gridGroup.position.y = baseY + Math.sin(floatTime) * 0.05;
        scene.userData.gridGroup.rotation.y = Math.sin(floatTime * 0.5) * 0.02;
    }
    
    // Animate background particles slowly
    if (scene.userData.particles) {
        scene.userData.particles.rotation.y += 0.0002;
        scene.userData.particles.rotation.x += 0.0001;
    }
    
    // Individual section effects
    sections.forEach((section, index) => {
        // Special pulsing for philosophy section
        if (section.userData.pulse) {
            section.userData.pulseTime += 0.02;
            const baseScale = hoveredSection === section ? 1.15 : 1.05;
            const pulseScale = baseScale + Math.sin(section.userData.pulseTime) * 0.03;
            section.scale.set(pulseScale, pulseScale, pulseScale * 1.14);
        }
    });
    
    renderer.render(scene, camera);
}

// Initialize when DOM is ready
console.log('Document ready state:', document.readyState);
console.log('Script loaded, waiting for initialization...');

if (document.readyState === 'loading') {
    console.log('Waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded fired, initializing...');
        init();
    });
} else {
    console.log('DOM already loaded, initializing immediately...');
    // Small delay to ensure libraries are fully loaded
    setTimeout(init, 100);
}
