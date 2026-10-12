const hFilter = document.querySelector('.filtering');
const hDepots = document.getElementById('depots');
const hCategs = document.getElementById('category-products');
const hBtFilter = document.querySelector('.botonFiltro');

const pintarTodos = data=>{  [text, el, clase] = data;
  part = crEl("a");
  part.className = "btn btn-outline-secondary text-uppercase filter-btn m-2 btn-sm";
  part.classList.add(clase);
  part.setAttribute ("filter", text);  part.innerText = text; el.appendChild(part);
}
function preparaModal(prid=0, pName = '',fecha='', proveedor=0, remito='', precio=0, qty=0, notas='', dep=localStorage.defaultDepot){
  cmbVendor = comboBuilder('proveedor',2,'campo2','client','',true);
  cmbDep    = comboBuilder('depósito', 21, 'campo13', 'data');

  inputs = []; h=''; 
  btnActionForm.style.display=''; document.getElementById('btnCancel').innerHTML=`<i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar`; 

  inputs.push({id:'html', idHt:`<h5 class="card-title" style="color: blue;">${pName}</h5>`});
  inputs.push({id:'html', idHt:htR1}); inputs.push({id:'html', idHt:ht4});    
    inputs.push({id:'campo1' ,campo:'Fecha',selector:'input',type:'date', value:hoy(), label:1})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id:'html', idHt:ht4});
    inputs.push({id:'campo6' ,campo:'Ref',selector:'input', value: remito, label:1})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id:'html', idHt:ht4});
    inputs.push({id: 'combo', idCmb:cmbDep});
  inputs.push({id:'html', idHt:htR2}); inputs.push({id:'html', idHt:htR2});
  inputs.push({id:'campo3', campo:'', selector:'input', type:'hidden', value:prid, label:1})
  inputs.push({id:'combo', idCmb:cmbVendor});

  inputs.push({id:'html', idHt:htR1}); inputs.push({id:'html', idHt:ht6});    
    inputs.push({id:'campo8', campo:'Cantidad', selector:'input', type:'text', placeholder:'1', value:precio, label:1,onkeypress:'return valideKey(event)'})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id:'html', idHt:ht6});
    inputs.push({id:'campo9', campo:'Precio de compra', selector:'input', type:'text', placeholder:'1', value:precio, label:1,onkeypress:'return valideKey(event)'})
  inputs.push({id:'html', idHt:htR2});   inputs.push({id:'html', idHt:htR2});   
  inputs.push({id:'campo4', campo:'Notas', selector:'input', type:'text', placeholder:'notas', value:notas, label:1 })

  openModal(inputs);

  var d1 = new FormData(); d1.append('src', 'data'); 
  getJson(base_url+'Data/getDataCmb/21', d1, 'combo_depósito', 'campo13', dep, 'Depósito',false,'',false,true)   
  
  const dataProveedor = new FormData(); dataProveedor.append('src', 'client');
  getJson(base_url+'Data/getDataCmb/2', dataProveedor,'combo_proveedor','campo2',proveedor,'Proveedor Habitual')
   
}

function modalDetail(prid=0,pName=''){ inputs = [];
  inputs.push({id:'html', idHt:`<h5 class="card-title" style="color: blue;">${pName}</h5>`});
    inputs.push({id:'html', idHt:tblDetail()}); 
    drawTableDetails(prid);
    openModal(inputs);
    document.getElementById('btnCancel').innerHTML=`<i class="fa fa-fw fa-lg fa-times-circle"></i>Cerrar`; 
    btnActionForm.style.display='none'; 
}
function drawTableDetails(prid, el='tDetails'){
    fData = new FormData(); fData.append('src', 'stockDeta'); fData.append('prid', prid); 
    getTbl('Data/getDataTbl/'+prid, fData, el)
}
function cargarTabla(texto, el){  
    obj=(texto);  h='';  pedido=obj;   i=0; entradas=0;  salidas=0;
    for (x of obj) {i++;
        h+=`<tr class="rowDet">
              <td class="">${x.iDate}</td>     <td class="text-right">${x.price}</td>   
              <td class="text-right">${x.entrada}</td>   <td class="text-right">${x.salida}</td>  
              <td class="">${x.depo}</td> 
              </tr>`; entradas+=x.entrada; salidas+=x.salida;
              /*<td data-id= ${x.invId} class="text-center editDetail" onclick="showModal2(${i-1});">
              <a class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></a></td>
              <td data-id= ${x.invId} class="text-center deleteDetail" onclick="deleteDetail(${x.invId})">
              <a class="btn btn-danger btn-sm" ><i class="fas fa-trash"></i></a></td>
              */
    }    
    h+= `<tfoot>  <tr>  <td colspan="2"><strong>Total</strong></td>
            <td class="text-right"><b> ${entradas}</b></td>
            <td class="text-right"><strong>${salidas}</strong></td>   
            <td class="text-right text-bg-info p-3"><strong>${entradas-salidas}</strong></td>   
            </tr>     </tfoot>`;
    //h+= iconNuevo([el, 'Tercerización o compra']);  
    document.getElementById(el).innerHTML = h;
}
//******************** */
document.addEventListener('DOMContentLoaded', function() {
      botones = `<button  type='button' class='btnAdd btn btn-warning btn-sm'><i class="fas fa-plus-circle"></i></button> 
                 <button  type='button' class='btnDetail btn btn-success btn-sm'><i class='fa fa-book'></i></button> `;
    
      table=$('#tableProducts').DataTable({
        "aProcessing": true,  "aServerside": true,
        "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
        "ajax": {"url": " " + base_url + "/Inventory/getStock", "dataSrc": ""},
        "columns": [
          {"data": "depot" },          
          {"data": "cid" },          
          {"data": "pName" },        {"data": "price" },        
          {"data": "inp" },          {"data": "outp" },           {"data": "saldo" },
          {"data": null,"orderable": false},
        ],
        "columnDefs": [
          //{ targets: 0, visible: false},//cid
          { targets: 7, "defaultContent":botones, className: "text-center",data: null }  ],
        "responsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [  [1, "asc"] ]
      }); 
       //end dttb

    });

$('#tableProducts').on('click', 'button.btnAdd', function() {
    const r = table.row($(this).parents('tr')).data();  
    document.getElementById('id').value = 0;
    preparaModal(r.prid, r.pName, r.price);
    showModal(); titleModal.innerHTML ="Inventario: agregar"; 
});

$('#tableProducts').on('click', 'button.btnDetail', function() {
    const r = table.row($(this).parents('tr')).data();  
    document.getElementById('id').value = 0;
    modalDetail(r.prid, r.pName, r.price);
    showModal(); titleModal.innerHTML ="Inventario: Detalle"; 
});

$('.botonFiltro').on('click', function() {
    const filterValue = $(this).attr('filter');
    console.log('pepe')
    table.column(0).search(filterValue).draw();
});

const tblDetail =data=>{
    return `<div class="form-group col-md-12">
              <table id="tabDet" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:98%;"" >
              <thead><th>Fecha</th> <th>Precio</th> 
              <th>Entrada</th> <th>Salida</th> <th>Depósito</th>
              <tbody id="tDetails"></tbody></table></div>		`;}
              //<th colspan="2" class="text-center">Acciones</th></thead>

              

const beforeSave = data=>{ arrAlert=[];  
    switch (data[1]){
        case 'Inventario: agregar':
            if (campo8.value==0) {arrAlert.push('cantidad inválida','campo8');break};
            if (campo13.value==0) {arrAlert.push('debe seleccionar un depósito','campo13');break};
            fetch_URL=base_url+'Inventory/setStock'; 
        break;      
        default:console.log('someaction');      arrAlert[0]='_exit'; break;
    }
    return arrAlert;
}





const pintarDepots = data=>{ 
  data.forEach(depot=>{    
    part = crEl("a");
    part.className = "btn btn-outline-secondary text-uppercase filter-btn m-2 btn-sm";
    part.setAttribute ("filter", depot.fieldName);  part.innerText = depot.fieldName; hDepots.appendChild(part);
  })
}
const pintarCateg = data=>{ 
  data.forEach(categ=>{    
    part = crEl("a");
    part.className = "categ btn btn-outline-secondary text-uppercase filter-btn m-2 btn-sm";
    part.setAttribute ("filter", categ.fieldId);  part.innerText = categ.fieldName; hCategs.appendChild(part);
  })
};


hFilter.addEventListener('click',depFilter);
function depFilter(e) {
  if (!(e.target&&e.target.tagName==='A')) return;    
    colFilter =  (e.target.classList.contains('categ'))? 1 : 0;
    const filterValue = e.target.getAttribute('filter');
    if(filterValue== 'todos'||filterValue== 'todas') {table.column(colFilter).search('').draw(); return;}
    table.column(colFilter).search(filterValue).draw();
};



pintarTodos(['todos',hDepots,'depo']); pintarTodos(['todas',hCategs,'categ']);
gtSo2('Data/getDataByType/21', pintarDepots);
gtSo2('Data/getDataByType/3',  pintarCateg);
