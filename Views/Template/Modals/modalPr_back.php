<!-- Modal -->
<div class="modal fade" id="modalPr" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <h5 class="modal-title" id="titleModal"> Nuevo </h5> -->
        Cuentas por cobrar / pagar
         <button type="button" class="close" data-dismiss="modal" onclick="closePr()"aria-label="Close"><span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body">
        <div class="tile">
          <div class="tile-body">
            <main >
              <div class="row">
                <div class="col-md-12">
                  <div class="tile">
                    <div class="tile-body">              
                      <div class="table-responsive">
                        <table class="table table-sm table-hover table-bordered" id="tableProducts" width="100%" cellspacing="0">
                          <thead>
                            <tr>
                              <th>id</th>
                              <th>Nombre producto</th>
                              <th>Descripcion</th>
                              <th>Precio</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 

      <div class="container-fluid">
        <h3 class="mt-4" id="resumen">Resumen</h3> 
        <input type="hidden" id="id">
        <input type="hidden" id="tAm"><input type="hidden" id="nPed" >
        <div>
          <div class="row mb-4">
            <div class="col-sm-6"><label for="" class="mb-0">Inquilino</label>
              <div id="combo_cliente"></div>                   
            </div>
            <div class="col-sm-6"><label for="" class="mb-0">Fecha</label>
              <div ><input type="date" class="form-control" placeholder="Fecha" name="fecha" id="fecha" value="<?php echo date("Y-m-d");?>"></div>
            </div>
          </div>

          <div class="row mb-3" id="editOrder" style="display: none;">
            <div class="col-sm-4">
              <label for="cantidad" class="mb-0">Cantidad</label>
              <input type="number" id="cantidad" class="form-control">
            </div>          

            <div class="col-sm-4">
              <label for="precio" class="mb-0">Precio</label>
              <input type="number" id="precio" class="form-control">
            </div>          
            <div class="col-sm-4">
              <button type="button" class="btn btn-primary form-control" style="margin-top: 20px;" onclick="prepareInsDet()" disabled="" id="btnAdd">Actualizar</button>
            </div>
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body ">                              
            <div id="records_content" ></div>
          </div>
        </div>
        <button type="button" class="btn btn-outline-primary" onclick="generarCotizacion()" disabled="" id="btnGenCotizacion">Generar</button>
        <button type="button" class="btn btn-outline-primary" onclick="verCotizacion(readCookie('salesid'))" disabled="" id="btnVerCotizacion">Ver Cotización</button>
      </div>

            </main>
          </div>                   
        </div>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function() {
    type = localStorage.getItem('cppm');
    botones = `<button  type='button' class='botondetalles btn btn-success btn-sm'><i class='fa fa-desktop'></i></button>`;
    ///datatable///
    var tablePr
    botones = "<button type='button' class='addtocart btn btn-warning btn-sm'><i class='fa fa-cart-plus'></i></button> ";

    tablePr=$('#tableProducts').DataTable({
      "aProcessing": true,  "aServerside": true,
      "language": {"url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"},
      "ajax": { "url": " " +base_url+ "/Products/getProducts", "dataSrc": ""},
      "columns": [
        { "data": "productid" },
          { "data": "productname" },
          { "data": "description" },
          { "data": "price" },
          { "data": null,"orderable": false},
      ],
      "columnDefs": [ 
          { targets: 0, visible: false},//id
          { targets: 4, "defaultContent":botones, data: null },
          {"className": "text-center", "targets": 4}
      ],
      "responsieve": "true",
      "bDestroy": true,
      "iDisplayLength": 10,
      "order": [  [0, "desc"] ]
      });

    $('#tableProducts').on('click', 'button.addtocart', function() {
      let registro = tablePr.row($(this).parents('tr')).data();
      insertDetail(registro.factor,registro.productid,registro.productname,registro.price);
    });
  })

  var carrito=[];
  var idEditado = -1; // en este caso push(add)
  function insertDetail(cantidad, producto, prod_name, precio){    
    if (cantidad==0) cantidad = 1;
    ind = carrito.findIndex(carrito => carrito.producto === producto );    
    if (document.getElementById('editOrder').style.display!=='flex'){
        if (ind > -1) {//si existe y no está visible el modo editar
            cantidad = Number(carrito[ind].cantidad) + Number(cantidad);            
            idEditado= ind;
        }
    }
    if (idEditado>=0) {        
        carrito[idEditado].cantidad  = cantidad;
        carrito[idEditado].producto  = producto;
        carrito[idEditado].precio    = precio;
        carrito[idEditado].prod_name = prod_name;
        idEditado = -1;
    }else{
        //antes de agregar, buscar y si se encuentra, agregar la cantidad en un 'factor'
        const resultado = carrito.find( carrito => carrito.producto === producto );
        if (typeof resultado !== 'undefined') {
            alert(resultado.producto)
            const ind = carrito.findIndex(carrito => carrito.producto === producto );
            alert(ind)
        }else{
            carrito.push({cantidad:cantidad,precio:precio,producto:producto, prod_name:prod_name})
        }
    }
    drawTable()
    document.getElementById("editOrder").style.display='none'; 
  }

function drawTable(){
    var importe =0
    ht = '<table class="table-striped table-bordered responsive" width="100%" cellpadding="4" cellspacing="6">'
    ht = ht + '<thead><tr>'
    ht = ht + '<th>cant.</th>  <th>producto</th> <th>precio</th> <th>importe</th>  <th colspan="2" class="text-center">Acciones</th>'
    ht = ht + '</tr></thead>'
    ht = ht + '<tbody>'
    for(var i=0; i<carrito.length;i++){        
        ht = ht + '<tr><td class="text-right">'+carrito[i].cantidad+'&nbsp</td>'
        ht = ht + '<td class="text-left">&nbsp'+ carrito[i].prod_name+'</td><td class="text-right">'+carrito[i].precio+'&nbsp</td>';
        ht = ht + '<td class="text-right">'+carrito[i].cantidad*carrito[i].precio+'&nbsp</td>' //importe
        importe = importe+carrito[i].cantidad*carrito[i].precio
        ht = ht + '<td class="text-center"><button class="btn btn-primary btn-sm" onclick="leerPedido('+i+')" > <i class="fas fa-edit"></i></button>';
        ht = ht + '<button class="btn btn-danger btn-sm" onclick="delPedido('+i+')"> <i class="fas fa-trash-alt"></i></button></td>';
        ht = ht + '</tr>'
    }                   
    ht = ht + '</tbody>'
    ht = ht + '<tfoot>'
    ht = ht + '  <tr>'
    ht = ht + '  <td colspan="3"><strong>Total</strong></td>'
    ht = ht + '    <td class="text-right"><strong>'+importe+'</strong></td>'
    ht = ht + '    </tr>'
    ht = ht + '</tfoot>'
    ht = ht + '</table>'
    //ht = ht + '<h3>'+importe+'</h3>'
    document.getElementById("records_content").innerHTML = ht  
    if (importe>0) {// Activar el btn Generar
        document.getElementById("btnGenCotizacion").disabled = false;  

        document.getElementById("tAm").value = importe;
    }
}


  function leerPedido(id){
    idEditado = id;
    $("#cantidad").val(carrito[id].cantidad);
    $("#cmbProd").val(carrito[id].producto);
    $("#precio").val(carrito[id].precio);
    $("#btnAdd").prop('disabled', false);
    document.getElementById("editOrder").style.display='flex';
    document.getElementById("btnAdd").style.display='inline';
    document.getElementById("cantidad").focus(); 
  } 


  function openPr(){ $("#modalPr").modal('show');}
  function closePr(){ $("#modalPr").modal('hide');}
</script>