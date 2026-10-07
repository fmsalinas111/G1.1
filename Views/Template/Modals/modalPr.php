<!-- Modal -->
<div class="modal fade" id="modalPr" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="titleModalPr"> Nuevo </h5> 
        
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
      <div>
        <div class="row mb-4">
          <div class="col-sm-6"><label for="" class="mb-0">Entidad / Provedor</label>
            <a href="#" tabindex="-1" onclick="showAddData('prov-crud','provAdd')"> <b>+</b></a> 
            <div id="prov-crud" style="display: none;">
                <input type="text" id="provAdd" class="small">
                <button class="small" onclick="newAddData('client',6,'cmbCliente','provAdd','prov-crud' )">&nbsp + &nbsp </button> </div>
            <div id="combo_cliente"><select id="cmbCliente"></select></div>                   
          </div>
          <div class="col-sm-3"><label for="" class="mb-0">Fec emisión</label>
            <div ><input type="date" class="form-control" placeholder="Fecha" name="fecha" id="fecha" value="<?php echo date("Y-m-d");?>"></div>
          </div>
          <div class="col-sm-3"><label for="" class="mb-0">Fec vencimiento</label>
            <div ><input type="date" class="form-control" placeholder="Fecha" name="fvencimiento" id="fvencimiento" value="<?php echo date("Y-m-d");?>"></div>
          </div>
        </div>
        <div class="row mb-3" id="editOrder" >
          <div class="col-sm-6"><label for="" class="mb-0">Producto</label>
            <a href="#" tabindex="-1" onclick="showAddData('mini-crud', 'txtAdd')"> <b>+</b></a> 
            <div id="mini-crud" style="display: none;">
                <input type="text" id="txtAdd" class="small">
                <button class="small" onclick="newAddData('product', localStorage.getItem('cmbCli'),'cmbProducto','txtAdd','mini-crud')">&nbsp + &nbsp </button>
            </div>
            <div id="combo_producto"><select id="cmbProducto" ></select></div>                   
          </div>                    
          <div class="col-sm-2">
            <label for="cantidad" class="mb-0">Cantidad</label>
            <input type="number" id="cantidad" class="form-control" value="1" min="1">
          </div>          

          <div class="col-sm-2">
            <label for="precio" class="mb-0">Precio</label>
            <input type="number" id="precio" class="form-control">
          </div>          
          <div class="col-sm-2">
            <button type="button" class="btn btn-primary form-control" style="margin-top: 20px;" onclick="prepareInsDet()" disabled="" id="btnAdd">Agregar</button>
          </div>
        </div>
      </div>
      <div class="card mb-4">
        <div class="card-body ">                              
          <div id="records_content" ></div>
        </div>
      </div>
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


  function openPr(){ //    $("#modalPr").modal('show');
    $('#modalPr').modal({backdrop:'static',keyboard:false});    
    $("#modalPr").modal('show');  
  }
  function closePr(){ 
    document.getElementById('cmbCliente').value=0    
    document.getElementById('cmbCliente').disabled=false;    
    document.getElementById('cmbProducto').value=0
    document.getElementById('precio').value=0
    document.getElementById('records_content').innerHTML='';
    carrito =[];

    $("#modalPr").modal('hide');
  }


  document.getElementById('precio').addEventListener('change',function(){
    if (document.getElementById('precio').value>0) {
      if (document.getElementById('cmbProducto').value!='0') {document.getElementById('btnAdd').disabled=false;}
    }
  })


  function prepareInsDet(){
    var combo = document.getElementById("cmbProducto");
    prod_name = combo.options[combo.selectedIndex].text;
    cantidad  = document.getElementById('cantidad').value
    if (cantidad<1) {
      alert ('ingrese una cantidad válida');
      document.getElementById('cantidad').focus(); return false;
    } 
    prod_id   = combo.value;
    producto  = (combo.value).split('-'); producto = producto[0];
    precio    = document.getElementById('precio').value
    console.log(cantidad, producto, prod_name, precio, prod_id);
    insertDetail(cantidad, producto, prod_name, precio, prod_id)
    document.getElementById("btnAdd").disabled=true;
    document.getElementById("cmbCliente").disabled=true;
    combo.value=0;cantidad=1;precio=0;
  }

  document.getElementById('btnGuardar').addEventListener('click', function(){
    //alert('im here')
    const data = new FormData(); data.append('data', 'sales');
    data.append('campo1', document.getElementById('cmbCliente').value);
    data.append('campo2', document.getElementById('fecha').value);
    data.append('campo3', document.getElementById('fvencimiento').value);
    data.append('campo4', document.getElementById('fecha').value);
    data.append('campo5', document.getElementById("tAm").value);
    data.append('campo6', 'document.getElementById("notas").value');
    data.append('campo7', carrito);
    data.append('campo8', carrito);
    data.append('campo9', carrito);
    data.append('campo10',carrito);

    URL = base_url+'Adr/setAdr';
    save(URL, data);
    closePr()

  })



</script>


