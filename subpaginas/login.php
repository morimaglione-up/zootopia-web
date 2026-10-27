
<?php
session_start();

require_once __DIR__ . "/conexion.php";

/* =========================================================
   SI YA INICIÓ SESIÓN
========================================================= */

if (isset($_SESSION["usuario_id"])) {
    header("Location: perfil.php");
    exit;
}

/* =========================================================
   PROCESAR INICIO DE SESIÓN
========================================================= */

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $usuario = trim($_POST["usuario"] ?? "");
    $contrasena = $_POST["contrasena"] ?? "";

    if ($usuario === "" || $contrasena === "") {

        $error = "Completá tu usuario y contraseña.";

    } else {

        $consulta = "
            SELECT id, nombre, especie, usuario, contrasena
            FROM usuarios
            WHERE usuario = ?
            LIMIT 1
        ";

        $stmt = mysqli_prepare($conexion, $consulta);

        mysqli_stmt_bind_param($stmt, "s", $usuario);
        mysqli_stmt_execute($stmt);

        mysqli_stmt_bind_result(
            $stmt,
            $id,
            $nombre,
            $especie,
            $usuario_guardado,
            $contrasena_guardada
        );

        $encontrado = mysqli_stmt_fetch($stmt);

        mysqli_stmt_close($stmt);

        if (
            $encontrado &&
            $contrasena_guardada !== null &&
            password_verify($contrasena, $contrasena_guardada)
        ) {

            session_regenerate_id(true);

            $_SESSION["usuario_id"] = $id;
            $_SESSION["usuario_nombre"] = $nombre;
            $_SESSION["usuario_especie"] = $especie;
            $_SESSION["usuario"] = $usuario_guardado;

            header("Location: perfil.php");
            exit;

        } else {

            $error = "El usuario o la contraseña son incorrectos.";

        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Zootopia | Iniciar sesión</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Righteous&display=swap"
        rel="stylesheet"
    >

    <link rel="stylesheet" href="../css/estilos.css">
    <link rel="stylesheet" href="../css/registro.css">
    <link rel="stylesheet" href="../css/login.css?v=1">

</head>

<body class="pagina-registro pagina-login">

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <header class="navbar login-navbar">

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
         LOGIN
    ====================================================== -->

    <section class="registro">

        <div class="registro-circulo circulo-uno"></div>
        <div class="registro-circulo circulo-dos"></div>

        <div class="registro-contenido">

            <p class="registro-mini">
                BIENVENIDO DE NUEVO
            </p>

            <h1>
                Volvé a<br>
                Zootopia.
            </h1>

            <p class="registro-bajada">
                Tu lugar en la ciudad te está esperando.
                Iniciá sesión para volver a tu perfil.
            </p>

            <form action="login.php" method="post" class="registro-form">

                <?php if ($error !== ""): ?>

                    <div class="login-error" role="alert">
                        <?php
                        echo htmlspecialchars(
                            $error,
                            ENT_QUOTES,
                            "UTF-8"
                        );
                        ?>
                    </div>

                <?php endif; ?>

                <div class="registro-campo">

                    <label for="usuario">
                        NOMBRE DE USUARIO
                    </label>

                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Ingresá tu usuario"
                        maxlength="100"
                        autocomplete="username"
                        required
                    >

                </div>

                <div class="registro-campo">

                    <label for="contrasena">
                        CONTRASEÑA
                    </label>

                    <input
                        type="password"
                        id="contrasena"
                        name="contrasena"
                        placeholder="Ingresá tu contraseña"
                        autocomplete="current-password"
                        required
                    >

                </div>

                <button type="submit" class="registro-boton">
                    INICIAR SESIÓN
                    <span>→</span>
                </button>

            </form>

            <p class="login-enlace">
                ¿Todavía no tenés una cuenta?
                <a href="registro.html">Creá tu perfil</a>
            </p>

        </div>


        <!-- =================================================
             LATERAL
        ================================================== -->

        <div class="registro-lateral login-lateral">

            <p>
                TU CIUDAD TE ESPERA
            </p>

            <div class="registro-pasos">

                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
                <span>06</span>

            </div>

            <strong>
                Cada habitante tiene<br>
                su lugar en Zootopia.<br>
                Volvé a encontrar el tuyo.
            </strong>

        </div>

    </section>


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
