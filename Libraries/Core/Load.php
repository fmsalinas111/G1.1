<?php 
// --- DIAGNÓSTICO TEMPORAL ---
$dt = "<div style='background:#111; color:#0f0; padding:10px; font-family:monospace;'>";
$dt .=  "URL recibida: <b>" . (isset($_GET['url']) ? $_GET['url'] : 'VACÍA') . "</b><br>";
$dt .=  "Controlador a buscar: <b>" . $controller . "</b><br>";
$dt .=  "Método: <b>" . $method . "</b><br>";
$dt .=  "tenant: <b>" . TENANT_SLUG . "</b><br>";
$dt.=   $_SERVER["SERVER_NAME"] ;		 
$dt .=  "</div>";
// -----------------------------
// echo $dt ;
$controllerName = ucfirst(strtolower($controller));
// En Load.php (o donde instancies la clase):
$controllerFile = "Controllers/" . $controller . ".php";

if (file_exists($controllerFile)) {
    require_once($controllerFile);
    $controllerInstance = new $controller();

    if (method_exists($controllerInstance, $method)) {
        $controllerInstance->$method($params);
    } else {
        // Redirigir a vista de error 404 si el método no existe dentro de la clase
        require_once("Controllers/Error.php");
        $err = new Errors();
        $err->notFound();
    }
} 