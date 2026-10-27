<?php

$servidor = "127.0.0.1";
$usuario = "root";
$contrasena = "";
$baseDeDatos = "zootopia";
$puerto = 3306;

$conexion = mysqli_connect(
    $servidor,
    $usuario,
    $contrasena,
    $baseDeDatos,
    $puerto
);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

?>