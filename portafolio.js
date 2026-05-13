// Confirmación de carga
document.addEventListener("DOMContentLoaded", () => {
    console.log("Portafolio de Angie Vanessa cargado profesionalmente.");

    // Cerrar el menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll(".nav-link");
    const menuToggle = document.getElementById("navbarNav");
    const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
    
    navLinks.forEach((l) => {
        l.addEventListener("click", () => {
            if (window.innerWidth < 992) {
                bsCollapse.toggle();
            }
        });
    });

    // Efecto de scroll suave (Nativo de CSS pero reforzado con JS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});