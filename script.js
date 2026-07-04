/**
 * ⚡ LANDING PAGE PODÓLOGA – DENISE MAZZOLIN (JAÚ/SP)
 * Interatividade, animação de scroll e rastreamento de conversão.
 */

document.addEventListener("DOMContentLoaded", () => {
  setupFloatingWhatsAppButton();
  setupSmoothScrolling();
  setupClickTracking();
});

/**
 * Controla a visibilidade do botão flutuante de WhatsApp.
 * Ele só deve aparecer depois que o usuário rolar a tela além da dobra (Hero).
 */
function setupFloatingWhatsAppButton() {
  const floatingBtn = document.getElementById("floating-whatsapp-cta");
  const heroSection = document.getElementById("home");
  
  if (!floatingBtn) return;

  const toggleVisibility = () => {
    // Se passar de 300px de scroll ou do final do Hero, exibe o botão
    const heroHeight = heroSection ? heroSection.offsetHeight : 500;
    if (window.scrollY > (heroHeight - 100)) {
      floatingBtn.classList.add("visible");
    } else {
      floatingBtn.classList.remove("visible");
    }
  };

  // Executa uma vez no início caso o usuário já esteja com scroll
  toggleVisibility();
  
  // Escuta o evento de scroll
  window.addEventListener("scroll", toggleVisibility, { passive: true });
}

/**
 * Configura rolagem suave para links internos caso o navegador 
 * não suporte a propriedade CSS scroll-behavior: smooth.
 */
function setupSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Rola até o elemento subtraindo a altura do header fixo
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

/**
 * Rastreamento de cliques nos botões de WhatsApp.
 * Útil para integrar futuramente com Google Analytics 4, Tag Manager ou Facebook Pixel.
 */
function setupClickTracking() {
  const whatsappButtons = [
    { id: "header-whatsapp-cta", label: "Header Link" },
    { id: "hero-whatsapp-cta", label: "Hero Button" },
    { id: "problem-whatsapp-cta", label: "Problems Section Callout" },
    { id: "about-whatsapp-cta", label: "About Section Button" },
    { id: "floating-whatsapp-cta", label: "Floating Sticky Button" },
    { id: "mobile-bar-whatsapp-cta", label: "Mobile Bottom Sticky Bar" },
    { id: "final-whatsapp-cta", label: "Final Call-To-Action Button" }
  ];

  // Adiciona evento em links de serviços também
  const serviceLinks = document.querySelectorAll(".service-cta-link");
  serviceLinks.forEach((link, idx) => {
    link.addEventListener("click", () => {
      trackWhatsAppClick(`Service Card: ${link.closest(".service-card").querySelector("h3").textContent}`);
    });
  });

  whatsappButtons.forEach(btnInfo => {
    const btn = document.getElementById(btnInfo.id);
    if (btn) {
      btn.addEventListener("click", () => {
        trackWhatsAppClick(btnInfo.label);
      });
    }
  });
}

/**
 * Função simuladora de envio de evento de conversão.
 * @param {string} source - Origem do clique no botão de conversão.
 */
function trackWhatsAppClick(source) {
  console.log(`[Conversion Click] WhatsApp CTA acionado via: ${source}`);
  
  // Se GA4 estiver instalado:
  // if (typeof gtag === 'function') {
  //   gtag('event', 'conversion', {
  //     'event_category': 'WhatsApp',
  //     'event_label': source,
  //     'value': 1.0
  //   });
  // }
  
  // Se Facebook Pixel estiver instalado:
  // if (typeof fbq === 'function') {
  //   fbq('track', 'Contact', { content_name: source });
  // }
}
