<?php
if (session_status() == PHP_SESSION_NONE) session_start();
require_once("Config/Config.php");
require_once("Helpers/Helpers.php");

// 1. Obtener y limpiar la URL enviada
$url = !empty($_GET['url']) ? $_GET['url'] : 'Home/home';
$arrUrl = explode("/", trim($url, '/'));

// 2. Controladores globales/estáticos del sistema (Dashboard, Admin, etc.)
$globalControllers = ['home', 'login', 'error', 'admin', 'api', 'tenant'];
$tenantSlug = null;

// 3. Evaluar si el primer segmento es un Tenant Slug
if (!empty($arrUrl[0])) {
    $firstSegment = strtolower($arrUrl[0]);

    // Si NO está en la lista global Y NO existe un controlador con ese nombre en Controllers/
    if (!in_array($firstSegment, $globalControllers) && !file_exists("Controllers/" . ucfirst($firstSegment) . ".php")) {
        
        // Extraemos el slug del tenant (ej: "sava")
        $tenantSlug = array_shift($arrUrl);
        
        // Forzamos a que el Controlador objetivo sea Tenant.php
        // Y el método sea 'store' (o el siguiente parámetro de la URL)
        $controllerNameRaw = 'Tenant';
        $method = !empty($arrUrl[0]) ? $arrUrl[0] : 'store';
        
        if (!empty($arrUrl[1])) {
            $paramsArr = array_slice($arrUrl, 1);
            $params = implode(',', $paramsArr);
        } else {
            $params = "";
        }
    }
}

// Guardar el slug en constante global
define('TENANT_SLUG', $tenantSlug);

// 4. Si no fue un Tenant, determinar Controlador y Método normal
if (!isset($controllerNameRaw)) {
    $controllerNameRaw = !empty($arrUrl[0]) ? $arrUrl[0] : 'Home';
    $method            = !empty($arrUrl[1]) ? $arrUrl[1] : strtolower($controllerNameRaw);
    
    $params = "";
    if (!empty($arrUrl[2])) {
        $paramsArr = array_slice($arrUrl, 2);
        $params    = implode(',', $paramsArr);
    }
}

$controller = ucfirst($controllerNameRaw);

// 5. Carga del núcleo MVC
require_once('Libraries/Core/Autoload.php');
require_once('Libraries/Core/Load.php');
