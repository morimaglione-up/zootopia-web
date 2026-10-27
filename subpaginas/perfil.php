
<?php
session_start();

require_once __DIR__ . "/conexion.php";

/* =========================================================
   PROTEGER LA PÁGINA
========================================================= */

if (!isset($_SESSION["usuario_id"])) {
    header("Location: login.php");
    exit;
}

/* =========================================================
   OBTENER LOS DATOS DEL USUARIO
========================================================= */

$id_usuario = (int) $_SESSION["usuario_id"];

$consulta = "
    SELECT nombre, especie, usuario, fecha_registro
    FROM usuarios
    WHERE id = ?
    LIMIT 1
";

$stmt = mysqli_prepare($conexion, $consulta);

mysqli_stmt_bind_param($stmt, "i", $id_usuario);
mysqli_stmt_execute($stmt);

mysqli_stmt_bind_result(
    $stmt,
    $nombre,
    $especie,
    $usuario,
    $fecha_registro
);

$encontrado = mysqli_stmt_fetch($stmt);

mysqli_stmt_close($stmt);

if (!$encontrado) {

    $_SESSION = [];
    session_destroy();

    header("Location: login.php");
    exit;
}

/* =========================================================
   PERSONALIZAR SEGÚN ESPECIE
========================================================= */

$emojis = [
    "conejo" => "🐰",
    "zorro" => "🦊",
    "oso" => "🐻",
    "ciervo" => "🦌"
];

$emoji = $emojis[$especie] ?? "🐾";

$fecha = date("d/m/Y", strtotime($fecha_registro));

function escapar($texto) {
    return htmlspecialchars((string) $texto, ENT_QUOTES, "UTF-8");
}

?>

<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Zootopia | Mi perfil</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Righteous&display=swap"
        rel="stylesheet"
    >

    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/perfil.css?v=1">

</head>

<body class="pagina-perfil">

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <header class="navbar perfil-navbar">

        <a href="inicio.html" class="logo">
            ZOOTOPIA
        </a>

        <nav>

            <a href="inicio.html">Inicio</a>

            <a href="historia.html">Historia</a>

            <a href="personajes.html">Personajes</a>

            <a href="distritos.html">Distritos</a>

            <a href="mundo.html">Mundo Zootopia</a>

            <a href="curiosidades.html">Curiosidades</a>

            <a href="galeria.html">Galería</a>

            <a href="registro.html">Registrarse</a>

        </nav>

        <div class="search">
            ⌕
        </div>

    </header>


    <!-- =====================================================
         PERFIL
    ====================================================== -->

    <main class="perfil-pagina">

        <div class="perfil-contenedor">

            <p class="perfil-etiqueta">
                TU ESPACIO EN LA CIUDAD
            </p>

            <h1 class="perfil-titulo">
                Mi perfil.
            </h1>

            <p class="perfil-descripcion">
                Cada habitante tiene una historia.
                Este es tu lugar dentro de Zootopia.
            </p>

            <section class="perfil-tarjeta">

                <!-- LADO VISUAL -->

                <div class="perfil-visual">

                    <span class="perfil-emoji">
                        <?php echo $emoji; ?>
                    </span>

                </div>


                <!-- DATOS DEL USUARIO -->

                <div class="perfil-datos">

                    <h2>
                        <?php echo escapar($nombre); ?>
                    </h2>

                    <p class="perfil-usuario">
                        @<?php echo escapar($usuario); ?>
                    </p>

                    <div class="perfil-fila">

                        <span>ESPECIE</span>

                        <strong>
                            <?php echo escapar($especie); ?>
                        </strong>

                    </div>

                    <div class="perfil-fila">

                        <span>HABITANTE DESDE</span>

                        <strong>
                            <?php echo escapar($fecha); ?>
                        </strong>

                    </div>


                    <!-- ACCIONES -->

                    <div class="perfil-acciones">

                        <a href="inicio.html" class="perfil-boton">
                            EXPLORAR ZOOTOPIA →
                        </a>

                        <a href="logout.php" class="perfil-boton secundario">
                            CERRAR SESIÓN
                        </a>

                    </div>

                </div>

            </section>

        </div>

    </main>


    <!-- =====================================================
         FOOTER
    ====================================================== -->

    <footer class="footer">

        <div class="footer-superior">

            <div class="footer-marca">

                <div class="footer-logo">
                    ZOOTOPIA
                </div>

                <p>
                    Una ciudad enorme.<br>
                    Mucho por descubrir.
                </p>

            </div>

            <div class="footer-links">

                <a href="inicio.html">Inicio</a>

                <a href="historia.html">Historia</a>

                <a href="personajes.html">Personajes</a>

                <a href="distritos.html">Distritos</a>

                <a href="mundo.html">Mundo Zootopia</a>

                <a href="curiosidades.html">Curiosidades</a>

                <a href="galeria.html">Galería</a>

                <a href="registro.html">Registrarse</a>

            </div>

        </div>

        <div class="footer-linea"></div>

        <div class="footer-inferior">

            <p>
                Explorá la ciudad a tu manera.
            </p>

            <a href="#" class="footer-arriba">
                VOLVER ARRIBA ↑
            </a>

        </div>

    </footer>

</body>

</html>
