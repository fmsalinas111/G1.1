<?php 
spl_autoload_register(function($class) {
    // Busca la clase en Libraries/Core/
    $fileCore = "Libraries/Core/" . $class . ".php";
    
    if (file_exists($fileCore)) {
        require_once($fileCore);
    }
});
?>
