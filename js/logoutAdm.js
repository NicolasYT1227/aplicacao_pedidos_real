document.addEventListener("DOMContentLoaded", function() {
    const logoutLink = document.querySelector('a[href="logout.php"]');
    
    if (logoutLink) {
        logoutLink.addEventListener("click", function(event) {
            if (!confirm("Tem certeza de que deseja sair?")) {
                event.preventDefault(); // Cancela a ação padrão do link se o usuário não confirmar o logout.
            }
        });
    }
});



