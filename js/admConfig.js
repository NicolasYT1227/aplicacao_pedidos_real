const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sellBtns = document.querySelectorAll('.btn-sell'); // Seleciona todos os botões de venda
const sections = document.querySelectorAll('section'); // Seleciona todas as áreas

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

sellBtns.forEach((sellBtn) => {
    sellBtn.addEventListener('click', () => {
        sections.forEach((section) => {
            section.style.display = 'none'; // Oculta todas as áreas
        });
        const relatedSectionId = sellBtn.dataset.target; // Obtém o ID da área relacionada ao botão
        const relatedSection = document.getElementById(relatedSectionId);
        if (relatedSection) {
            relatedSection.style.display = 'block'; // Exibe apenas a área relacionada ao botão
        }
    });
});