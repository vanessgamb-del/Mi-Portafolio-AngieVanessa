/* ==============================================
   portafolio.js — Angie Vanessa Gamboa Rivas
   Efectos 3D: Three.js + Card Tilt + Cursor
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
    console.log("✨ Portafolio 3D de Angie Vanessa cargado.");

    initBackground3D();
    initFooterParticles();
    initCursor();
    initNavbar();
    initNavLinks();
    initCardTilt();
    initCardShine();
    initScrollReveal();
    initProfileTilt();
    initSkillsParallax();
});


/* ============================================================
   1. FONDO 3D — PARTÍCULAS FLOTANTES CON THREE.JS
   ============================================================ */
function initBackground3D() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('bg-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // ---- Partículas flotantes ----
    const COUNT = 180;
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        sizes[i] = Math.random() * 3 + 1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
        color: 0xE8C84A,
        size: 0.04,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // ---- Líneas de conexión (grid suave) ----
    const lineMat = new THREE.LineBasicMaterial({
        color: 0xE8C84A,
        transparent: true,
        opacity: 0.04,
    });

    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    const gridCount = 8;
    const spacing = 3.5;

    for (let i = -gridCount; i <= gridCount; i++) {
        linePositions.push(i * spacing * 0.5, -gridCount * spacing * 0.5, -2);
        linePositions.push(i * spacing * 0.5,  gridCount * spacing * 0.5, -2);
        linePositions.push(-gridCount * spacing * 0.5, i * spacing * 0.5, -2);
        linePositions.push( gridCount * spacing * 0.5, i * spacing * 0.5, -2);
    }

    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const grid = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(grid);

    // ---- Mouse parallax ----
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // ---- Resize ----
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ---- Loop ----
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Rotación suave de partículas
        particles.rotation.y = elapsed * 0.04;
        particles.rotation.x = elapsed * 0.015;

        // Grid sutil
        grid.rotation.z = elapsed * 0.005;

        // Parallax suave
        targetX += (mouseX * 0.3 - targetX) * 0.05;
        targetY += (-mouseY * 0.2 - targetY) * 0.05;
        camera.position.x = targetX;
        camera.position.y = targetY;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();
}


/* ============================================================
   1B. FONDO 3D EN EL FOOTER — mismas partículas que el header
   ============================================================ */
function initFooterParticles() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('footer-canvas');
    if (!canvas) return;

    const footer = canvas.parentElement;

    // Ajustar tamaño del canvas al footer
    function resizeCanvas() {
        canvas.width  = footer.offsetWidth;
        canvas.height = footer.offsetHeight;
        renderer.setSize(footer.offsetWidth, footer.offsetHeight);
        camera.aspect = footer.offsetWidth / footer.offsetHeight;
        camera.updateProjectionMatrix();
    }

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 5;

    // ---- Partículas ----
    const COUNT = 180;
    const positions = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        sizes[i] = Math.random() * 3 + 1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
        color: 0xE8C84A,
        size: 0.04,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // ---- Grid suave ----
    const lineMat = new THREE.LineBasicMaterial({
        color: 0xE8C84A,
        transparent: true,
        opacity: 0.04,
    });

    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    const gridCount = 8;
    const spacing = 3.5;

    for (let i = -gridCount; i <= gridCount; i++) {
        linePositions.push(i * spacing * 0.5, -gridCount * spacing * 0.5, -2);
        linePositions.push(i * spacing * 0.5,  gridCount * spacing * 0.5, -2);
        linePositions.push(-gridCount * spacing * 0.5, i * spacing * 0.5, -2);
        linePositions.push( gridCount * spacing * 0.5, i * spacing * 0.5, -2);
    }

    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const grid = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(grid);

    // Tamaño inicial
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ---- Parallax de mouse relativo al footer ----
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
        const rect = footer.getBoundingClientRect();
        // Cuando el mouse está sobre el footer usamos su posición relativa;
        // fuera del footer mantenemos el último valor conocido.
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
            mouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
            mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
        }
    });

    // ---- Loop de animación ----
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        particles.rotation.y = elapsed * 0.04;
        particles.rotation.x = elapsed * 0.015;
        grid.rotation.z      = elapsed * 0.005;

        targetX += (mouseX * 0.3 - targetX) * 0.05;
        targetY += (-mouseY * 0.2 - targetY) * 0.05;
        camera.position.x = targetX;
        camera.position.y = targetY;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();
}



///////////////////////////////s
function initCursor() {
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        dotX  = e.clientX;
        dotY  = e.clientY;
    });

    function animateCursor() {
        ringX += (dotX - ringX) * 0.12;
        ringY += (dotY - ringY) * 0.12;

        dot.style.left  = dotX  + 'px';
        dot.style.top   = dotY  + 'px';
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Escalar al pasar sobre links
    const interactibles = document.querySelectorAll('a, button, .project-card, .skill-badge, .footer-btn');
    interactibles.forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.style.transform  = 'translate(-50%,-50%) scale(0)';
            ring.style.width     = '55px';
            ring.style.height    = '55px';
            ring.style.borderColor = 'var(--gold)';
        });
        el.addEventListener('mouseleave', () => {
            dot.style.transform  = 'translate(-50%,-50%) scale(1)';
            ring.style.width     = '36px';
            ring.style.height    = '36px';
            ring.style.borderColor = 'rgba(232,200,74,0.5)';
        });
    });
}


/* ============================================================
   3. NAVBAR SCROLL
   ============================================================ */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}


/* ============================================================
   4. NAVEGACIÓN — CERRAR MENÚ MÓVIL
   ============================================================ */
function initNavLinks() {
    const navLinks   = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    if (!menuToggle) return;

    const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                bsCollapse.hide();
            }
        });
    });

    // Scroll suave por JS (refuerzo)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}


/* ============================================================
   5. TILT 3D EN TARJETAS DE PROYECTO
   ============================================================ */
function initCardTilt() {
    const cards = document.querySelectorAll('.project-card[data-tilt]');

    cards.forEach(card => {
        const MAX_TILT = 15;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cx   = rect.left + rect.width  / 2;
            const cy   = rect.top  + rect.height / 2;
            const dx   = (e.clientX - cx) / (rect.width  / 2);
            const dy   = (e.clientY - cy) / (rect.height / 2);

            const rotY =  dx * MAX_TILT;
            const rotX = -dy * MAX_TILT;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotX}deg)
                rotateY(${rotY}deg)
                scale3d(1.03, 1.03, 1.03)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                scale3d(1, 1, 1)
            `;
        });
    });
}


/* ============================================================
   6. EFECTO SHINE (BRILLO QUE SIGUE EL RATÓN EN LAS CARDS)
   ============================================================ */
function initCardShine() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width)  * 100;
            const y = ((e.clientY - rect.top)  / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });
}


/* ============================================================
   7. SCROLL REVEAL — APARICIÓN CON SCROLL
   ============================================================ */
function initScrollReveal() {
    // Marcar elementos para revelar
    const targets = [
        '.project-card',
        '.about-text',
        '.skills-box-inner',
        '.section-title',
        '.section-sub',
        '.footer-title',
        '.footer-email',
        '.footer-links',
    ];

    targets.forEach((sel, si) => {
        document.querySelectorAll(sel).forEach((el, i) => {
            el.classList.add('reveal');
            if (i === 1) el.classList.add('reveal-delay-1');
            if (i === 2) el.classList.add('reveal-delay-2');
            if (i === 3) el.classList.add('reveal-delay-3');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


/* ============================================================
   8. PERFIL — TILT 3D AL MOVER EL RATÓN
   ============================================================ */
function initProfileTilt() {
    const wrapper = document.getElementById('profile3d');
    if (!wrapper) return;

    document.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth  / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;

        wrapper.style.transform = `
            rotateY(${dx * 10}deg)
            rotateX(${-dy * 8}deg)
        `;
    });

    document.addEventListener('mouseleave', () => {
        wrapper.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
}


/* ============================================================
   9. SKILLS BOX — PARALLAX SUAVE AL SCROLL
   ============================================================ */
function initSkillsParallax() {
    const box = document.querySelector('.skills-box-inner');
    if (!box) return;

    window.addEventListener('scroll', () => {
        const rect = box.getBoundingClientRect();
        const viewH = window.innerHeight;
        if (rect.top > viewH || rect.bottom < 0) return;

        const progress = 1 - (rect.top / viewH);
        const tilt = (progress - 0.5) * 10;
        box.style.transform = `rotateX(${tilt}deg) translateZ(0)`;
    });
}