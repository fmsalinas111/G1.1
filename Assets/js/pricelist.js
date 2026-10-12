document.querySelector("#btnNuevo").addEventListener('click',()=>prepara_abreModal());

breadcrumb.innerHTML=`Listas de precios`;
editedValue=''; cCell=''; myProducts={};
document.querySelector('#plist').classList.add('editable');
cmbCat = comboBuilder('categoría',3,'category','data','pp',false,false);
document.getElementById('catFilters').innerHTML=cmbCat;
const dCat = new FormData(); dCat.append('src', 'data');
f_URL = base_url+'Data/getDataCmb/3'; getJson(f_URL, dCat, 'combo_categoría', 'category',0,'Filtro por categoría' )


getSome('Pricelist/getPricelist/1', 'plist');
getSome('Pricelist/getListNames', 'listNames');

function fillTC(texto, type){
  if (type==='plist') {myProducts=JSON.parse(texto); fillTableContent(texto);}
  if (type==='listNames')  rendListNames(texto);
}

arrLists=[];
const rendListNames = data=>{ 
  arrLists=JSON.parse(data);i=0
  for (x of arrLists){ i++;
    plist.querySelector('#list'+i).innerHTML=`${x.fieldName} <i class='fa fa-edit ' action="edt"></i>`;
    plist.querySelector('#list'+i).setAttribute('list',x.fieldId);
  }
}

const fillTableContent = data=>{ 
  r1=''; r2='';  rr=''; precios=[];
  obj=JSON.parse(data);
  for (x of obj) {
    r1 = `<tr prid="${x.pid}"><td contentEditable = "false" class="col0">${x.prName}</td>`;
    pr = (x.base+'|'+x.precios); pr1 = pr.split('|'); arraux=[];
    for (y of pr1) {
      list=''; ind=y.indexOf(":"); clase='';
      if(y.includes(':')){list=y.substring(0,ind); y=y.substring(ind+1);
          arraux.push({list:list,value:y
        })}else{clase="col0"}
      if(y!=='null') r2+=`<td class="text-right ${clase}"  list="${list}" >${y}</td>`;
    }
    rr+=r1+r2+`</tr>`;
    r2='';
  }
  document.querySelector('tbody').innerHTML=rr;
}



document.querySelector("#plist").addEventListener("click", checkClick);
function checkClick(e){
  if (e.target&&e.target.tagName==='TD'&&!e.target.classList.contains('col0')){
    if (cCell) cCell.classList.remove('edit');
    cell = e.target;
    cell.contentEditable = true;
    cell.classList.add('edit');
    cell.focus();    cCell=cell;
    editedValue=cell.textContent;
  }
}


document.getElementById('plist').addEventListener('keyup', (event) => {
    if (event.keyCode == 27|| event.keyCode == 13) { 
      cCell.classList.remove('edit');
      cell.contentEditable = false; 
      if (event.keyCode ==27) cCell.textContent=editedValue;
      if (event.keyCode ==13) cCell.textContent=cCell.textContent.replace(/(\r\n|\n|\r)/gm, "");
    } 
}, false);

//save
document.querySelector('#btnSave').addEventListener('click',(event)=>{
  columnas=[];filas=[];
  const tableRows = plist.querySelectorAll('tr');
  for(let i=1; i<tableRows.length; i++) {
    const row = tableRows[i];
    prid=row.getAttribute('prid');
    cols=row.querySelectorAll('td');
    for(let j=0; j<cols.length; j++) {
      const col = cols[j];
      if(j>1) columnas.push({prid:prid, list:col.getAttribute('list'), price:col.textContent});      
    }
    filas.push(columnas); columnas=[];
  }
  const dPL=new FormData(); //PriceList
  dPL.append('plist',JSON.stringify(filas)); 
  save(base_url+'Pricelist/setPLDetails', dPL); return;
});

const afterSave = data=>{  //console.log(data)
  if (data[1]==="setPricelis") window.location.reload();
}

const change2 = data=>{
  PF=myProducts.filter(prod => prod.categ==data[2].value); 
  fillTableContent(JSON.stringify(PF));
}


function prepara_abreModal(){preparaModal(); showModal(0);}
function preparaModal(name='', description='', status=1){
  name='testName';descripcion='descTest'
  inputs = [];
  cmbStt=comboStatus('campo3', (status>0)? 'selected':'');
  inputs.push({id: 'campo1' ,campo:'Nombre',selector:'input',type:'text',placeholder:'Emprendimiento', value:name, label:1})
  inputs.push({id: 'campo2' ,campo:'Descripción',selector:'textarea',rows:2, innerHTML:description, label:1})
  inputs.push({id: 'combo',  idCmb:cmbStt})// status
  openModal(inputs);
}
