<?php 
  headerAdmin($data); 
  getModal('modal',$data);
?>
    <main class="simple">
      <div class="app-title">
        <div class="row">
          <h1><i class="fa fa-user-tag"></i> <?=$data['page_title'];  ?>    </h1>
          <label class="mt-2 ml-2 " style="color: blue; font-size: small;">&nbsp&nbsp&nbsp<input type="checkbox" id="checkbox1" >Mostrando inactivos </label>
          <div id="animate" style="display: none;"></div>
          
        </div>
<!--         <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="<?= base_url();  ?>ufs"><?=$data['page_tag'];  ?></a></li>
        </ul>
 -->      
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <div class="tile-body">              
              <div class="table-responsive">
                <table class="table table-hover table-bordered" id="tableContracts" width="100%">
                  <thead>
                    <tr>
                      <th>Inquilino</th>
                      <th>Unidad</th>
                      <th>Importe</th>
                      <th>Fecha inicial</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 ">
          <div class="tile document d-none"></div>
        </div>

      </div>    
    </main>
<?php footerAdmin($data); ?>
