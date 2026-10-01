<?php

require_once "../conexion.php";

$nombre = $_POST["nombre"] ?? "Visitante";
$especie = $_POST["especie"] ?? "otro";

$consulta = "INSERT INTO usuarios (nombre, especie) VALUES (?, ?)";

$stmt = mysqli_prepare($conexion, $consulta);

mysqli_stmt_bind_param(
    $stmt,
    "ss",
    $nombre,
    $especie
);

mysqli_stmt_execute($stmt);

$emoji = "🐾";

if ($especie === "conejo") {
    $emoji = "🐰";
}
elseif ($especie === "zorro") {
    $emoji = "🦊";
}
elseif ($especie === "oso") {
    $emoji = "🐻";
}
elseif ($especie === "ciervo") {
    $emoji = "🦌";
}

?>

<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Zootopia | Perfil creado</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Righteous&display=swap"
        rel="stylesheet"
    >

    <link rel="stylesheet" href="../css/estilos.css">

</head>

<body class="pagina-bienvenida">

    <main class="bienvenida">

        <div class="bienvenida-contenido">

            <p class="bienvenida-mini">
                PERFIL CREADO
            </p>

            <div class="bienvenida-animal">
                <?php echo $emoji; ?>
            </div>

            <h1>
                Ya sos parte de Zootopia,<br>
                <?php echo htmlspecialchars($nombre); ?>.
            </h1>

            <p class="bienvenida-texto">
                Completaste tu recorrido y elegiste formar parte de la ciudad como
                <strong><?php echo htmlspecialchars($especie); ?></strong>.
            </p>

            <a href="../inicio.html" class="bienvenida-boton">
                VOLVER AL INICIO
                <span>→</span>
            </a>

        </div>

    </main>

</body>

</html>
