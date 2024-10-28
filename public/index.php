<?php
// public/index.php
//CORS
header("Access-Control-Allow-Origin: *");

// Permitir los métodos que se van a aceptar
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

// Permitir las cabeceras que se van a aceptar
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once '../core/Router.php';
?>

