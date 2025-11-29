document.addEventListener("DOMContentLoaded", () => {
  // --- CONFIGURACIÓN ---
  // Coloca aquí el número real de Jeep Rental Ecuador
  const PHONE_NUMBER = "593999999999";

  // --- 1. LÓGICA DEL MENÚ MÓVIL ---
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  // Seleccionamos todos los enlaces dentro del menú
  const navItems = document.querySelectorAll(".nav-links a");

  if (menuToggle && navLinks) {
    // Función para abrir/cerrar menú y cambiar ícono
    const toggleMenu = () => {
      navLinks.classList.toggle("active");
      const icon = menuToggle.querySelector("i");

      if (navLinks.classList.contains("active")) {
        // Si está abierto, muestra la X
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        // Si está cerrado, muestra la hamburguesa
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    };

    // Evento 1: Clic en el botón hamburguesa
    menuToggle.addEventListener("click", toggleMenu);

    // Evento 2 (NUEVO): Clic en cualquier enlace del menú
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Si el menú está abierto, ciérralo automáticamente
        if (navLinks.classList.contains("active")) {
          toggleMenu();
        }
      });
    });
  }

  // --- 2. FORMULARIO PRINCIPAL ---
  const mainForm = document.querySelector(".booking-form");
  if (mainForm) {
    mainForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const carType = document.getElementById("car-select").value;
      const text = `Hola Jeep Rental Ecuador, estoy interesado en una aventura con el modelo: *${carType}*. ¿Tienen disponibilidad y precios?`;
      window.open(
        `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`,
        "_blank"
      );
    });
  }

  // --- 3. BOTONES DE COTIZAR EN TARJETAS ---
  const quoteButtons = document.querySelectorAll(".whatsapp-trigger");
  quoteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const carModel = btn.getAttribute("data-car");
      const text = `Hola, vi su página web y quiero cotizar el *${carModel}*.`;
      window.open(
        `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`,
        "_blank"
      );
    });
  });
});
