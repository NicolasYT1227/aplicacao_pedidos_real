<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    session_start();
    include_once('userRegis.php');

    $nome = filter_input(INPUT_POST, 'usuario', FILTER_SANITIZE_STRING);
    $senha = filter_input(INPUT_POST, 'senha', FILTER_SANITIZE_STRING);

    // Verificação do nome do usuário
    if (!empty($nome) && strlen($nome) >= 2) { // Verifica se não está vazio e tem pelo menos 2 caracteres
        // Verificação da senha
        if (strlen($senha) >= 6 && strlen($senha) <= 12) { // Verifica se a senha tem entre 8 e 16 caracteres

            // Verificar se o nome de usuário já existe no banco
            $checkQuery = "SELECT nome FROM usuario WHERE nome = '$nome'";
            $checkResult = mysqli_query($conn, $checkQuery);

            if (mysqli_num_rows($checkResult) > 0) {
                echo "O nome de usuário já existe. Por favor, escolha outro.";
            } else {
                // Hash da senha (usando password_hash para armazenamento seguro)
                $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

                $result = "INSERT INTO usuario (nome, senha) VALUES('$nome', '$senhaHash')";
                $resultado_usuario = mysqli_query($conn, $result);

                if (mysqli_insert_id($conn)) {
                    echo "O usuário foi cadastrado com sucesso";
                    header("Location: loginAdm.php");
                } else {
                    echo "Erro no cadastro";
                }
            }
        } else {
            // echo "A senha deve ter entre 8 e 16 caracteres.";
        }
    } else {
       // echo "O nome de usuário deve ter pelo menos 2 caracteres.";
    }
}

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="icon" href="img/person_add_FILL0_wght400_GRAD0_opsz24.svg">

    <title>Cadastro de usuários</title>

    <link rel="stylesheet" href="css/cadastroUser.css">
</head>
<body>
    <div class="cadastro-adm">
        <div class="left-colunm">
            <h1>Gerencie a sua empresa</h1>
            <img src="img/cadastroUser.svg" class="admImgRegis">
        </div>
        <div class="right-colunm">
            <div class="card-registro">
                <h1>Cadastre-se</h1>
    
                <form method="POST" action="cadastroUser.php">
                    <?php
                        if(isset($_SESSION['msg'])){
                            echo $_SESSION['msg'];
                            unset($_SESSION['msg']);
                        }
                    ?>
                    <div class="main">
                        <label for="usuario">Usuário</label>
                        <input type="text" name="usuario" class="regis-user" placeholder="Cadastre um usuário">
                    </div>
                    <div class="main">
                        <label for="senha">Senha</label>
                        <input type="password" name="senha" class="regis-password" placeholder="Cadastre uma senha">
                    </div>
                    <button type="submit" class="btn-registro">Cadastrar</button>
                </form>
        </div>
    </div>
</body>
</html>