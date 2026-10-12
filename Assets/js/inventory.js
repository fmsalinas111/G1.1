const modal3 = new bootstrap.Modal(myModal3=gId("modal3"));

const hBline= gId('bline-list');  const hInfo= gId('info');
const hFilter = document.querySelector('.filtering'); const hCate = gId('category-products');
const hComboCateg = gId('combo_category'); 
const hDepots = gId('depots');  const hUnits = gId('units');

tipoProd = parseInt(localStorage.prod_source);
title.innerHTML = `<i class="fa fa-user-tag"></i> Inventario ${(tipoProd==1)?'productos':'insumos'}`

arrayCategory=[]; arrayRubros=[]; myBlines=[]; myBlinesArr=[];hRubro='';
cats=[], deps=[], colors=[], units=[]; uniFr=[]; rubs=[]; //myProducts=[]; myCP=[];
myStock ={}; datos=[];
insumo_=0;
const pinta = data=>{   //crear objetos segun data.type
  cats = data.filter(cat => cat.type === 3 &&cat.aux===0);//only dads
  units= data.filter(cat => cat.type === 9);
  uniFr= data.filter(cat => cat.type === 11);
  //rubs = data.filter(cat => cat.type === 15);
  colors= data.filter(cat => cat.type === 16);
  deps = data.filter(cat => cat.type === 21);
  cargarCombo(cats, 'combo_category', 'cmbCatInventory',0,'Todos',false,'Categoría',false, true);
  $("#cmbCatInventory").select2();
  hUnits.innerText = "Unidades :"; rend3([units, hUnits, ['Todas']]);
  hDepots.innerText = "Depósitos :"; rend3([deps, hDepots, ['Todos']]);
};

addEventListener("DOMContentLoaded", () => {
    getSome(`Data/getDataByType/15`, 'rubros'); 

  fetchData();
});

const fetchData = async()=>{
  try{
    const res=await fetch(base_url+'Data/getFData');
    const data=await res.json(); 
    pinta(data);
    const dProd = new FormData(); dProd.append('src', 'product');     
    const res1=await fetch(base_url+'Data/getDataCmb/0', { method: 'POST', body: dProd });
    const data1=await res1.json(); myProducts = data1;

    const dCP = new FormData(); dCP.append('src', 'client');     
    const res2=await fetch(base_url+'Data/getDataCmb/2', { method: 'POST', body: dCP });
    const data2=await res2.json(); myCP = data2;

    const res3=await fetch(base_url+'inventory/getBalance/'+tipoProd);
    const data3=await res3.json();  myBalance = data3; 

  } 
  catch (error){
        console.log(error);
        if (window.showError) showError('Error al cargar los datos. Intente nuevamente.'); 
  }
}

function fillTC(texto, type){
  if (type=='rubros') {
    for(x of JSON.parse(texto)) {arrayRubros[x.fieldId]=x.fieldName; console.log(x);}   
    gtSo2('companies/getMyBlines',misRubros);
  }

  if (type=='saldos') fillTableContent(JSON.parse(texto));
  if (type=='supplies') fillTableSupplies(texto);
}

function misRubros(texto){ 
  console.log(texto);
  hRubro='';  let rubro_index=0;
  hBline.innerHTML = 'Rubros :'; 
  hBline.innerHTML +=`<label class="px-3"><input type="radio" id=0 value = Todos name = "bline"><span>Todos</span></label>`;
  rubs=(texto.blines).split(',');
  rubs.forEach(function(rubro){
    rubro_index=(rubro==='')?0: parseInt(rubro);
    myBlines.push({rubId:rubro_index, rubName:arrayRubros[rubro]})
    myBlinesArr[rubro_index]=arrayRubros[rubro];
    hRubro+=`<label class="px-3"><input type="radio" id=${rubro_index} value = ${arrayRubros[rubro]} name = "bline"><span>${arrayRubros[rubro]}</span></label>`;
  }); hBline.innerHTML += hRubro;
}

//modal2
  function validM2(){
    arr2 = new Object();
    arr2['id']=(document.getElementById('id2'))? document.getElementById('id2').value:0
    arr2['sid']=(document.getElementById('id'))? document.getElementById('id').value:0
    arr2['ref']=document.getElementById('campo3').value;
    campos=document.getElementsByName("field")
    for (i = 0; i < campos.length; i++) {
      clave = campos.item(i).id;     valor = campos.item(i).value;
      if (campos.item(i).type==='checkbox') valor = (campos.item(i).checked)?1:0;
      if (valor.length==0&&i==0)valor='';
      arr2[clave]=valor;
    } 
    if (arr2.field1==0) {alertError ('Campo obligatorio','field1'); return;}
    const dato=new FormData(); dato.append('campos', JSON.stringify(arr2));
    fURL = base_url+'Inventory/setProductIncome';  save(fURL, dato);
  }

  const newDetail=data=>{
    preparaModal2(campo3.value);showModal2(-1)};
  function showModal2(arg){
    if(inputs2.innerHTML.length==0) preparaModal2(pedido[arg].prid);
    if (arg>=0) {
      document.getElementById('field1').value=pedido[arg].prid;
      document.getElementById('field2').value=pedido[arg].colorId;
      document.getElementById('field3').value=pedido[arg].entrada;
      document.getElementById('field4').value=pedido[arg].notas;
      document.getElementById('field5').value=pedido[arg].producto;
      
      document.getElementById('id2').value =  pedido[arg].invId;
    }
    
    modal2.show();  btnActionForm2.style.display='';
  }

  if (document.querySelector("#form2")) {form2 = document.querySelector("#form2");
     form2.onsubmit = function(e){ e.preventDefault(); validM2();} }

  function preparaModal2(producto=0, cantidad =0, precio =0, notas=''){ inputs=[];
    cmbColor = comboBuilder('color', 16, 'field2', 'data','', true);
    nomInsumno=''; if (document.getElementById('campo2')) nomInsumno = campo2.value;

    inputs.push({id:'field1', campo:'b', selector:'input', type:'hidden', value:producto, disabled:''})
    inputs.push({id:'field5', campo:'insumo', selector:'input', type:'text', value:nomInsumno, disabled:''})
    inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
      inputs.push({id: 'combo', idCmb:cmbColor})
    inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht6});      
      inputs.push({id: 'field3',campo:'Peso',selector:'input',type:'number',value:precio, step:'any',label:1})
    inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2});
    inputs.push({id: 'field4',campo:'Notas',selector:'textarea',rows:'2', innerHTML: notas,label:1})  
    openModal(inputs, '.inputs2')

    cargarCombo((colors), 'combo_color', 'field2',0,'Color');

    document.querySelector('#titleModal2').innerText ="Ingresar producto"; 
  }

  function deleteDetail(arg){
    console.log('eliminar2', arg)
    eliminar2(arg, document.getElementById('id').value);
  }
  preparaModal2();
//modal2 end

function saveProduct(){  //todel
  tipo = (document.getElementById('check1').checked==true)?3:1;
  newAddData('product', tipo,'campo2','txtAdd','mini-crud');
}

function fillTableContent(obj){  myStock=obj;  
  
  //console.log(obj);
  h='';  dd=''; i=0; pr=0; re=''; saldo=0;
  removeClass(['table-resume','d-none']);
  cmbVal = (gId('cmbCatInventory'))? gId('cmbCatInventory').value: 0;
  ft = (document.querySelector('input[name=bline]:checked')===null)? 0 : document.querySelector('input[name=bline]:checked').id;
  for (x of obj) { dd='';
    if (cmbVal>0) dd = (cmbVal==x.cat)? '': ' d-none ';
    if (x.tvFilter==='') x.tvFilter=0;
    if (ft!==x.tvFilter&&ft>0) dd = ' d-none ';    
    arr = x.refes.split(', '); duplis=(duplicados(arr)); newArr=[];
    //console.log(arr);
    arr.forEach(function(elemento){ 
      striped = (duplis.includes(elemento.trim()))? `<del style="color: orangered;">${elemento}</del>` : `${elemento}`;
      el = `<a href="" class="openRef" onclick="event.preventDefault();openRef('${elemento}');">${striped}</a>`;
      if(!newArr.includes(el)) newArr.push(el);
    });    
    h+=`<tr class="${dd}" cat="${x.cat}" ft="${x.tvFilter}">
    <td>${x.categoría}</td> <td>${x.producto}</td> <td>${x.notas}</td>
    <td class="text-center">${x.saldo}</td> <td>${newArr} </td>    </tr> `;
  }
  document.getElementById('tbody').innerHTML = h;
}

const duplicados = (arr) => {
  const unicos = []; const duplas=[];
  for(var i = 0; i < arr.length; i++) {
    const elemento = arr[i].trim();    
    if (!unicos.includes(elemento)) unicos.push(elemento.trim()); else duplas.push(elemento.trim());
  }
  return duplas;
}

function preparaModal(input = 1, ref='', fecha=hoy(), producto=0, entrada=1, notas='',
    proveedor=0, unidad=0, precio=0, tipo=tipoProd, fraction=1, frac_unit=0, frac_price=0, 
    dep=localStorage.depot, lote='', expira=hoy(), bid=0) {
  i_o = (input)?'Entrada':'Salida';
  insumo_producto = (tipoProd==1)?'producto':'insumo';
  cmbProduct = comboBuilder(insumo_producto, tipo, 'campo2', 'product');
  cmbVendor = comboBuilder('proveedor',2,'campo5','client','',true);
  cmbUnidad = comboBuilder('unidad',9,'campo8','data','',true);
  cmbUnitFr = comboBuilder('unitFr',11,'campo10','data','',true);
  cmbDep    = comboBuilder('depósito', 21, 'campo13', 'data');

  inputs = []; h='';
  inputs.push({id:'html', idHt:htR1}); inputs.push({id:'html', idHt:ht4});    
    inputs.push({id:'campo1' ,campo:'Fecha',selector:'input',type:'date', value:fecha, label:1});
  inputs.push({id:'html', idHt:htR2}); inputs.push({id:'html', idHt:ht4});
    inputs.push({id:'campo6' ,campo:'Ref',selector:'input', value: ref, label:1})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id:'html', idHt:ht4});
    inputs.push({id: 'combo', idCmb:cmbDep});
  inputs.push({id:'html', idHt:htR2}); inputs.push({id:'html', idHt:htR2});
  inputs.push({id:'combo',  idCmb:cmbProduct})// producto
  if(APP===13) console.log('inve')
  inputs.push({id:'html', idHt:htR1}); //inicio row
  inputs.push({id:'html', idHt:ht4});
    inputs.push({id:'campo3', campo:i_o, selector:'input', type:'text', placeholder:'1', value:entrada, label:1,onkeypress:'return valideKey(event)'})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id:'html', idHt:ht4});
    inputs.push({id:'combo',  idCmb:cmbUnidad})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id:'html', idHt:ht4});
    inputs.push({id:'campo9', campo:'Precio unitario', selector:'input', type:'text', placeholder:'1', value:precio, label:1,onkeypress:'return valideKey(event)'})
  inputs.push({id:'html', idHt:htR2}); //fin pr unit
  inputs.push({id:'html', idHt:htR2});//fin row
  inputs.push({id:'html', idHt:htR1}); //inicio row
  inputs.push({id:'html', idHt:ht4});
    inputs.push({id:'campo11', campo:'Fracción', selector:'input', type:'text', placeholder:'1', value:fraction, label:1,onkeypress:'return valideKey(event)'})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id:'html', idHt:ht4});
    inputs.push({id:'combo', idCmb:cmbUnitFr})
  inputs.push({id:'html', idHt:htR2}); inputs.push({id:'html', idHt:ht4});  
    inputs.push({id:'campo12', campo:'Precio unit/fr', selector:'input', type:'text', placeholder:'1', value:frac_price, label:1,onkeypress:'return valideKey(event)'})
  inputs.push({id:'html', idHt:htR2});
  inputs.push({id:'html', idHt:htR2});//fin row

  inputs.push({id:'campo4', campo:'Notas', selector:'input', type:'text', placeholder:'notas', value:notas, label:1 })
  inputs.push({id:'combo', idCmb:cmbVendor});

  inputs.push({id:'campo7' ,campo:'a', selector:'input', type:'hidden', value:i_o,   disabled:''})
  //add fields batch
  inputs.push({id:'html', idHt:htR1}); //inicio row
    //inputs.push({id:'html', idHt:ht4});
      //inputs.push({id:'campo14' ,campo:'Fabricación',selector:'input',type:'date', value:hoy(), label:1});  
    //inputs.push({id:'html', idHt:htR2});
    inputs.push({id:'html', idHt:ht6});
      inputs.push({id:'campo15', campo:'Lote', selector:'input', type:'text', placeholder:'Lote', value:lote, label:1 })
    inputs.push({id:'html', idHt:htR2});
    inputs.push({id:'html', idHt:ht6});
      inputs.push({id:'campo16' ,campo:'Vencimiento',selector:'input',type:'date', value:expira, label:1});
    inputs.push({id:'html', idHt:htR2});      
    
  inputs.push({id:'html', idHt:htR2});//fin row
  inputs.push({id:'campo20' ,campo:'bid', selector:'input', type:'hidden', value:bid, disabled:''})
  openModal(inputs);

  cargarCombo(deps, 'combo_depósito', 'campo13',dep,'Depósito');

  filteredProd=myProducts.filter(prod => prod.aux === tipo);
  cargarCombo(filteredProd, 'combo_'+insumo_producto, 'campo2',producto,insumo_producto, !input,'',false,true);
  $("#campo2").select2({dropdownParent: $('#modalForm'),width: '100%'});

  cargarCombo(myCP, 'combo_proveedor', 'campo5',proveedor,'Proveedor Habitual');
  cargarCombo(units, 'combo_unidad', 'campo8',unidad,'Unidad');
  cargarCombo(uniFr, 'combo_unitFr', 'campo10',frac_unit,'Unidad');
  if (!input){    //console.log('salida')
    document.getElementById('lbl_campo3').style.color = 'red';
    document.getElementById('cmbProveedor').style.display = 'none';
    /*
    var elements = document.getElementsByClassName('  a');
    for(var i=0; i < elements.length; i++) {       elements[i].style.display="none";    }
    */    
  }else{    //console.log('entrada')
    document.getElementById('lbl_campo3').style.color = 'black';
    document.getElementById('lbl_campo3').innerText = 'Entrada';
    document.getElementById('cmbProveedor').style.display = 'inline';
  }
  
}

function prepara_abreModal(){preparaModal(); showModal();document.getElementById('campo1').focus();}

//var table
if (tipoProd===1) getSome('inventory/getBalance/'+tipoProd,'saldos');
  document.addEventListener('DOMContentLoaded', function() {
    if (tipoProd===1) {  
      removeClass['filter-categ','d-none']; 
      document.querySelectorAll('.dttbl')[1]
      botones = `<button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button> 
                 <button  type='button' class='botonSalida btn btn-success btn-sm'><i class='fa fa-dolly'></i></button>    `;    
      table=$('#tableInventory').DataTable({
        "aProcessing": true,  "aServerside": true,
        "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
        "ajax": {"url": " " + base_url + "/Inventory/getInventory/"+tipoProd, "dataSrc": ""},
        "columns": [
          {"data": "cid" },
          {"data": "ref" },
          {"data": "depo" },
          {"data": "unidad" },
          {"data": "tvFilter" },
          {data: {_: 'ffecha', sort: 'fecha'}},
          {"data": "product" },
          {"data": "notas" },
          {"data": "ingresos", className: "text-right"},
          {"data": "egresos", className: "text-right"},
          {"data": null,"orderable": false},
        ],
        "columnDefs": [
          { targets: 0, visible: false},//cid
          { targets: 2, visible: false},//depo
          { targets: 3, visible: false},//unidad
          { targets: 4, visible: false},//tvFilter
          { targets: 10, "defaultContent":botones, className: "text-center",data: null }  ],
        "responsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [  [0, "desc"] ]
      });  //end dttb
      
    } //end if

    if (tipoProd==3) {
      //tableInventory.innerHTML = thSupplies();
      //getSome('inventory/getSupplies','supplies');
      btnNuevo.style.display='none'; document.querySelectorAll('.dttbl')[0].style.display='none';
      botones = `
      <button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button> 
      <button  type='button' class='botonSalida btn btn-success btn-sm'><i class='fa fa-dolly'></i></button>
      `;
    
      table=$('#tableSupplies').DataTable({
        "aProcessing": true,  "aServerside": true,
        "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
        "ajax": {"url": " " + base_url + "/Inventory/getSupplies", "dataSrc": ""},
        "columns": [
          {"data": "sid" }, {"data": "ref" }, 
          {"data": "ffecha" }, {"data": "fullname" },
          {"data": "insumo" }, {"data": "qty", className: "text-right"},
          { "data": "rec", className: "text-center", "render":function(data,type,row){
            if (data===null) return '<b style="color:orange;">sin inventariar</b>'; 
              else if (data!==row.qty) return data+'<b style="color:red;">!</b>';
              return data } },
          {"data": null,"orderable": false},
        ],
        "columnDefs": [
          { targets: 0, visible: false},//cid
          { targets: 7, "defaultContent":botones, className: "text-center",data: null }  ],
        "responsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [  [0, "desc"] ]
      });
    }
    


  });   //end DOM



/*
  $.fn.dataTable.ext.search.push(
    
    function(settings, data, dataIndex) {    
      let CatColumnData = data[0];
      if (!filterByCat(CatColumnData, data[3])){return false;}
      return true;
    }
  );
*/

$('#tableInventory').on('click', 'button.botonmodificar', function() {
  const reg = table.row($(this).parents('tr')).data();  
  document.getElementById('id').value = reg.idInventario
  if(reg.egresos>reg.ingresos){io=0; cantidad = reg.egresos;} else {io=1; cantidad=reg.ingresos;}
  preparaModal(io,reg.ref, reg.fecha, reg.idproducto, cantidad, reg.notas, reg.proveedor, 
    reg.unidad, reg.precio, reg.tipo, reg.fr, reg.fraction_unit, reg.fraction_price, reg.depo, reg.lote, reg.expira, reg.bid);
  showModal(1); document.getElementById('btnCopyNew').classList.remove('d-none');
});

$('#tableInventory').on('click', 'button.botonSalida', function() {
  const reg = table.row($(this).parents('tr')).data();  
  if(reg.ingresos>0){
    preparaModal(0, reg.ref, hoy(), reg.idproducto, reg.ingresos, reg.notas, reg.proveedor,
      reg.unidad, reg.precio, reg.tipo, reg.fr, reg.fraction_unit, reg.fraction_price)
    showModal(); addClass('a1','d-none');
    titleModal.innerHTML ="Salida"; 
  }else{
    const div = document.getElementById("animate");
    div.classList.add('text-center');
    div.style.display='block';  div.innerHTML = `ya salió`
    div.animate({opacity: 0 }, {duration:3000,
      easing: "linear", iterations: 1, fill: "both"
      }) .onfinish = function() {
      //console.log(div.style.opacity);
    }    
  }
});


//////////////////****************** */
const thSupplies = data=>{
  return `<thead><th>id</th>
    <th>Fecha</th><th>Proveedor</th><th>Insumo</th><th colspan="2" class="text-center">Acciones</th></thead>`;
}


$('#tableSupplies').on('click', 'button.botonmodificar', function() {
  const r = table.row($(this).parents('tr')).data();  
  //document.getElementById('id').value = reg.idInventario
  document.getElementById('id').value = r.sid; insumo_ = r.prid;
  prepareModalSup(r.sid, r.insumo, r.prid);  showModal(1);
});

function prepareModalSup(sid=0, supName='',prid=0){  inputs=[];
  inputs.push({id:'campo1' ,campo:'sid', selector:'input', type:'hidden', value:sid,  disabled:''})
  inputs.push({id:'campo2' ,campo:'b', selector:'input', type:'text', value:supName, disabled:''})
  inputs.push({id:'campo3' ,campo:'prid', selector:'input', type:'hidden', value:prid,  disabled:''})
  inputs.push({id:'html', idHt:tblDetail()}); inputs.push({id:'html', idHt:tblDetail('new')});
  //if(document.getElementById('id').value.length>0) drawTableDetails(document.getElementById('id').value,'tDetails');
  if(sid>0) drawTableDetails(sid, 'tDetails', insumo_);
  openModal(inputs);
}
function drawTableDetails(sid, el='tDetails', insumo_ ){
  fData = new FormData(); fData.append('src', 'inventory'); fData.append('prid', insumo_); 
  getTbl('Data/getDataTbl/'+sid, fData, el)
}
function cargarTabla(texto, el){  
  obj=(texto);  h='';  pedido=obj;   i=0; entradas=0;
  for (x of obj) {i++;
    if (insumo_>0&&insumo_===x.prid) {    
      h+=`<tr class="rowDet">
            <td class="">${x.color}</td>   <td class="text-right">${x.entrada}</td>          
            <td data-id= ${x.invId} class="text-center editDetail" onclick="showModal2(${i-1});">
            <a class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></a></td>
            <td data-id= ${x.invId} class="text-center deleteDetail" onclick="deleteDetail(${x.invId})">
            <a class="btn btn-danger btn-sm" ><i class="fas fa-trash"></i></a></td>
          </tr>`; entradas+=x.entrada;
    }
  }    
  h+= `<tfoot>  <tr>  <td ><strong>Total</strong></td>
          <td class="text-right"><b> ${entradas}</b></td>
          <td class="text-right"><strong>${i}</strong></td>   </tr>    </tfoot>`;
  //h+= iconNuevo([el, 'Tercerización o compra']);  
  document.getElementById(el).innerHTML = h;
}

function fillTableSupplies(texto){
  h=''; obj=JSON.parse(texto); 
  dd=''; i=0; pr=0; re=''; saldo=0;
  for (x of obj) {   h+=`<tr class="${dd}">
    <td>${x.fullname}</td> <td>${x.insumo}</td> <td>${x.notas}</td>
    <td class="text-center">${x.saldo}</td> <td>pp</td>     </tr> `;
  }
  document.getElementById('tbody').innerHTML = h;
}

const tblDetail =data=>{
  if (data==='new') 
    return `
    <div class="row" id="iconNuevo" > <div class="col">
      <a href="#"title ="Nuevo item" onclick="newDetail();">
        <div class="d-flex flex-column align-items-center text-center">
          <img  width="30px" src="./Assets/images/icons/addRec.png"> 
        </div>         </a>   </div>  </div> `;    
  
  return `
  <div class="form-group col-md-12">
  <table id="tabDet" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:98%;"" >
    <thead><th>Color</th><th>Entrada</th><th colspan="2" class="text-center">Acciones</th></thead>
    <tbody id="tDetails"></tbody>  </table>    </div>    `;
 }

hFilter.addEventListener('click',depFilter);

function depFilter(e) { //dep unit
  if(e.target.type==='radio') {  colFilter = 4;    
    const filterValue = (e.target.value== 'Todos')?'': e.target.id;
    //if(e.target.value== 'Todos'||e.target.value== 'Todas') {table.column(colFilter).search('').draw(); return;}
    table.column(colFilter).search(filterValue).draw();
    //fillTableContent(myBalance);
    filterResume(filterValue);
    //return;
  }
  if (!(e.target&&e.target.tagName==='A')) return;
  parent = e.target.parentNode; 
  
  delClass([parent, 'filter-btn', 'active']);  e.target.classList.add('active');
    
  colFilter = (e.target.parentNode.id==='depots')? 2:3;
  const filterValue = e.target.getAttribute('filter');
  if(filterValue== 'todos'||filterValue== 'todas') {table.column(colFilter).search('').draw(); return;}
  table.column(colFilter).search(filterValue).draw();
};

const rend3 = data=>{   //hUnits.innerText = 'Unidades: '; //limpiar  
  [da, el, ...opts] = data;
  opts.forEach(opt => {
    opt = (typeof opt == 'object')? opt : {fieldId: 0, fieldName: opt}; //convertir array opts en objeto
  if( Object.prototype.toString.call( opt ) === '[object Array]' ) {
      opt = {fieldId: 0, fieldName: opt[0]};
  } else if ( Object.prototype.toString.call( opt ) === '[object Object]' ) {
      //alert( 'Objeto!' );
  }    
    //opt.fieldId = (opt.fieldId===undefined)? 0: opt.fieldId;
    //opt.fieldName = (opt.fieldName===undefined)? 'Todas': opt.fieldName;
    rend3_2([el, opt]);
  });
  da.forEach(da1=>{      rend3_2([el, da1]);  })
}

const rend3_2= data=>{   [el, optis] = data;    part = crEl("a");
    part.className = "btn btn-outline-secondary text-uppercase filter-btn m-2 btn-sm";
    part.setAttribute ("filter", optis.fieldId);  part.innerText = optis.fieldName; 
    el.appendChild(part);
}; 

const afterSave = data=>{  
  console.log(data, updating);
}

const filterResume = data=>{  
  let tab = document.getElementById("tbody");
  cat = cmbCatInventory.value; bli = ((document.querySelector('input[name=bline]:checked')===null)? 0 : document.querySelector('input[name=bline]:checked').id);
  both = (cat>0&&bli>0)? true: false;
  //console.log(cat, bli==0, both);
  tab.querySelectorAll('tr').forEach(function(row){
    if (bli==0&&row.getAttribute('ft')!==bli) row.classList.remove('d-none');
    if (both) {
      if (row.getAttribute('ft')!==bli||row.getAttribute('cat')!==cat) {
        row.classList.add('d-none');  } else row.classList.remove('d-none');
    } else {
      if (row.getAttribute('ft')!==bli&&row.getAttribute('cat')!==cat) {
        row.classList.add('d-none');  } else row.classList.remove('d-none');
    }
    //if (bli==0) row.classList.remove('d-none');
 }); 
}

function openRef(ref){
  datos = table.data().toArray(); 
  foundRef = datos.find(r=> r.ref==ref.trim());
  _salida = datos.find(r=> r.ref==ref.trim()&&r.egresos>0);
  if (_salida) salió=true; else salió=false;
  //cargar inputs de modal3 con foundRef
  if (!foundRef) { alert('Referencia no encontrada'); return;}
      //foundRef.Ref=foundRef.ref;  
      foundRef.Ingreso=foundRef.ffecha+' (' +dName([deps, foundRef.depo])+')'; 
      foundRef.Producto=foundRef.product;  foundRef.Notas=foundRef.notas;
      if (salió) {  //console.log(_salida);
        foundRef.Salida = _salida.ffecha +' (' +dName([deps, _salida.depo])+')'; 
        if (foundRef.Notas!==_salida.notas)foundRef.Notas_Salida=_salida.notas; }
  //
  inputs=[]; h='';n=0;
  Object.keys(foundRef).forEach(key => {n++;
    if (['Ref','Ingreso','Producto','Notas', 'Salida', 'Destino', 'Notas_Salida'].includes(key)) {
      inputs.push({id:'campo'+n, campo:key, selector:'input', type:'text', value:foundRef[key], label:1, disabled:true})
    }
  });
  //openModal(inputs);
  if (inputs) document.querySelector('#inputs3').innerHTML= drawForm(inputs);
  showModal(true,1,"modal3",['btnCancel','close']); titleModal3.innerText = `Referencias para ${ref}`;  
}

const change2 = data=>{
  [page, titModal, cmb ] = data;  idCat=(cmb.value);
  if(cmb.closest('#cmbCatInventory')){
    colFilter = 0;    const filterValue = idCat;
    if(filterValue== 'todos'||filterValue== 'todas') {table.column(colFilter).search('').draw(); return;}
    table.column(colFilter).search(filterValue).draw();  filterResume(data);
  }
}