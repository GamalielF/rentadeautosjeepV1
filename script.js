document.addEventListener("DOMContentLoaded", () => {
  // --- CONFIGURACIÓN ---
  // ¡IMPORTANTE! Pon aquí el número real de Jeep Rental Ecuador
  // Si no lo tienes, puedes dejar uno genérico hasta conseguirlo.
  const PHONE_NUMBER = "593991517141";

  // --- 1. MENÚ MÓVIL ---
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = menuToggle.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
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

  // --- 3. BOTONES DE COTIZAR EN TARJETAS (NUEVO) ---
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
