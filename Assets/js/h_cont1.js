Products={}; Clients={}; totInsumo=0; totService=0; totProd=0;
const code = title.getAttribute('code');
o_id=localStorage.prod_order; qtalles=localStorage.prod_qtalles; 
title.innerText=localStorage.prod_name;

d1=new FormData(); d1.append('src','client'); f_URL=base_url+'Data/getDataCmb/0';
gJSON(f_URL,d1).then((json)=>{Clients=json;}).catch((err)=>console.log("Err:", err));

d1=new FormData(); d1.append('src','product'); f_URL=base_url+'Data/getDataCmb/0';
gJSON(f_URL,d1).then((json)=>{Products=json;}).catch((err)=>console.log("Err:", err));

addEventListener("DOMContentLoaded", () => {
  document.getElementById('supplies').innerHTML=tblDetail();
  document.getElementById('services').innerHTML=outsource();
  document.getElementById('costs').innerHTML=cost();
});

const loadTables=data=>{
  let dataTbl = new FormData(); dataTbl.append('src', data[0]); 
  fURL=base_url+'Data/getDataTbl/'+data[1]; getTbl(fURL, dataTbl, data[2]);//cargaTabla
}

loadTables(['prod_details',o_id,'tDetails']);
loadTables(['tercer',code,'tOutsource']);

async function cargarTabla(texto, el){
  try{
    if (el==='tDetails')  {await insumos(texto, el);}
    if (el==='tOutsource'){await tercer(texto, el);}
    costs();
  }catch (err){console.log(err.message);}
}

function costs(){
  tot     = totProd; // document.querySelector('.tot').getAttribute('tot');
  tCost.innerHTML=`
      <tr class="rowDet"> 
        <td >Insumos</td> 
        <td class="text-right tot-tDetails">${new Intl.NumberFormat().format(totInsumo)}</td>
        <td class="text-right ">${new Intl.NumberFormat().format(totInsumo/tot)}</td> 
      </tr>
      <tr class="rowDet">  <td >Servicios y accesorios</td>
        <td class="text-right tot-tOutsource">${new Intl.NumberFormat().format(totService)}</td> 
        <td class="text-right ">${new Intl.NumberFormat().format(totService/tot)}</td>  </tr>
      <tfoot>      <tr style="color: blue;">
          <td class="text-center" ><strong>Total</strong></td>          
          <td class="text-right "><strong>${new Intl.NumberFormat().format(totInsumo+totService)}</strong></td>
          <td class="text-right "><strong>${new Intl.NumberFormat().format((totInsumo/tot)+(totService/tot))}</strong></td>
       </tr>    </tfoot>      `;
}

function insumos(texto, el){
  obj=(texto); h=''; pedido=obj; i=0; 
  importe=0; qprod=0; cantidad=0; precio=0;
  for (x of obj) {i++;
    h+=`<tr class="rowDet">
          <td class="product" idSel="${x.prid}">${x.prodName}</td>         
          <td contentEditable = "true" class="text-center q_">${x.cantidad}</td>
          <td contentEditable = "true" class="text-right p_">${x.precio}</td>
          <td class="text-right a_">${x.precio*x.cantidad}</td>
          <td contentEditable = "true" class="text-center">${x.qprod}</td>
        </tr>`;
      importe  = importe+x.precio*x.cantidad;   
      qprod += x.qprod; cantidad += x.cantidad; precio += x.precio;
      totProd=qprod*qtalles;      
  }
  totInsumo=importe;    gtFormatted=new Intl.NumberFormat().format(importe);
  h+= `<tfoot>      <tr style="color: blue;">
          <td class="text-center"><strong>Total</strong></td>
          <td class="text-center " ><strong>${cantidad}</strong></td>
          <td class="text-right av_"> <strong>${precio/i}</strong></td>
          <td class="text-right tot-insumo t_"><strong>${gtFormatted}</strong></td>
          <td class="text-center tot" tot=${qprod*qtalles} ><strong>${qprod}x${qtalles}=<br>${qprod*qtalles} </strong></td>
       </tr>    </tfoot>`;
  //h+= iconNuevo([el, 'Nuevo insumo']);  
  document.getElementById(el).innerHTML = h;
}


function tercer(texto, el){
  obj=(texto);  h='';  arrTercer=obj;   i=0; importe=0; qprod=0;
  for (x of obj) {i++;
    h+=`<tr class="rowDet">
          <td class="vendor" idSel="${x.idvendor}">${x.fullname}</td>
          <td class="service" idSel="${x.idservice}">${x.product}</td>         
          <td contentEditable = "true" class="text-center q_">${x.qa}</td>
          <td contentEditable = "true" class="text-right p_">${x.pri}</td>
          <td class="text-right a_">${x.pri*x.qa}</td>
          
        </tr>`;   importe += x.pri*x.qa; 
  }
  totService=importe; gtFormatted=new Intl.NumberFormat().format(importe);

  h+= `<tfoot>      <tr style="color: blue;">
          <td class="text-center" colspan="4"><strong>Total</strong></td>          
          <td class="text-right tot-outsource t_"><strong>${gtFormatted}</strong></td>
       </tr>    </tfoot>`;
  document.getElementById(el).innerHTML = h;

}

const iconNuevo =data=>{return `
    <div class="row">  <div class="col">
        <a href="#"title ="${data[1]}" onclick="newDetail(${data[0]});">
          <div class="d-flex flex-column align-items-center text-center">
            <img  width="30px" src="../Assets/images/icons/addRec.png"> 
          </div></a></div>          <div class="col"></div>         
          </div>`;}
const outsource=data=> {  return `
    <div class="form-group col-md-12 htOutsource htTab" >
      <table id="tabOut" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:98%;"" >
        <thead style="color: blue;"><th>Proveedor</th><th>Serv /prod </th><th>Cantidad</th><th>Precio</th><th>Importe</th></thead>
        <tbody id="tOutsource"> </tbody></table> </div>  `;}
const tblDetail =data=>{return `
    <div class="form-group col-md-12 htDetail htTab" >
      <table id="tabDet" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:98%;"" >
        <thead style="color: blue;"><th>Insumo</th><th class="text-center">Cantidad</th><th class="text-center">Precio</th><th class="text-center">Importe</th>
        <th class="text-center">x ${qtalles} talles</th>
        <tbody id="tDetails"></tbody>      </table>    </div>    `;}
const cost=data=> {  return `
    <div class="form-group col-md-12 htCost htTab" >
      <table id="tabCost" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:98%;"" >
        <thead style="color: green;"><th>Costo</th><th>Importe</th><th>Costo Unit</th></thead>
        <tbody id="tCost"> </tbody></table> </div>  `;}


editedValue=''; cCell=''; modified=false
document.querySelector("#tile")?.addEventListener('click',(e)=>{
  el=e.target; cell=el;//console.log(el.className)
  if (el.tagName==='TD'&&el.classList.contains("vendor"))  tds([el,'v']);
  if (el.tagName==='TD'&&el.classList.contains("service")) tds([el,'s']);
  if (el.tagName==='TD'&&el.classList.contains("product")) tds([el,'p']);
  if (cCell) {
    cCell.classList.remove('edit'); 
    if (modified) {cCell.bgColor='yellow';}
    modified=false;
  }
  if(cell.contentEditable=='true'){
    cell.classList.add('edit'); cell.focus(); cCell=cell;    editedValue = cell.textContent;
  }
});
document.querySelector("#tile").addEventListener('keyup', (event) => {
  if (event.keyCode == 27||event.keyCode == 13) { 
    cCell.classList.remove('edit');
    if (event.keyCode ==27) cCell.textContent=editedValue;
    if (event.keyCode ==13) cCell.textContent=cCell.textContent.replace(/(\r\n|\n|\r)/gm, "");        
  } 
}, false);
document.querySelector("#tile").addEventListener('input', (event) => {
    cell=(event.target); tbod=cell.parentNode.parentNode.id;//tDetails||tOutsource
    modified=true;
    if(cell.contentEditable=='true'){
      row=cell.parentNode;//conseguir la fila
      qty=(row.querySelector('.q_').textContent); pri=(row.querySelector('.p_').textContent);
      tot=qty*pri;
      row.querySelector('.a_').textContent=tot;
      gt1=(row.parentNode.querySelectorAll('.a_'));  gt=0;
      gt1.forEach(function(gt2){gt+=Number( gt2.textContent)});
      gtFormatted=new Intl.NumberFormat().format(gt);
      document.querySelector('#'+tbod).querySelector('.t_').innerText=`${gtFormatted}`;
      document.querySelector('#'+tbod).querySelector('.t_').setAttribute('total',gt);

      av1=(row.parentNode.querySelectorAll('.p_'));  av=0; i=0;
      av1.forEach(function(gt2){av+=Number( gt2.textContent);i++});      av=av/i;
      if(tbod==='tDetails'){
        document.querySelector('#'+tbod).querySelector('.av_').innerText=`${av}`;
       totInsumo=gt; }
      if(tbod==='tOutsource') totService=gt;
      costs();
    } 
}, false);


const tds=data=> {  el = data[0];
  switch (data[1]){
    case 's': fi=Products.filter(r => r.aux==2); h=''; break;
    case 'v': fi=Clients.filter(r => r.aux==2); h=''; break;
    case 'p': fi=Products.filter(r => r.aux==3); h=''; break;
    default:break;  }
  for (x of fi) h+=`<option value ="${x.fieldId}" aux="${x.aux}">${x.fieldName}</option>`; 
  newSel([el,h]);
}

const newSel = data=>{ el=data[0]; inner=data[1];
    neSel=document.createElement('select'); 
    neSel.className=el.className; neSel.classList.add('form-control');
    neSel.innerHTML=inner;
    neSel.value=Number(el.getAttribute('idsel')); neSel.setAttribute('idSel',neSel.value)
    neSel.addEventListener("blur",(e)=>{comboLostfocus(el)});
    el.innerHTML='';  el.appendChild(neSel);    neSel.focus();
}
function comboLostfocus(e){ console.log(e)
  combo = e.firstChild; 
  if(combo.tagName==='OPTION')combo=combo.parentElement;
  if (e.classList.contains('service')||e.classList.contains('product') ) nv = Products.find(nvId =>nvId.fieldId == combo.value);
  if (e.classList.contains('vendor')  ) nv = Clients.find(nvId =>nvId.fieldId == combo.value);
  if(e.tagName==='SELECT')e=e.parentElement;  
  e.innerHTML = nv.fieldName;
  if(e.getAttribute('idSel')!==combo.value){
    e.bgColor='yellow';
    //mostrar button save&cancel
  }
}

