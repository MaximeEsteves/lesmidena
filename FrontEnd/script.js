//  import stockArticles from './stock-article.js';
  const focusableSelector = 'a, textarea, button, i[tabindex], input, select';
  let focusables = [];
  let previousActiveElement = null;
// Fonction utilitaire fetchData
async function fetchData(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(`Erreur HTTP: ${res.status}`);
    }
  } catch (error) {
    console.error("fetchData error:", error);
    throw error;
  }
}
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const productsData = await fetchData("http://localhost:3000/api/produits");

    // Appeler projets() et filtres() avec les données récupérées
    projets(productsData);
    filtres(productsData);

    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des produits :", error);
  }
});

 /* eventListener "keydown" */
 window.addEventListener("keydown", function(e) {
     const modal = document.querySelector(".modal");
     if (e.key === "Escape" || e.key === "Esc") {
         closeModal();
     }
     // Exécuter le focus trap uniquement si la modale est visible
     if (e.key === "Tab") {
         // Vérifier si la modale est ouverte (par exemple, mode flex ou autre)
         if (window.getComputedStyle(modal).display !== "none") {
             e.preventDefault();
             focusInModal(e);
         }
     }
 });

window.addEventListener("scroll", function() {
  const scrollPosition = window.scrollY;
  const parallaxImage = document.querySelector('.parallax-wrapper img');
  // Ajuster ce coefficient pour modifier l'intensité du décalage
  parallaxImage.style.transform = "translateY(" + (scrollPosition * 0.5) + "px)";
});