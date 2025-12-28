    // Configuration
    const defaultConfig = {
      background_color: "#ffffff",
      surface_color: "#f9fafb",
      text_color: "#1f2937",
      primary_action_color: "#667eea",
      secondary_action_color: "#764ba2",
      hero_title: "CPropre – La propreté réinventée",
      hero_subtitle: "Pour votre maison et vos bureaux",
      cta_primary: "Réserver maintenant",
      cta_secondary: "Demander un devis",
      about_title: "Notre Histoire",
      services_title: "Nos Services",
      contact_title: "Contactez-nous",
      footer_text: "Votre partenaire de confiance pour un intérieur impeccable",
      font_family: "Inter",
      font_size: 16,
      api_key: "" // Nouvelle clé pour l'API IA (ex: OpenAI ou xAI)
    };

    // Services data
    const services = [
      {
        id: 1,
        title: "Nettoyage maison",
        icon: "🏠",
        description: "Un nettoyage complet de votre domicile avec des produits écologiques",
        features: ["Toutes pièces", "Cuisine et salle de bain", "Dépoussiérage complet", "Aspirateur et lavage sols"]
      },
      {
        id: 2,
        title: "Nettoyage bureau",
        icon: "🏢",
        description: "Entretien professionnel de vos locaux professionnels",
        features: ["Espaces de travail", "Sanitaires", "Espaces communs", "Vitrerie"]
      },
      {
        id: 3,
        title: "Repassage",
        icon: "👔",
        description: "Service de repassage à domicile pour tous vos vêtements",
        features: ["Repassage soigné", "Pliage et cintre", "À domicile", "Tous textiles"]
      },
      {
        id: 4,
        title: "Entretien sols",
        icon: "✨",
        description: "Traitement spécialisé pour tous types de sols",
        features: ["Carrelage", "Parquet", "Moquette", "Marbre"]
      },
      {
        id: 5,
        title: "Désinfection",
        icon: "🦠",
        description: "Désinfection complète aux normes sanitaires",
        features: ["Points de contact", "Sanitaires", "Surfaces", "Certification"]
      },
      {
        id: 6,
        title: "Petites réparations",
        icon: "🔧",
        description: "Petits travaux de bricolage et réparations",
        features: ["Électricité légère", "Plomberie simple", "Montage meubles", "Accrochage"]
      }
    ];

    // Testimonials data
    const testimonials = [
      { name: "Marie L.", text: "Service impeccable ! Mon appartement n'a jamais été aussi propre. L'équipe est ponctuelle et très professionnelle.", rating: 5 },
      { name: "Thomas B.", text: "Je recommande vivement CPropre pour l'entretien de nos bureaux. Excellent rapport qualité-prix.", rating: 5 },
      { name: "Sophie D.", text: "Le repassage est parfait et me fait gagner un temps précieux. Merci CPropre !", rating: 5 },
      { name: "Laurent M.", text: "Très satisfait de la désinfection complète de notre établissement. Travail sérieux.", rating: 5 }
    ];

    // Carousel images
    const carouselImages = [
          'picture/2.png',
          'picture/clean.jpg',
          'picture/w.png',
          'picture/1.png'
    ];

    let currentTestimonial = 0;
    let chatbotOpen = false;
    let modalOpen = false;
    let currentRecords = [];
    let aiApiKey = ""; // Variable globale pour la clé API IA
    let currentSlide = 0;
    let slideInterval;

    // Data SDK handler
    const dataHandler = {
      onDataChanged(data) {
        currentRecords = data;
      }
    };

    // Initialize Data SDK
    async function initDataSDK() {
      if (window.dataSdk) {
        const result = await window.dataSdk.init(dataHandler);
        if (!result.isOk) {
          console.error("Failed to initialize Data SDK");
        }
      }
    }

    // Initialize Element SDK
    async function initElementSDK() {
      if (window.elementSdk) {
        window.elementSdk.init({
          defaultConfig,
          onConfigChange: async (config) => {
            const customFont = config.font_family || defaultConfig.font_family;
            const baseFontStack = 'Arial, sans-serif';
            const baseSize = config.font_size || defaultConfig.font_size;
            
            document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
            document.body.style.fontSize = `${baseSize}px`;
            
            const bgColor = config.background_color || defaultConfig.background_color;
            const surfaceColor = config.surface_color || defaultConfig.surface_color;
            const textColor = config.text_color || defaultConfig.text_color;
            const primaryColor = config.primary_action_color || defaultConfig.primary_action_color;
            const secondaryColor = config.secondary_action_color || defaultConfig.secondary_action_color;
            
            document.body.style.backgroundColor = bgColor;
            
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
              if (index % 2 === 0) {
                section.style.backgroundColor = surfaceColor;
              } else {
                section.style.backgroundColor = bgColor;
              }
            });
            
            document.body.style.color = textColor;
            
            const primaryButtons = document.querySelectorAll('.btn-primary');
            primaryButtons.forEach(btn => {
              btn.style.background = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
            });
            
            // Mise à jour des textes
            const heroTitle = document.getElementById('heroTitle');
            if (heroTitle) heroTitle.textContent = config.hero_title || defaultConfig.hero_title;
            
            const heroSubtitle = document.getElementById('heroSubtitle');
            if (heroSubtitle) heroSubtitle.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
            
            const ctaPrimary = document.getElementById('ctaPrimary');
            if (ctaPrimary) ctaPrimary.textContent = config.cta_primary || defaultConfig.cta_primary;
            
            const ctaSecondary = document.getElementById('ctaSecondary');
            if (ctaSecondary) ctaSecondary.textContent = config.cta_secondary || defaultConfig.cta_secondary;
            
            const aboutTitle = document.getElementById('aboutTitle');
            if (aboutTitle) aboutTitle.textContent = config.about_title || defaultConfig.about_title;
            
            const servicesTitle = document.getElementById('servicesTitle');
            if (servicesTitle) servicesTitle.textContent = config.services_title || defaultConfig.services_title;
            
            const contactTitle = document.getElementById('contactTitle');
            if (contactTitle) contactTitle.textContent = config.contact_title || defaultConfig.contact_title;
            
            const footerText = document.getElementById('footerText');
            if (footerText) footerText.textContent = config.footer_text || defaultConfig.footer_text;

            // Mise à jour de la clé API IA
            aiApiKey = config.api_key || "";
          },
          mapToCapabilities: (config) => ({
            recolorables: [
              {
                get: () => config.background_color || defaultConfig.background_color,
                set: (value) => {
                  if (window.elementSdk && window.elementSdk.config) {
                    window.elementSdk.config.background_color = value;
                    window.elementSdk.setConfig({ background_color: value });
                  }
                }
              },
              {
                get: () => config.surface_color || defaultConfig.surface_color,
                set: (value) => {
                  if (window.elementSdk && window.elementSdk.config) {
                    window.elementSdk.config.surface_color = value;
                    window.elementSdk.setConfig({ surface_color: value });
                  }
                }
              },
              {
                get: () => config.text_color || defaultConfig.text_color,
                set: (value) => {
                  if (window.elementSdk && window.elementSdk.config) {
                    window.elementSdk.config.text_color = value;
                    window.elementSdk.setConfig({ text_color: value });
                  }
                }
              },
              {
                get: () => config.primary_action_color || defaultConfig.primary_action_color,
                set: (value) => {
                  if (window.elementSdk && window.elementSdk.config) {
                    window.elementSdk.config.primary_action_color = value;
                    window.elementSdk.setConfig({ primary_action_color: value });
                  }
                }
              },
              {
                get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
                set: (value) => {
                  if (window.elementSdk && window.elementSdk.config) {
                    window.elementSdk.config.secondary_action_color = value;
                    window.elementSdk.setConfig({ secondary_action_color: value });
                  }
                }
              }
            ],
            borderables: [],
            fontEditable: {
              get: () => config.font_family || defaultConfig.font_family,
              set: (value) => {
                if (window.elementSdk && window.elementSdk.config) {
                  window.elementSdk.config.font_family = value;
                  window.elementSdk.setConfig({ font_family: value });
                }
              }
            },
            fontSizeable: {
              get: () => config.font_size || defaultConfig.font_size,
              set: (value) => {
                if (window.elementSdk && window.elementSdk.config) {
                  window.elementSdk.config.font_size = value;
                  window.elementSdk.setConfig({ font_size: value });
                }
              }
            }
          }),
          mapToEditPanelValues: (config) => new Map([
            ["hero_title", config.hero_title || defaultConfig.hero_title],
            ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
            ["cta_primary", config.cta_primary || defaultConfig.cta_primary],
            ["cta_secondary", config.cta_secondary || defaultConfig.cta_secondary],
            ["about_title", config.about_title || defaultConfig.about_title],
            ["services_title", config.services_title || defaultConfig.services_title],
            ["contact_title", config.contact_title || defaultConfig.contact_title],
            ["footer_text", config.footer_text || defaultConfig.footer_text],
            ["api_key", config.api_key || defaultConfig.api_key] // Ajout du champ API key dans le panneau d'édition
          ])
        });
      }
    }

    // Render services
    function renderServices() {
      const grid = document.getElementById('servicesGrid');
      grid.innerHTML = services.map(service => `
        <div class="service-card reveal bg-white rounded-3xl p-8 shadow-lg cursor-pointer" data-service-id="${service.id}">
          <div class="text-6xl mb-4 service-icon">${service.icon}</div>
          <h3 class="text-2xl font-bold mb-3">${service.title}</h3>
          <p class="text-gray-600 mb-4">${service.description}</p>
          <button class="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
            En savoir plus →
          </button>
        </div>
      `).join('');
      
      // Add click handlers
      document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
          const serviceId = parseInt(card.dataset.serviceId);
          const service = services.find(s => s.id === serviceId);
          if (service) openServiceModal(service);
        });
      });
    }

    // Render testimonials
    function renderTestimonials() {
      const slider = document.getElementById('testimonialSlider');
      const dots = document.getElementById('testimonialDots');
      
      slider.innerHTML = testimonials.map((testimonial, index) => `
        <div class="min-w-full px-4" style="flex: 0 0 100%;">
          <div class="bg-white rounded-3xl p-8 shadow-lg max-w-2xl mx-auto">
            <div class="flex mb-4">
              ${Array(testimonial.rating).fill('⭐').join('')}
            </div>
            <p class="text-gray-700 text-lg mb-4">"${testimonial.text}"</p>
            <p class="font-bold text-purple-600">— ${testimonial.name}</p>
          </div>
        </div>
      `).join('');
      
      dots.innerHTML = testimonials.map((_, index) => `
        <button class="w-3 h-3 rounded-full transition-all ${index === 0 ? 'bg-purple-600 w-8' : 'bg-gray-300'}" data-index="${index}"></button>
      `).join('');
      
      // Add dot click handlers
      document.querySelectorAll('#testimonialDots button').forEach(dot => {
        dot.addEventListener('click', () => {
          currentTestimonial = parseInt(dot.dataset.index);
          updateTestimonialSlider();
        });
      });
    }

    // Update testimonial slider
    function updateTestimonialSlider() {
      const slider = document.getElementById('testimonialSlider');
      slider.style.transform = `translateX(-${currentTestimonial * 100}%)`;
      
      document.querySelectorAll('#testimonialDots button').forEach((dot, index) => {
        if (index === currentTestimonial) {
          dot.classList.add('bg-purple-600', 'w-8');
          dot.classList.remove('bg-gray-300');
        } else {
          dot.classList.remove('bg-purple-600', 'w-8');
          dot.classList.add('bg-gray-300');
        }
      });
    }

    // Auto-rotate testimonials
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonialSlider();
    }, 5000);

    // Carousel functions
    function initCarousel() {
      const inner = document.getElementById('carouselInner');
      const indicators = document.getElementById('carouselIndicators');
      const prev = document.getElementById('carouselPrev');
      const next = document.getElementById('carouselNext');

      // Set slides
      inner.innerHTML = carouselImages.map(img => `<div class="carousel-slide" style="background-image: url('${img}');"></div>`).join('');

      // Indicators
      indicators.innerHTML = carouselImages.map((_, index) => `<div class="carousel-indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>`).join('');

      // Event listeners
      next.addEventListener('click', () => nextSlide());
      prev.addEventListener('click', () => prevSlide());
      document.querySelectorAll('.carousel-indicator').forEach(ind => {
        ind.addEventListener('click', () => goToSlide(parseInt(ind.dataset.slide)));
      });

      // Auto slide
      slideInterval = setInterval(nextSlide, 4000);

      // Pause on hover
      const carousel = document.getElementById('heroCarousel');
      carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
      carousel.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 4000));
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % carouselImages.length;
      updateCarousel();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + carouselImages.length) % carouselImages.length;
      updateCarousel();
    }

    function goToSlide(n) {
      currentSlide = n;
      updateCarousel();
    }

    function updateCarousel() {
      const inner = document.getElementById('carouselInner');
      inner.style.transform = `translateX(-${currentSlide * 100}%)`;

      document.querySelectorAll('.carousel-indicator').forEach((ind, index) => {
        ind.classList.toggle('active', index === currentSlide);
      });
    }

    // Open service modal
    function openServiceModal(service) {
      const modal = document.getElementById('serviceModal');
      const modalTitle = document.getElementById('modalTitle');
      const modalDescription = document.getElementById('modalDescription');
      const modalFeatures = document.getElementById('modalFeatures');
      
      modalTitle.textContent = service.title;
      modalDescription.textContent = service.description;
      modalFeatures.innerHTML = service.features.map(feature => `
        <li class="flex items-center gap-3">
          <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span>${feature}</span>
        </li>
      `).join('');
      
      modal.classList.add('active');
      modalOpen = true;
    }

    // Close service modal
    function closeServiceModal() {
      const modal = document.getElementById('serviceModal');
      modal.classList.remove('active');
      modalOpen = false;
    }

    // Scroll reveal animation
    function revealOnScroll() {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add('active');
        }
      });
    }

    // Animate stats counter
    function animateStats() {
      const stats = document.querySelectorAll('.stat-number');
      stats.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            stat.textContent = target + (stat.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '');
          }
        }, 16);
      });
    }

    // Fonction pour appeler l'API IA (ex: OpenAI Chat Completions)
    async function callAIAPI(message) {
      if (!aiApiKey) {
        return "Désolé, la clé API n'est pas configurée. Utilisez le panneau d'édition pour ajouter votre clé OpenAI (ou compatible).";
      }

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${aiApiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo', // Ou 'gpt-4' si disponible
            messages: [
              {
                role: 'system',
                content: 'Vous êtes un assistant virtuel pour CPropre, une entreprise de services de nettoyage en France. Répondez en français, de manière professionnelle, amicale et concise. Concentrez-vous sur les services de nettoyage, repassage, désinfection, tarifs (Essentiel 49€, Premium 89€, Entreprise sur devis), disponibilités (7j/7, 8h-20h), et encouragez les réservations via le formulaire ou +33 6 12 34 56 78.'
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 300,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          throw new Error(`Erreur API: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
      } catch (error) {
        console.error('Erreur lors de l\'appel API IA:', error);
        return "Désolé, une erreur s'est produite lors de la génération de la réponse. Vérifiez votre clé API et réessayez. Sinon, contactez-nous directement !";
      }
    }

    // Chat functionality
    function addChatMessage(message, isUser = false) {
      const messagesContainer = document.getElementById('chatMessages');
      const messageDiv = document.createElement('div');
      messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
      messageDiv.textContent = message;
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function handleChatMessage(message) {
      // Fallback rule-based si pas de clé API
      if (!aiApiKey) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('tarif') || lowerMessage.includes('prix') || lowerMessage.includes('coût')) {
          return "Nos tarifs commencent à 49€ pour une intervention de base. Nous proposons trois formules : Essentiel (49€), Premium (89€) et Entreprise (sur devis). Souhaitez-vous plus de détails sur une formule particulière ?";
        } else if (lowerMessage.includes('service') || lowerMessage.includes('proposez')) {
          return "Nous proposons 6 services principaux : Nettoyage maison, Nettoyage bureau, Repassage, Entretien sols, Désinfection et Petites réparations. Quel service vous intéresse ?";
        } else if (lowerMessage.includes('réserver') || lowerMessage.includes('rendez-vous')) {
          return "Pour réserver, vous pouvez remplir notre formulaire de contact en bas de page, nous appeler au +33 6 12 34 56 78, ou nous contacter via WhatsApp. Quand souhaitez-vous une intervention ?";
        } else if (lowerMessage.includes('horaire') || lowerMessage.includes('disponible')) {
          return "Nous intervenons 7j/7 de 8h à 20h. Nous nous adaptons à vos contraintes horaires. Quelle plage horaire vous conviendrait le mieux ?";
        } else if (lowerMessage.includes('zone') || lowerMessage.includes('où')) {
          return "Nous intervenons dans toute la région. Pour vérifier si nous couvrons votre zone, pourriez-vous me donner votre ville ou code postal ?";
        } else {
          return "Je suis là pour vous aider ! Vous pouvez me poser des questions sur nos services, nos tarifs, nos disponibilités ou prendre rendez-vous. Comment puis-je vous aider ?";
        }
      }

      // Appel à l'API IA si clé configurée
      addChatMessage('Envoi en cours...', false); // Placeholder pour indiquer le traitement
      const aiResponse = await callAIAPI(message);
      return aiResponse;
    }

    // Contact form submission
    async function handleContactForm(e) {
      e.preventDefault();
      
      const submitButton = e.target.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = "Envoi en cours...";
      submitButton.disabled = true;
      
      if (currentRecords.length >= 999) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-4';
        messageDiv.textContent = "Limite de 999 demandes atteinte. Veuillez nous contacter directement par téléphone.";
        e.target.appendChild(messageDiv);
        
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        return;
      }
      
      const formData = {
        id: Date.now().toString(),
        type: "contact",
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        message: document.getElementById('message').value,
        createdAt: new Date().toISOString()
      };
      
      if (window.dataSdk) {
        const result = await window.dataSdk.create(formData);
        
        if (result.isOk) {
          const successDiv = document.createElement('div');
          successDiv.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mt-4';
          successDiv.textContent = "Merci ! Votre demande a été envoyée. Nous vous contacterons très bientôt.";
          e.target.appendChild(successDiv);
          
          e.target.reset();
          
          setTimeout(() => {
            successDiv.remove();
          }, 5000);
        } else {
          const errorDiv = document.createElement('div');
          errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-4';
          errorDiv.textContent = "Une erreur est survenue. Veuillez réessayer ou nous contacter directement.";
          e.target.appendChild(errorDiv);
          
          setTimeout(() => {
            errorDiv.remove();
          }, 5000);
        }
      }
      
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }

    // Gestion de la logique pour les différentes "pages" (sections SPA)
    let currentPage = 'accueil'; // État de la page courante

    function handlePageNavigation(targetId) {
      if (currentPage === targetId) return;

      const pageLoader = document.getElementById('pageLoader');
      pageLoader.classList.add('active');

      // Hide current page
      const currentSection = document.getElementById(currentPage);
      if (currentSection) {
        currentSection.style.display = 'none';
      }

      setTimeout(() => {
        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.style.display = 'block';
          currentPage = targetId;
          
          // Réinitialiser les animations pour la nouvelle page
          setTimeout(() => {
            revealOnScroll();
            if (targetId === 'accueil' && !statsAnimated) {
              animateStats();
            }
          }, 100);
          
          // Logique spécifique par page
          switch (targetId) {
            case 'accueil':
              // Réinitialiser carousel si nécessaire
              initCarousel();
              break;
            case 'services':
              // Re-render services si dynamique
              renderServices();
              break;
            case 'apropos':
              // Logique pour timeline, etc.
              break;
            case 'tarifs':
              // Logique pour pricing
              break;
            case 'contact':
              // Focus sur formulaire
              document.getElementById('name').focus();
              break;
          }
        }

        // Hide loader
        setTimeout(() => {
          pageLoader.classList.remove('active');
        }, 300);
      }, 600); // Durée de chargement
    }

    // Event listeners
    document.addEventListener('DOMContentLoaded', async () => {
      // Hide loader
      setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
      }, 1000);
      
      // Initialize SDKs
      await initDataSDK();
      await initElementSDK();
      
      // Render content initial (pour page accueil)
      renderServices();
      renderTestimonials();
      initCarousel();
      
      // Scroll animations (désactivé pour mode page, utiliser navigation)
      window.addEventListener('scroll', () => {
        revealOnScroll();
        
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
      
      revealOnScroll();
      
      // Animate stats when visible
      let statsAnimated = false;
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !statsAnimated) {
            animateStats();
            statsAnimated = true;
          }
        });
      });
      
      const statsSection = document.querySelector('.stat-number');
      if (statsSection) {
        statsObserver.observe(statsSection.parentElement);
      }
      
      // Navigation pour pages (smooth scroll ET gestion d'état)
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1); // Enlever #
          if (targetId) {
            handlePageNavigation(targetId);
            // Scroll vers le haut pour simuler nouvelle page
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      });
      
      // Modal handlers
      document.getElementById('closeModal').addEventListener('click', closeServiceModal);
      document.getElementById('serviceModal').addEventListener('click', (e) => {
        if (e.target.id === 'serviceModal') {
          closeServiceModal();
        }
      });
      
      document.getElementById('modalReserveBtn').addEventListener('click', () => {
        closeServiceModal();
        handlePageNavigation('contact');
      });
      
      // CTA buttons
      document.getElementById('ctaPrimary').addEventListener('click', () => {
        handlePageNavigation('contact');
      });
      
      document.getElementById('ctaSecondary').addEventListener('click', () => {
        handlePageNavigation('contact');
      });
      
      // Chat handlers
      const chatButton = document.getElementById('chatButton');
      const chatWindow = document.getElementById('chatWindow');
      const closeChatBtn = document.getElementById('closeChatBtn');
      const chatInput = document.getElementById('chatInput');
      const chatSendBtn = document.getElementById('chatSendBtn');
      
      chatButton.addEventListener('click', () => {
        chatbotOpen = !chatbotOpen;
        chatWindow.classList.toggle('active', chatbotOpen);
      });
      
      closeChatBtn.addEventListener('click', () => {
        chatbotOpen = false;
        chatWindow.classList.remove('active');
      });
      
      async function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
          addChatMessage(message, true);
          chatInput.value = '';
          chatInput.disabled = true; // Désactiver pendant traitement
          chatSendBtn.disabled = true;
          
          const response = await handleChatMessage(message);
          addChatMessage(response, false);
          
          chatInput.disabled = false;
          chatSendBtn.disabled = false;
        }
      }
      
      chatSendBtn.addEventListener('click', sendChatMessage);
      
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendChatMessage();
        }
      });
      
      // Contact form
      document.getElementById('contactForm').addEventListener('submit', handleContactForm);

      // Initialisation de la page par défaut
      handlePageNavigation('accueil');
    });
