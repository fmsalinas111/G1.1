<!DOCTYPE html>
    <?php   
        if (session_status() == PHP_SESSION_NONE) session_start(); 
        if (!termux()){
        	if (PAGEAPP($data['page_name'])&& USR() ==0) {header('location:'.base_url().'login'); exit();}
        }
    ?>
    <html lang="es" class="scroll-smooth">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <?=NOINDEX($data['page_name']); ?>
        <title><?=$data['page_title'] ?></title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
        <?php if(USR()==1 && !($_SERVER["SERVER_NAME"] == "localhost") ){ ?>            
           <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
           <script>eruda.init();</script>
        <?php  }  //end eruda
            #header personalizado
            $hi = (h($data['headItems'],[])); foreach ($hi as $i) { echo $i.PHP_EOL; }        
        ?>
        <style>
            html, body {
            overflow: hidden;
            height: 100%;
            margin: 0;
            }
        </style>
    </head>
    <?php require_once('nav_admin2.php'); ?>