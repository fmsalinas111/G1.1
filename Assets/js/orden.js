function preparaModal(fecIn=hoy(), cliente=0, producto=0, brand=0, model=0, notas='', imagen='',siid=0, orden=0){
  
  idcampo="campo10";//para la imagen
  combo3=setPreview(nuevaImg(imagen,'torepair'), idcampo, imagen);

  cmbClient  = comboBuilder('cliente',1,'campo1','client');
  cmbProduct = comboBuilder('producto',1,'campo2','product');
  cmbBrand   = comboBuilder('marca',1,'campo3','data');
  cmbModel   = comboBuilder('modelo',14,'campo4','data');

  inputs = []; 
    inputs.push({id: 'html', idHt:'<br>'+htR1});
      inputs.push({id: 'html', idHt:'<div class="col-md-4">'});
        inputs.push({id:'combo',  idCmb:combo3})// preview
      inputs.push({id: 'html', idHt:htR2});
      inputs.push({id: 'html', idHt:'<div class="col">'});
        inputs.push({id: 'html', idHt:htR1});
          inputs.push({id: 'html', idHt:ht5});
            inputs.push({id: 'campo6' ,campo:'Fecha',selector:'input',type:'date',value:fecIn, label:1})
          inputs.push({id: 'html', idHt:htR2});
          inputs.push({id: 'html', idHt:ht7});
            inputs.push({id: 'combo', idCmb:cmbClient})
        inputs.push({id: 'html', idHt:htR2});inputs.push({id: 'html', idHt:htR2});
        inputs.push({id: 'combo', idCmb:cmbProduct})
        inputs.push({id: 'combo', idCmb:cmbBrand})
        inputs.push({id: 'combo', idCmb:cmbModel})
      inputs.push({id: 'html', idHt:htR2});  
      inputs.push({id: 'campo5', campo:'Notas',selector:'textarea',rows:'2', innerHTML: notas,label:1})
    inputs.push({id: 'html', idHt:htR2});
    inputs.push({id: 'campo7', campo:'torep', selector:'input', type:'hidden', value:orden, disabled:''})
    inputs.push({id: 'campo8', campo:'siid',  selector:'input', type:'hidden', value:siid, disabled:''})
    openModal(inputs)
    var data = new FormData(); data.append('src', 'client'); 
    fURL = base_url+'Data/getDataCmb/1'; getJson(fURL, data, 'combo_cliente', 'campo1',cliente,'Cliente')
    var data1 = new FormData(); data1.append('src', 'product'); 
    fURL = base_url+'Data/getDataCmb/1'; getJson(fURL, data1, 'combo_producto', 'campo2',producto,'Producto')
    var data2 = new FormData(); data2.append('src', 'data'); 
    fURL = base_url+'Data/getDataCmb/1'; getJson(fURL, data2, 'combo_marca', 'campo3',brand,'Marca')
    var data3 = new FormData(); data3.append('src', 'data'); 
    fURL = base_url+'Data/getDataCmb/14'; getJson(fURL, data3, 'combo_modelo', 'campo4',model,'Modelo')
}

function prepara_abreModal(){
    preparaModal();
    showModal(0,'modal-lg');
}

///datatable///
valChequed = localStorage.getItem('showInactive');
document.getElementById('checkbox1').checked = (valChequed==="false")?false:true;
inactive = (localStorage.getItem('showInactive')=='false')?0:1;

var table
botones = `
  <button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button>

` ;
document.addEventListener('DOMContentLoaded', function() {
  table=$('#tableOrden').DataTable({
    "aProcessing": true,  "aServerside": true,
    "language": {"url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"},
    "ajax": {"url": " " + base_url + "/orden/getordenes/"+inactive, "dataSrc": ""},
    "columns": [
      {"data": "orden", className: "text-center"},
      {"data": "fecIn", className: "text-center"},
      {"data": "cliente" },
      {"data": "nombreProducto" },
      {"data": "marca"},
      {"data": "modelo" },
      {"data": "notas" },
      
      {"data": null,"orderable": false},
    ],
    "columnDefs": [
      //{ targets: 0, visible: false},//id
      { targets: 7, "defaultContent":botones, data: null, className:"text-center" }  ],
    "responsieve": "true",
    "bDestroy": true,
    "iDisplayLength": 10,
    "order": [  [0, "desc"] ]
  });
})

$('#tableOrden').on('click', 'button.botonmodificar', function() {
  let reg = table.row($(this).parents('tr')).data();
  document.getElementById('id').value = reg.orden
  preparaModal(reg.fecIn, reg.clid, reg.producto, reg.brand, reg.model, reg.notas, reg.imagen, reg.siid, reg.orden);
  showModal(0,'modal-lg');
});

