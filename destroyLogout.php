<?php
function destroyLogin()
{
    session_start();

    // Limpando todas as variáveis de sessão
    $_SESSION = array();

    // Destruindo a sessão
    session_destroy();

    // Garantindo a expiração imediata do cookie de sessão
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params["path"],
            $params["domain"],
            $params["secure"],
            $params["httponly"]
        );
    }

    // Prevenindo que a sessão seja retomada após o logout
    session_regenerate_id(false);

    header("Location: loginAdm.php");
    exit;
}

destroyLogin(); // Chama a função para encerrar a sessão
?>
