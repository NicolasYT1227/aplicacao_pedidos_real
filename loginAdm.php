<?php include_once('users.php');
include_once('users.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['usuario']) && isset($_POST['senha'])) {
        $nome = $_POST['usuario'];
        $senha = $_POST['senha'];

        // Estabeleça a conexão com o banco de dados (substitua as credenciais apropriadas)
        $conn = new mysqli("localhost", "root", "", "pastelaria");

        // Verifique a conexão
        if ($conn->connect_error) {
            die("Conexão com o banco de dados falhou: " . $conn->connect_error);
        }

        // Use uma declaração preparada para evitar a injeção de SQL
        $sql = "SELECT * FROM usuario WHERE nome = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $nome);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result) {
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                if (isset($row['senha']) && password_verify($senha, $row['senha'])) {
                    echo "Login bem-sucedido!";
                    header("Location: painelAdm.php");
                    exit;
                } else {
                    echo "Login ou senha incorretos. Tente novamente.";
                }
            } else {
                echo "Usuário não encontrado.";
            }
        } else {
            echo "Erro na consulta SQL: " . $conn->error;
        }

        // Feche a conexão com o banco de dados quando terminar
        $stmt->close();
        $conn->close();
    } else {
        echo "Campos de usuário e senha não foram preenchidos corretamente.";
    }
}

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login painel de ADM</title>

    <link rel="icon" href="img/passkey_FILL0_wght400_GRAD0_opsz24.svg">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    <link rel="stylesheet" href="css/loginAdm.css">
</head>
<body>
   <div class="main-loginAdm">
        <div class="left-colunm">
            <h1>Faça o login para acessar as informações</h1>
            <img src="img/Admin.svg" class="admImg">
        </div>
        <div class="right-colunm">
            <div class="card-login">
                <h1>LOGIN</h1>

                <form method="POST" action="">
                    <div class="text-main">
                        <label for="usuario">Usuário</label>
                        <input type="text" name="usuario" placeholder="usuário" id="user">
                    </div>
                    <div class="text-main">
                        <label for="senha">Senha</label>
                        <input type="password" name="senha" placeholder="insira a sua senha" id="senha">
                    </div>
                    <button class="btn-login">Login</button>
                </form>
                
                <!--Button redirect register-->
                <form method="POST" action="cadastroUser.php">
                    <div class="regis-title">
                        <legend id="regis">Não tem um usuário?<button class="btn-registro" id="btnRegis">Cadastre-se já!</button></legend>
                    </div>
                </form>
                <!--/Button redirect register-->
            </div>
        </div>
   </div>
</body>
</html>