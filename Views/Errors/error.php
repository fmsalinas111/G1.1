<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $data['page_title']; ?></title>
    <style>
        body { font-family: sans-serif; text-align: center; padding: 50px; background: #f8f9fa; color: #333; }
        h1 { font-size: 72px; margin: 0; color: #dc3545; }
        p { font-size: 18px; color: #6c757d; }
        a { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #0d6efd; color: #fff; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>404</h1>
    <h2>Página o tienda no encontrada</h2>
    <h3>pag: <?=$data['page_name']?></h3>
    <p>El recurso que intentas buscar no existe o la URL está escrita incorrectamente.</p>
    <a href="<?= base_url(); ?>">Volver al Inicio</a>
</body>
</html>
