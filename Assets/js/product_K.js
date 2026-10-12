
function preparaModal(prodname='', description='', price=0, status=1, doc=0, especialidad=0){
  status=(status==0)?'':' checked ';
  
  cmbDoctor= comboBuilder('doctor',4,'campo5','client','',false)
  cmbEspec = comboBuilder('especialidad',4,'campo6','data')

  check1 =`<div class="col-md-3 " style="padding-top: 15px;">
            <div class="form-check"><label class="form-check-label" for="campo4">
                <input type="checkbox" class="form-check-input" id="campo4" name="campo" ${status}><b>Activo</b>
                </label>     </div></div>`
  inputs = []; h='';
  //inputs.push({id: 'html', idHt:'<div class="row"><div class="col-md-12">'});
  inputs.push({id: 'html', idHt:'<div class="col">'});
    inputs.push({id: 'campo1' ,campo:'Nombre',selector:'input',type:'text',placeholder:'Producto o servicio', value:prodname, label:1, required:''})
      inputs.push({id: 'html', idHt:'<div class="row ">'});
        inputs.push({id: 'html', idHt:'<div class="col-md-9">'})
          inputs.push({id: 'campo2' ,campo:'Descripción',selector:'input',type:'text', placeholder:'Descripción', value:description, label:1})
        inputs.push({id: 'html', idHt:'</div>'});
        inputs.push({id: 'combo',  idCmb:check1, value:0})//Activo
      inputs.push({id: 'html', idHt:htR2});//fin row
      inputs.push({id: 'html', idHt:htR1});//otro row
        inputs.push({id: 'html', idHt:ht6})
          inputs.push({id:'campo3', campo:'Precio',selector:'input', type:'number', value:price, label:1})
        inputs.push({id: 'html', idHt:htR2})    
      inputs.push({id: 'html', idHt:htR2});//fin row
    inputs.push({id: 'html', idHt:htR2});  
    inputs.push({id: 'campo9', campo:'type',selector:'input', type:'number', value:localStorage.prod_source})
    //if (localStorage.APP == '3') {//klk
      inputs.push({id: 'html', idHt:htR2}); //fin row
      inputs.push({id: 'html', idHt:htR1});//otro row
        inputs.push({id: 'html', idHt:ht6})
        inputs.push({id: 'combo',  idCmb:cmbDoctor}); inputs.push({id: 'html', idHt:htR2});
        inputs.push({id: 'html', idHt:ht6})
        inputs.push({id: 'combo',  idCmb:cmbEspec}); inputs.push({id: 'html', idHt:htR2});
      inputs.push({id: 'html', idHt:htR2}); //fin row        
    //}
  //inputs.push({id: 'html', idHt:'</div><div class="col-md-3"><label>image product</label></div></div>'})
  
  openModal(inputs);
  document.getElementById('campo9').style.display = 'none';  //type
  data = new FormData(); data.append('src', 'client');
  
  getJson(base_url+'Data/getDataCmb/4', data, 'combo_doctor', 'campo5', doc, 'Doctor')
  
  const data1 = new FormData(); data1.append('src', 'data');
  getJson(base_url+'Data/getDataCmb/4', data1, 'combo_especialidad', 'campo6',especialidad,'Especialidad' )
}
function prepara_abreModal(){    preparaModal();  showModal();}


///datatable///
prod=[' Productos ',' Servicios ',' Insumos '];
icon=['<i class="fa fa-box"></i>','<i class="fa fa-book"></i>','<i class="fa fa-barcode"></i>']
var table
prodType = localStorage.prod_source;
console.log('prod_source', prodType)
botones = `<button type='button' class='botonmodificar btn btn-warning btn-sm' title='Editar'><i class='fa fa-edit'></i></button>
           `;
//           <button  type='button' class='botonVender btn btn-info btn-sm' title='vender'><i class='fa fa-cart-plus'></i></button>
ojoAbierto = "<center><button  type='button' class='botonInvisible btn btn-success btn-sm' title='mostrar en la tienda virtual'><i class='fa fa-eye'></i></button> </center>";
ojoCerrado = "<center><button  type='button' class='botonInvisible btn btn-danger btn-sm' title='ocultar en la tienda virtual'><i class='fa fa-eye-slash'></i></button> </center>";

document.addEventListener('DOMContentLoaded', function() {
  imgPath = base_url+'Assets/images/uploads/';
  table=$('#tableProducts').DataTable({
    "aProcessing": true,  "aServerside": true,
    "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
    "ajax": { "url": " " + base_url + "/Products/getProducts/"+prodType,   "dataSrc": ""  },
    "columns": [
      {"data": "prid" },
      {"data": "nombre" },
      {"data": "descripcion" },
      {"data": "precio", className: "text-right"  },
      {"data": "invisible",
        "render":function(data,type,row){
         return (data==0)? ojoAbierto: ojoCerrado;
        },"orderable": false 
      },      
      { "data": null,"orderable": false},
    ],
    "columnDefs": [ 
      { targets: 0, visible: false},//id
      { targets: 5, "defaultContent":botones, data: null, className: "text-center"  }  
    ],
    "responsieve": "true",
    "bDestroy": true,
    "iDisplayLength": 10,
    "order": [  [0, "desc"] ]
  });
})

$('#tableProducts').on('click', 'button.botonInvisible', function() {
  const r = table.row($(this).parents('tr')).data();
  if (r.invisible==0)toggle=1; else toggle=0;
  console.log(r.invisible, toggle)
  arr1.id=r.prid;  arr1.campo1 = toggle;

  const dato = new FormData();  dato.append('campos',JSON.stringify(arr1));
  f_URL = base_url+'products/toggleVisible';  save(f_URL, dato);
});
  
$('#tableProducts').on('click', 'button.botonmodificar', function() {
  let r = table.row($(this).parents('tr')).data();
  document.getElementById('id').value = r.prid
  
  preparaModal(r.nombre, r.descripcion, r.precio, r.estado, r.doc, r.categoria);

  showModal(1);
  document.getElementById('btnCopyNew').classList.remove('d-none');
  localStorage.setItem('imgToUpld',r.imagen);
  edtImgName=r.imagen;

});

const beforeSave = data=>{ arrAlert=[];
  console.log(data)
  switch (data[0]) {
    case 'products': 
      fetch_URL=base_url+'Products/setProductK';//arrAlert[0]='_exit';
    break;
    default:console.log('someaction'); break;
  }
  return arrAlert;
}

