<?php 
  headerAdmin($data); 
  getModal('modal',$data);
  getModal('uplDlg',$data);
  $heads =" <th>id</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Estado</th>
            <th>Acción</th>"  ;
?>


  <link rel="stylesheet" type="text/css" href="<?=media(); ?>/css/products.css">

    <main class="simple">
      <div class="app-title">
        <div class="row">
          <h1 id="title"><i class="fa fa-user-tag"></i> <?=$data['page_title'];  ?></h1>&nbsp&nbsp 
          <button accesskey="n" class="btn btn-primary" type="button" onclick="prepara_abreModal();"><i class="fas fa-plus-circle"></i>Nuevo</button>
          &nbsp&nbsp 
          <button id="btnConfig" class="btn btn-info" type="button" prodConfig="<?=$_SESSION['productconfig']; ?>"><i class="fas fa-cog"></i>Ajustes</button>
          <div id="animate" style="display: none;"></div> 
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="<?= base_url();  ?>products"><?=$data['page_tag'];  ?></a></li>
        </ul>
      </div>
      <div class="app-title">
        <div class="col-md-12 form-group ">
          <div class="col-md-12" id="bline-list"><!--  business line --></div>
          <div id="category">tst</div>
        </div>
      
      </div>


      <?=dTable($heads,'tableProducts');  ?>
    </main>
  <div id="alert2" class="alert alert-primary d-none" role="alert">
    <strong>Espere: </strong> <span id="mensaje2">Subiendo la imagen </span>
  </div>

  <?php   footerAdmin($data); ?>

