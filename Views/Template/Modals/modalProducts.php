<!-- Modal -->
<div class="modal fade" id="modalProducts" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="titlemodalProducts"> Nuevo </h5> 
        
         <button type="button" class="close" data-dismiss="modal" onclick="closePr()"aria-label="Close"><span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body">
        <div class="tile">
          <div class="tile-body">
            <main >

    <div class="container-fluid">
      <h3 class="mt-4" id="resumen">Resumen</h3> 
      <input type="hidden" id="id">
      <input type="hidden" id="tAm"><input type="hidden" id="nPed" >
      <div id="inputs">      </div>
      <button type="button" class="btn btn-outline-primary"  disabled="" id="btnGuardar">Guardar</button>
      <button type="button" class="btn btn-outline-primary" onclick="verCotizacion(readCookie('salesid'))" disabled="" id="btnVerCotizacion">Cancelar</button>
    </div>

            </main>
          </div>                   
        </div>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">



  function findMatches (search, options) {
    return options.filter(option => {
      const regex = new RegExp(search, 'gi');
      //return option.text.match(regex);
      return option.value.match(regex);
    });
  }
  function filterOptions (select, options,input, full_options) {
    options.forEach(option => { 
      option.remove();
      option.selected = false;
    });
    console.log(full_options)
    const matchArray = findMatches(input, full_options);
    select.append(...matchArray);
  }
 

  var carrito=[];
  var idEditado = -1; // en este caso push(add)
  function insertDetail(cantidad, producto, prod_name, precio, prod_id){    
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
        carrito[idEditado].prod_id   = prod_id;
        idEditado = -1;
    }else{
        //antes de agregar, buscar y si se encuentra, agregar la cantidad en un 'factor'
        const resultado = carrito.find( carrito => carrito.producto === producto );
        if (typeof resultado !== 'undefined') {
            alert(resultado.producto)
            const ind = carrito.findIndex(carrito => carrito.producto === producto );
            alert(ind)
        }else{
            carrito.push({cantidad:cantidad,precio:precio,producto:producto, prod_name:prod_name, prod_id:prod_id})
        }
    }
    drawTable()
    //document.getElementById("editOrder").style.display='none'; 
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
        document.getElementById("btnGuardar").disabled = false;  
        document.getElementById("tAm").value = importe;
    }
}


  function leerPedido(id){
    idEditado = id;
    $("#cantidad").val(carrito[id].cantidad);
    $("#cmbProducto").val(carrito[id].prod_id);
    $("#precio").val(carrito[id].precio);
    $("#btnAdd").prop('disabled', false);
    document.getElementById("editOrder").style.display='flex';
    document.getElementById("btnAdd").style.display='inline';
    document.getElementById("cantidad").focus(); 
  } 


  function openProducts(){ //    $("#modalProducts").modal('show');
    $('#modalProducts').modal({backdrop:'static',keyboard:false});    
    $("#modalProducts").modal('show');  
  }
  function closePr(){ 

    $("#modalProducts").modal('hide');
  }

</script>


