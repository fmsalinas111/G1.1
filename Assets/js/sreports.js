//const hCmbCli = document.querySelector('.selectEl'); 
//const hFilter = document.querySelector('.filtering');

/*const hCmbProd = document.getElementById('combo_productos'); 
const hCmbStaff = document.getElementById('combo_staff'); 
const hCmbDepot = document.getElementById('combo_depot');   
const hInfo = document.getElementById('info');
const hBline = document.getElementById('bline-list'); 
const hTotal = document.getElementById('total');    
*/

pinta = data  => {   console.log(data); }

const pintaClientes = data=>{   
    cli_pro = (opReport.value==1)? 'cliente': 'proveedor';
    filtData = myCP.filter(cp => cp.aux==opReport.value);
    cargarCombo(filtData, 'combo_clientes', 'combo_cliente',0,'Todos',false,cli_pro,false,true,0,false);
    $('#combo_cliente').select2({destroy:true});//{destroy:true});
    $(document).on('select2:open', () => {document.querySelector('.select2-search__field').focus();});
}

const pintaProductos = data=>{   
    cargarCombo(data, 'combo_products', 'combo_producto',0,'Todos',false,'Producto',false,true,0,false);
    $('#combo_producto').select2({destroy:true});//{destroy:true});
    $(document).on('select2:open', () => {document.querySelector('.select2-search__field').focus();});
}

const pintaVendedor = data=>{   
    cargarCombo((data), 'combo_vendors', 'combo_vendedor',0,'Todos',false,'Vendedor',false,true,0,false);
    $('#combo_vendedor').select2({destroy:true});//{destroy:true});
    $(document).on('select2:open', () => {document.querySelector('.select2-search__field').focus();});
}

const pintaDepo = data=>{   
  console.log(data);
    cargarCombo((data), 'combo_deps', 'combo_deposito',0,'Todos',false,'Depósito',false,true,0,false);
    $('#combo_deposito').select2({destroy:true});//{destroy:true});
    $(document).on('select2:open', () => {document.querySelector('.select2-search__field').focus();});
}
const fetchData = async()=>{
  try{
    const dCP = new FormData(); dCP.append('src', 'client');     
    const res2=await fetch(base_url+'Data/getDataCmb/0', { method: 'POST', body: dCP });
    const data2=await res2.json(); myCP = data2; pintaClientes(data2); 

    const dProd = new FormData(); dProd.append('src', 'product');     
    const res1=await fetch(base_url+'Data/getDataCmb/0', { method: 'POST', body: dProd });
    const data1=await res1.json(); myProducts = data1; pintaProductos(data1);

    const dDep = new FormData(); dDep.append('src', 'data');     
    const res=await fetch(base_url+'Data/getDataCmb/21', { method: 'POST', body: dDep });
    const data=await res.json(); myDeps = data; pintaDepo(data);

    const dStaff = new FormData(); dStaff.append('src', 'staff');     
    const res3=await fetch(base_url+'Data/getDataCmb/21', { method: 'POST', body: dStaff });
    const data3=await res3.json(); myStaff = data; pintaVendedor(data3);

    /* //td?
      const dClient = new FormData(); dClient.append('src', 'staff');
      const res4=await fetch(base_url+'Data/getDataCmb/1', { method: 'POST', body: dClient });
      const data4=await res4.json(); myStaff = data; pintaVendedor(data4);
      
      const dDep = new FormData(); dDep.append('src', 'depot');     
      const res3=await fetch(base_url+'Data/getDataCmb/2', { method: 'POST', body: dDep });
      const data3=await res3.json(); myDepots = data3; pintaDepots(data3);
    */
    opReport.onchange(opReport.value=1)
  } 
  catch (error){
        console.log(error);
        if (window.showError) showError('Error al cargar los datos. Intente nuevamente.'); 
  }
}

fetchData();

function preparaModal(fecha=hoy(), staff=0, notas='', status=1, amount=0) {  
  sele = (status>0)? 'selected':'';  
  //cmbStt = comboStatus('campo4', sele, true);
  cmbStaff= comboBuilder('staff',1,'campo2','staff');
  options = [{option:1,value:'Jornada'},{option:2,value:'Precio fijo'}];
  cmbTipo = comboSimple([{idcampo:'campo4', cap:'Tipo', def:2, options}])

  inputs=[];
  inputs.push({id:'campo1', campo:'Fecha',selector:'input',type:'date',value:fecha, label:1})
  inputs.push({id:'combo', idCmb:cmbStaff, value:staff});
  inputs.push({id:'campo3', campo:'Motivo',selector:'input',type:'text',placeholder:'Motivo', value:notas, label:1,md:6})
  inputs.push({id:'combo', idCmb:cmbTipo})// 
  //inputs.push({id:'combo', idCmb:cmbStt})// campo8 status  
  inputs.push({id:'campo5', campo:'Importe',selector:'input',type:'number', value:amount, label:1,md:6})
  openModal(inputs);
  const dClient = new FormData(); dClient.append('src', 'staff');
  f_URL = base_url+'Data/getDataCmb/1'; getJson(f_URL, dClient,'combo_staff','campo2',staff,'staff')
  
}

function prepara_abreModal(){preparaModal(); showModal(0,'modal-lg');}


let minDate, maxDate;
 
// Custom filtering function which will search data in column four between two values
/*DataTable.ext.search.push(function (settings, data, dataIndex) {
    let min = minDate.val();
    let max = maxDate.val();
    let date = new Date(data[3]);
 
    if (
        (min === null && max === null) ||
        (min === null && date <= max) ||
        (min <= date && max === null) ||
        (min <= date && date <= max)
    ) {
        return true;
    }
    return false;
});
 */
// Create date inputs
/*
minDate = new DateTime('#min', {    format: 'MMMM Do YYYY'});
maxDate = new DateTime('#max', {    format: 'MMMM Do YYYY'});
 */

// Refilter the table
document.querySelectorAll('#min, #max').forEach((el) => {
    el.addEventListener('change', () => table.draw());
});


//  ** datatable ** //
var table; tabla='tableReports'
botones = `<button  type='button' class='btnEdit btn btn btn-warning btn-sm'title='Editar'><i class='fa fa-edit'></i></button> 
           <button type='button' class='btnEvents btn btn-success btn-sm'title ='Eventos'><i class='fa fa-book'></i></button>`;
document.addEventListener('DOMContentLoaded', function() {
    table=$('#'+tabla).DataTable({
        "aProcessing": true,  "aServerside": true,
        //"language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},

        "ajax": { "url": " " + base_url + "sreports/getsreport", "dataSrc": "" },
        "columns": [
            {"data": "sid" },
            {"data": "depot" },
            {"data": "uname" },
            //{"data": "sDate" },
            { data: {_: 'ffecha', sort: 'sDate'} }, //{"data": "sDate" },
            {"data": "clName" },
            {"data": "pName" },
            {"data": "q", className:"text-right" },
            {"data": "p", className:"text-right" },
            {"data": "q",
                "render": function (data, type, row, meta ) {
                return (row.q * row.p).toFixed(0);}, className:"text-right"
                }, 
            {"data": "acName" },
            {"data": null,"orderable": false},
        ],
        "columnDefs": [
         //{ targets: 0, visible: false},//id
         { targets: 10, "defaultContent":botones, data: null }],
        "responsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [  [0, "desc"] ]
    });
  })
  

///datatable modificar

$('#'+tabla).on('click', 'button.btnEdit', function() {
    let r = table.row($(this).parents('tr')).data();
    document.getElementById('id').value=r.fid;
    preparaModal(r.ffecha, r.clid, r.asunto, r.estado)
    showModal();
});

$('#'+tabla).on('click', 'button.btnEvents', function() {//  patient File  
    let r = table.row($(this).parents('tr')).data(); 
    alert('abre los eventos del expediente seleccionado')
});

//hCmbCli.addEventListener('change',catFilter);
function catFilter(e) {
  console.log(e.target);
  //let colFilter = -1; let sel;
  //if (e.target&&e.target.tagName==='SELECT'&&e.target.id==='combo_productos') { colFilter = 5;
  if (e.target&&e.target.tagName==='SELECT') { colFilter = 4;
    sel = e.target; const filterValue = sel.options[sel.selectedIndex].text
    if(filterValue== 'Todos'||filterValue== 'todas') {
        table.column(colFilter).search('').draw(); 
        table.column(colFilter).visible(true, true);    
        return;}
    table.column(colFilter).search(filterValue).draw();   
    table.column(colFilter).visible(false, false);
  }
}

const cmbFilter = data =>{
  [cmb, colFilter] = data;
  let cmbEl, filterValue=''; colVisible = false;
  cmbEl = document.querySelector('#'+cmb);
  filterValue = cmbEl.options[cmbEl.selectedIndex].text
    if (filterValue== 'Todos'||filterValue== 'todas') {filterValue=''; colVisible=true;}
    table.column(colFilter).search(filterValue).draw();   
    table.column(colFilter).visible(colVisible, colVisible);
  }

const change2 = data=>{cmb = data[2];
  switch (data[2].id) {
    case 'opReport':
      cmbFilter([data[2].id, 9]);      
      pintaClientes(); 
      if(thCliPro) thCliPro.innerHTML = (data[2].value==1)? 'Cliente': 'Proveedor';
      break;
    case 'combo_cliente':
      cmbFilter([data[2].id, 4]);      break;
   case 'combo_producto':
      cmbFilter([data[2].id, 5]);      break;
   case 'combo_deposito':
      cmbFilter([data[2].id, 1]);      
      document.getElementById('select2-combo_deposito-container').style.color = 'blue';
      break;
   case 'combo_vendedor':
      cmbFilter([data[2].id, 2]);      
      document.getElementById('select2-combo_vendedor-container').style.color = 'red';
      break;
    // Agrega más casos según sea necesario
  } 
}

const toMs = dateStr => {
  const [day, month, year] = dateStr.split("-")
  return new Date(year, month - 1, day).getTime()
}

const filterResume = dateStr => {
    let min = document.getElementById('min');    let max = document.getElementById('max');
    if(min.value=='' || max.value=='') { table.ajax.reload(); return; }
    if (toMs(min.value) > toMs(max.value)) { alert('Rango de fechas incorrecto'); return; }

    let busca = table.ajax.json().filter(n => n.sDate > min.value && n.sDate < max.value)    
    table.clear().rows.add(busca).draw();
}
