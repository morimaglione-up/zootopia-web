
<?php
session_start();

require_once __DIR__ . "/conexion.php";

/* =========================================================
   VALIDAR LOS DATOS DEL FORMULARIO
========================================================= */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: registro.html");
    exit;
}

$nombre = trim($_POST["nombre"] ?? "");
$especie = trim($_POST["especie"] ?? "");
$usuario = trim($_POST["usuario"] ?? "");
$contrasena = $_POST["contrasena"] ?? "";

$especies_validas = ["conejo", "zorro", "oso", "ciervo"];

if (
    $nombre === "" ||
    !in_array($especie, $especies_validas, true) ||
    strlen($nombre) > 100 ||
    !preg_match('/^[a-zA-Z0-9_]{3,100}$/', $usuario) ||
    strlen($contrasena) < 8 ||
    strlen($contrasena) > 72
) {
    exit(
        "Datos inválidos. Revisá los campos del formulario. " .
        "<a href='registro.html'>Volver al registro</a>"
    );
}

/* =========================================================
   COMPROBAR SI EL NOMBRE DE USUARIO YA EXISTE
========================================================= */

$consulta = "SELECT id FROM usuarios WHERE usuario = ? LIMIT 1";

$stmt = mysqli_prepare($conexion, $consulta);

mysqli_stmt_bind_param($stmt, "s", $usuario);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);

if (mysqli_stmt_num_rows($stmt) > 0) {

    mysqli_stmt_close($stmt);

    exit(
        "Ese nombre de usuario ya está registrado. " .
        "<a href='registro.html'>Elegí otro nombre de usuario</a>"
    );
}

mysqli_stmt_close($stmt);

/* =========================================================
   GUARDAR EL USUARIO EN LA BASE DE DATOS
========================================================= */

$contrasena_segura = password_hash(
    $contrasena,
    PASSWORD_DEFAULT
);

$consulta = "
    INSERT INTO usuarios (nombre, especie, usuario, contrasena)
    VALUES (?, ?, ?, ?)
";

$stmt = mysqli_prepare($conexion, $consulta);

mysqli_stmt_bind_param(
    $stmt,
    "ssss",
    $nombre,
    $especie,
    $usuario,
    $contrasena_segura
);

if (!mysqli_stmt_execute($stmt)) {

    mysqli_stmt_close($stmt);

    exit(
        "No se pudo crear el perfil. " .
        "<a href='registro.html'>Intentar nuevamente</a>"
    );
}

$id_usuario = mysqli_insert_id($conexion);

mysqli_stmt_close($stmt);

/* =========================================================
   INICIAR SESIÓN AUTOMÁTICAMENTE
========================================================= */

session_regenerate_id(true);

$_SESSION["usuario_id"] = $id_usuario;
$_SESSION["usuario_nombre"] = $nombre;
$_SESSION["usuario_especie"] = $especie;
$_SESSION["usuario"] = $usuario;

/* =========================================================
   EMOJI SEGÚN LA ESPECIE
========================================================= */

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
    <link rel="stylesheet" href="../css/bienvenida.css?v=1">

</head>

<body class="pagina-bienvenida">

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <header class="navbar bienvenida-navbar">

        <a href="inicio.html" class="logo">
            ZOOTOPIA
        </a>

        <nav>

            <a href="inicio.html">
                Inicio
            </a>

            <a href="historia.html">
                Historia
            </a>

            <a href="personajes.html">
                Personajes
            </a>

            <a href="distritos.html">
                Distritos
            </a>

            <a href="mundo.html">
                Mundo Zootopia
            </a>

            <a href="curiosidades.html">
                Curiosidades
            </a>

            <a href="galeria.html">
                Galería
            </a>

            <a href="registro.html">
                Registrarse
            </a>

        </nav>

        <div class="search">
            ⌕
        </div>

    </header>


    <!-- =====================================================
         BIENVENIDA
    ====================================================== -->

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
                <?php echo htmlspecialchars($nombre, ENT_QUOTES, "UTF-8"); ?>.
            </h1>

            <p class="bienvenida-texto">
                Completaste tu recorrido y elegiste formar parte de la ciudad como
                <strong>
                    <?php echo htmlspecialchars($especie, ENT_QUOTES, "UTF-8"); ?>
                </strong>.
            </p>

            <a href="inicio.html" class="bienvenida-boton">
                VOLVER AL INICIO
                <span>→</span>
            </a>

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

                <a href="inicio.html">
                    Inicio
                </a>

                <a href="historia.html">
                    Historia
                </a>

                <a href="personajes.html">
                    Personajes
                </a>

                <a href="distritos.html">
                    Distritos
                </a>

                <a href="mundo.html">
                    Mundo Zootopia
                </a>

                <a href="curiosidades.html">
                    Curiosidades
                </a>

                <a href="galeria.html">
                    Galería
                </a>

                <a href="registro.html">
                    Registrarse
                </a>

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
