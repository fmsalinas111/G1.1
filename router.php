<?php
// Obtener la ruta limpia enviada por el navegador
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// 1. Si el archivo existe físicamente (imágenes, CSS, JS), sírvelo directo
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// 2. Si no es un archivo, inyecta la ruta en $_GET['url'] y carga index.php
$_GET['url'] = ltrim($uri, '/');

require_once __DIR__ . '/index.php';
