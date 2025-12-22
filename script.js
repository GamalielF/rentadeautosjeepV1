document.addEventListener("DOMContentLoaded", () => {
  // --- CONFIGURACIÓN GLOBAL ---
  const CONFIG = {
    phone: "593968727459", // Número real corregido de tus flyers
    fbUrl: "https://www.facebook.com/profile.php?id=61560968241236",
    defaultMsg: "Hola Jeep Rentals, quiero más información.",
  };

  // 1. Configurar Redes Sociales
  const fbLinks = document.querySelectorAll('a[href*="facebook"]');
  if (fbLinks) fbLinks.forEach((l) => (l.href = CONFIG.fbUrl));

  const floatBtn = document.querySelector(".whatsapp-float");
  if (floatBtn)
    floatBtn.href = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(
      CONFIG.defaultMsg
    )}`;

  // 2. Menú Móvil
  const menuBtn = document.getElementById("mobile-menu");
  const nav = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");
      const icon = menuBtn.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });

    // Cerrar menú al hacer clic en un enlace
    navItems.forEach((item) => {
      item.addEventListener("click", () => nav.classList.remove("active"));
    });
  }

  // 3. Sistema de Filtros (Categorías)
  const filters = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".car-card");

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Activar botón visualmente
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      cards.forEach((card) => {
        // Resetear animación
        card.classList.remove("show");

        if (
          category === "all" ||
          card.getAttribute("data-category") === category
        ) {
          card.classList.remove("hide");
          // Pequeño delay para permitir que el navegador procese el cambio de display
          setTimeout(() => card.classList.add("show"), 10);
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  // 4. Formulario Principal (Hero)
  const form = document.querySelector(".booking-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const car = document.getElementById("hero-car-select").value;
      const start = document.getElementById("start-date").value;
      const end = document.getElementById("end-date").value;

      if (!start || !end) {
        alert("Por favor selecciona las fechas de tu viaje.");
        return;
      }

      const msg = `Hola, quiero cotizar:\n🚙 Vehículo: ${car}\n📅 Desde: ${start}\n📅 Hasta: ${end}`;
      window.open(
        `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
    });
  }

  // 5. Botones Individuales de Reserva
  document.querySelectorAll(".whatsapp-trigger").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const model = btn.getAttribute("data-car");
      const msg = `Hola, estoy interesado en reservar el: *${model}*. ¿Tienen disponibilidad?`;
      window.open(
        `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
    });
  });
});
