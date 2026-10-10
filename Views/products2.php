<?php 
  headerAdmin($data); 
  getModal('modal',$data);  getModal('modal2',$data);  getModal('uplDlg',$data);
?>
  <link rel="stylesheet" type="text/css" href="<?=media(); ?>/css/products.css">
  <main class="simple">
    <div class="app-title">
      <div class="row">
        <h1 id="title"><i class="fa fa-user-tag"></i> <?=$data['page_title'];  ?></h1>&nbsp&nbsp 
        <button accesskey="n" id="btnNuevo" class="btn btn-primary" type="button">
          <i class="fas fa-plus-circle"></i> Nuevo  </button>
        &nbsp&nbsp 
        
          <button id="btnConfig" class="btn btn-info " type="button" prodConfig="<?=$_SESSION['productconfig']; ?>"><i class="fas fa-cog"></i>Ajustes</button>
        
        <div id="animate" style="display: none;"></div> 
      </div>
      <ul class="app-breadcrumb breadcrumb">
        <li class="breadcrumb-item"><a href="<?=base_url() ?>"><i class="fa fa-home fa-lg"></a></i></li>
        <li id="breadcrumb" class="breadcrumb-item"></li>
      </ul>
    </div>

    <template id="template-pr">
      <tr>
        <th scope="row">id</th>
        <td>cafe</td>        <td>1</td>
        <td>
          <button class="btn btn-info btn-sm">+</button>
          <button class="btn btn-danger btn-sm">-</button>
        </td>
        <td>$<span>500</span></td>
      </tr>        
    </template>

    <template id="template-product">
      <tr class="prod-row" >
        <td class="id d-none text-center">id</td>
        <td class="product">product</td>
        <td class="description">description</td>
        <td class="imagen"><center><img src="" height="auto" width="80"></center></td>
        <td class="price text-right">Price</td>
        <td class="actions text-center">act</td>
        <td class="multi text-center">multi</td>
      </tr>
    </template>

    <div class="app-title tit2">
      <div class="col-md-12 form-group ">
        <div class="row" >
          <!-- Barra de búsqueda -->
          <div class="col">
            <i class="fas fa-search search-icon"></i> <input type="search" id="searchInput"/>
          </div>
          <div class="col"> <button id="multiEdt" class="px-5" disabled>Edición Múltiple</button>  </div>
        </div>
        <div id="filtering">
          <div id="category-products"></div>
          <div id="bline-list"></div>
        </div>
        <div id="info"></div>
      </div>      
    </div>
    <div>
    </div>
    <div class='row' >
      <div class='col-sm-offset-1 col-sm-12'>
        <div class='tile'>
          <div class='tile-body'>              
            <div class='table-responsive'>
              <table class='table table-hover table-bordered table-striped' id='tProduct'>
                <thead>
                  <tr>
                    <th onclick="sortTable(0, 'int')" class="d-none">Id.</th>
                    <th onclick="sortTable(1, 'str')">Producto</th>
                    <th onclick="sortTable(2, 'str')">Descripción</th>
                    <th class="imagen">Imagen</th>
                    <th onclick="sortTable(4, 'int')">Precio</th>
                    <th class="text-center" onclick="sortTable(5, 'int')">Acciones</th>
                    <th class="text-center"><input type="checkbox" id="titleCheck"></th>
                  </tr>
                </thead>
                <tbody id="items"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>   

  </main>
  <div id="alert2" class="alert alert-primary d-none" role="alert">
    <strong>Espere: </strong> <span id="mensaje2">Subiendo la imagen </span>
  </div>

  <?php   footerAdmin($data);?>
