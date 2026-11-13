<!DOCTYPE html>
<html lang="es">
  <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <title>Login</title> 
      <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico">
      <!--   <link rel="stylesheet" type="text/css" href="<?= media();?>/css/main.css"> -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
		
      <style type="text/css">
        body{
            margin: 0;
            padding: 0;
            background: linear-gradient(to right, #118e, #387d);
        }        
        .eye{cursor:pointer;}
      </style>
      <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
           <script>eruda.init();</script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
<?php
echo server();
//  $app = (isset($_SESSION['app']))? $_SESSION['app']:0;
  $app=0;
  echo'<script>
          const base_url = "'.base_url().'";
          const APP = "'.$app.'";
        </script>';   
?>
  </head>