document.addEventListener('DOMContentLoaded', function () {
  // Dark Mode Toggle
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
    </svg>
  `;
  themeToggle.className = "p-2 rounded-full hover:bg-white/10 transition-colors text-primary-text";
  themeToggle.setAttribute('aria-label', 'Alternar modo escuro');
  document.querySelector('nav').appendChild(themeToggle);
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });

  // LGPD Banner + carregamento condicionado do Google Tag Manager
  const lgpdBanner = document.getElementById('lgpd-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const closeBtn = document.getElementById('close-lgpd');
  const CONSENT_KEY = 'lgpd-consent';

  function loadGTM() {
    if (window.__gtmLoaded) return;
    window.__gtmLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + config.gtm.id;
    document.head.appendChild(gtmScript);
  }

  // Se o usuário já aceitou em uma visita anterior, carrega o GTM direto e não mostra o banner
  if (localStorage.getItem(CONSENT_KEY) === 'accepted') {
    loadGTM();
    lgpdBanner.style.display = 'none';
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    loadGTM();
    lgpdBanner.style.display = 'none';
  });

  // Fechar sem aceitar: esconde o banner mas NÃO carrega o GTM
  closeBtn.addEventListener('click', () => lgpdBanner.style.display = 'none');

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Renderizar áreas de atuação dinamicamente (ícone específico por área)
  const servicesContainer = document.querySelector('#services .grid');
  const serviceTemplate = document.getElementById('service-template').content;

  config.therapyAreas.forEach(area => {
    const clone = serviceTemplate.cloneNode(true);
    clone.querySelector('h3').textContent = area.name;
    clone.querySelector('p').textContent = area.description;

    const iconSlot = clone.querySelector('.bg-gold-accent\\/15');
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.classList.add('w-7', 'h-7', 'text-primary-bg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', `#${area.icon}`);
    use.setAttribute('fill', 'currentColor');
    icon.appendChild(use);
    iconSlot.appendChild(icon);

    servicesContainer.appendChild(clone);
  });

  // Renderizar passos do atendimento
  const stepsContainer = document.querySelector('#how-it-works .max-w-4xl');
  const stepsTemplate = document.getElementById('steps-template').content;

  config.therapySteps.forEach(step => {
    const clone = stepsTemplate.cloneNode(true);
    clone.querySelector('span').textContent = step.step;
    clone.querySelector('h3').textContent = step.title;
    clone.querySelector('p').textContent = step.description;
    stepsContainer.appendChild(clone);
  });

  // Smooth Scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId.length <= 1) return; // ignora href="#" puro (ex.: botões de WhatsApp)
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
      mobileMenu.classList.add('hidden');
    });
  });

  // Efeito de fade-in ao rolar
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  const hiddenElements = document.querySelectorAll('section > div, footer > div');
  hiddenElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Sanitização de inputs (exemplo para formulário de contato hipotético)
  function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .trim();
  }

  // Ano dinâmico no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Link do Instagram no footer, a partir do config.js
  const instagramLink = document.getElementById('footer-instagram');
  if (instagramLink && config.social && config.social.instagram && config.social.instagram !== '#') {
    instagramLink.href = config.social.instagram;
  }

  // Lógica unificada para todos os botões de WhatsApp
  const whatsappButtons = document.querySelectorAll('#cta-whatsapp, #footer-whatsapp');
  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(config.psychologist.whatsappLink, '_blank', 'noopener,noreferrer');
    });
  });
});
