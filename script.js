document.addEventListener("DOMContentLoaded", () => {
  // --- 1. MENÚ MÓVIL RESPONSIVE ---
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      // Cambiar icono de hamburguesa a X
      const icon = menuToggle.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Cerrar menú al hacer click en un enlace
    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    });
  }

  // --- 2. LÓGICA DEL CARRUSEL DE VEHÍCULOS (FLECHAS) ---
  const fleetGrid = document.querySelector(".fleet-grid");

  if (fleetGrid) {
    // Crear botones de navegación dinámicamente
    const prevBtn = document.createElement("button");
    const nextBtn = document.createElement("button");

    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

    prevBtn.className = "carousel-nav prev";
    nextBtn.className = "carousel-nav next";

    // Estilos inyectados para los botones (para no ensuciar tu CSS)
    const style = document.createElement("style");
    style.innerHTML = `
            .carousel-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: white;
                border: none;
                width: 40px; height: 40px;
                border-radius: 50%;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                cursor: pointer;
                z-index: 10;
                color: var(--primary);
                font-size: 1.2rem;
                transition: 0.3s;
                display: none; /* Oculto por defecto en móvil */
            }
            @media(min-width: 769px) { .carousel-nav { display: flex; align-items: center; justify-content: center; } }
            .carousel-nav:hover { background: var(--accent); color: var(--dark); }
            .carousel-nav.prev { left: 10px; }
            .carousel-nav.next { right: 10px; }
            .fleet-wrapper { position: relative; } /* Necesario para posicionar flechas */
        `;
    document.head.appendChild(style);

    // Envolver el grid para posicionar las flechas
    const wrapper = document.createElement("div");
    wrapper.className = "fleet-wrapper";
    fleetGrid.parentNode.insertBefore(wrapper, fleetGrid);
    wrapper.appendChild(fleetGrid);
    wrapper.appendChild(prevBtn);
    wrapper.appendChild(nextBtn);

    // Funcionalidad de desplazamiento
    const scrollAmount = 340; // Ancho de tarjeta + gap

    nextBtn.addEventListener("click", () => {
      fleetGrid.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      fleetGrid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  // --- 3. FILTRADO INTELIGENTE ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const carCards = document.querySelectorAll(".car-card");

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Gestionar clase activa
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        carCards.forEach((card) => {
          const category = card.getAttribute("data-category");

          if (filterValue === "all" || category === filterValue) {
            card.style.display = "flex"; // Flex para mantener diseño
            // Pequeña animación al aparecer
            card.style.opacity = "0";
            setTimeout(() => (card.style.opacity = "1"), 50);
          } else {
            card.style.display = "none";
          }
        });

        // REINICIAR POSICIÓN DEL SCROLL AL FILTRAR
        // Esto evita que si estás al final del carrusel y filtras, no veas nada
        if (fleetGrid) {
          fleetGrid.scrollTo({ left: 0, behavior: "smooth" });
        }
      });
    });
  }

  // --- 4. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER) ---
  // Agregamos clases 'fade-in' a elementos clave si no las tienen
  const elementsToAnimate = document.querySelectorAll(
    ".section-title, .car-card, .hero-content, .location-container"
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in"); // Asegura que tengan la clase base CSS
    observer.observe(el);
  });

  // --- 5. INTEGRACIÓN WHATSAPP DINÁMICA ---
  const phoneNumber = "593999999999"; // ⚠️ CAMBIA ESTO POR TU NÚMERO REAL

  // Para botones de reserva en tarjetas
  document.querySelectorAll(".whatsapp-trigger").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const carName = btn.getAttribute("data-car");
      const message = `Hola JeepRentals, estoy interesado en el *${carName}*. ¿Me pueden dar más información?`;
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    });
  });

  // Para el formulario del Hero
  const bookingForm = document.querySelector(".booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const carSelect = document.getElementById("hero-car-select");
      const car = carSelect ? carSelect.value : "General";
      const start = document.getElementById("start-date").value;
      const end = document.getElementById("end-date").value;

      if (!start || !end) {
        alert("Por favor selecciona las fechas");
        return;
      }

      const message = `Hola, deseo cotizar:\n🚘 *Vehículo:* ${car}\n📅 *Desde:* ${start}\n📅 *Hasta:* ${end}`;
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    });
  }
});
