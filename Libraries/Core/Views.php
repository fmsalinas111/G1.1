<?php
class Views {

    public function getView($controller, string $view, array $data = []) {
        if (!str_ends_with($view, '.php')) {
            $view .= '.php';
        }

        $controllerName = is_object($controller) ? get_class($controller) : $controller;
        
        $nameCapitalized = ucfirst(strtolower($controllerName)); // Ej: Clients
        $nameLower = strtolower($controllerName);                // Ej: clients

        // Posibles rutas para la vista
        $paths = [
            "Views/" . $nameCapitalized . "/" . $view, // Views/Clients/clients.php
            "Views/" . $nameLower . "/" . $view,       // Views/clients/clients.php
            "Views/" . $view                           // Views/clients.php (global)
        ];

        foreach ($paths as $path) {
            if (file_exists($path)) {
                require_once $path;
                return;
            }
        }

        // Si no la encuentra en ninguna de las rutas
        die("<b style='color:red;'>Error MVC:</b> La vista <code>{$view}</code> no fue encontrada.<br>Rutas probadas:<br>- " . implode("<br>- ", $paths));
    }
}
?>
