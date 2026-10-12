//APP13
cmbColorOptions={}; deps=[], colors=[]
let bunker = null; trActive = null; tempName = ''; currColor = 0;
const test1 = data =>{
  colors= data.filter(cat => cat.type === 16);
  deps = data.filter(cat => cat.type === 21);
}
const fetchData = async()=>{
  try{
    const resultado = await getSome3('Data/getDataCmb/16',{"src" : "data" }, cargarDatalist);
    const res1 = await getSome3('Data/getDataCmb/',{"src" : "data", "ar":JSON.stringify([16, 21]) }, test1);
  } 
  catch (error){
        console.log(error);
        if (window.showError) showError('Error al cargar los datos. Intente nuevamente.'); 
  }
}

addEventListener("DOMContentLoaded", () => {    fetchData();    });

function preparaModal(client=0, fecha=hoy(), sid=0,ref=''){ inputs = [];//textil
    cmbDep =   comboBuilder('depósito', 21, 'campo1', 'data', 's-2 cmbdep ',true);
    cmbColor =   comboBuilder('color', 16, 'campo4', 'data', 's-2 cmbcolor d-none', false, false);
    inputs.push({id:'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
      inputs.push({id:'combo', idCmb:cmbDep});
    inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht3});
      inputs.push({id:'campo2',campo:'Fecha',selector:'input',type:'date', value:fecha, label:1})
    inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht3});
      inputs.push({id:'campo3',campo:'Remito',selector:'input',type:'text', placeholder:'remito nro', value:ref, label:1})
    inputs.push({id:'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2});

    inputs.push({id:'combo', idCmb:cmbColor});
    inputs.push({id:'html', idHt:tblDetail2()});
    //data = new FormData(); data.append('src', 'client'); 
    //getJson(base_url+'Data/getDataCmb/2', data, 'combo_proveedor', 'campo1', client,'Proveedor',true)
    openModal(inputs);    
    chargeCombo(deps, 'combo_depósito', 'campo1',{s2:true, placeholder:'Depósito',clases:['campo1', 'color'], allowClear:false});     
    chargeCombo(cmbColorOptions, 'combo_color', 'campo4',{s2:true, placeholder:'Color',clases:['campo4', 'color'],search:'Infinity', allowClear:false});
    if(gIC('tdetails').rows.length==1) {
      cell = gIC('tdetails').querySelector('.prod-color');
      gIC('cmbcolor').style.height ='30px'; gIC('cmbcolor').style.backgroundColor = "antiquewhite";      
      bunker = gId('combo_color');
      gIC('cmbcolor').innerHTML = '';
      //campo4.focus();
    }
}

function calcTotalPeso() { let total = 0; let i=0;
    $('.input-peso').each(function() { i++;
        const valor = parseFloat($(this).val()) || 0;
        total += valor;
    });
    $('#cant').text(i);    $('#celdaTotal').text(total.toFixed(2));
}

function removeRow(_tr) {  console.log(_tr, 'prevenir lastRow');  _tr.remove();};

function _checkClick(e){  
    el = e.target;
    let cell = e.target;    // Asegurarse de que el elemento clickeado sea un <td> 
    tr = cell.closest('tr'); 
    colorId = tr.getAttribute('color-id'); colorName = tr.getAttribute('color-name');
    if (cell.tagName=='BUTTON'&&cell.classList.contains('btn-eliminar')) {removeRow(tr); calcTotalPeso();return;}
    if (cell.tagName.toLowerCase() !== 'td') cell = cell.closest('td');
    //if (!cell) return;
    if(cell.classList.contains('prod-color')){
    }
}

gIC("inputs").addEventListener("focusin", (e) => {
  if (e.target.classList.contains("prod-color")) {
    if (gId('tDetails').querySelectorAll('.combo_color').length>0) 
        trActive.querySelector('.prod-color').textContent = tempName;  
    tr = e.target.closest('tr');
    colorId = tr.getAttribute('color-id')||0; colorName = tr.getAttribute('color-name');
    tempName = colorName;  currColor = colorId;  trActive = tr;    
    e.target.textContent='';
    e.target.appendChild(bunker);
    if (colorId>0) {
      gId('campo4').value = colorId; 
      gId('select2-campo4-container').textContent= colorName;
    }
  }else{
    if (gId('tDetails').querySelectorAll('.combo_color').length>0) {
      if (!(e.target.tagName==='SPAN')) trActive.querySelector('.prod-color').textContent = tempName;
    }
  }
});

function cargarDatalist(data) { cmbColorOptions = data; }

const newRow = data =>{
  return `<tr > 
              <td class="prod-color"  tabindex="0">     </td>  
              <td>  <input type="text" class="input-valor  input-peso form-control text-right"
                  style="margin-bottom: 2px;" name="campo" placeholder=" valor" 
                onkeydown="checkEnter(event)"> </td>  
              <td><button type="button" class="btn-eliminar" title="Eliminar fila">✕</button></td>
          </tr>  `;
}        

const addRow=data=> {
  [colorId, colorName] = data;
  const nuevaFila = document.createElement('tr');
  nuevaFila.innerHTML = newRow();
  document.querySelector('#tDetails').appendChild(nuevaFila);
  nuevaFila.querySelector('.input-valor').focus();
  nuevaFila.querySelector('.prod-color').textContent = colorName;
  nuevaFila.setAttribute('color-id', colorId);
  nuevaFila.setAttribute('color-name', colorName);
}

function checkEnter(event) {
  el = event.target;
  tr = el.closest('tr'); 
  if (event.key === 'Enter' || event.keyCode === 13) {
    event.preventDefault(); 
    currColorId = el.closest('tr').getAttribute('color-id')||0;
    currColorName = el.closest('tr').getAttribute('color-name');        
    if (el.value===''||currColorId===0) return;
    addRow([currColorId, currColorName]);  
  }
  calcTotalPeso();
}

function obtenerDatosTabla() {
    const filas = document.querySelectorAll('#tabDet tbody tr');
    const datosArray = [];
    filas.forEach(fila => {
      const colorValue = fila.querySelector('.input-peso').value;
      colorId = fila.getAttribute('color-id')
      datosArray.push({colorId: colorId, valor: colorValue });
    });
    return datosArray;
}

//

function drawTableDetails(sid, el='tDetails' ){
  fData = new FormData(); fData.append('src', 'inventory'); 
  getTbl('Data/getDataTbl/'+sid, fData, el)
}
function cargarTabla(texto, el){
  console.log(arguments)
  obj=(texto);  h='';  pedido=obj;   i=0; importe=0;
  for (x of obj) {i++;
    h+=`<tr class="rowDet">
          <td>${x.producto}</td>         <td class="text-center">${x.color}</td>
          <td class="text-right">${x.entrada}</td>          
          <td data-id= ${x.invId} class="text-center editDetail" onclick="showModal2(${i-1});">
          <a class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></a></td>
          <td data-id= ${x.invId} class="text-center deleteDetail" onclick="deleteDetail(${x.invId})">
          <a class="btn btn-danger btn-sm" ><i class="fas fa-trash"></i></a></td>
        </tr>`;
  }    
  h+= `<tfoot>  <tr>  <td colspan="2"><strong>Total</strong></td>
          <td class="text-right"><strong>${redondear(i,0)}</strong></td>   </tr>    </tfoot>`;
  //h+= iconNuevo([el, 'Tercerización o compra']);  
  document.getElementById(el).innerHTML = h;
}


var table; ///datatable/// 
botones = "<button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-edit'></i></button> ";
document.addEventListener('DOMContentLoaded', function() {
  table=$('#tableSales').DataTable({
    "aProcessing": true,  "aServerside": true,
    "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
    "ajax": { "url": " " + base_url + "/Inventory/getSupplies",   "dataSrc": ""  },
    "columns": [
      {"data": "sid" }, {"data": "ref" }, 
      //{"data": "fecha" }, 
      {data: {_: 'ffecha', sort: 'fecha'}},
      {"data": "fullname" },
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
})


$('#tableSales').on('click', 'button.botonmodificar', function() {
  const reg = table.row($(this).parents('tr')).data();
  document.getElementById('id').value = reg.sid;
    textil_inc={'prod':reg.prid,'sid':reg.sid,'prodName':reg.insumo,
                  'vendor':reg.clid,'qty':reg.qty };
    setLS(['textil_inc',JSON.stringify(textil_inc)]);
  preparaModal(reg.clid, reg.ffecha, reg.sid, reg.ref)
  showModal(0,'modal-lg');  avoid27=true;
  gId('titleModal').setAttribute('style', 'white-space: pre-line;');
  gId('titleModal').innerHTML = `Ingresos: <strong>${reg.insumo}</strong>
                                Origen: <u>${reg.fullname}</u>`;
  gId('titleModal').setAttribute('prid', reg.prid);
  gId('titleModal').setAttribute('vendor', reg.clid);
});


getSome2('pedidos_tex/getTextilReport','inve')
function fillTC(texto, type){
  if (type==='inve') rep2(texto);//report(texto);
}

const rep2=data=>{
  //console.log(data);
  a='';c=0;i=0;
  data.forEach(x =>{ i++;
    if (a!==x.dad) {
      if (a.length==0) {c=1;a=x.dad;}
      else {console.log(a+' '+c);c=1;}
      a=x.dad;
    }else{
      c++;
      if (data.length==i){console.log(a+' '+ c);}
    }
  })
}

const report=data=>{
  console.log(data)

  hPdt   = document.getElementById("categoryCard");
  products=data;j=0;
      let p, item, part
          //arrayCategory =['todos'];  if(products.length>0) this.categ('todos');
      let actualDad='';

      for (let id in products) {
          j=j+1; // WRAPPER
          p = products[id];
          //
          if (actualDad!==p.dad) {}
            item = document.createElement("div");     item.className = `p-item`;
            hPdt.appendChild(item);
            // PRODUCT dad
            part = document.createElement("div");
            part.innerHTML = `<strong>${p.dad}</strong>`;//            part.className = "p-name";
            item.appendChild(part);

            // PRODUCT subcat
            part = document.createElement("div");
            part.innerHTML = p.subCateg;
            item.appendChild(part);

            // PRODUCT subcat
            part = document.createElement("table");
            part.row = p.subCateg;
            item.appendChild(part);

            // PRODUCT color
            part = document.createElement("div");
            part.innerHTML = p.color +' '+p.input;
            item.appendChild(part);

            part = document.createElement("br");
            item.appendChild(part);

      }

  div=`<div><div>`
  cActual='';  line='';
  Ca=''; Su=''; Pro=''; AllCaSuPro='';CasuPro='';
  i=0; tit=''; foot=''
  data.forEach(p=>{
    if (cActual!==p.dad) {//primera iteración
      cActual=p.dad; 
      tit=`<strong>${cActual} </strong>`;
    }else{
      i++;
      line+=`${tit}  &nbsp&nbsp  ${i}  ${p.productname} ${p.color} ${p.input} </br>`
      if(cActual==p.categoryName){tit=''; i=0}
    }
  })
  //document.getElementById('categoryCard').innerHTML=`${line}`
};

function addTable(data) {
  console.log(data)
    var c, r, t;
    t = document.createElement('table');
    r = t.insertRow(0); 
    c = r.insertCell(0);
    c.innerHTML = 123;
    c = r.insertCell(1);
    c.innerHTML = 456;
    document.getElementById("addtable").appendChild(t);
}


const tblDetail2 =data=>{return `
  <div class="tablita">
  <table id="tabDet" border="1" class="tabDet table-striped table-bordered responsive" cellpadding="3" cellspacing="1"  >
    <thead>
        <th class="prod-col">Color</th>
        <th class="unit text-center">kg/mts</th>
        <th class="action text-center">X</th>
    </thead>
    <tbody id="tDetails" class="tdetails" > ${newRow()}  </tbody>  
    <tfoot>        <tr>
            <td style="text-align: center;" id="cant">Total Pesos:</td>
            <td style="text-align: center;" id="celdaTotal" colspan="2">0.0</td>
        </tr>    </tfoot></table>  </div> `;}


const beforeSave = data=>{arrAlert=[];   [pag, tModal] = data;
  if (primera(tModal)==='Ingresos:')  {
    arr1['entradas']=JSON.stringify(obtenerDatosTabla()); 
    arr1['campo5'] = gId('titleModal').getAttribute('prid');
    arr1['campo6'] = gId('titleModal').getAttribute('vendor');
    fetch_URL = base_url +'Inventory/setProdIncome';   
  }
 return arrAlert;
}
      
const afterSave = data=>{
  console.log(document.getElementById('id'), data);
  switch (data[1]) {
    case 'new': 
      document.getElementById('id').value= data[0];
      if(document.getElementById('id').value>0) drawTableDetails(document.getElementById('id').value,'tDetails'); 
      hideModal=0; 
      break;

    case 'setProductIncome':
      if(document.getElementById('id').value>0) drawTableDetails(document.getElementById('id').value,'tDetails'); 
      hideModal=0; updating = true;
      break;

    default:console.log('?'); break;        
  } 
}


const click2 = data=>{  alert ('clicked');}

const change2 = data=>{ let sPage, titModal, cmb;
  [sPage, titModal, cmb] = data;  
  if (cmb.id ==='campo1') return;
  tr = cmb.closest('tr');  tr.setAttribute('color-id',cmb.value);
  if(cmb.options[cmb.selectedIndex]){
    colorName = cmb.options[cmb.selectedIndex].text;
    tr.setAttribute('color-name', colorName);
    tr.querySelector('.prod-color').textContent = colorName;
    tr.querySelector('input').focus();
    if (!tempName) tempName =colorName;
  }
}
