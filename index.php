<?php
session_start(); // Iniciar a sessão

// Verifica se o nome do usuário está definido na sessão
if (!isset($_SESSION['nome'])) {
    // Se o usuário não estiver logado, redireciona para a página de cadastro
    header("Location: cadastro.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Inicial</title>
    <style>
        *{
            border:0;
            padding: 0;
        }

        span {
            color: red;
        }

    </style>
</head>
<body>
    <header>
        <div id="user-info">
            <p>Bem-vindo, <span> <?php echo htmlspecialchars($_SESSION['nome']); ?> </span>!</p>
            <p>Email: <?php echo htmlspecialchars($_SESSION['email']); ?></p>
            <form action="logout.php" method="POST">
                <button type="submit">Sair</button>
            </form>
        </div>
    </header>

    <h1>Conteúdo da Página Inicial</h1>
</body>
</html>
