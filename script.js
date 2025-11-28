document.addEventListener("DOMContentLoaded", () => {
  // --- 1. LÓGICA DEL MENÚ MÓVIL ---
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links li a");
  const icon = menuToggle.querySelector("i");

  // Función para alternar menú
  const toggleMenu = () => {
    navLinks.classList.toggle("active");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  };

  menuToggle.addEventListener("click", toggleMenu);

  // Cerrar menú al hacer click en un enlace
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // --- 2. LÓGICA DEL FORMULARIO A WHATSAPP ---
  const form = document.querySelector(".booking-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Detener recarga normal

    const select = document.getElementById("car-select");
    const carType = select.value;
    const phoneNumber = "593999999999"; // ¡CAMBIA ESTO POR TU NÚMERO!

    // Construcción del mensaje
    // Usamos encodeURIComponent para que los espacios y caracteres especiales funcionen en la URL
    const text = `Hola AutoRentaUIO, estoy interesado en cotizar el siguiente vehículo: *${carType}*. ¿Tienen disponibilidad?`;

    // Redirección
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });

  // --- 3. PEQUEÑO EFECTO DE SCROLL EN NAVBAR (Opcional) ---
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.padding = "0.5rem 5%";
    } else {
      navbar.style.padding = "1rem 5%";
    }
  });
});
