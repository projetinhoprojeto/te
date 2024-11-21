<?php
date_default_timezone_set('America/Sao_Paulo');
// Conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "meu_banco_de_dados"; // Substitua com seu banco de dados

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Verificando se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Pegando os dados do formulário
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $data = $_POST['data'];
    $cpf = $_POST['cpf'];
    $genero = $_POST['genero'];
    $nomeMaterno = $_POST['NomeMaterno'];
    $telefoneCelular = $_POST['telefoneCelular'];
    $telefoneFixo = $_POST['telefoneFixo'];
    $cep = $_POST['cep'];
    $endereco = $_POST['endereco'];
    $senha = $_POST['senha']; // Senha simples, sem criptografia
    $datelogin = date('Y-m-d H:i:s');

    // Pegando o nome da imagem do perfil selecionado
    $fotoperfil = $_POST['fotoperfil'];  // Este é o valor que foi preenchido no campo oculto

    // Preparando a query para inserir no banco de dados
    $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, data_nascimento, cpf, genero, nome_materno, telefoneCelular, telefoneFixo, cep, endereco, senha, status_ativo, ultima_vez_visto, perfil, fotoperfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, 'comum', ?)");
    $stmt->bind_param("sssssssssssss", $nome, $email, $data, $cpf, $genero, $nomeMaterno, $telefoneCelular, $telefoneFixo, $cep, $endereco, $senha, $datelogin, $fotoperfil);

    // Executando a query
    if ($stmt->execute()) {
        echo "Usuário cadastrado com sucesso!";
        // Redirecionar ou exibir mensagem de sucesso
    } else {
        echo "Erro ao cadastrar: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
