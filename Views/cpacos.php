<?php 
  headerAdmin($data); 
  getModal('modal',$data); 
  getModal('modal2',$data);
  getModal('uplDlg',$data);
  $heads="<th>ref</th>
        <th>Fecha</th>
        <th>Vencimiento</th>
        <th>id</th>
        <th id='clipro'>Depende</th>
        <th>Importe</th>
        <th>Saldo</th>
        <th>Acciones</th>";
  $footer="<tfoot > <th>Total</th><th colspan='6'></th> </tfoot>";
?>
    <main class="simple">
      <div class="app-title">
        <div class="row">
          <h1 id="title" style="float: left; margin-right: 20px;"><i class="fa fa-user-tag"></i> <?=$data['page_title'];  ?>        </h1>          
          <button accesskey="n" class="btn btn-primary btnNuevo" id="btnNuevo" type="button"><i class="fas fa-plus-circle"></i> Nuevo</button>
          <div id="animate" style="display: none;"></div>
          <input type="hidden" id="xst">
          <input type="hidden" id="id">
          <input type="hidden" id="aux">
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="<?= base_url();?>cppm"><?=$data['page_tag'];  ?></a></li>
        </ul>
      </div>

      <?=dTable($heads, 'tableCpaco', $footer);  ?>
  </main>
<?php footerAdmin($data); ?>

