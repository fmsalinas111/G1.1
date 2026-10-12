function prepForm(client=0, fecha=hoy(), sid=0, notas='', ref='', cancelled='',dep=localStorage.depot){
    addClass(['swp-hide', 'd-none']); removeClass(['frm_buttons', 'd-none']);
    inputs = [];  cli_pro=(acType==1)?'cliente':'proveedor';
    cmbClient  = comboBuilder(cli_pro, acType, 'campo1', 'client');
    cmbDep  = comboBuilder('depósito', 21, 'campo13', 'data');
    inputs.push({id: 'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
      inputs.push({id: 'combo', idCmb:cmbClient, autofocus:'1'});
    inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht3});
      inputs.push({id: 'campo2',campo:'Fecha',selector:'input',type:'date', value:fecha, label:1})
    inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht3});
      inputs.push({id: 'campo12',campo:'Remito',selector:'input',type:'text', placeholder:'remito nro', value:ref, label:1})
    inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2}); 
    inputs.push({id:'html', idHt:htR1}); inputs.push({id: 'html', idHt:ht6});
      inputs.push({id:'campo9',campo:'Notas',selector:'textarea',rows:'1.5', innerHTML:notas, label:1})   
    inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:ht6});
      inputs.push({id: 'combo', idCmb:cmbDep});
    inputs.push({id: 'html', idHt:htR2}); inputs.push({id: 'html', idHt:htR2});
    inputs.push({id: 'html', idHt:'<br>'});
    inputs.push({id:'html', idHt:tblDetail()});
        
    //if (cancelled==='')inputs.push({id:'html', idHt:iconNuevo(["newRow()"])});
    var data = new FormData(); data.append('src', 'client'); 
    //getJson(base_url+'Data/getDataCmb/0', data, 'combo_'+cli_pro, 'campo1', client, (acType==1)?'Cliente':'Proveedor') 
  
    var d1 = new FormData(); d1.append('src', 'data'); 
    getJson(base_url+'Data/getDataCmb/21', d1, 'combo_depósito', 'campo13', dep, 'Depósito') 
  
  
    //openModal(inputs);  addClass(['iuri','d-none']);
    if(inputs) {formBuy.innerHTML= drawForm(inputs);
        removeClass(['form-buy', 'd-none']); addClass(['dttbl', 'd-none']); }
    srcCmb=clients.filter(r => r.aux==acType);
    cargarCombo((srcCmb), 'combo_'+cli_pro, 'campo1', client, (acType==1)?'Cliente':'Proveedor');
    if(parseInt(sid)>0)  drawTableDetails(sid); else emptyRow();
    //titleModal.innerHTML=(acType===2)?'Presupuesto ':'Compra '; todel
    if(cancelled.length>0) addClass(['modal-title',cancelled]);
  
    if (document.querySelectorAll('.export').length ==0) {
      otherBtn(['pdf',-2]);                   otherBtn(['excel',-3]);
      otherBtn(['facturar',-4,'disabled']);   otherBtn(['remito',-5]);
    }
  
    //let temp = document.getElementsByTagName("template")[0];
    //let clon = temp.content.cloneNode(true);  titleLine.appendChild(clon);
  }

  document.querySelector("#frm_buttons").addEventListener("click", btns);
  function btns(e){
    if(e.target.innerText==='Cancelar') {
        removeClass(['swp-hide', 'd-none']); 
        addClass(['frm_buttons', 'd-none']);
        addClass(['form-buy', 'd-none']); removeClass(['dttbl', 'd-none']);    }
    if(e.target.innerText==='Guardar') {
        console.log('guardar');}
  }
  
  function delFormDetail(){
    //si disabled return
    console.log('delete form detal')
  }
function emptyRow(){
    
    h= `<tr class="rowDet">
        <td class="product"><i class="fas fa-plus-circle"></i> </td>
        <td class="color"> </td>
        <td ></td><td></td><td></td>
        <td data-id= ${0} class="text-center deleteDetail" onclick="delFormDetail(${0},'i')" disabled>
            <a class="btn btn-danger btn-sm disabled" ><i class="fas fa-trash"></i></a></td>
        </tr>`;
    document.getElementById('tDetails').innerHTML = h;     }


document.querySelector("#formBuy")?.addEventListener('click',(e)=>{
    el=e.target;    //if (el.type==='radio') tabs(el.value);
    if (el.tagName==='TD'&&el.classList.contains("product")) tds([el,'p']);
    if (el.tagName==='TD'&&el.classList.contains("color"))   tds([el,'c']);
});
          
const tds=data=> {
    el = data[0];
    switch (data[1]){
        case 'c': fi=Colors; break;
        case 'p': fi=Products.filter(r => r.aux==prodType); break;
        default:break;  }
    //console.log(fi, prodType)    
    //cargarCombo()
    h=`<option selected hidden value="0">Seleccione</option>`; 
    for (x of fi) h+=`<option value ="${x.fieldId}" aux="${x.aux}" class="opt opt_${x.aux}">${x.fieldName}</option>`; 
    newSel([el,h]);
}
      
function setCombo(texto,el){
    cap0=(el.classList.contains('color'))?'Color':'Producto/insumo';
    if(el.classList.contains('product')) obj = Products.filter(r => r.aux==prodType);
    if(el.classList.contains('color')) obj = Colors;

    h=`<option selected hidden value="0">${cap0}</option>`; 
    obj=JSON.parse(texto);
    for (x of obj) { 
        h+=`<option value ="${x.fieldId}" aux="${x.aux}">${x.fieldName}</option>`; }
    if (el.classList.contains('color')) {selColor.innerHTML=h; colors=obj;} else {selProduct.innerHTML=h; products=obj;}
    newSel(el);
}
const newSel = data=>{ 
    //el=data[0]; inner=data[1];
    [el, inner] = data;
    neSel=document.createElement('select'); 
    neSel.className=el.className; neSel.classList.add('form-control');
    neSel.innerHTML=inner;
    neSel.value=Number(el.getAttribute('idsel')); neSel.setAttribute('idSel',neSel.value)
    neSel.addEventListener("blur",(e)=>{comboLostfocus(el)});
    el.innerHTML='';  el.appendChild(neSel);    neSel.focus();
}


  function comboLostfocus(e){
    if(e.tagName==='SELECT'){combo=e; td = e.parentElement;}
    if(e.tagName==='TD'){combo = e.firstChild; td = e;}
    if(e.tagName==='OPTION'){combo=e.parentElement; td=e.parentElement.parentElement}

    td.innerText = combo.options[combo.selectedIndex].text;  
    /*
    if (!(e.getAttribute('idSel')==0)) {
        datas = (e.classList.contains('product'))? Products: Colors;
        nv = datas.find(data =>data.fieldId == combo.value);

        if (e.tagName==='OPTION') e=e.parentElement; if (e.tagName==='SELECT') e=e.parentElement;  
        //e.innerHTML = nv.fieldName===undefined?'':nv.fieldName;  
        e.innerHTML=combo.value;
    }
    if(e.getAttribute('idSel')!==combo.value){ //     e.bgColor='yellow';
      //mostrar button save&cancel
    }
      */

  }
  


