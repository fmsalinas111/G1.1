<?php 
  headerAdmin($data);   
  getModal('modal', $data); 
  $heads="<th class='text-center'>ART</th>   <th>Producto</th>  <th style='
    color: lightgray;'>Stock</th>  
        <th>Cantidad</th>  <th>Precio</th>   <th>Importe</th>   <th>Acciones</th>";
  $hTicket = "<th colspan='3' class='text-center'>TICKET</th>";
  ?>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/css/intlTelInput.css">
  <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <link rel="stylesheet" href="<?=media(); ?>/css/ssale.css">
  <style>
    .bertoldi{color:red;}
  </style>
  <main class="simple">
    <div class="app-title">
      <div class="row title2">
        <h1 id="title" style="margin-left: 5px; float: left; margin-right: 20px;"><i class="fa fa-user-tag"></i> <?=$data['page_title'];?> </h1>
        <button id="btnConfig" class="btn btn-info " type="button" prodConfig="<?=$_SESSION['productconfig']; ?>"><i class="fas fa-cog"></i>Ajustes</button>
      </div>
      <div class="title3"style="color: darkgray;">
        <h4 id="clientName">Cliente: <span>Consumidor Final</span></h4>
        <h4 id="ticketNum">Ticket N°: <span>000000</span></h4>
        
      </div>
      <div class="carrito">
        <label for="cart">Carrito <input type="checkbox" name="cart" id="cart"> </label> 
        <label class="px-2" for="xm">x_mayor   <input type="checkbox" name="xm" id="xm">     </label><br>
        <label class="px-2" for="coti">Cotización<input type="checkbox" name="coti" id="coti">     </label>
      </div>
    </div> 
    
  </main>
  <div class="filtering">
    <div class="cats"></div>
    <div class="bline px-2" style="display: flex;"></div>
  </div>
  <div id="animate" style="display: none;" class="d-none"></div>
  <div class="alert alert-warning alert-dismissible fade show d-none " role="alert" >
      <strong>Mensaje:!</strong> <span id="msgAlert">Venta registrada.</span>
      <button type="button" class="close" data1-dismiss="alert" aria-label="Close" onclick="hide(['alert'])">
          <span aria-hidden="true">&times;</span>
      </button>
  </div>
  <div class=" container-fluid"> 

        <section class="grid-container">           
            <template id="productCard" >
                <div class="product-card p-item">
                    <img class="img-box">                      
                    <div class="product-detail">
                        <p class="name">Producto X: Descripción breve de la funcionalidad o características del artículo.</p>
                        <p class="xm d-none"></p>
                        <div class="interaction">
                            <div class="price"> <p class="product-price">0.00</p> </div>
                            <div class="quantity-control" data-price="0.00">
                                <button class="btn-minus">-</button>
                                <input type="text" class="quantity-input" value="0" >
                                <button class="btn-plus">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>


        </section>

        <button class="sticky-submit-btn">
            <span id="total-quantity">0</span> Total (Continuar) >: <span id="total-amount">0.00</span>
        </button>        


    <div class="row pos">
      <div class="col-md-9 tsale">    
        <?=dTable($heads,'tSale', '', 'row pos-detail');?>  
        <?=dTable($hTicket,'tTicket', '', 'row ticket');?>  
    </div>
      
      
      <div class="col-md-3">    <div id ="inp" > </div>           </div>      
    </div>
  </div>
  <template class="tt" id="template-detail">
    <tr class="det-row" >
      <td class="art text-center">art</td>
      <td class="name" style="width: 100%;">name</td>
      <td class="stk"></td>
      <td class="qty q_ text-center">qty</td>
      <td class="price p_ text-right">Price</td>
      <td class="amt a_ text-right">amount</td>
      <td class="actions text-center">action</td>
    </tr>
  </template>

  
  <template class="tt" id="templateTicket">
      <tr class="det-row table-secondary">
          <td colspan="2" class="name ">product</td>
          <td class="actions text-center">action</td>
          <tr class="det-row ticket-line">
            <td class="qty q_ text-center">qty</td>
            <td class="price p_ text-right">price</td>
            <td class="amt a_ text-right">amt</td> 
        </tr>  
        <tr class="det-row separator">
          &nbsp;
      </tr>
  </template>

  <!-- barcode reader -->
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-sm-4 shadow p-3">
                <div id="reader" width="600px"></div>
            </div>
        </div>
    </div>
  <!-- barcode reader -->
  
  
  <!-- <div class="col-md-6 ticket">  <?=dTable($hTicket,'tTicket');?>    </div> -->
  

  <script src="<?=media(); ?>/js/plugins/scanapp.min.js" ></script>
  <?php   footerAdmin($data); ?>
  <script src="<?=media(); ?>/js/sseco.js"></script>
  <script src="<?=media(); ?>/js/spurcha.js"></script>
<style>
  .cell-focus {
                background-color: green;
                color: white;
            }
            td, th{
                white-space: nowrap;
            }
.mi-select{
  width: 500px;
}            
</style>
<div class="mi-select-div">
  <select class="mi-select d-none" id="mi-select-productos"></select>
  <select class="mi-select d-none" id="mi-select-clientes"></select>
</div>