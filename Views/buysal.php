<?php 
  //if (!isset($_SESSION['login'])) header('location:'.base_url().'login');
  headerAdmin($data); 
  getModal('modal',$data); getModal('modal2',$data);
  $heads="<th>id</th> <th>aux</th> <th>clType</th> <th>Fecha</th> <th>Nombre</th>
          <th>Importe</th> <th>Notas</th> <th>Acciones</th>";
?>

<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ttskch/select2-bootstrap4-theme@x.x.x/dist/select2-bootstrap4.min.css">

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<style>
  .select2-selection__rendered {      line-height: 31px !important;  }
  .select2-container .select2-selection--single {      height: 35px !important;  }
  .select2-selection__arrow {      height: 34px !important;  }
</style>

<main class="simple">
      <div class="app-title">
        <div class="row title-line" id ="titleLine">
          <h1 id="title" style="margin-left: 5px; float: left; margin-right: 20px;"><i class="fa fa-user-tag"></i> <span id="title_caption"><?=$data['page_title'];  ?></span> </h1> 
          <?php //if ($_SESSION['app']==7) {?>
            <button accesskey="n" id="btnNuevo" class="btn btn-primary swp-hide" type="button"><i class="fas fa-plus-circle"></i> Nuevo  </button>
          <?php //} ?>
          <div class="col swp-hide">
            <fieldset>
              <label for="v"><input type="radio" id="v" name="clType"  value="1"/>Ventas</label><br/>
              <label for="c"><input type="radio" id="c" name="clType"  value="2"/>Compras</label><br/>
            </fieldset>  
          </div>  
          <div id="animate" style="display: none;"></div>
          <div class="frm_buttons d-none" id="frm_buttons" style="align-content: end;">
            <button class="to-hide" disabled>Guardar</button> <button class="to-hide">Cancelar</button>
            <fieldset>
              <label for="p"><input type="radio" id="p" name="prType"  value="1" checked/>Productos</label>
              <label for="i"><input type="radio" id="i" name="prType"  value="3"/>Insumos</label>
            </fieldset>
          </div>
        </div>
        <ul class="app-breadcrumb breadcrumb swp-hide">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="<?= base_url();  ?>cppm"><?=$data['page_tag'];  ?></a></li>
        </ul>
      </div> 
      <?=dTable($heads,'tableSales');?>
    </main>
  <div class="d-none form-buy" id="formBuy"> </div>
    <template>
        <button id="btnActionForm" class="btn btn-primary modalButton d-none" type="submit" style="margin-bottom: 0px;">
          <i class="fa fa-fw fa-lg fa-check-circle"></i><span id="btnText">Guardar</span></button>&nbsp;&nbsp;&nbsp;
        <button class="pepe">cancel</button>
        <a class="btn btn-secondary modalButton" id="btnCancel" href="" >
          <i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar</a> &nbsp;&nbsp;&nbsp;
        <a class="btn btn-danger modalButton" id="btnDelete" href="#" onclick="eliminar2();" 
          style="display: none; "><i class="fa fa-fw fa-lg fa-trash" title="Eliminar"></i></a>
    </template>
    <select id="selColor" class="d-none"></select>
    <select id="selProduct" class="d-none"></select>

  <script src="<?=media(); ?>/js/buysal_form.js" ></script>
  

  <?php 
  echo "<script> const suar = {$_SESSION['suar']} </script>";
  footerAdmin($data); 
  //echo 'logo: '.strlen($_SESSION['logo']);
  ?>
  <script defer src="<?=media(); ?>/js/expExcel.js" ></script>