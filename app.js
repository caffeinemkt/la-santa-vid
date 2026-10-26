/* ==========================================================================
   LA SANTA VID — RESERVA RESIDENCIAL & VIÑEDOS (SAN MIGUEL DE ALLENDE)
   Interactive Experience Engine (Scroll Choreography, Masterplan Live CSV,
   Artigas Residences Gallery, Enology Sommelier, Fractional Calculator & Cinema)
   ========================================================================== */

(function () {
  'use strict';

  const WA_NUMBER = '525535352057';
  const SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_wZa2URG3x0tuqxQNqCt_yicEqmWzo0cSgHHQYazUZkusgoyv9SATVmpY4H1bDUVxH4WVgmnZHAoD/pub?output=csv';

  /* ==========================================================================
     1. PRELOADER & INITIALIZATION
     ========================================================================== */
  window.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initHeaderAndScrollProgress();
    initRevealAnimations();
    initCounters();
    initHeroSceneSwitcher();
    initFullnessPillars();
    initWineSommelier();
    initResidencesShowcase();
    initInvestmentCalculator();
    initMasterplanInteractive();
    initCinemaHub();
    initConciergeForm();
    initLanguageToggle();
  });

  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const bar = document.getElementById('preloader-bar');
    const pct = document.getElementById('preloader-pct');
    if (!preloader) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 18) + 9;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('loaded');
        }, 280);
      }
      if (bar) bar.style.width = progress + '%';
      if (pct) pct.textContent = String(progress).padStart(2, '0') + '%';
    }, 85);
  }

  /* ==========================================================================
     2. CUSTOM MAGNETIC ENOLOGICAL CURSOR
     ========================================================================== */
  function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const label = document.getElementById('cursor-label');
    if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    }, { passive: true });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        document.body.classList.add('cursor-hover');
        if (label) label.textContent = target.getAttribute('data-cursor') || 'EXPLORAR';
      } else {
        document.body.classList.remove('cursor-hover');
      }
    });
  }

  /* ==========================================================================
     3. HEADER, SCROLL PROGRESS & PARALLAX
     ========================================================================== */
  function initHeaderAndScrollProgress() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const header = document.getElementById('main-header');
    const heroVideo = document.getElementById('hero-video');

    if (heroVideo) {
      heroVideo.addEventListener('playing', () => heroVideo.classList.add('is-playing'));
      heroVideo.play().catch(() => {});
    }

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressBar) progressBar.style.width = pct + '%';

      if (header) {
        if (scrollTop > 60) {
          header.classList.add('shadow-2xl', 'bg-surface/95');
        } else {
          header.classList.remove('shadow-2xl', 'bg-surface/95');
        }
      }

      // Subtle parallax on elements with data-parallax
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax') || '0.08');
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = (window.innerHeight / 2 - rect.top) * speed;
          el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        }
      });
    }, { passive: true });
  }

  /* ==========================================================================
     4. SCROLL REVEAL & METRIC COUNTERS
     ========================================================================== */
  function initRevealAnimations() {
    const els = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-clip');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach((el) => observer.observe(el));
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 1800;
        const startTime = performance.now();

        function tick(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = Math.round(target * eased);
          el.textContent = prefix + current.toLocaleString('en-US') + suffix;
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = prefix + target.toLocaleString('en-US') + suffix;
          }
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.35 });

    counters.forEach((c) => observer.observe(c));
  }

  /* ==========================================================================
     5. HERO IMMERSIVE SCENE SWITCHER
     ========================================================================== */
  const HERO_SCENES = [
    {
      type: 'video',
      src: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/6acfc23a1ea74c571f3e88e9.mp4',
      poster: 'assets/promo-invierte-en-tu-legado.jpg',
      badge: 'Escena 01 • Reserva Enológica & Viñedos',
      caption: '105 Hectáreas de vides productivas a 9.5 km del corazón de San Miguel de Allende'
    },
    {
      type: 'video',
      src: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69b1f92e8d3eae64b62ac216.mp4',
      poster: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69b1f9828cb2597a554d361c.jpg',
      badge: 'Escena 02 • Club Ecuestre & Vida de Campo',
      caption: '100 caballerizas, Polo Arena, senderos ecuestres y el primer Cable Ski RIXEN del Bajío'
    },
    {
      type: 'image',
      src: 'assets/promo-invierte-en-tu-legado.jpg',
      badge: 'Escena 03 • Residencias de Autor Artigas',
      caption: 'Haciendas contemporáneas con alberca infinity privada y 120 botellas anuales incluidas'
    }
  ];

  function initHeroSceneSwitcher() {
    const btns = document.querySelectorAll('.hero-scene-btn');
    const videoEl = document.getElementById('hero-video');
    const imgEl = document.getElementById('hero-fallback-img');
    const captionEl = document.getElementById('hero-scene-caption');

    btns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const scene = HERO_SCENES[idx];
        if (!scene) return;

        btns.forEach((b, i) => {
          b.classList.toggle('bg-gold-burnished', i === idx);
          b.classList.toggle('text-cabernet-deep', i === idx);
          b.classList.toggle('bg-white/10', i !== idx);
          b.classList.toggle('text-cantera-sand', i !== idx);
        });

        if (captionEl) captionEl.textContent = scene.caption;

        if (scene.type === 'video' && videoEl) {
          videoEl.style.opacity = '0';
          setTimeout(() => {
            videoEl.src = scene.src;
            videoEl.poster = scene.poster;
            videoEl.style.display = 'block';
            videoEl.play().catch(() => {});
            videoEl.style.opacity = '0.52';
          }, 250);
        } else if (videoEl && imgEl) {
          videoEl.pause();
          videoEl.style.opacity = '0';
          imgEl.src = scene.src;
          imgEl.style.opacity = '0.52';
        }
      });
    });
  }

  /* ==========================================================================
     6. FULLNESS INTERACTIVE PILLARS (BENTO + VISUAL PREVIEW)
     ========================================================================== */
  const FULLNESS_DATA = [
    {
      num: 'Pilar 01',
      title: 'Sustentabilidad Regenerativa',
      subtitle: '80% Reserva Verde & Ciclo Hídrico Cerrado',
      desc: 'El 80% de las 105 hectáreas de La Santa Vid permanece como reserva ecológica, viñedos y espejos de agua. Incorporamos captación pluvial inteligente, energía solar pasiva, tratamiento biológico del agua y arquitectura bioclimática bajo principios ESG.',
      metrics: ['80% Áreas Verdes y Lagos', 'Ciclo Hídrico 100% Regenerativo', 'Energía Limpia & Criterios ESG'],
      image: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/6a39962294d484b9c6b6551d.jpeg'
    },
    {
      num: 'Pilar 02',
      title: 'Bienestar Holístico',
      subtitle: 'Santuario a 1,910 Metros de Altitud',
      desc: 'Un microclima privilegiado con 330 días de sol y 22°C promedio anual. Despierta entre senderos de contemplación, pabellones de meditación y yoga, spa de bienestar integral y "La Santa Tierra", nuestra granja orgánica de agricultura regenerativa.',
      metrics: ['330 Días de Sol al Año', 'Granja Orgánica La Santa Tierra', 'Wellness Center & Spa Holístico'],
      image: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/6aad940430b0f957cc775c86.jpeg'
    },
    {
      num: 'Pilar 03',
      title: 'Estilo de Vida Extraordinario',
      subtitle: 'Más de 30 Experiencias Sin Salir de Casa',
      desc: 'Desde catas privadas en barrica en nuestro Centro Vinícola de 6,000 m², hasta wakeboard en el primer Cable Ski RIXEN del Bajío, cabalgatas al atardecer en el Club Ecuestre, torneos de pádel y alta gastronomía de campo a mesa.',
      metrics: ['6,000 m² Centro Enológico', '1er Cable Ski RIXEN del Bajío', 'Club Ecuestre con 100 Caballerizas'],
      image: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69b1f9828cb2597a554d361c.jpg'
    },
    {
      num: 'Pilar 04',
      title: 'Propósito & Legado Fullness',
      subtitle: 'Trascendencia Familiar y Patrimonial',
      desc: 'Fullness es el equilibrio armónico entre cuerpo, mente, comunidad y patrimonio. No adquieres únicamente tierra o arquitectura de autor; fundas el refugio generacional donde tu familia celebra cada vendimia con su propia etiqueta de vino.',
      metrics: ['120 Botellas Anuales de por Vida', 'Comunidad Privada en 9 Reservas', 'Alta Plusvalía en San Miguel de Allende'],
      image: 'assets/promo-tu-vida-entre-vinedos.jpg'
    }
  ];

  function initFullnessPillars() {
    const cards = document.querySelectorAll('.fullness-pillar-card');
    const previewImg = document.getElementById('fullness-preview-img');
    const previewNum = document.getElementById('fullness-preview-num');
    const previewTitle = document.getElementById('fullness-preview-title');
    const previewSub = document.getElementById('fullness-preview-sub');
    const previewDesc = document.getElementById('fullness-preview-desc');
    const previewMetrics = document.getElementById('fullness-preview-metrics');

    function activatePillar(idx) {
      const p = FULLNESS_DATA[idx];
      if (!p) return;

      cards.forEach((c, i) => {
        c.classList.toggle('bg-cabernet-deep', i === idx);
        c.classList.toggle('text-cantera-sand', i === idx);
        c.classList.toggle('border-gold-burnished', i === idx);
        c.classList.toggle('bg-surface-container-low', i !== idx);
        c.classList.toggle('text-on-surface', i !== idx);
      });

      if (previewImg) {
        previewImg.style.opacity = '0.3';
        setTimeout(() => {
          previewImg.src = p.image;
          previewImg.style.opacity = '1';
        }, 180);
      }
      if (previewNum) previewNum.textContent = p.num;
      if (previewTitle) previewTitle.textContent = p.title;
      if (previewSub) previewSub.textContent = p.subtitle;
      if (previewDesc) previewDesc.textContent = p.desc;
      if (previewMetrics) {
        previewMetrics.innerHTML = p.metrics.map((m) => `
          <div class="flex items-center gap-2.5 text-xs font-label-md uppercase tracking-wider text-gold-light">
            <span class="w-1.5 h-1.5 rounded-circle-exception bg-gold-light"></span>
            <span>${m}</span>
          </div>
        `).join('');
      }
    }

    cards.forEach((card, idx) => {
      card.addEventListener('click', () => activatePillar(idx));
      card.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024) activatePillar(idx);
      });
    });
  }

  /* ==========================================================================
     7. VIRTUAL WINE CELLAR & SOMMELIER EXPLORER (9 RESERVAS / VARIETALES)
     ========================================================================== */
  const VARIETALS = [
    {
      name: 'Malbec Gran Reserva',
      reserva: 'Reserva IV • Corazón Enológico',
      award: 'Medalla de Oro Bruselas 2024 & Bacchus de Oro 2026',
      aging: '18 meses en barrica de roble francés de primer uso',
      notes: 'Violáceo profundo. Aromas intensos a ciruela negra madura, violetas imperiales, cacao amargo y tabaco dulce. En boca presenta taninos sedosos, acidez equilibrada de terroir de altura (1,910 msnm) y un final persistente y mineral.',
      pairing: 'Cortes madurados a la leña, cordero al romero, mole negro artesanal y quesos de oveja añejos.',
      temp: '16°C – 18°C',
      bottles: '120 botellas anuales con etiqueta personalizada de propietario',
      image: 'assets/promo-tu-vida-entre-vinedos.jpg'
    },
    {
      name: 'Cabernet Sauvignon Reserva',
      reserva: 'Reserva II • Mirador del Lago',
      award: 'Selección Privada del Enólogo',
      aging: '14 meses en barrica de roble francés y americano',
      notes: 'Rojo rubí intenso con destellos granates. Notas elegantes de casis, frutos del bosque, pimienta negra, cedro y vainilla tostada. Estructura imponente con gran potencial de guarda por más de 10 años.',
      pairing: 'Ribeye añejado en seco, asado de tira braseado, estofados de caza y chocolates al 80% cacao.',
      temp: '17°C – 18°C',
      bottles: '120 botellas anuales con etiqueta personalizada de propietario',
      image: 'assets/promo-coleccion-privada.jpg'
    },
    {
      name: 'Syrah & Tempranillo Ensamble',
      reserva: 'Reservas VII & IX • Valle de los Picachos',
      award: 'Cosecha de Altura "La Santa Cosecha"',
      aging: '12 meses en barrica de roble francés',
      notes: 'Expresión frutal vibrante de zarzamora, higo fresco y especias del semidesierto guanajuatense, con un toque ahumado sutil y floral. Equilibrio magistral entre la potencia del Syrah y la nobleza ibérica del Tempranillo.',
      pairing: 'Lechón confitado, paella campestre a la leña, tapas de jamón ibérico de bellota y pato.',
      temp: '16°C',
      bottles: '120 botellas anuales con etiqueta personalizada de propietario',
      image: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/6a469dff6f5641e105e7a295.jpg'
    },
    {
      name: 'Chardonnay & Sauvignon Blanc',
      reserva: 'Reservas III & VI • Brisa del Lago',
      award: 'Edición Frescura de Terroir',
      aging: '6 meses sobre lías finas en roble francés sin tostar',
      notes: 'Dorado pálido brillante. Explosión aromática de durazno blanco, flor de azahar, cítricos confitados y mantequilla avellanada. Frescura eléctrica gracias a la amplitud térmica nocturna de San Miguel de Allende.',
      pairing: 'Robalo a la sal, tiradito de callo de hacha, risottos trufados y quesos de cabra artesanales de la región.',
      temp: '9°C – 11°C',
      bottles: '120 botellas anuales con etiqueta personalizada de propietario',
      image: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/6acfd5ebebf7eb1c9ed5e7f7.png'
    }
  ];

  function initWineSommelier() {
    const tabs = document.querySelectorAll('.wine-varietal-tab');
    const nameEl = document.getElementById('wine-name');
    const resEl = document.getElementById('wine-reserva');
    const awardEl = document.getElementById('wine-award');
    const agingEl = document.getElementById('wine-aging');
    const notesEl = document.getElementById('wine-notes');
    const pairingEl = document.getElementById('wine-pairing');
    const tempEl = document.getElementById('wine-temp');
    const imgEl = document.getElementById('wine-preview-img');

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        const v = VARIETALS[idx];
        if (!v) return;

        tabs.forEach((t, i) => {
          t.classList.toggle('bg-gold-burnished', i === idx);
          t.classList.toggle('text-cabernet-deep', i === idx);
          t.classList.toggle('border-gold-light', i === idx);
          t.classList.toggle('bg-white/5', i !== idx);
          t.classList.toggle('text-cantera-sand', i !== idx);
        });

        if (nameEl) nameEl.textContent = v.name;
        if (resEl) resEl.textContent = v.reserva;
        if (awardEl) awardEl.textContent = v.award;
        if (agingEl) agingEl.textContent = v.aging;
        if (notesEl) notesEl.textContent = v.notes;
        if (pairingEl) pairingEl.textContent = v.pairing;
        if (tempEl) tempEl.textContent = v.temp;
        if (imgEl) {
          imgEl.style.opacity = '0.25';
          setTimeout(() => {
            imgEl.src = v.image;
            imgEl.style.opacity = '1';
          }, 180);
        }
      });
    });
  }

  /* ==========================================================================
     8. ARQUITECTURA DE AUTOR (ARTIGAS ARQUITECTOS — 8 MODELOS & LIGHTBOX)
     ========================================================================== */
  const RESIDENCES = [
    {
      id: 'plenitud',
      category: 'fractional',
      badge: 'Insignia • Fractional 1/8 o Propiedad Total',
      vinedo: 'Reserva IV • Malbec',
      name: 'Casa Plenitud',
      architect: 'Artigas Arquitectos',
      m2Const: '540 m²',
      m2Lot: '1,008 m²',
      beds: '5 Recámaras',
      baths: '6.5 Baños',
      levels: '2 Plantas + Sótano / Cava',
      priceLabel: '$3,500,000 MXN (Fracción 1/8) • Valor Total $28.0 MDP',
      priceShort: '$28.0 MDP | 1/8: $3.5 MDP',
      desc: 'Residencia monumental frente a los viñedos de la Reserva IV Malbec con vista franca a la Sierra de los Picachos. Se entrega 100% amueblada y equipada: alberca infinity climatizada, jacuzzi exterior, bar en roof garden, cava en sótano y terraza bioclimática.',
      tags: ['Alberca Infinity', 'Roof Garden Bar', 'Jacuzzi Exterior', 'Cava en Sótano', 'Amueblada Llave en Mano', '60 a 120 Botellas/Año'],
      photos: [
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2be8df38374b602f743aa.jpg', caption: 'Fachada Principal en Cantera & Madera' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2be8d284ace97d57e5ac2.jpg', caption: 'Fachada Posterior frente a Viñedos Malbec' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2be8d81b3742a44ac7588.jpg', caption: 'Alberca Privada & Deck de Asoleadero' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2be8d25d182f57661f8e9.jpg', caption: 'Estancia Principal con Viguería Expuesta' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2be8d284ace04607e5abc.jpg', caption: 'Comedor de Autor para 12 Comensales' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2be8dad1400ffbd485708.jpg', caption: 'Cocina Gourmet con Isla en Piedra Natural' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2be8d81b3743ea8ac7589.jpg', caption: 'Master Suite con Terraza a las Vides' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2be8d9728a178aabb26b2.jpg', caption: 'Jacuzzi & Lounge de Contemplación' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2be8d25d1820bf761f8ea.jpg', caption: 'Bar Panorámico en Roof Garden' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2be8d427f6e753d796a47.jpg', caption: 'Arquitectura Interior & Doble Altura' }
      ]
    },
    {
      id: 'inspiracion',
      category: 'fractional',
      badge: 'Fractional 1/8 • Entrega Equipada',
      vinedo: 'Reserva IV • Malbec',
      name: 'Casa Inspiración',
      architect: 'Artigas Arquitectos',
      m2Const: '460 m²',
      m2Lot: '1,008 m²',
      beds: '4 Recámaras',
      baths: '5.5 Baños',
      levels: '2 Plantas + Sótano / Cava',
      priceLabel: '$2,950,000 MXN (Fracción 1/8) • Valor Total $23.6 MDP',
      priceShort: '$23.6 MDP | 1/8: $2.95 MDP',
      desc: 'Diseñada por Artigas Arquitectos para fusionar el encanto colonial de San Miguel con la calidez moderna. Cuenta con pórticos en cantera, terraza gourmet con bar integrado, alberca frente al viñedo y operación integral de concierge.',
      tags: ['4 Suites Completas', 'Terraza & Bar', 'Alberca frente a Vides', 'Sótano Cava', 'Membresía Fullness Incluida'],
      photos: [
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2b93275ee0518cd662346.jpg', caption: 'Fachada Principal Casa Inspiración' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2b93281b374f6f2ab1edb.jpg', caption: 'Fachada Trasera & Jardín Enológico' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2b932284ace62ce7cf605.jpg', caption: 'Alberca Privada & Espejo de Agua' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2b932284ace01bc7cf609.jpg', caption: 'Sala Principal con Chimenea' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2b932a002fd70b712a045.jpg', caption: 'Comedor Integrado a Terraza' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2b9320e1cde1fc262b3b6.jpg', caption: 'Cava & Bar Privado' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2b932427f6e801d77ff15.jpg', caption: 'Terraza Techada con Pérgola' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2b932ad1400586f46f788.jpg', caption: 'Recámara Principal con Vistas al Viñedo' }
      ]
    },
    {
      id: 'picachos',
      category: 'autor',
      badge: 'Gran Escala • Llave en Mano',
      vinedo: 'Reservas I – IX • A Elección',
      name: 'Modelo Picachos',
      architect: 'Artigas Arquitectos',
      m2Const: '450.20 m²',
      m2Lot: '1,008 m²',
      beds: '4 – 5 Recámaras',
      baths: '5.5 Baños',
      levels: '2 Niveles',
      priceLabel: '$17,200,000 MXN • Financiamiento hasta 10 años',
      priceShort: '$17.2 MDP',
      desc: 'El prototipo de mayor metraje de la colección Artigas en lote individual. Volumetría imponente inspirada en las haciendas del Bajío con patios centrales, doble altura, terraza panorámica hacia la Sierra de los Picachos y 120 botellas anuales de por vida.',
      tags: ['450.20 m² Construcción', 'Hacienda Contemporánea', 'Patio Central', '120 Botellas/Año', 'Apta Renta Wyndham 80%'],
      photos: [
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69cbfe733b22dd2760e3c407.png', caption: 'Perspectiva Arquitectónica Modelo Picachos (450.20 m²)' },
        { url: 'assets/promo-invierte-en-tu-legado.jpg', caption: 'Entorno de Viñedos y Atardecer en San Miguel' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2be8d25d182f57661f8e9.jpg', caption: 'Acabados Interiores en Cantera, Viguería y Madera' }
      ]
    },
    {
      id: 'vergel',
      category: 'autor',
      badge: 'Arquitectura Bioclimática',
      vinedo: 'Reservas I – IX • A Elección',
      name: 'Modelo Vergel',
      architect: 'Artigas Arquitectos',
      m2Const: '420.17 m²',
      m2Lot: '1,008 m²',
      beds: '4 Recámaras',
      baths: '4.5 Baños',
      levels: '2 Niveles',
      priceLabel: '$16,500,000 MXN • Financiamiento hasta 10 años',
      priceShort: '$16.5 MDP',
      desc: 'Diseñada alrededor de jardines endémicos y espejos de agua que refrescan naturalmente cada estancia. Sus pórticos de arcos francos conectan el salón social con las hileras de vid.',
      tags: ['420.17 m² Construcción', 'Pórticos Coloniales', 'Jardín Interior', '120 Botellas/Año', 'Financiamiento 10 Años'],
      photos: [
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69cbfe732f47951d052959fb.png', caption: 'Perspectiva Arquitectónica Modelo Vergel (420.17 m²)' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2b932427f6e801d77ff15.jpg', caption: 'Terrazas y Pórticos de Convivencia' }
      ]
    },
    {
      id: 'tapia',
      category: 'autor',
      badge: 'Equilibrio & Diseño',
      vinedo: 'Reservas I – IX • A Elección',
      name: 'Modelo Tapia',
      architect: 'Artigas Arquitectos',
      m2Const: '296.47 m²',
      m2Lot: '1,008 m²',
      beds: '3 – 4 Recámaras',
      baths: '4 Baños',
      levels: '1 – 2 Niveles',
      priceLabel: '$13,600,000 MXN • Financiamiento hasta 10 años',
      priceShort: '$13.6 MDP',
      desc: 'Homenaje a los muros de piedra y tapia pisada tradicionales de Guanajuato. Espacios abiertos inundados de luz natural, terraza con fire pit y más de 700 m² de jardín privado colindante con viñedos.',
      tags: ['296.47 m² Construcción', 'Muros de Cantera', 'Terraza Fire Pit', '120 Botellas/Año'],
      photos: [
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69cbfe735b5b9d1e715aa142.png', caption: 'Perspectiva Arquitectónica Modelo Tapia (296.47 m²)' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2b932284ace01bc7cf609.jpg', caption: 'Interiorismo Cálido y Atemporal' }
      ]
    },
    {
      id: 'renacer',
      category: 'autor',
      badge: 'Casa Muestra • Más Solicitado',
      vinedo: 'Reservas I – IX • A Elección',
      name: 'Modelo Renacer',
      architect: 'Artigas Arquitectos',
      m2Const: '284.00 m²',
      m2Lot: '1,008 m²',
      beds: '3 Recámaras',
      baths: '3.5 Baños',
      levels: '1 – 2 Niveles',
      priceLabel: '$13,300,000 MXN • Financiamiento hasta 10 años',
      priceShort: '$13.3 MDP',
      desc: 'Nuestra emblemática Casa Muestra. Distribución inteligente que privilegia la convivencia familiar, suites con acceso al jardín de olivos y alto retorno en el programa de rentas vacacionales Wyndham®.',
      tags: ['284.00 m² Construcción', 'Casa Muestra Activa', 'Alto Retorno Renta SMA', '120 Botellas/Año'],
      photos: [
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69cbfe73f31aa9a744f146ea.png', caption: 'Perspectiva Arquitectónica Modelo Renacer (284.00 m²)' },
        { url: 'assets/promo-tu-vida-entre-vinedos.jpg', caption: 'Vida entre Viñedos en San Miguel de Allende' }
      ]
    },
    {
      id: 'crianza',
      category: 'autor',
      badge: 'Vivienda de Fin de Semana',
      vinedo: 'Reservas I – IX • A Elección',
      name: 'Modelo Crianza',
      architect: 'Artigas Arquitectos',
      m2Const: '244.54 m²',
      m2Lot: '1,008 m²',
      beds: '3 Recámaras',
      baths: '3.5 Baños',
      levels: '1 Planta',
      priceLabel: '$12,400,000 MXN • Financiamiento hasta 10 años',
      priceShort: '$12.4 MDP',
      desc: 'Refugio campestre de líneas puras, techos altos con vigas de madera y terraza enológica. Ideal como segunda residencia de fin de semana o activo patrimonial en San Miguel de Allende.',
      tags: ['244.54 m² Construcción', 'Planta Arquitectónica Fluida', 'Cava Integrada', '120 Botellas/Año'],
      photos: [
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69cbfe73f8932323a3b26d45.png', caption: 'Perspectiva Arquitectónica Modelo Crianza (244.54 m²)' },
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69c2b932a002fd70b712a045.jpg', caption: 'Estancia y Comedor con Luz Natural' }
      ]
    },
    {
      id: 'chardonnay',
      category: 'autor',
      badge: 'Puerta de Entrada • Renta Vacacional',
      vinedo: 'Reservas I & II • Vocación Wyndham®',
      name: 'Modelo Chardonnay',
      architect: 'Artigas Arquitectos',
      m2Const: '176.00 m²',
      m2Lot: '1,008 m²',
      beds: '2 – 3 Recámaras',
      baths: '2.5 Baños',
      levels: '1 Planta',
      priceLabel: '$9,300,000 MXN • Financiamiento hasta 10 años',
      priceShort: '$9.3 MDP',
      desc: 'El punto de partida ideal en la colección de autor de Artigas Arquitectos. Optimizada para máxima rentabilidad por metro cuadrado en estancias cortas operadas por Esplendor by Wyndham® (80% de ingresos para el propietario).',
      tags: ['176.00 m² Construcción', 'Desde $9.3 MDP', '80% Ingresos Renta Wyndham®', '120 Botellas/Año'],
      photos: [
        { url: 'https://assets.cdn.filesafe.space/ZZleTToDW7ldi8Rlm96v/media/69cbfe73fd3ea281b335c306.png', caption: 'Perspectiva Arquitectónica Modelo Chardonnay (176.00 m²)' },
        { url: 'assets/promo-coleccion-privada.jpg', caption: 'Terraza Privada con Vistas al Viñedo' }
      ]
    }
  ];

  function initResidencesShowcase() {
    const grid = document.getElementById('residences-grid');
    const filterBtns = document.querySelectorAll('.res-filter-btn');
    if (!grid) return;

    function renderGrid(filter) {
      const items = filter === 'all' ? RESIDENCES : RESIDENCES.filter((r) => r.category === filter);
      grid.innerHTML = items.map((r) => `
        <article class="bg-surface-container-low hairline-light flex flex-col justify-between group cellar-shadow transition-all duration-500 hover:-translate-y-1.5" data-cursor="VER DOSSIER">
          <div>
            <div class="relative aspect-[16/10] overflow-hidden bg-slate-charcoal">
              <img src="${r.photos[0].url}" alt="${r.name} — ${r.architect}" class="w-full h-full object-cover arch-card-img" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25"></div>
              <div class="absolute top-3 left-3 bg-cabernet-deep/90 backdrop-blur-md text-gold-light font-label-sm text-[10px] px-3 py-1.5 uppercase tracking-widest hairline-dark">
                ${r.badge}
              </div>
              <div class="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-cantera-sand font-label-sm text-[10px] px-2.5 py-1 uppercase tracking-widest flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-gold-light">photo_library</span>
                <span>${r.photos.length} Fotos</span>
              </div>
              <div class="absolute bottom-3 inset-x-4 flex items-end justify-between gap-2">
                <div>
                  <span class="font-label-sm text-[9px] uppercase tracking-[0.2em] text-gold-light block">${r.vinedo}</span>
                  <h3 class="font-headline-md text-2xl text-cantera-sand font-serif leading-tight">${r.name}</h3>
                </div>
                <span class="bg-gold-burnished text-cabernet-deep font-label-sm text-[11px] font-bold px-3 py-1 uppercase tracking-wider shrink-0">
                  ${r.priceShort}
                </span>
              </div>
            </div>

            <div class="p-6">
              <div class="grid grid-cols-3 gap-2 pb-4 mb-4 border-b border-outline-variant/40 text-center">
                <div>
                  <span class="font-headline-sm text-sm text-primary block">${r.m2Const}</span>
                  <span class="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant">Construcción</span>
                </div>
                <div class="border-x border-outline-variant/40">
                  <span class="font-headline-sm text-sm text-primary block">${r.m2Lot}</span>
                  <span class="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant">Terreno</span>
                </div>
                <div>
                  <span class="font-headline-sm text-sm text-primary block">${r.beds}</span>
                  <span class="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant">${r.baths}</span>
                </div>
              </div>

              <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed line-clamp-3 mb-4">
                ${r.desc}
              </p>

              <div class="flex flex-wrap gap-1.5 mb-5">
                ${r.tags.slice(0, 4).map((t) => `
                  <span class="px-2.5 py-1 bg-cantera-cream text-primary font-label-sm text-[9px] uppercase tracking-wider">${t}</span>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="px-6 pb-6 pt-2 flex items-center gap-3">
            <button type="button" onclick="window.openResidenceModal('${r.id}')" class="flex-1 py-3.5 bg-primary-container hover:bg-cabernet-deep text-cantera-sand font-label-sm text-[11px] uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2">
              <span>Explorar Galería & Planos</span>
              <span class="material-symbols-outlined text-sm">open_in_full</span>
            </button>
            <a href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, deseo recibir el dossier arquitectónico y planos de ' + r.name + ' (' + r.m2Const + ') en La Santa Vid.')}" target="_blank" rel="noopener" class="px-4 py-3.5 hairline-light text-primary hover:bg-gold-burnished hover:text-cabernet-deep transition-colors flex items-center justify-center" title="Solicitar por WhatsApp">
              <span class="material-symbols-outlined text-lg">chat</span>
            </a>
          </div>
        </article>
      `).join('');
    }

    renderGrid('all');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';
        filterBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('bg-primary-container', active);
          b.classList.toggle('text-cantera-sand', active);
          b.classList.toggle('bg-surface-container', !active);
          b.classList.toggle('text-on-surface', !active);
        });
        renderGrid(filter);
      });
    });

    // Modal logic
    let currentRes = null;
    let currentPhotoIdx = 0;

    window.openResidenceModal = function (id) {
      const res = RESIDENCES.find((r) => r.id === id);
      if (!res) return;
      currentRes = res;
      currentPhotoIdx = 0;

      const modal = document.getElementById('residence-modal');
      if (!modal) return;

      document.getElementById('rm-badge').textContent = res.badge;
      document.getElementById('rm-name').textContent = res.name;
      document.getElementById('rm-vinedo').textContent = `${res.vinedo} • ${res.architect}`;
      document.getElementById('rm-price').textContent = res.priceLabel;
      document.getElementById('rm-desc').textContent = res.desc;
      document.getElementById('rm-m2c').textContent = res.m2Const;
      document.getElementById('rm-m2t').textContent = res.m2Lot;
      document.getElementById('rm-beds').textContent = res.beds;
      document.getElementById('rm-levels').textContent = res.levels;

      const waBtn = document.getElementById('rm-wa-btn');
      if (waBtn) {
        waBtn.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, me interesa agendar una visita privada y recibir los planos de ' + res.name + ' (' + res.priceShort + ') en La Santa Vid.')}`;
      }

      updateModalPhoto();
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    };

    window.closeResidenceModal = function () {
      const modal = document.getElementById('residence-modal');
      if (modal) modal.classList.add('hidden');
      document.body.style.overflow = '';
    };

    window.stepResidencePhoto = function (dir) {
      if (!currentRes) return;
      currentPhotoIdx = (currentPhotoIdx + dir + currentRes.photos.length) % currentRes.photos.length;
      updateModalPhoto();
    };

    window.selectResidencePhoto = function (idx) {
      if (!currentRes) return;
      currentPhotoIdx = idx;
      updateModalPhoto();
    };

    function updateModalPhoto() {
      if (!currentRes) return;
      const p = currentRes.photos[currentPhotoIdx];
      const img = document.getElementById('rm-main-img');
      const cap = document.getElementById('rm-photo-caption');
      const thumbs = document.getElementById('rm-thumbs');

      if (img) img.src = p.url;
      if (cap) cap.textContent = `${currentPhotoIdx + 1} / ${currentRes.photos.length} — ${p.caption}`;
      if (thumbs) {
        thumbs.innerHTML = currentRes.photos.map((ph, i) => `
          <button type="button" onclick="window.selectResidencePhoto(${i})" class="w-16 h-12 shrink-0 overflow-hidden border-2 transition-all ${i === currentPhotoIdx ? 'border-gold-light scale-105' : 'border-transparent opacity-55 hover:opacity-100'}">
            <img src="${ph.url}" alt="${ph.caption}" class="w-full h-full object-cover" />
          </button>
        `).join('');
      }
    }
  }

  /* ==========================================================================
     9. INTERACTIVE INVESTMENT & FRACTIONAL CALCULATOR
     ========================================================================== */
  function initInvestmentCalculator() {
    const modeBtns = document.querySelectorAll('.calc-mode-btn');
    const sliderMain = document.getElementById('calc-slider-main');
    const sliderTerm = document.getElementById('calc-slider-term');
    const labelMainTitle = document.getElementById('calc-main-label');
    const labelMainVal = document.getElementById('calc-main-val');
    const labelTermVal = document.getElementById('calc-term-val');

    const outTotal = document.getElementById('calc-out-total');
    const outDown = document.getElementById('calc-out-down');
    const outMonthly = document.getElementById('calc-out-monthly');
    const outBottles = document.getElementById('calc-out-bottles');
    const outBenefit = document.getElementById('calc-out-benefit');
    const outWaLink = document.getElementById('calc-wa-link');

    if (!sliderMain || !sliderTerm) return;

    let currentMode = 'lotes'; // 'lotes' | 'residencias' | 'fractional'
    const USD_TO_MXN = 18.72;

    const RES_PRICES = [
      { name: 'Modelo Chardonnay (176 m²)', price: 9300000 },
      { name: 'Modelo Crianza (244 m²)', price: 12400000 },
      { name: 'Modelo Renacer (284 m²)', price: 13300000 },
      { name: 'Modelo Tapia (296 m²)', price: 13600000 },
      { name: 'Modelo Vergel (420 m²)', price: 16500000 },
      { name: 'Modelo Picachos (450 m²)', price: 17200000 }
    ];

    function fmtMXN(n) {
      return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);
    }

    function updateCalculator() {
      const mainVal = parseInt(sliderMain.value, 10);
      const termMonths = parseInt(sliderTerm.value, 10);

      if (currentMode === 'lotes') {
        const m2 = mainVal; // 1008 to 2200
        const usdTotal = m2 * 400;
        const mxnTotal = usdTotal * USD_TO_MXN;
        const downPct = 0.30;
        const downMXN = mxnTotal * downPct;
        const financedMXN = mxnTotal - downMXN;
        const monthly = termMonths === 0 ? 0 : financedMXN / termMonths;

        labelMainTitle.textContent = 'Superficie del Lote Residencial';
        labelMainVal.textContent = `${m2.toLocaleString('en-US')} m² ($${usdTotal.toLocaleString('en-US')} USD)`;
        labelTermVal.textContent = termMonths === 0 ? 'Contado (Descuento Especial)' : `${termMonths} Meses (${(termMonths / 12).toFixed(0)} Años)`;

        outTotal.textContent = fmtMXN(mxnTotal);
        outDown.textContent = `${fmtMXN(downMXN)} (30%)`;
        outMonthly.textContent = termMonths === 0 ? 'Pago Único de Contado' : `${fmtMXN(monthly)} / mes`;
        outBottles.textContent = '120 Botellas / Año de por Vida';
        outBenefit.textContent = 'Escrituración inmediata • Acceso a +30 amenidades • Apto para construir a tu ritmo con reglamento Artigas';
        if (outWaLink) {
          outWaLink.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola, simulé un Lote Residencial de ${m2} m² ($${usdTotal.toLocaleString()} USD) a ${termMonths} meses en La Santa Vid. Me gustaría recibir la corrida financiera.`)}`;
        }
      } else if (currentMode === 'residencias') {
        const idx = Math.min(Math.max(mainVal, 0), RES_PRICES.length - 1);
        const model = RES_PRICES[idx];
        const mxnTotal = model.price;
        const downMXN = mxnTotal * 0.30;
        const monthly = termMonths === 0 ? 0 : (mxnTotal - downMXN) / termMonths;

        labelMainTitle.textContent = 'Prototipo Artigas Arquitectos';
        labelMainVal.textContent = model.name;
        labelTermVal.textContent = termMonths === 0 ? 'Contado' : `${termMonths} Meses (Hasta 10 Años Directo)`;

        outTotal.textContent = fmtMXN(mxnTotal);
        outDown.textContent = `${fmtMXN(downMXN)} (30%)`;
        outMonthly.textContent = termMonths === 0 ? 'Pago Único de Contado' : `${fmtMXN(monthly)} / mes`;
        outBottles.textContent = '120 Botellas / Año de por Vida';
        outBenefit.textContent = 'Entrega Llave en Mano •Elegible al Programa Wyndham® (80% de ingresos de renta vacacional para el propietario)';
        if (outWaLink) {
          outWaLink.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola, me interesa la corrida financiera del ${model.name} (${fmtMXN(mxnTotal)}) a ${termMonths} meses en La Santa Vid.`)}`;
        }
      } else if (currentMode === 'fractional') {
        const fractions = mainVal; // 1 to 4 eighths
        const baseFractionPrice = 2950000; // Casa Inspiración $2.95 MDP
        const mxnTotal = fractions * baseFractionPrice;
        const downMXN = mxnTotal * 0.30;
        const cappedMonths = Math.min(termMonths, 36);
        const monthly = cappedMonths === 0 ? 0 : (mxnTotal - downMXN) / cappedMonths;
        const weeks = fractions * 6;
        const bottles = fractions * 60;

        labelMainTitle.textContent = 'Participación Patrimonial Fractional (Casa Inspiración / Plenitud)';
        labelMainVal.textContent = `${fractions}/8 de Propiedad (${weeks} Semanas/Año)`;
        labelTermVal.textContent = cappedMonths === 0 ? 'Contado Preferencial' : `${cappedMonths} Meses Sin Banco`;

        outTotal.textContent = fmtMXN(mxnTotal);
        outDown.textContent = `${fmtMXN(downMXN)} (30%)`;
        outMonthly.textContent = cappedMonths === 0 ? 'Pago Único de Contado' : `${fmtMXN(monthly)} / mes`;
        outBottles.textContent = `${bottles} Botellas / Año Incluidas`;
        outBenefit.textContent = `${weeks} semanas rotativas al año • Casa 100% amueblada y operada • Membresía Familiar Fullness incluida • Acciones escrituradas heredables`;
        if (outWaLink) {
          outWaLink.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola, me interesa información sobre ${fractions}/8 de propiedad en el modelo Fractional (${weeks} semanas al año, ${fmtMXN(mxnTotal)}) en La Santa Vid.`)}`;
        }
      }
    }

    modeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        currentMode = btn.getAttribute('data-mode') || 'lotes';
        modeBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('bg-gold-burnished', active);
          b.classList.toggle('text-cabernet-deep', active);
          b.classList.toggle('bg-white/5', !active);
          b.classList.toggle('text-cantera-sand', !active);
        });

        if (currentMode === 'lotes') {
          sliderMain.min = '1008';
          sliderMain.max = '2016';
          sliderMain.step = '56';
          sliderMain.value = '1008';
          sliderTerm.max = '120';
          sliderTerm.step = '12';
          sliderTerm.value = '36';
        } else if (currentMode === 'residencias') {
          sliderMain.min = '0';
          sliderMain.max = '5';
          sliderMain.step = '1';
          sliderMain.value = '2';
          sliderTerm.max = '120';
          sliderTerm.step = '12';
          sliderTerm.value = '60';
        } else {
          sliderMain.min = '1';
          sliderMain.max = '4';
          sliderMain.step = '1';
          sliderMain.value = '1';
          sliderTerm.max = '36';
          sliderTerm.step = '6';
          sliderTerm.value = '24';
        }
        updateCalculator();
      });
    });

    sliderMain.addEventListener('input', updateCalculator);
    sliderTerm.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  /* ==========================================================================
     10. REAL-TIME INTERACTIVE SVG MASTERPLAN (402 LOTS + LIVE GOOGLE SHEETS)
     ========================================================================== */
  const ETAPAS_MAP = {
    'I': 1, 'II': 1, 'III': 1, 'IV': 1,
    'V': 2, 'VI': 2, 'VII': 2,
    'VIII': 3, 'IX': 3
  };

  let RESERVAS = {};
  let lotesData = {};
  let currentReservaKey = 'V'; // Default to Reserva V Cabernet Franc (high availability)
  let currentStatusFilter = 'Todos';
  let tipoDeCambioGlobal = '$18.72 MXN';
  let svgScale = 1;

  function getAvailabilityColor(disp, total) {
    if (total === 0) return { fill: 'rgba(139,39,55,0.52)', stroke: '#8B2737' };
    const ratio = disp / total;
    let r, g, b;
    if (ratio < 0.5) {
      const p = ratio / 0.5;
      r = Math.round(139 + (201 - 139) * p);
      g = Math.round(39 + (168 - 39) * p);
      b = Math.round(55 + (76 - 55) * p);
    } else {
      const p = (ratio - 0.5) / 0.5;
      r = Math.round(201 + (74 - 201) * p);
      g = Math.round(168 + (140 - 168) * p);
      b = Math.round(76 + (65 - 76) * p);
    }
    return {
      fill: `rgba(${r}, ${g}, ${b}, 0.56)`,
      stroke: `rgb(${r}, ${g}, ${b})`
    };
  }

  function parseCSVLine(text) {
    const result = [];
    let currentWord = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(currentWord);
        currentWord = '';
      } else {
        currentWord += char;
      }
    }
    result.push(currentWord);
    return result.map((s) => s.trim());
  }

  function processMasterplanCSV(csvText) {
    if (!csvText) return;
    const lines = csvText.split(/\r?\n/);
    if (lines.length > 1) {
      const row2Cols = parseCSVLine(lines[1]);
      if (row2Cols.length > 11 && row2Cols[11]) {
        const parsedTC = parseFloat(row2Cols[11].replace(/[^\d.-]/g, ''));
        if (!isNaN(parsedTC)) {
          tipoDeCambioGlobal = '$' + parsedTC.toFixed(2) + ' MXN';
        }
      }
    }

    const romanos = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    const tempLotes = {};
    const tempReservas = {};

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      const cols = parseCSVLine(line);
      if (cols.length < 8) continue;

      const nombreReserva = cols[1];
      const numReserva = parseInt(cols[2], 10);
      if (isNaN(numReserva) || numReserva < 1 || numReserva > 9) continue;

      const romanKey = romanos[numReserva];
      const loteNum = cols[3];
      const superficie = cols[4];
      const precioListUSD = cols[6];
      const statusRaw = cols[7] || '';
      const precioListMXN = cols.length > 8 ? cols[8] : '';

      let status = 'Disponible';
      if (/apartado/i.test(statusRaw)) status = 'Apartado';
      if (/vendido/i.test(statusRaw)) status = 'Vendido';

      if (!tempLotes[romanKey]) {
        tempLotes[romanKey] = [];
        tempReservas[romanKey] = {
          nombre: nombreReserva,
          condominio: 'Reserva ' + romanKey,
          viviendas: 0,
          areaTotal: 0,
          etapa: ETAPAS_MAP[romanKey] || 1
        };
      }

      tempLotes[romanKey].push({
        num: loteNum,
        sup: superficie + ' m²',
        precioUSD: precioListUSD,
        precioMXN: precioListMXN,
        status: status
      });

      const areaNum = parseFloat(superficie.replace(/,/g, ''));
      if (!isNaN(areaNum)) tempReservas[romanKey].areaTotal += areaNum;
      tempReservas[romanKey].viviendas++;
    }

    for (const k in tempReservas) {
      tempReservas[k].area = tempReservas[k].areaTotal.toLocaleString('en-US', { maximumFractionDigits: 0 }) + ' m²';
    }

    lotesData = tempLotes;
    RESERVAS = tempReservas;
    buildMasterplanUI();
  }

  function buildMasterplanUI() {
    const tabsContainer = document.getElementById('mp-reserva-tabs');
    if (!tabsContainer) return;
    tabsContainer.innerHTML = '';

    const keys = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    let globalDisp = 0;
    let globalTotal = 0;

    keys.forEach((k) => {
      if (!lotesData[k]) return;
      const meta = RESERVAS[k];
      const lotes = lotesData[k];
      const total = lotes.length;
      const disp = lotes.filter((l) => l.status === 'Disponible').length;
      globalDisp += disp;
      globalTotal += total;

      const zoneEl = document.getElementById('z-' + k);
      if (zoneEl) {
        const c = getAvailabilityColor(disp, total);
        zoneEl.style.fill = c.fill;
        zoneEl.style.stroke = c.stroke;

        let next = zoneEl.nextElementSibling;
        let attempts = 0;
        while (next && attempts < 6) {
          if (next.getAttribute('class') === 'zlabel-sub') {
            next.textContent = `${k} • ${meta.nombre.toUpperCase()}`;
            break;
          }
          next = next.nextElementSibling;
          attempts++;
        }
      }

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.key = k;
      btn.className = `mp-tab-btn px-3.5 py-2 text-left transition-all hairline-dark flex items-center justify-between gap-3 ${k === currentReservaKey ? 'bg-gold-burnished text-cabernet-deep font-bold' : 'bg-white/5 text-cantera-sand hover:bg-white/10'}`;
      btn.innerHTML = `
        <div>
          <span class="font-label-sm text-[9px] uppercase tracking-widest block opacity-75">Etapa ${meta.etapa} • Reserva ${k}</span>
          <span class="font-headline-sm text-sm font-serif">${meta.nombre}</span>
        </div>
        <span class="px-2 py-0.5 text-[10px] font-label-sm uppercase ${disp > 0 ? 'bg-black/30 text-gold-light' : 'bg-black/20 text-cantera-sand/50'}">
          ${disp}/${total} Disp.
        </span>
      `;
      btn.addEventListener('click', () => window.selectMasterplanReserva(k));
      tabsContainer.appendChild(btn);
    });

    const tcEl = document.getElementById('mp-tc-label');
    if (tcEl) tcEl.textContent = tipoDeCambioGlobal;

    const summaryEl = document.getElementById('mp-global-summary');
    if (summaryEl) summaryEl.textContent = `${globalDisp} Lotes Disponibles de ${globalTotal} Totales`;

    window.selectMasterplanReserva(currentReservaKey);
  }

  window.selectMasterplanReserva = function (key) {
    if (!RESERVAS[key]) return;
    currentReservaKey = key;

    document.querySelectorAll('.masterplan-svg .zone[id^="z-"]').forEach((z) => z.classList.remove('active'));
    const activeZone = document.getElementById('z-' + key);
    if (activeZone) activeZone.classList.add('active');

    document.querySelectorAll('.mp-tab-btn').forEach((btn) => {
      const isAct = btn.dataset.key === key;
      btn.className = `mp-tab-btn px-3.5 py-2 text-left transition-all hairline-dark flex items-center justify-between gap-3 ${isAct ? 'bg-gold-burnished text-cabernet-deep font-bold' : 'bg-white/5 text-cantera-sand hover:bg-white/10'}`;
    });

    renderMasterplanSidePanel(key);
  };

  window.setMasterplanStatusFilter = function (status) {
    currentStatusFilter = status;
    document.querySelectorAll('.mp-status-filter').forEach((b) => {
      const active = b.dataset.status === status;
      b.classList.toggle('bg-gold-burnished', active);
      b.classList.toggle('text-cabernet-deep', active);
      b.classList.toggle('bg-white/5', !active);
      b.classList.toggle('text-cantera-sand/80', !active);
    });
    renderMasterplanSidePanel(currentReservaKey);
  };

  function renderMasterplanSidePanel(key) {
    const meta = RESERVAS[key];
    const allLotes = lotesData[key] || [];
    const disp = allLotes.filter((l) => l.status === 'Disponible').length;
    const apar = allLotes.filter((l) => l.status === 'Apartado').length;
    const vend = allLotes.filter((l) => l.status === 'Vendido').length;

    const filtered = currentStatusFilter === 'Todos'
      ? allLotes
      : allLotes.filter((l) => l.status === currentStatusFilter);

    const titleEl = document.getElementById('mp-panel-title');
    const subEl = document.getElementById('mp-panel-sub');
    const dispEl = document.getElementById('mp-stat-disp');
    const aparEl = document.getElementById('mp-stat-apar');
    const vendEl = document.getElementById('mp-stat-vend');
    const listEl = document.getElementById('mp-lots-list');
    const ctaBtn = document.getElementById('mp-panel-cta');

    if (titleEl) titleEl.textContent = `Reserva ${key} • ${meta.nombre}`;
    if (subEl) subEl.textContent = `Etapa ${meta.etapa} • ${meta.viviendas} Lotes Residenciales • ${meta.area} Totales`;
    if (dispEl) dispEl.textContent = disp;
    if (aparEl) aparEl.textContent = apar;
    if (vendEl) vendEl.textContent = vend;

    if (ctaBtn) {
      ctaBtn.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola, me interesa recibir el plano detallado y disponibilidad de la Reserva ${key} (${meta.nombre}) en La Santa Vid.`)}`;
    }

    if (listEl) {
      if (filtered.length === 0) {
        listEl.innerHTML = `<div class="py-10 text-center text-cantera-sand/50 font-body-sm text-xs">No hay lotes con estatus "${currentStatusFilter}" en esta reserva. Prueba seleccionando otra reserva en el mapa.</div>`;
      } else {
        listEl.innerHTML = filtered.map((l) => `
          <div class="p-3 bg-white/5 hover:bg-white/10 transition-colors border-b border-gold-burnished/15 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-cabernet-deep hairline-dark flex flex-col items-center justify-center shrink-0">
                <span class="font-label-sm text-[8px] uppercase text-gold-light/70">Lote</span>
                <span class="font-headline-sm text-sm text-cantera-sand font-bold leading-none">${l.num}</span>
              </div>
              <div>
                <span class="font-label-md text-xs text-cantera-sand font-semibold block">${l.sup}</span>
                <span class="font-body-sm text-[11px] text-gold-light">${l.precioUSD || '$400 USD/m²'} USD <span class="text-cantera-sand/50">${l.precioMXN ? '• ' + l.precioMXN + ' MXN' : ''}</span></span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 font-label-sm text-[9px] uppercase tracking-wider lot-badge-${l.status}">${l.status}</span>
              ${l.status === 'Disponible' ? `
                <a href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola, quiero cotizar el Lote #${l.num} (${l.sup}, ${l.precioUSD} USD) de la Reserva ${key} (${meta.nombre}) en La Santa Vid.`)}" target="_blank" rel="noopener" class="p-2 bg-gold-burnished text-cabernet-deep hover:bg-gold-light transition-colors" title="Cotizar este lote por WhatsApp">
                  <span class="material-symbols-outlined text-sm block">arrow_outward</span>
                </a>
              ` : ''}
            </div>
          </div>
        `).join('');
      }
    }
  }

  window.zoomMasterplan = function (delta) {
    const svg = document.getElementById('masterplan-svg-el');
    if (!svg) return;
    if (delta === 0) {
      svgScale = 1;
    } else {
      svgScale = Math.min(Math.max(svgScale + delta, 1), 2.4);
    }
    svg.style.transform = `scale(${svgScale})`;
  };

  function initMasterplanInteractive() {
    // 1. Instant load from local snapshot
    if (window.LSV_FALLBACK_CSV) {
      processMasterplanCSV(window.LSV_FALLBACK_CSV);
    }
    // 2. Live refresh from Google Sheets
    fetch(SHEETS_CSV_URL)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((csv) => {
        if (csv && csv.length > 500) processMasterplanCSV(csv);
      })
      .catch(() => {});
  }

  /* ==========================================================================
     11. CINEMA & VIDEO THEATER MODAL (YOUTUBE + OFFICIAL MP4s)
     ========================================================================== */
  function initCinemaHub() {
    window.openVideoModal = function (type, src, title) {
      const modal = document.getElementById('video-modal');
      const container = document.getElementById('video-modal-container');
      const titleEl = document.getElementById('video-modal-title');
      if (!modal || !container) return;

      if (titleEl) titleEl.textContent = title || 'La Santa Vid — Film Oficial';

      if (type === 'mp4') {
        container.innerHTML = `
          <video src="${src}" controls autoplay playsinline class="w-full h-full object-contain bg-black"></video>
        `;
      } else {
        container.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${src}?autoplay=1&rel=0&modestbranding=1" title="${title || 'La Santa Vid Video'}" class="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `;
      }

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    };

    window.closeVideoModal = function () {
      const modal = document.getElementById('video-modal');
      const container = document.getElementById('video-modal-container');
      if (container) container.innerHTML = '';
      if (modal) modal.classList.add('hidden');
      document.body.style.overflow = '';
    };
  }

  /* ==========================================================================
     12. VIP CONCIERGE FORM & WHATSAPP DISPATCH
     ========================================================================== */
  function initConciergeForm() {
    const form = document.getElementById('vip-concierge-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('vip-name')?.value || '';
      const phone = document.getElementById('vip-phone')?.value || '';
      const email = document.getElementById('vip-email')?.value || '';
      const interest = document.getElementById('vip-interest')?.value || 'Información General';
      const horizon = document.getElementById('vip-horizon')?.value || 'Inmediato';
      const notes = document.getElementById('vip-notes')?.value || '';

      const feedback = document.getElementById('vip-form-feedback');
      if (feedback) {
        feedback.classList.remove('hidden');
      }

      const msg = `Hola Concierge La Santa Vid, solicito agendar una visita privada / recibir el dossier confidencial:\n• Nombre: ${name}\n• Teléfono: ${phone}\n• Correo: ${email}\n• Interés: ${interest}\n• Plazo: ${horizon}${notes ? '\n• Notas: ' + notes : ''}`;
      setTimeout(() => {
        window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
      }, 600);
    });
  }

  /* ==========================================================================
     13. BILINGUAL SWITCHER (ES / EN)
     ========================================================================== */
  function initLanguageToggle() {
    const btnsEs = document.querySelectorAll('.lang-btn-es');
    const btnsEn = document.querySelectorAll('.lang-btn-en');

    function setLang(lang) {
      document.querySelectorAll('[data-es][data-en]').forEach((el) => {
        el.textContent = el.getAttribute(`data-${lang}`);
      });
      btnsEs.forEach((b) => {
        b.classList.toggle('text-gold-light', lang === 'es');
        b.classList.toggle('font-bold', lang === 'es');
        b.classList.toggle('opacity-50', lang !== 'es');
      });
      btnsEn.forEach((b) => {
        b.classList.toggle('text-gold-light', lang === 'en');
        b.classList.toggle('font-bold', lang === 'en');
        b.classList.toggle('opacity-50', lang !== 'en');
      });
    }

    btnsEs.forEach((b) => b.addEventListener('click', () => setLang('es')));
    btnsEn.forEach((b) => b.addEventListener('click', () => setLang('en')));
  }
})();
