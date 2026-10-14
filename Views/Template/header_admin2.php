<!DOCTYPE html>
    <?php   
        if (session_status() == PHP_SESSION_NONE) session_start(); 
        $termux = 0;  $pageApp = 0; 
		$termux = termux();
		$pageApp = PAGEAPP($data['page_name']) ;
        $favicon='./ges.ico';
		/*echo "pageApp: ".$pageApp."<hr>";
        echo "usr: ".USR() ."<hr>";
        echo "page: ".$data['page_name'] ."<hr>";
        echo "tenant: ".TENANT_SLUG ."<hr>";
        echo (!USR()&&$pageApp) ;*/
if ($termux){	
	if(!USR()&&$pageApp) echo '
		<a href="/login"   class="inline-block bg-blue-600 
		hover:bg-blue-700 text-white font-semibold py-2.5 
		px-5 rounded-lg shadow-md transition duration-200 ease-in-out text-center"
		> Iniciar Sesión</a> ';
	}else{
		
		if(!USR()&&$pageApp) {
			header('location:'.base_url().'login'); //exit();
		}
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
        <?php  }  //end eruda   #header personalizado
            $hi = (h($data['headItems'],[])); foreach ($hi as $i) { echo $i.PHP_EOL; }        
        ?>
        <style>
            html, body {
            overflow: hidden;
            height: 100%;
            margin: 0;
            }
        </style>
        <link rel="shortcut icon" type="image/x-icon" href="<?php echo $favicon; ?>">
    </head>
    <?php 
    require_once('nav_admin2.php'); ?>