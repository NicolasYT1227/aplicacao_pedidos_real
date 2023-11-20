<?php

$Servidor = 'localhost';
$Username = 'root';
$Password = '';
$dbName = 'pastelaria';

$conn = new mysqli($Servidor, $Username, $Password, $dbName);

$dbConnection = $conn;

// if($conn->connect_errno){
    // echo "Erro na conexão";
// } else {
    // echo "Sucesso na conexão";
// }

function buscaUser($conexao){
    $sql = "SELECT * FROM usuario"; // Correção na consulta SQL
    return $conexao->query($sql);
}

class User {
    private $conn;

    // Construtor que recebe uma conexão com o banco de dados
    public function __construct($dbConnection) {
        $this->conn = $dbConnection;
    }

    // Método para buscar os dados do usuário
    public function buscar() {
        $query = "SELECT * FROM usuario"; // Substitua "usuarios" pelo nome da tabela no seu banco de dados

        $resultado = $this->conn->query($query);

        return $resultado;
    }

    // Método para verificar o login
    public function verificarLogin($username, $password) {
        $query = "SELECT * FROM usuario WHERE nome = ?"; // Substitua "usuarios" pelo nome da tabela no seu banco de dados

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();

        $resultado = $stmt->get_result();

        if ($resultado->num_rows === 1) {
            $row = $resultado->fetch_assoc();
            $passwordDB = $row['senha'];

            if (password_verify($password, $passwordDB)) {
                return true; // Login bem-sucedido
                header("location: painelAdm.php");
            }
        }

        return false; // Login falhou
    }
}
?>
