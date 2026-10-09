function sortTable(n,type) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0; 
  table = document.getElementById("tProduct");
  switching = true;  dir = "asc"; //Set the sorting direction to ascending:
  /*Make a loop that will continue until no switching has been done:*/
  while (switching) {  //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {//start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare, one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place, based on the direction, asc or desc:*/
      if (dir == "asc") {
        if ((type=="str" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) || (type=="int" && parseFloat(x.innerHTML) > parseFloat(y.innerHTML))) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if ((type=="str" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) || (type=="int" && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

const myModal2=document.getElementById("modal2"); modal2=new bootstrap.Modal(myModal2);
form2 = document.querySelector("#form2");
if (form2) {form2.onsubmit = function(e){e.preventDefault(); validM2();}}

const items = document.getElementById('items');      const hCate = document.getElementById('category-products')
const hBline= document.getElementById('bline-list'); const hInfo= document.getElementById('info')
const tProduct = document.getElementById('tProduct');
const templateProduct = document.getElementById('template-product').content;
const fragment = document.createDocumentFragment();

myProducts={}; catCmb={}; // prods, modal
filterBuilder=[];
arrayCategory=[]; arrayRubros=[]; myBlines=[];  hRubro='';
arrayBrands=[];  arrayProviders =[];
var padre;
title = ['Productos', 'Servicios', 'Insumos',];
titIcon=['<i class="fas fa-barcode"></i>','<i class="fas fa-laptop-code"></i>','<i class="fa fa-industry"></i>']
breadcrumb.innerHTML=`productos`;
hide(['app-breadcrumb']);
addEventListener("DOMContentLoaded", () => {
  dC=new FormData(); dC.append('src', 'data');   
  getSome('Data/getDataCmb/3','catCmb', false, dC); //categorías
  getSome(`Data/getDataByType/15`,'rubros');//filtro común
  fetchData();
  //getSome(`Data/getDataByType/${(APP==11)?15:10}`,'rubros');//filtro común
  //10 para rubro por company o 15 para galerias
  gId('title').innerHTML=titIcon[localStorage.prod_source-1]+title[localStorage.prod_source-1];
});
const fetchData = async()=>{
  try{
    const res=await fetch(base_url+'products/getMyProducts/'+localStorage.prod_source)
    const data=await res.json(); myProducts = data; pintarCards(data);}
  catch (error){console.log(error);  } 
}
function fillTC(texto, type){  
  if (type=='rubros') {
    //for(x of JSON.parse(texto)) arrayRubros[x.fieldId]=x.fieldName;
    arrayRubros=JSON.parse(texto);
    getSome('companies/getMyBlines','misRubros');  }
  if (type=='misRubros') misRubros(texto);
  if (type=='catCmb') {
    catCmb = JSON.parse(texto);  
    if(gId('tree-container')) gId('tree-container').innerHTML = generateInteractiveTree(catCmb);
    if(gId('campo7')) cargarCombo(catCmb, 'combo_categoría','campo7',categoria, 'Categoría', false, '', false, false,'','',false, true);

  }
}

function misRubros(txt){
  obj = JSON.parse(txt);  rubs=(obj.blines).split(',');
  spClass=''; spStyle='';  rubs.unshift('-99'); rubs.unshift('-98');
  arrayRubros.push({fieldId:'-99', fieldName:'Invisibles'}); arrayRubros.push({fieldId:'-98', fieldName:'Inactivos'});
  rubs.forEach(function(rubro){
    const foundRub = arrayRubros.find((myProd)=> myProd.fieldId==rubro);
    if (!foundRub) {rName='Sin Rubro';rubro=0;} else rName=foundRub.fieldName; 
    myBlines.push({rubId:rubro,rubName:rName});
    spClass=(rubro==-99)?'chkInvisible':(rubro==-98)?'chkInactivo':'';
    spStyle=(rubro==-99)?'style="color:red;"':(rubro==-98)?'style="color:orange;"':'';
    hRubro+=`<label class="px-3 ${spClass} ${(rubro===0)?'rubro0':''}" ${spStyle}><input type="checkbox" value=${rubro}>${rName}</label>`;
  });
  hBline.innerHTML = hRubro;  hide(['rubro0', 'chkInvisible', 'chkInactivo']);  //chkInvisible, chkInactivo
  

  
}

const pintarCateg = data=>{
  arrayCategory.forEach(categ => {
    part = document.createElement("a");
    part.className = `btn btn-outline-secondary text-uppercase filter-btn m-2 btn-sm CAT${categ.dataId}`;
    part.setAttribute ("filter", categ.dataName);  part.setAttribute ("data-id", categ.dataId);  
    part.innerHTML = categ.dataName; hCate.appendChild(part);
  });
}

showInvisible = false; showInactive = false;
const pintarCards = data=>{  
  imgPath = base_url+'Assets/images/uploads/';
  ojoAbierto = `<button type='button' action="eyeToggle" class='btInvisible btn btn-success btn-sm' title='visible en tienda virtual'><i action="eyeToggle" class='fa fa-eye'></i></button> `;
  ojoCerrado = `<button type='button' action="eyeToggle" class='btInvisible btn btn-danger btn-sm' title='oculto en tienda virtual'><i action="eyeToggle" class='fa-solid fa-eye-slash'></i></button> `;
  reciclar = `<button type='button' action="eyeToggle" class='btInactive btn btn-info btn-sm' title='producto inactivo'><i action="eyeToggle" class='fa-solid fa-recycle'></i></button> `;
  botones = `<button type='button' action="edt" class='btModificar btn btn-warning btn-sm' title='Editar'><i class='fa fa-edit' action="edt"></i></button>`
  
  i=0; cantInvisibles =0; cantInactivos=0; items.innerText=''; fragment.innerHTML='';

  data = myProducts.filter(prod => prod.estado==1 && prod.invisible==0); //default filter
  
  if (showInvisible) {
    data = myProducts.filter(prod => prod.invisible==1); 
    gIC('chkInvisible').children.item(0).checked = true;   } //else data = data.filter(prod => prod.invisible==0);
  if (showInactive)  {
    data = myProducts.filter(prod => prod.estado==0); ojoCerrado = reciclar;
    gIC('chkInactivo').children.item(0).checked = true;  } //    else data = data.filter(prod => prod.estado==1);
  
    data.forEach(producto=>{
    visible = (producto.invisible==0)? true: false;
    activo = (producto.estado==1)? true: false;
    templateProduct.querySelector('.id').textContent = producto.prid;
    templateProduct.querySelector('.product').textContent = producto.name;
    templateProduct.querySelector('.description').textContent = producto.desc;
    imgProd = isValidUrl(producto.img)? producto.img: imgPath+producto.img;    
    templateProduct.querySelector('img').setAttribute('src', imgProd);
    templateProduct.querySelector('img').setAttribute('alt', `imagen ${producto.name}`);

    templateProduct.querySelector('.price').textContent = producto.price;
    templateProduct.querySelector('.actions').innerHTML = (visible?ojoAbierto:ojoCerrado)+botones;
    templateProduct.querySelector('.multi').innerHTML = `<input value ="${producto.prid}" type="checkbox">`;
    //p_bline =(producto.invisible)? producto.bline + ',-99':producto.bline; 
    //templateProduct.querySelector('.prod-row').setAttribute ('bline', p_bline)
    templateProduct.querySelector('.prod-row').setAttribute ('prid', producto.prid);
    templateProduct.querySelector('.prod-row').setAttribute ('factor', producto.multiplo);
    templateProduct.querySelector('.prod-row').className='prod-row';
    templateProduct.querySelector('.prod-row').classList.add('p-item');
    templateProduct.querySelector('.prod-row').classList.add(`INV${producto.invisible}`);
    templateProduct.querySelector('.prod-row').classList.add(`ACT${producto.estado}`);
    templateProduct.querySelector('.prod-row').classList.add(`BL${producto.bline}`);
    templateProduct.querySelector('.prod-row').classList.add(`CAT${producto.cid}`);
    i++;    

    if (!hasCId(producto.cid))  arrayCategory.push({dataId:producto.cid, dataName:producto.categoria});
    const clone = templateProduct.cloneNode(true); fragment.appendChild(clone);      
  })
  items.appendChild(fragment);
  hInfo.innerHTML=`<p>Productos encontrados: <span id="cantProd">${i}</span></p>`;
  if (gId('btnConfig').getAttribute('prodconfig').substring(4,5)==='0') hide(['imagen']);
  if (hCate.innerHTML.length===0) {sort_arrayCategory();}  
  gId('cantProd').innerText=items.querySelectorAll('tr').length;
  
  console.log(APP===13, hBline, cantInactivos, cantInvisibles, 'showInactive', showInactive, 'showInvisible', showInvisible);
}

const hasCId = data => arrayCategory.some(cid => cid.dataId === data);

//filtering
var CP;   keyword2='todos';
//document.querySelector("#bline-list").addEventListener("click", filtrar2);
hBline.addEventListener("click", filtrar2);

var  fCat, catClass ; 
function filtrar2(e) {data_id=''; filterBuilder=[];
    if (e.target&&e.target.tagName==='A'){//categorías
      e.preventDefault(); data_id = e.target.getAttribute("data-id");
      cleanChkboxes('tit2', true);
      //console.log('showInactive',showInactive, 'showInvisible',showInvisible); 
      if (showInactive) gIC('chkInactivo').children.item(0).checked = true;
      if (showInvisible) gIC('chkInvisible').children.item(0).checked = true;
      catClass = `CAT${data_id}`;
      removeClass(['filter-btn', 'categ-selected']);  e.target.classList.add('categ-selected');
      hide(['p-item']); show([catClass]);   if (data_id==='-1') show(['p-item']);
      gId('cantProd').innerText=items.querySelectorAll('tr.'+catClass).length;
      fCat = items.querySelectorAll(catClass);
    }
    if (e.target&&e.target.tagName==='INPUT'){ //bline
      rubs = gIC('tit2').querySelectorAll("input[type='checkbox']");
      rubs.forEach(r=>{ data = (r.checked)?1:0;          
        foundBLI = filterBuilder.find((myFilter)=> myFilter.dataId==('BL'+r.value));
        if (foundBLI) foundBLI.STT=data; else filterBuilder.push({"dataId":'BL'+r.value, "STT":data,v:r.value});
      });
      if(e.target.value==='-99'||e.target.value==='-98') {
        if (e.target.value==='-99') {showInvisible = (e.target.checked)? true: false; showInactive = false;}
        if (e.target.value==='-98') {showInactive = (e.target.checked)? true: false; showInvisible = false;}
                                     
        removeClass(['filter-btn', 'categ-selected']); addClass(['CAT-1','categ-selected']);        
        arrayCategory = []; hCate.innerHTML=''; cleanChkboxes('tit2'); gId("searchInput").value='';
        pintarCards(myProducts);
        return null;
      }
    filtrarBu();      
    }
}
hCate.addEventListener("click",filtrar2); ///categorías
  
function prepara_abreModal(){preparaModal(); showModal(0,'modal-lg'); campo4.checked=true;}
const visible_in_modal = data =>{  arrData = ['factor', 'brand', 'categ', 'vendor', 'img','imgLay'];
  let prodCf=(document.getElementById('btnConfig').getAttribute('prodConfig'));
  dd=(arrData.indexOf(data));  if (data==='imgLay') return prodCf.slice(dd,dd+1);
  return (prodCf.slice(dd,dd+1)==='0')? 'd-none' :'xd';
}
function preparaModal(prodname='', description='', price=0, status=1, doc=0, especialidad=0, 
  factor=1, marca=0, proveedor=0, insumo=0, imagen='', bline='', offQty=0, offPrice=0, offDue=hoy(), offPlid=0, offApd=false, art='', baco=''){
  blineDiv='';
  cmbBrand = comboBuilder('marca',    1,'campo5', 'data', visible_in_modal('brand'));
  cmbCateg = comboBuilder('categoría',3,'campo7', 'data', visible_in_modal('categ'),true,true,'',true);
  cmbVendor= comboBuilder('proveedor',2,'campo8','client',visible_in_modal('vendor'));
  
  categoria = especialidad;  status=(status==0)?'':' checked ';
  combo2=`<div class="col-md-12"><label class="labels">Doctor</label> </div><div id="combo_doctor"></div> <br></div>`;
  combo3=`<div class="col-md-12"><label class="labels">Especialidad</label> </div><div id="combo_especialidad"></div> <br></div>`;
  
  idcampo = "campo10"; imgProduct = setPreview(nuevaImg(imagen,'uploads'), idcampo, imagen);
  //rend rubros del producto
  rub =  bline.split(',');   hRubroModal='';
    myBlines.forEach(function(chkRub){sele=(rub.includes(chkRub.rubId.toString()))?'checked':'';
      if(chkRub.rubId>0) hRubroModal+=`<label class="px-3"><input type="checkbox" ${sele} value=${chkRub.rubId}>${chkRub.rubName}</label>`; 
    });  document.getElementById('bline-list').innerHTML = hRubro;    
    blineDiv = (hRubroModal.length>0)?`<div class="form-group col-md-12"><label class="control-label">Rubros:<div id="bline-prod">${hRubroModal}</div></label></div>`:'';
    
  check1 =`<div class="col-md-3 d-none " style="padding-top: 15px;">   <div class="form-check"><label class="form-check-label" for="campo4">
                <input type="checkbox" class="form-check-input" id="campo4" name="campo" ${status}><b>Activo</b>     </label>     </div></div>`
  inputs = []; h=''; ar1=[];
  ar1.push({id:'html', idHt:'<br>'+htR1});//start preview
    ar1.push({id:'html', idHt:`<div class="col-md-4 img-preview">`}); ar1.push({id:'combo',  idCmb:imgProduct})// preview
  ar1.push({id:'html', idHt:htR2});// end preview
  ar1.push({id:'html', idHt:'<div class="col">'});

  inputs.push({id:'campo1' ,campo:'Nombre',selector:'input',type:'text',placeholder:'Producto o servicio', value:prodname, label:1, required:''});
  inputs.push({id:'campo2' ,campo:'Descripción',selector:'input',type:'text', placeholder:'Descripción', value:description, label:1});  
    inputs.push({id:'html', idHt:check1, value:0})//Activo?
    //console.log(check1)
    inputs.push({id: 'html', idHt:htR1});//otro row
      inputs.push({id: 'html', idHt:`<div class="col-md-6 col">`}); 
        inputs.push({id:'campo3', campo:'Precio',selector:'input', type:'number', step:'any', value:`${price==0?'':price}`, label:1});
      inputs.push({id:'html', idHt:htR2});  
      inputs.push({id:'html', idHt:ht6});    

      inputs.push({id:'combo', idCmb:cmbCateg, value:categoria});
      inputs=[].concat(ar1,inputs);      
      inputs.push({id:'html', idHt:htR2}); 
      inputs.push({id:'html', idHt:htR2});//fin row

      inputs.push({id:'html', idHt:htR1});//otro row        
      inputs.push({id:'html', idHt:ht6}); inputs.push({id:'combo', idCmb:cmbBrand, value:marca, sel:'brand'}); inputs.push({id:'html', idHt:htR2});
        inputs.push({id:'html', idHt:ht6}); 
          inputs.push({id:'campo12', campo:'Factor (mayorista)',selector:'input', type:'number', value:factor, label:1,defVal:1,clase:visible_in_modal('factor')});
        inputs.push({id:'html', idHt:htR2}); 
      inputs.push({id:'html', idHt:htR2}); //fin row
      
    inputs.push({id:'html', idHt:htR2});inputs.push({id:'html', idHt:htR2});
      inputs.push({id:'combo', idCmb:cmbVendor, value:proveedor});
    inputs.push({id:'campo9', campo:'type',selector:'input', type:'hidden', value:localStorage.prod_source, defVal: getLS('prod_source')});
    
    if (localStorage.APP == '3') {//klk
      cmbDoctor= comboBuilder('doctor',4,'campo8','client');  
      cmbEspec = comboBuilder('especialidad',4,'campo6','client');
    
      inputs.push({id:'html', idHt:htR2}); //fin row
      inputs.push({id:'html', idHt:htR1});//otro row
        inputs.push({id:'html', idHt:ht6}); inputs.push({id:'combo', idCmb:cmbDoctor}); inputs.push({id:'html', idHt:htR2});
        inputs.push({id:'html', idHt:ht6}); inputs.push({id:'combo',  idCmb:cmbEspec}); inputs.push({id:'html', idHt:htR2});
      inputs.push({id:'html', idHt:htR2}); //fin row        
    }
    inputs.push({id: 'html', idHt:blineDiv}); 
  //inputs.push({id: 'html', idHt:'</div><div class="col-md-3"><label>image product</label></div></div>'})
  //-----proyecto Camila -------
      inputs.push({id:'html', idHt:htR1});//otro row
        inputs.push({id:'html', idHt:ht6}); inputs.push({id:'campo13', campo:'Artículo',selector:'input',type:'text', placeholder:'CA123', value:art, label:1}); inputs.push({id:'html', idHt:htR2});
        inputs.push({id:'html', idHt:ht6}); inputs.push({id:'campo14' ,campo:'Código de barras',selector:'input',type:'text', placeholder:'11222333', value:baco, label:1}); inputs.push({id:'html', idHt:htR2});
      inputs.push({id:'html', idHt:htR2}); //fin row        
  //-----fin proyecto Camila -------
  //solo si es una app de comercio   //${offQty}, ${offPrice}, ${offDue}
      if(Number(document.getElementById('id').value)>0){ //ofertas
        arg = [offPlid, offQty, offPrice, offDue, offApd];  
        lblA = (offQty>0)?`Oferta: ${offQty} x ${offPrice} `:'Definir oferta';
        if (offApd) lblA= `Precio a partir de ${offQty} unidades:<b> ${offPrice}</b>`; //showModal2([${arg}])
        if (offPlid==0) lblA = 'Definir oferta';
        inputs.push({id:'html', idHt:`<a href="" class="offer" onclick="event.preventDefault();showModal2([arg])">${lblA}</a>`});
      }
  //        
  openModal(inputs);

  switch (localStorage.getItem('APP')) {
    case '3'://klk
      const data = new FormData(); data.append('src', 'client');
      f_URL = base_url+'Data/getDataCmb/1'; getJson(f_URL, data, 'combo_doctor', 'campo8', doc, 'Doctor')
      const data1 = new FormData(); data1.append('src', 'data');
      f_URL = base_url+'Data/getDataCmb/4'; getJson(f_URL, data1, 'combo_especialidad', 'campo6',especialidad,'Especialidad' )
      break;
    default:
      if (arrayBrands.length > 0) cargarCombo(arrayBrands, 'combo_marca', 'campo5', marca, 'Marca');
        else{ dM=new FormData(); dM.append('src', 'data'); getJson(base_url+'Data/getDataCmb/1', dM, 'combo_marca', 'campo5',marca,'Marca');  }
      if (arrayProviders.length > 0) cargarCombo(arrayProviders, 'combo_proveedor', 'campo8', proveedor, 'Proveedor Habitual');
        else{ //usar arrayProviders
            dP=new FormData(); dP.append('src', 'client'); getJson(base_url+'Data/getDataCmb/2', dP, 'combo_proveedor', 'campo8',proveedor,'Proveedor Habitual');  
        }
      cargarCombo(catCmb, 'combo_categoría','campo7',categoria, 'Categoría', false, '', false, false,'','',false, true);            
  
      //con subcats:
        //getJson(base_url+'Data/getDataCmb/3', dC, 'combo_categoría', 'campo7',categoria,'Categoría',false,'',false,true,0,true,'Nueva');      
      break;
  }
  addClass(['img-preview',visible_in_modal('img')]);
//  addClass(['img-preview',visible_in_modal('factor')]);
}

tProduct.addEventListener("click", e=>{
  if(e.target.tagName=="INPUT"){
    if(items.querySelectorAll("input[type='checkbox']:checked").length>1)
      document.querySelector("#multiEdt").disabled=false; else document.querySelector("#multiEdt").disabled=true;
 }

document.querySelector("#titleCheck").addEventListener('change',() => {
  valor=document.getElementById('titleCheck').checked
  //li[data-active="1"]
  if(!valor)document.querySelector("#multiEdt").disabled=true;
    else document.querySelector("#multiEdt").disabled=false;
  document.querySelectorAll('#items input[type=checkbox]').forEach(function(checkElement) {
    abu=(checkElement.parentElement.parentElement);
    if(!(abu.getAttribute('style'))) checkElement.checked = valor;
  });
})

document.querySelector("#multiEdt").addEventListener('click',()=>{multiEdt()})
  action=e.target.getAttribute('action')
  btn = e.target.closest("svg"); 
  //console.log(e.target.closest('svg')&& e.target.tagName==='path',btn.getAttribute('action'))
  if(e.target.closest('svg')&& e.target.tagName==='path'){
    if (btn.getAttribute('action')==='edt') {btnEdit(e);return null}
    if (btn.getAttribute('action')==='eyeToggle'){btnEyeToggle(e);return null;}  
  }
  if (action==='edt'||(action==='edt'&&e.target.tagName==='path')) {btnEdit(e);return null}
  if (action==='eyeToggle'){btnEyeToggle(e);return null;}
},false);

const btnEdit = e=>{
  removeClassEdited('edited'); 
  padre=(e.target.closest('tr')); padre.classList.add('edited');
  prid = Number(padre.getAttribute('prid'));
  const r = myProducts.find(prod =>prod.prid == prid );
  document.getElementById('id').value = prid
  localStorage.setItem('imgToUpld', r.img);  edtImgName = r.img;  
  
  preparaModal(r.name, r.desc, r.price, r.estado, r.doc, r.cid, r.multiplo, r.brid, 
    r.provider, r.insumo, r.img, r.bline, r.offQty, r.offPrice, r.offDue, r.offPlid, (r.offApd===0||r.offApd===false)?false:true, 
    r.art, r.baco);
  showModal(1,'modal-lg');
  document.getElementById('btnCopyNew').classList.remove('d-none');
}
const btnEyeToggle = e=>{
  padre=(e.target.closest('tr'));  prid = Number(padre.getAttribute('prid'))
  const r = myProducts.find(prod =>prod.prid == prid );
  arr1.id=r.prid; 
  if(showInactive) { 
    newValue = (r.estado==1)?0:1;      arr1.campo2 = 'active'; r.estado=newValue;  }
  if(showInvisible){
    newValue = (r.invisible==0)?1:0;   arr1.campo2 = 'visible'; r.invisible=newValue;  }
  if(!showInvisible&&!showInactive){ //default visible
    newValue = (r.invisible==0)?1:0;   arr1.campo2 = 'visible'; r.invisible=newValue;  }
  arr1.campo1=newValue;  
  const dato = new FormData();  dato.append('campos',JSON.stringify(arr1));
  f_URL = base_url+'products/toggle';  save(f_URL, dato);
  
  padre.remove();
  gId('cantProd').innerText=items.querySelectorAll('tr').length;
}

function findAndUpdate(id){
  const foundEl = myProducts.find((myProd)=> myProd.prid==id);
  foundEl['name'] =arr1['campo1'];    foundEl['desc'] =arr1['campo2'];
  foundEl['price']=arr1['campo3'];    foundEl['multiplo']=(arr1['campo12']==undefined)?1:arr1['campo12'];
  foundEl['art'] =arr1['campo13'];    foundEl['baco'] =arr1['campo14'];
  if(imageChanged()) foundEl['img']  = arr1[idcampo];
  foundEl['bline']= arr1['campo11'];
  foundEl['categoria']= filterCateg; // console.log(arr1['campo6'])
  foundEl['brid']= arr1['campo5'];    foundEl['provider']= arr1['campo8']; //brand and vendor
  foundEl['cid']= arr1['campo7'];
  //foundEl['offPlid']=0; foundEl['offQty']=0; foundEl['offPrice']=0; foundEl['offDue']='';foundEl['offApd']=0;
}

function tEdit(data){
  categId = document.getElementById('campo7').value;
  combo = document.getElementById('campo7');
  filterCateg = (combo.value==0)?'todos':combo.options[combo.selectedIndex].text;
  if(data>0){ // nuevo registro
    templateProduct.querySelector('.id').textContent = data;
    templateProduct.querySelector('.product').textContent = arr1['campo1'];
    templateProduct.querySelector('.description').textContent = arr1['campo2'];
    if (arr1[idcampo]) {
      let imagen=(arr1[idcampo].length===0)?'noimage.jpg':arr1[idcampo];
      templateProduct.querySelector('img').setAttribute('src', imgPath+ imagen);
      if (imagen.substring(0,4)==='blob'|| isValidUrl(imagen)) {
        templateProduct.querySelector('img').setAttribute('src', arr1[idcampo]);
      }
    }
    templateProduct.querySelector('.price').textContent = arr1['campo3'];
    templateProduct.querySelector('.actions').innerHTML = ojoAbierto+botones;
    templateProduct.querySelector('.prod-row').setAttribute ('bline', arr1['campo11'])
    templateProduct.querySelector('.prod-row').setAttribute ('prid', data)
    templateProduct.querySelector('.prod-row').setAttribute ('filter', filterCateg)    
    templateProduct.querySelector('.prod-row').classList.add('p-item');

    templateProduct.querySelector('.prod-row').classList.add(`BL${arr1['campo11']}`);
    templateProduct.querySelector('.prod-row').classList.add(`CAT${categId}`);

    const clone = templateProduct.cloneNode(true);
    fragment.appendChild(clone);
    theFirstChild = items.firstChild;
    items.insertBefore(fragment,theFirstChild);
    categId = document.getElementById('campo7').value;
    myProducts.push({prid:data, name:arr1['campo1'], desc:arr1['campo2'], img:arr1[idcampo],
          price:arr1['campo3'], bline:arr1['campo11'], categoria:filterCateg, invisible:0,
          marca:document.getElementById('campo5').value,
          cid:categId, estado:1,
          daddy:document.getElementById('campo7').value,
          provider:document.getElementById('campo8').value,
          offPlid:0, offQty:0, offPrice:0, offDue:'', offApd:false
        });
        
    if(document.getElementById('btnConfig').getAttribute('prodconfig').substring(4,5)==='0') addClass(['imagen','d-none']);
    
  }else{//edit
    hijos = padre.querySelectorAll('td')
    td = padre.querySelector('.product'); td.textContent=arr1['campo1'];
    td = padre.querySelector('.description'); td.textContent=arr1['campo2'];
    td = padre.querySelector('.price'); td.textContent=arr1['campo3'];
    tt = hijos[3].querySelector('img'); 
    padre.className='prod-row p-item';
    padre.classList.add(`BL${arr1['campo11']}`);  padre.classList.add(`CAT${categId}`);
    imgProd = isValidUrl(arr1[idcampo])? arr1[idcampo]: imgPath+arr1[idcampo];
    if (arr1[idcampo].substring(0,4)==='blob') imgProd=arr1[idcampo];
    tt.setAttribute('src', imgProd);
    findAndUpdate(prid);    removeClassEdited('edited');
  }
  if (!hasCId(categId)) {  // si no está en arrayCategory
    hCate.innerHTML=''; 
    arrayCategory.push({dataId:categId, dataName:filterCateg});
    sort_arrayCategory();  }
    
}

const getSwitch = data =>{
  checked = (data[0]==1)?'checked':''; show=(data[3])?data[3]:'';
  return `<label class="toggle mb-1 ${show}">
      <input class="toggle-checkbox " type="checkbox" ${checked} id="${data[1]}" name="campo">
      <div class="toggle-switch "></div>
      <span class="toggle-label">${data[2]}</span>    </label>    <br>  `;
}

document.getElementById('btnConfig').addEventListener('click',function(){
    let prodCf=(this.getAttribute('prodConfig'))
    factorCheck = prodCf.substring(0,1);    brandCheck  = prodCf.substring(1,2);
    categCheck  = prodCf.substring(2,3);    providCheck = prodCf.substring(3,4);
    imageCheck  = prodCf.substring(4,5);
    
    img_layout=(prodCf.substring(5,6)==0)?1 : prodCf.substring(5,6);
  check2=`
    <div class="container">    
      ${getSwitch([factorCheck,'campo1','Factor (para mayoristas)'])}
      ${getSwitch([brandCheck, 'campo2','Marca'])}
      ${getSwitch([categCheck, 'campo3','Categoría'])}
      ${getSwitch([providCheck,'campo4','Proveedor'])}
      ${getSwitch([imageCheck, 'campo5','Imagen'])}
    </div>`;
   
      check2+=`    
      <div class =" ">
        <fieldset>
          <legend align="right" class="lead mt-3">Orientación de imagen:</legend>

          <label class="btn  btn-sm" >
            <input type="radio" class="btn-check" name="img_layout" value="1"  
            ${(img_layout==1?'checked':'')}>Vertical </label>
          
          <label class="btn  btn-sm" >
            <input type="radio" class="btn-check" name="img_layout" value="2"
            ${(img_layout==2?'checked':'')}>Cuadrado </label>

          <label class="btn  btn-sm" >
            <input type="radio" class="btn-check" name="img_layout" value="3" 
            ${(img_layout==3?'checked':'')}>Horizontal </label>
        </fieldset>
      </div>`;
    
  inputs = [];
  inputs.push({id: 'combo',  idCmb:check2, value:0});
  
  openModal(inputs);  showModal();
  document.getElementById('titleModal').innerHTML='Configuración';
})

function multiEdt(){
  srcComboCampo=
   `[{"fieldId":"1","fieldName":"Precio"},
     {"fieldId":"2","fieldName":"Descripción"},
     {"fieldId":"3","fieldName":"Nombre del producto"},
     {"fieldId":"4","fieldName":"Categoría"},
     {"fieldId":"5","fieldName":"Rubros"}]`;
  cmbCampo = `<div id="cmbCampo"><div><label for="">Campo </label></div><div id="combo_campo"></div></div></div>`;
  txtValor = `<div id="txtValor" class="form-group ">
            <label class="control-label" style="width: auto;" id="lbl_campo2">Valor</label>
            <input class="form-control col-md-12" id="campo2" name="campo" type="text"></div>`
  inputs = []; h='';  
  cmbCateg = comboBuilder('categoría',3,'campo6','data','d-none');
    hRubroModal='';//rubros
    myBlines.forEach(function(chkRub){
      hRubroModal+=`<label class="px-3"><input type="checkbox" value=${chkRub.rubId}>${chkRub.rubName}</label>`; 
    });  document.getElementById('bline-list').innerHTML = hRubro;
    blineDiv =`<div id="contRubrosMulti" class="form-group col-md-12 d-none"><label class="control-label">Rubros:
                  <div id="bline-prod">${hRubroModal}</div></label></div>`;
    
  //inputs.push({id:'campo2', campo:'Valor', selector:'input',type:'text', label:1})  
  inputs.push({id:'combo',  idCmb:cmbCampo});  inputs.push({id:'html', idHt:txtValor});
  inputs.push({id: 'combo', idCmb:cmbCateg});  inputs.push({id: 'html', idHt:blineDiv});
  openModal(inputs);  
  //stringify para cargar combo con json de prueba, luego traerlo de la base
  srcComboCampo = JSON.parse(srcComboCampo);
  cargarCombo(srcComboCampo, 'combo_campo', 'campo1', 0,'Seleccione Campo');
  const datCat = new FormData(); datCat.append('src', 'data');
  f_URL = base_url+'Data/getDataCmb/3'; getJson(f_URL, datCat, 'combo_categoría', 'campo6',0,'Categoría')
  
  showModal();  
  document.querySelector('#titleModal').textContent ="Edición múltiple"; 
}

document.querySelector("#searchInput").addEventListener('keyup', () => {
    const text = searchInput.value.trim();    let row=0; let inicio = 0; encontrados=0;
    while( row =items.rows[inicio++]){
      if( row.textContent.toLowerCase().indexOf(text.toLowerCase()) === -1){
        row.style.display = 'none';}else{row.style.display = null;encontrados++}
    }
    document.getElementById('cantProd').innerText = encontrados;
} );

function actionA1(e,c){
  document.getElementById(c).addEventListener('keyup', (event) => {
    if (event.keyCode == 107) {   f=e.substring(6);
      showAddData('mini-crud_'+f,'txtAdd_'+f);
    } }, false);
}

const sugerirNombre = data=>{  
  console.log('sugerirNombre', data);
  foundDad = catCmb.find((dd)=> dd.fieldId==data);
  return (foundDad)? foundDad.fieldName : 'xx';  
};

const afterSave = data=>{    console.log(data);
  switch (data[1]) { //model
    case 'SetAdr': 
      console.log('hello');
      hideModal=0; 
      getSome('Data/getDataCmb/3','catCmb', false, dC); //categorías
      
      //jsons={fieldId:parseInt(data[0]), fieldName:data[2].campo1, datastatus:1, aux:data[2].campo2};
      //catCmb.push (jsons);  catCmb.sort((a,b)=> (a.fieldName > b.fieldName ? 1 : -1))
    break;
    case 'setConfig': items.innerHTML=''; removeClass(['imagen','d-none']);pintarCards(myProducts); break;
    case 'setProduct':
      console.log('setProduct', data);
      if(titModal!=='Edición múltiple') tEdit(data[0]); else window.location.reload();
      localStorage.removeItem('imgToUpld');
    break;

    case 'setImage':
      foundEl = myProducts.find((myProd)=> myProd.prid==arr1.id );
      foundEl['img'] = arr1[idcampo];    
    break;

    case 'setOffer':  hideModal=0; 
        findAndUpdateOff(document.getElementById('id').value, document.getElementById('id2').value);
        modal2.hide();//closeModal2();
      break;
      //setscat
    case 'setscat': hideModal=0; closeModal2(); break;
    //case 'setSubcat': hideModal=0; closeModal2(); break;
    case 'delData': document.querySelector('.ed'+arr1['id']).remove(); break;
    case 'delProduct': hideModal=1;       
      console.log('deleted');    break;
    default:      console.log('model',data[1]);     break;
  }
}

const beforeSave = data=>{ arrAlert=[];  
  //console.log(data);
  switch (data[1]){
    case 'Configuración':
      document.getElementById('btnConfig').setAttribute('prodconfig',''+arr1.campo1+arr1.campo2+arr1.campo3+arr1.campo4+arr1.campo5+ arr1.campo6)
      fetch_URL=base_url+'Products/setConfig';
      break;
    default:
      if(titModal!=='Edición múltiple'){
        //fetchMulti(arr1, 'Products/setProduct', '', '../Assets/images/uploads/',idcampo);
        setImg =  (localStorage.imgToUpld===arr1[idcampo])? '' : 'Products/setImage';
        fetchMulti(arr1, 'Products/setProduct', setImg, '../Assets/images/uploads/', idcampo);
        arrAlert[0]='_exit';
        } else{
          //arrAlert[0]='_confirm'; arrAlert[1]='¿Confirma que desea modificar los productos seleccionados?';
          //arrAlert[2]='warning'; arrAlert[3]='Sí, modificar'; arrAlert[4]='No, cancelar';

          gId('id').value='m';
        }
      break;      
    }
  return arrAlert;
}


function cmbCh2_product(cmb){ //console.log('cmb',cmb) toDel

  //if (cmb.id==='campo7') cargarHijos([cmb.value]);
  //if (cmb.id==='campo6') sugerirNombre();
  //if (data[2].id==='campo7') document.getElementById('btnActionForm').removeAttribute('disabled');
}

const change2 = data=>{ let sPage, titModal, cmb;
  [sPage, titModal, cmb] = data;
  text = cmb.options[cmb.selectedIndex].text;
  aux = cmb.options[cmb.selectedIndex].getAttribute('aux');
  if (cmb.id==='campo7' && titModal=='Nuevo') {
    placeholder = (aux>0) ? sugerirNombre(aux)+ ' '+text.trim() : text;    
    campo1.value = placeholder;

  }
  if (cmb.id==='campo7') document.getElementById('btnActionForm').removeAttribute('disabled');
}

function showModal2(arg){  
  if (Array.isArray(arg))  [oI, oC, oP, oD, oApd] = arg[0];    
  if(oD==='') oD = sumarDias(new Date(hoy()), 10).toISOString().substring(0, 10);
  if (inputs2.innerHTML.length==0) preparaModal2(arg);//preparaModal2(oI,oC,oP,oD,oApd);
  if (gId('field1'))gId('field1').value=oApd;
  if (gId('field2'))gId('field2').value=oC;
  if (gId('field3'))gId('field3').value=oP;
  if (gId('field4'))gId('field4').value=oD;
  gId('id2').value =  oI;
  if(inputs2.innerHTML.length==0)preparaModal2();
  modal2.show();  
}

function preparaModal2(arg){ let oD='';
  [oI, oC, oP, oD, apd] = arg[0];   // oD = new Date(oD); 

  inputs=[]; 
  check1 = checkTemplate('field1',apd, 'A partir de..','', 'field');
  inputs.push({id:'html', idHt:check1}); //field1
  inputs.push({id:'field2',campo:'Cantidad',selector:'input',type:'number',value:oC, step:'any', label:1})
  inputs.push({id:'field3',campo:'Precio total',selector:'input',type:'number',value:oP, step:'any',label:1})
  inputs.push({id:'field4',campo:'Oferta válida hasta', selector:'input',type:'date', value:oD, label:1  }) 
  if (oI>0)  inputs.push({id:'html', idHt:`<a href="" class="delOff" onclick="event.preventDefault();delOff(oI)" >Eliminar esta oferta</a>`});
  openModal(inputs, '.inputs2');  document.querySelector('#titleModal2').innerHTML ="Oferta"; 
}
function validM2(){  
  arr2=new Object();
  arr2['id']=(document.getElementById('id2'))? document.getElementById('id2').value:0
  arr2['prid']=(document.getElementById('id'))? document.getElementById('id').value:0
  campos=document.getElementsByName("field");
  for (i = 0; i < campos.length; i++) {
    clave = campos.item(i).id;  valor = campos.item(i).value;
    if (campos.item(i).type==='checkbox') valor = (campos.item(i).checked)?1:0;
    if (valor.length==0 && i==0)valor='';
    arr2[clave]=valor;  } 
  if (document.querySelector('#titleModal2').innerText === 'Oferta') {
    if (arr2.field2==0) {alertError ('Error en cantidad','field2'); return;}
    if (arr2.field3==0) {alertError ('Error en cantidad','field3'); return;}
    const dato=new FormData(); dato.append('campos', JSON.stringify(arr2));
    fURL = base_url+`Pricelist/setOffer`;   save(fURL, dato);
  }else{//cats & subcats
    /*
    scats = Array.from (document.getElementsByName("field")).map(input => input.value).filter(input => input.trim() !== '');
    console.log('subcats, arr2', arr2, scats);
    fURL=base_url+'Data/setscat'; 
    const scatsForm = new FormData(); scatsForm.append('subcats', JSON.stringify(scats));
    save(fURL, scatsForm);
    */
  }
}

function delOff(arg){eliminar2(arg, 'off');}
function findAndUpdateOff(id, id2){ //console.log(id,id2);
  const foundEl = myProducts.find((myProd)=> myProd.prid==id);
  if (!foundEl&&id2==='deleted'){
      arg = [offPlid, offQty, offPrice, offDue, offApd];  
      lblA = (offQty>0)?`Oferta: ${offQty} x ${offPrice} `:'Definir oferta';
      if (offApd) lblA= `Precio a partir de ${offQty} unidades:<b> ${offPrice}</b>`; //showModal2([${arg}])
      inputs.push({id:'html', idHt:`<a href="" class="offer" onclick="event.preventDefault();showModal2([arg])">${lblA}</a>`});
    return;
  }
  foundEl['offQty'] = arr2['field2'];   foundEl['offPrice'] = arr2['field3'];
  foundEl['offDue'] = arr2['field4'];   foundEl['offApd'] = arr2['field1'];
  offApd = (arr2['field1']==1)?true:false;
  arg = [parseInt(id2), parseFloat(arr2['field2']), parseFloat(arr2['field3']), arr2['field4'], offApd];  
  lblA = `Oferta: ${arr2['field2']} x ${arr2['field3']} `;
  if (offApd) lblA= `Precio a partir de ${arr2['field2']} unidades: <b>${arr2['field3']}</b>`;
  document.querySelector('.offer').innerHTML = `<a href="" class="offer" onclick="event.preventDefault();showModal2([arg])">${lblA}</a>`
}

//intento de subcat

const newSubCat = e=>{ et = e.target; inputs=[];
  if (et.type==="checkbox" && et.id ==='field1') {
    if (field1.checked===true){
      lbl_field3.innerText='Precio Unitario', 
      lbl_field3.style.color='blue'; field1.parentElement.style.color = 'blue'
    }else {
      lbl_field3.innerText='Precio total'; 
      lbl_field3.style.color='black'; field1.parentElement.style.color = 'black';
    }
    return null;
  }
  if (et.tagName==="BUTTON" && et.innerText.trim() ==='x') {    et.parentNode.remove();  return null;  }
  if (et.tagName==="INPUT" && et.classList.contains('subcat')) {
    newGroup = crEl2('div', 'input-group mb-9', {a: 'pepe', b: 'bar'},'');
    newGroup.appendChild(crEl2('input', 'form-control ml-2', {
      type:'text', placeholder:'Subcategoría nueva', 'aria-label':'Subcategoría nueva',
      name:'field'}, ''));
    newGroup.appendChild(crEl2('button', 'btn btn-outline-secondary', {type: 'button', value:'x'}, 'x'));
    inputs2.appendChild(newGroup);
  } 
}

document.querySelector('#inputs')?.addEventListener("click", newCat)
document.querySelector('#inputs2')?.addEventListener("click", newSubCat)


function generateInteractiveTree(items,cl="licat") { 
  if (!items || items.length === 0) return ''; 
  let html = '<ul >'; 
  puntos=`<div class ="puntos" >. . .</div><div class="fm"></div>`;
  items.forEach(item => {// Si tiene hijos, le ponemos una flechita y una clase especial
    const hasChildren = item.children && item.children.length > 0;
    //px-1 rounded hover:bg-gray-100 relative
    html += `<div class="${cl}" >
        <li class="${hasChildren ? 'folder' : 'file'}" data-id="${item.fieldId}">`;
    if (hasChildren)  html+= `<span class="toggle-icon">▼</span> `;
    html += `<span class="label">${item.fieldName}</span>`;    
    if (hasChildren) {
      html += `</li>${puntos} </div>`;
      html+=`<div class="kids"><div class="nested-content">${generateInteractiveTree(item.children)}</div></div>`;
    }else html += `</li>${puntos} </div>`;
  });
  html += '</ul>';  return html;
}

const catSearchInput = e =>{
    const term = e.target.value.toLowerCase();
    const allLabels = gId('tree-container').querySelectorAll('.label');
    const allLis = gId('tree-container').querySelectorAll('li');
    // Si el buscador está vacío, limpiamos resaltados y no hacemos nada más
    if (term === "") {
      allLis.forEach(li => li.classList.remove('highlight', 'found-child'));
      return;
    }
    allLis.forEach(li => {
      const label = li.querySelector('.label').textContent.toLowerCase();
      if (label.includes(term)) { // 1. Resaltamos el elemento encontrado
        li.classList.add('highlight');        
        // 2. MAGIA: Expandimos a todos los padres para que el hijo sea visible
        let parent = li.parentElement.closest('li');
        while (parent) {
          parent.classList.remove('collapsed');
          parent.classList.add('found-child'); // Clase opcional para marcar la ruta
          parent = parent.parentElement.closest('li');
        }
      } else         li.classList.remove('highlight');      
    });
}
function newCat(e){ et = e.target; inputs=[]; h='';
  d1 = `<div id="tree-container" class="tree-container overflow-auto" style="height: 250px;"></div>`;
  ctxMenu =`<div class="ctxmenu d-none" id="ctxmenu">
            <li><a class="edt ctx-item" href="#" action = "edt">editar</a> </li>
            <li><a class="new ctx-item" href="#" action = "new">nueva</a></li>
            <li><a class="del ctx-item" href="#" action = "del">eliminar</a></li>
          </div>`;
  if (et.tagName==="INPUT" && et.classList.contains('subcat')) {  }
  if((et.tagName==="A")&&et && et.innerText.trim() ==='...') {
    check1 =`<div class="col-md-12 " >   <div class="form-check"><label class="form-check-label " for="chkSubCat">
              <input type="checkbox" class="form-check-input subcat chkSubCat" id="chkSubCat">Incluir subcategorías</label> </div></div>`;
    inputs.push({id:'html', idHt:`<a class="btn btn-warning modalButton newcat" href="#" >Agregar categoría</a>`});
                
    inputs.push({id:'html', idHt:`<div class="row cont-newcat mt-2" >`});
      inputs.push({id:'field1', campo:'Categoría', selector:'input', type:'input', placeholder:'Categoría nueva', clase:'col-md-8'});
      inputs.push({id:'html', idHt:`<div class="col-md-3" style="margin-left: -20px;"><a class="btn btn-outline-primary modalButton savecat" href="#" >Guardar</a></div>`});
      inputs.push({id:'html', idHt:`<div class="col " style="margin-left: -15px;"><a class="btn btn-close x" aria-label="Close" href="#"> X </a></div>`});
    inputs.push({id:'html', idHt:htR2});
    inputs.push({id:'tree-search', campo:'Buscar', selector:'input', type:'input', placeholder:'Buscar... ',label:1});
    //inputs.push({id:'html', idHt:check1, value:0});    
    inputs.push({id:'html', idHt:d1});
    inputs.push({id:'html', idHt:ctxMenu});
        
    openModal(inputs,'.inputs2');  titleModal2.innerText='Categorías';
    hide(['save','cont-newcat']); 
    gIC('cancel').innerText = 'Cerrar';
    gId('tree-container').innerHTML = generateInteractiveTree(catCmb);
    gId('inputs2').addEventListener('click', (e) => { catclick2(e);});
    gId('tree-search').addEventListener('input', (e) => {catSearchInput(e)});
    modal2.show();  
  }
}
edtItem = 0;
const catclick2 = data =>{      
  el = data.target; let   currDiv, nextDiv, catId;  
  gId('tree-container').querySelectorAll('.licat').forEach(div => div.style.backgroundColor = '');
  hide(['ctxmenu']);
  if (el.classList.contains('toggle-icon')) {
    currDiv = el.closest('div'); currDiv.classList.toggle('collapsed');
    nextDiv = currDiv.nextElementSibling; nextDiv.classList.toggle('collapsed');
  } 
  if (el.classList.contains('puntos')) {data.preventDefault();
    catId = el.previousElementSibling.getAttribute('data-id'); edtItem = catId;
    line = el.closest('.licat');    
    line.style.backgroundColor = 'lightgray'; line.style.transition = 'background-color 0.75s ease';
    line.classList.add('edt-item','ed'+catId);
    const rect = gIC('inputs2').getBoundingClientRect();
    gIC('ctxmenu').style.left = data.clientX-rect.left-60 + 'px';
    gIC('ctxmenu').style.top = data.clientY -150 + 'px';    
    show(['ctxmenu']); gIC('ctxmenu').setAttribute('data-id', catId);
  }
  if (el.classList.contains('newcat')) {
    show(['cont-newcat']); field1.focus(); field1.setAttribute('dad', 0); return;  }
  if (el.classList.contains('x')) {field1.value=''; hide(['cont-newcat']);return; }
  if (el.classList.contains('savecat')) {
    //if (field1.value.trim().length==0) { alertError('El nombre no puede estar vacío', 'field1'); return; }
    ddd = field1.getAttribute('dad'); 
    if (ddd===null){//      console.log('editing cat',catId); 
      edtR2({_id: edtItem, c1: field1.value}); 
      uptCatCmb([edtItem, field1.value]);
      gId('tree-container').innerHTML = generateInteractiveTree(catCmb);
      return;}
    else{  //new cat or subcat
      console.log('new cat, dad', ddd);
      ddd = (ddd)? ddd : 0;
      addR2('data','3','',field1.value, ddd); 
    }
    hide(['cont-newcat']); field1.value='';
  }
  if (el.classList.contains('ctx-item')) { 
    catCRUD(el.getAttribute('action'), gIC('ctxmenu').getAttribute('data-id')); 
    return; }    
  else {  
    console.log(el.innerHTML,catId, el.getAttribute('action'));
  }
}

const catCRUD = (action, _id) =>{ console.log(action, _id);
  switch (action) {
    case 'del': eliminar2(_id, 'cat'); break;
    case 'edt': 
      _r= nomCat(_id);
      field1.value=_r.fieldName; field1.removeAttribute('dad');
      show(['cont-newcat']); field1.focus(); 
    break; 
    case 'new': 
      field1.placeholder='Nueva sub categoría'; field1.setAttribute('dad', _id);
      show(['cont-newcat']); field1.focus(); 
    break;
    default: break;
  }
}


function sort_arrayCategory(){
  arrayCategory = arrayCategory.filter(item => item.dataId !== -1);
  arrayCategory.sort((a, b) => a.dataName.localeCompare(b.dataName));
  arrayCategory.unshift({dataId:-1, dataName:'todos'});
  pintarCateg();
}

const savOb = data =>{  [el,texto, selected] = data;
  console.log(data);
  switch (el) {
    case 'combo_marca':      arrayBrands = texto;      break;
    case 'combo_proveedor':  arrayProviders = texto;   break;
    default:      console.log('no action');      break;
  }
  
}
 
function checkTemplate(campo='',stt=false, Check_text='', className='', name='campo'){ //add to scrpt2?
  stt=(stt==0)?'':' checked ';
  return `<div class="${className}"><div class="form-check">
              <label class="form-check-label" for="${campo}">
                <input type="checkbox" class="form-check-input"  name="${name}" id="${campo}" ${stt}>${Check_text}
              </label></div></div></br>`;
}

const delDato = data =>{  //console.log(data);
  arrAlert=[]; [sPage, id_del, dType] = data;  
  switch (dType) {
    case "off":
      if (confirm("Confirme la eliminación del la oferta..")) {
        fetch_URL = base_url+'Pricelist/delOff';
        const data = new FormData(); data.append('id', gId('id2').value); 
        save(fetch_URL, data);    closeModal2();
        findAndUpdateOff(id,'deleted');        updating = true;
        arrAlert[0]='_exit';
      }
    break;
    case "cat":
      if (confirm("Confirme la eliminación de la categoría..")) {
        const data = new FormData(); data.append('id', id_del);  data.append('par2', 3);
        fetch_URL = base_url+'Data/delData'; save(fetch_URL, data);
        //arr1 = arrayCategory.find(cat => cat.dataId == id_del); arrayCategory = arrayCategory.filter(cat => cat.dataId != id_del);
        arr1['id']=id_del;
        console.log('Categoría eliminada:', id_del);
        arrAlert[0]='_exit';
      }
    break;

    case undefined:
        fetch_URL = base_url+sPage+'/del'+sPage.slice(0,-1);
        //arrAlert[0]='_exit';
        
        prid = Number(gIC('edited').getAttribute('prid'));
        //const data = new FormData(); data.append('id', prid);
        const r = myProducts.find(prod =>prod.prid == prid ); r.estado=0;
        
        fila = gIC('edited');
        filas = Array.from(items.querySelectorAll('tr'));
        filaIndex = filas.indexOf(fila);
        fila.remove();     
        console.log('filaIndex', filaIndex, filas.length,items.rows.length);   
        filaDestino=0; ultimaFila=0;
        if (filaIndex < items.rows.length) { // Si aún hay filas después de la eliminada
                 filaDestino = items.rows[filaIndex];
                filaDestino.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 'start' para ir al inicio de la fila
            } else if (items.rows.length > 0) { // Si se eliminó la última, vamos a la nueva última (si existe)
                 ultimaFila = items.rows[items.rows.length - 1];
                ultimaFila.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }        
            console.log(filaDestino,ultimaFila);
    break;
    default:      alert('no definido');      break;
  }
  return arrAlert;
}    
function filtrarBu(){
  activos=filterBuilder.filter(r=> r.STT==1&&r.v>0).map(r=> r.dataId); //.join(',')
  hide(['p-item']);
  if (catClass === undefined || catClass.length==0) { 
    fase1= items.querySelectorAll('tr'); removeClass(['filter-btn', 'categ-selected']);  addClass(['CAT-1','categ-selected']);
  } else  fase1 = items.querySelectorAll('tr.'+catClass);
  if (activos.length>0){
    fase1.forEach(row => {    
      activos.forEach(a => { if (row.classList.contains(a)) row.classList.remove('d-none'); });
    });
  } else show ([catClass]);     
}

const modalBt = data =>{console.log(data);}
const children = data =>{
  //mapear children de catCmb y devolver un array con los nombres de las categorías hijas 
  console.log(data);
  let hijos = [];
  catCmb.forEach(cat => {    
      cat.children.forEach(child => {
        hijos.push(child.fieldName);
      });
  });
  return hijos;
}

const nomCat = data =>{  let nomCat = {};  
  catCmb.forEach(cat => {
    if (cat.fieldId == data) { nomCat.fieldName = cat.fieldName; nomCat.ddd=cat.ddd;}
    cat.children.forEach(child => {
      if (child.fieldId == data)  {nomCat.fieldName = child.fieldName; nomCat.ddd=child.ddd;}
    });  });
  return nomCat;  }

const uptCatCmb = data =>{ [_id,text]=data;
  catCmb = catCmb.map(cat => {
    if (cat.fieldId == _id) {  return {...cat, fieldName: text};
    } else{
        cat.children = cat.children.map(child => {
          if (child.fieldId == _id) {  return {...child, fieldName: text};
          }        return child;
        });      return cat;
    }
  });
}