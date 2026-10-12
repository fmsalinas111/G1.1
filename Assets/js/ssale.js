//$.fn.modal.Constructor.prototype.enforceFocus = function() {};
const inps = document.querySelector("#inp"); prepareForm(); 

const tSale =  gId("tSale");  const tTicket =  gId("tTicket");
const templateDetail = gId('template-detail').content; const templateTicket = gId('templateTicket').content;
const fragment = document.createDocumentFragment(); const tickFragment = document.createDocumentFragment();
const ca2 = gId('campo2'); const ca4 = gId('campo4'); 
const items = tSale.querySelector('tbody');  const ticket = tTicket.querySelector('tbody');
const allDet = document.querySelectorAll('tbody');
const htsale = document.querySelector('.tsale');

let bunker = null; trActive = null; tempName = ''; mixPayment=[];; //mixPay
let decimals = getLS('defaultDecimal')?getLS('defaultDecimal'):2;

const hTotal = document.querySelector('.total'); tTicket.classList.remove('table-striped');

/*refactorizado y simplificado */
// 2. Estado Único del POS
const POSState = {
    carrito: [],
    products: [],
    cmbProducts: [],
    decimals: Number(localStorage.getItem('defaultDecimal')) || 2,
    total: 0
};
// 3. Función simplificada para calcular total
function recalculateTotal() {
    POSState.total = POSState.carrito.reduce((sum, item) => sum + item.amt, 0);
    hTotal.innerText = currency(POSState.total, POSState.decimals);
    return POSState.total;
}
// 4. addRow Refactorizado con desestructuración segura
function addRow(dataD) {
    let [data = '', qtyAdd = 1] = Array.isArray(dataD) ? dataD : [dataD, 1];
    data = data.trim();
    if (!data) return false;
    // Accesos rápidos por comando
    if (data === '.') { 
        hide(['ca2']); show(['cmbproducto']); 
        campo3.focus(); return null; 
    }

        //modales
    if (primera(data)==='0') {  //data.padStart(2, '0')
        if (Object.entries(arr2).length===0) {show00(); return;}
        minPrid = getNextMinorPrid(POSState.carrito);  carritoAdd([arr2, minPrid]);
        rendCart(POSState.carrito);     rendTicket(POSState.carrito);  
        recalculateTotal();
        arr2={}; return true;  }
    if (data.trim()==='+') { 
        subModal = 'purcha'; if (gIC([subModal])===null) buildModal();
        showModal_2([subModal, searchInput, 'Purcha', 'modal-lg']); 
        return null;    }
    // fin modales

    // Procesar producto
    let baco = data;
    if (data.startsWith('*')) {
        const parts = data.split(' ');
        qtyAdd = Number(parts[0].slice(1)) || 1;
        baco = parts.slice(1).join(' ').trim();
    }
    const foundEl = POSState.products.find(p => p.art === baco || p.baco === baco || p.prid == baco);
    if (!foundEl) {
        gId("msgAlert").innerHTML = `El código <u><strong>${baco}</strong></u> no fue encontrado.`;
        show(['alert']); setTimeout(() => hide(['alert']), 1800);
        return false;
    }
 
     // Agregar al carrito o actualizar cantidad
    let itemInCart = POSState.carrito.find(item => item.prid === foundEl.prid); 
    if (itemInCart) {
        itemInCart.qty += qtyAdd;
        itemInCart.amt = itemInCart.qty * itemInCart.price;
    } else {
        POSState.carrito.push({
            art: foundEl.art,
            name: foundEl.name,
            price: foundEl.price,
            qty: qtyAdd,
            amt: foundEl.price * qtyAdd,
            prid: foundEl.prid,
            offQty: foundEl.offQty,
            offPrice: foundEl.offPrice,
            //note:''
        });
    }
    rendCart(POSState.carrito);
    rendTicket(POSState.carrito);
    recalculateTotal();
    return true;
}

/*fin refactorizado y simplificado */

let myProducts={}; let cmbProducts={}; let defData=[]; let myBlines=[]; let carrito=[];

addEventListener("DOMContentLoaded", () => { 
    $.fn.select2.defaults.set('language', 'es');
    $('select').select2();
    fetchData();  fetchSel2(); 
    hide(['title3','mi-select-div']); ca2.focus();    
    gg = getSome3('data/getDefaults',{},g1) ; 
    createStatusInfo(); 
    if (xPage()==='spurcha'){
        hide(['ncoti']); gIC('btSave').removeAttribute('disabled');
    }
});
const g1 = data =>{defData=data; getSome3('companies/getMyBlines',{},g2); stInfo(defData);}
const g2 = data =>{xx(data);    pintarBline();}

const fetchData = async()=>{
    try{
      const res=await fetch(base_url+'products/getMyProducts/11');
      const data=await res.json(); POSState.products = data; pintarCards(data);
    }
    catch (error){console.log(error);  } 
}
    
const fetchSel2 = async()=>{
    try{
      const data1 = new FormData(); data1.append('src', 'product');        //,{method:'POST', body: data1}
      const res=await fetch(base_url+'data/getDataCmb/11',{method:'POST', body:data1})
      const data=await res.json(); POSState.cmbProducts = data;  cmbProducts = data;
      chargeCombo(cmbProducts, 'combo_producto', 'campo3',{s2:true, placeholder:'Producto',clases:['campo3', 'otra clase']}); 
      hide(['cmbproducto']);        
      const dCP = new FormData(); dCP.append('src', 'client');     
      const res2=await fetch(base_url+'Data/getDataCmb/'+clipro, { method: 'POST', body: dCP });
      const data2=await res2.json(); myCP = data2; 
      chargeCombo(myCP, 'combo_cliente', 'campo1', {selected:getLS('defaultClient'),  s2:true, placeholder:cpCaption});
      //$('#campo1').select2({width: '100%'}); //{destroy:true}
      
    }
    catch (error){console.log(error);  } 
}

const pintarCards = data=>{myProducts = data;  myProd_=data;   rendProd(myProducts); }  

ca2.addEventListener('keydown', (e)=>{ // test para textarea
    if (e.key === 'Enter')  { e.preventDefault();  // Evita el salto de línea
        if (!(ca2.value.trim()==='')) { addRow([ca2.value, 1]);  ca2.value=''; return null;
        }else{
            if(POSState.total>0) {
                ca4.removeAttribute('disabled');
                gIC('btSave').removeAttribute('disabled');
                ca4.value = POSState.total;  
                ca4.select();  ca4.focus();
            }
        } //and items>0 or inner?
    } 
});
$(document).on('select2:open', () => {document.querySelector('.select2-search__field').focus();});

campo4.addEventListener('keyup', (event)=>{ //event.preventDefault(); // solo con textarea
    campo5.value = Number((event.target.value)-POSState.total).toFixed(2); //hTotal.getAttribute('total')
    tt=campo4.getAttribute('tt')?Number(campo4.getAttribute('tt')):0;
    if (event.key === "Enter"&& campo4.value>0) {
        if (tt>0) {event.preventDefault(); document.querySelector('.btSave').focus(); }
    }
});
campo4.addEventListener('keydown', (event)=>{ // test para textarea
    tt = campo4.getAttribute('tt')? Number(campo4.getAttribute('tt')): 0;
    tt++; campo4.setAttribute('tt', tt);
});

const rendCart=data=>{  items.innerHTML='';
    data.forEach(producto=>{
        //templateDetail.querySelector('.stk').textContent = producto.stock//
        templateDetail.querySelector('.art').textContent = producto.art;
        templateDetail.querySelector('.name').textContent = producto.name;        
        templateDetail.querySelector('.qty').textContent = producto.qty;
        templateDetail.querySelector('.qty').contentEditable = "true";
        templateDetail.querySelector('.price').textContent = currency(producto.price, decimals);//producto.price.toFixed(2);
        templateDetail.querySelector('.price').contentEditable = "true";
        templateDetail.querySelector('.amt').textContent = currency(producto.amt, decimals); //producto.amt.toFixed(2);
        templateDetail.querySelector('.actions').innerHTML = `<a class="btn btn-danger btn-sm ddd" data-prid="${producto.prid}"><i class="fas fa-trash"></i></a>`;
        const clone = templateDetail.cloneNode(true);
        clone.querySelector('.det-row').setAttribute('prid',producto.prid);
        clone.querySelector('.det-row').setAttribute('name',producto.name);
        fragment.appendChild(clone);
    }); items.appendChild(fragment);
}

const rendTicket=data=>{  ticket.innerHTML='';
    data.forEach(producto=>{
        templateTicket.querySelector('.name').textContent = `(${producto.art}) ${producto.name}`;
        templateTicket.querySelector('.actions').innerHTML = `<a class=" ddd" data-prid="${producto.prid}">❌</a>`;
        templateTicket.querySelector('.qty').textContent = producto.qty;
        templateTicket.querySelector('.qty').contentEditable = "true";
        templateTicket.querySelector('.price').textContent = currency(producto.price);
        templateTicket.querySelector('.price').contentEditable = "true";
        templateTicket.querySelector('.amt').textContent = currency(producto.amt);

        const clone = templateTicket.cloneNode(true);
        clone.querySelectorAll('.det-row').forEach(element => {
            element.setAttribute('prid',producto.prid);
            element.setAttribute('name',producto.name);
        });
        tickFragment.appendChild(clone);
    }); ticket.appendChild(tickFragment);
}

const preparaModal = data =>{    let inputs=[];
    inputs.push({id:'field1', campo:'Cantidad',selector:'input',type:'number', step:'any', label:1,  value:1})
    inputs.push({id:'field2', campo:'Precio Unit',selector:'input',type:'number', step:'any', label:1,  value:1})
    inputs.push({id:'field3', campo:'Descripción',selector:'textarea',rows:'2', label:1, placeholder:'Descripción o nombre del producto'})	
    openModal(inputs,'.inputs','noreg'); 
}

const show00 = _data =>{
    if (gIC(['noreg'])===null || gIC(['noreg'])==undefined || gIC(['noreg']).innerHTML=='') preparaModal();
    showModal_2(['noreg', field1, 'Producto sin registro']);     
}

//const getTotal = data =>{ return hTotal.getAttribute('total');}
const getTotal = data =>{ return POSState.total;}

// start paymix
const preparePaymix = data =>{ let inputs=[];
    cmbBancoMix =   comboBuilder('bancomix', 2, 'campo0', 'data', 's-2 cmbbancomix ', false, false);
    inputs.push({id:'html',idHt:`<h3>Total: ${getTotal()}</h3>`})    
    inputs.push({id:'combo', idCmb:cmbBancoMix});
    inputs.push({id:'html', idHt:tblPaymix()});
    openModal(inputs,'.inputs', data); 
    chargeCombo(defDataCmb(2), 'combo_bancomix', 'campo0',{s2:true, placeholder:'Banco',clases:['campo0', 'bancomix'],search:'Infinity', allowClear:false});
    bunker = gId('combo_bancomix'); gIC('cmbbancomix').innerHTML = '';

    gIC(data).addEventListener('input', (event) => {recalcPaymix(event.target);}, false);
}

const addRowT=data=> {
  const nuevaFila = document.createElement('tr');
  nuevaFila.innerHTML = newRow();
  document.querySelector('#tDetails').appendChild(nuevaFila);
  nuevaFila.querySelector('.input-valor').focus();
}

function checkEnter(event) {
  el = event.target;  tr = el.closest('tr'); 
  if (event.key === 'Enter' || event.keyCode === 13) {    event.preventDefault();  addRowT()  }
  calcTotalPeso();
}

const tblPaymix =data=>{return `
  <div class="tablita">
  <table id="tabDet" border="1" class="tabDet table-striped table-bordered responsive" cellpadding="3" cellspacing="1"  >
    <thead>
        <th class="f-pago">Forma de pago</th>
        <th class="unit text-right">Importe</th>
        <th class="action text-center" >X</th>
    </thead>
    <tbody id="tDetails" class="tdetails" > ${newRow()}  </tbody>  
    <tfoot>        <tr>
            <td style="text-align: center;" id="cant">Total:</td>
            <td style="text-align: center;" id="celdaTotal" colspan="2">0.0</td>
        </tr>    </tfoot></table>  </div> `;}

const newRow = data =>{
    //(!gIC('tdetails'))? '':
    btnDel = 
        `<td><button type="button" class="btn-eliminar" title="Eliminar fila">✕</button></td>`;
    return `<tr > 
              <td class="f-pago"  tabindex="0">Seleccione  </td>  
              <td>  <input type="text" class="input-valor  input-peso form-control text-right"
                  style="margin-bottom: 2px;" name="campo" placeholder=" importe" 
                onkeydown="checkEnter(event)"> </td>  ${btnDel}
          </tr>  `;
}        

function calcTotalPeso() { let total = 0; let i=0;
    $('.input-peso').each(function() { i++;
        const valor = parseFloat($(this).val()) || 0;
        total += valor;
    });
    //$('#cant').text(i);    
    $('#celdaTotal').text(total.toFixed(2));
}
gIC("inputs").addEventListener("click", (e) => {
    el = e.target;
    if (e.target.classList.contains('btn-eliminar')) {
        tr = el.closest('tr');
        tr.remove();
        calcTotalPeso();
    }
})

gIC("inputs").addEventListener("focusin", (e) => {
  if (e.target.classList.contains("f-pago")) {
    if (gId('tDetails').querySelectorAll('.combo_bancomix').length>0) 
        trActive.querySelector('.f-pago').textContent = tempName;  
    tr = e.target.closest('tr');
    bank = tr.getAttribute('bank')||0; bankName = tr.getAttribute('bankName');
    tempName = bankName;  currBank = bank;  trActive = tr;    
    e.target.textContent='';
    e.target.appendChild(bunker);
    if (bank>0) {
      gId('campo0').value = bank; 
      gId('select2-campo0-container').textContent= bankName;
    }
  }else{
    if(gIC('inputs').querySelector('.paymix')){
        if (gId('tDetails').querySelectorAll('.combo_bancomix').length>0) {
        if (!(e.target.tagName==='SPAN')) trActive.querySelector('.f-pago').textContent = tempName;
        }
    }
  }
});



const recalcPaymix = data =>{  _tot = getTotal();
    //console.log(_tot-(parseFloat(gId('field1').value)+parseFloat(gId('field2').value)+parseFloat(gId('field3').value)));
}

const showPaymix = _data =>{ 
    subModal = 'paymix'; if (gIC([subModal])===null) preparePaymix(subModal);
    showModal_2([subModal, tDetails.querySelector('td'), 'Cobranza mixta', 'modal-lg']); 
}


// end paymix
document.querySelector('.btSave')?.addEventListener('click', (event)=>{   
    if (campo1.value==0) {
        Swal.fire('Debe seleccionar un '+cpCaption); 
        gId('campo1').focus(); return;}
        console.log(coti.checked, getLS('coti'));
    if((gId('campo4').value<getTotal() || gId('campo4').value==0)&& (coti.checked==false && getLS('coti')==='false')){
            showPaymix(); return; }
    _save();
});

function _save(){
    if(!mixPayment.length>0){mixPayment.push({'bank':getLS('dbk'), 'amount':getTotal()});}
    //cartReCreate();

    if(POSState.carrito.length===0){ Swal.fire('¡El carrito está vacío!'); ca2.focus(); return;}
    setCampo();  const dato = new FormData();  
    arr1["campo2"] = hoy();
    arr1["campo4"] =  JSON.stringify(mixPayment);
    arr1["campo5"] = getLS('dbk'); arr1["campo13"]=getLS('defaultDepot');    
    arr1["campo3"] = campo6.value; arr1["campo7"]=getTotal();
    //setear campo11 cta cte
    //arr1["campo11"] = 
    dato.append('campos',JSON.stringify(arr1));
    if (getLS('coti')==='true' || document.getElementById('coti').checked) {
        let nuevoCarrito = POSState.carrito.map(carrito => {
            return {
                pid: carrito.prid, importe: carrito.price * carrito.qty, precio: carrito.price, 
                multiplo:1, product: carrito.name, cantidad: carrito.qty   };
            });
            dato.append('changuito',JSON.stringify(nuevoCarrito)); 
            save(base_url+'Buysal/setBuysal/Presupuesto', dato); 
        } else{
        //console.log(arr1, POSState.carrito);
        //pago mixto si corresponde o cta cte
        dato.append('changuito', JSON.stringify(POSState.carrito)); 
        f_URL=base_url+'Buysal/setSell/'+cpAction; save(f_URL, dato);
    }
    //clean table and cart
    document.querySelectorAll('tbody').forEach(element => { 
        element.innerHTML=''; element.removeAttribute('tt');    });
    //document.querySelector('tbody').innerHTML=''; 
    //reset inputs
    POSState.carrito=[];    gId("msgAlert").innerText = "Venta registrada.";
    campo4.value=''; campo4.setAttribute('disabled','true'); campo4.removeAttribute('tt');
    campo5.value=''; campo1.value=localStorage.defaultClient; 
    document.querySelector('.total').innerText= 'Total'; document.querySelector('.total').removeAttribute('total');
    
    event.target.setAttribute('disabled','true'); event.target.innerText='Confirmar'; 
    coti.checked=false; setLS(['coti','false']);
    document.querySelector('.sticky-submit-btn').innerText = 'Continuar';
    hide(['sticky-submit-btn']); arr2={};
    ca2.focus();
    if (getLS('cart')==='true') {ecoOn(); hide(['pos','sticky-submit-btn']);}     
}
function prepareConfig(){ inputs = []; 
    cmbCli = comboBuilder('defClient',1,'campo21','client','',false,true,'Cliente por defecto');
    cmbBank= `<div class=""  ><div><label for="campo22">Banco (caja)</label></div><div id="combo_banco"></div></div></div>`;
    cmbDep  = comboBuilder('depósito', 21, 'campo13', 'data');
    inputs.push({id:'combo', idCmb:cmbCli}); inputs.push({id:'html',idHt:`<br>`});
    inputs.push({id:'combo', idCmb:cmbBank}); inputs.push({id:'html',idHt:`<br>`});
    inputs.push({id:'combo', idCmb:cmbDep});inputs.push({id:'html',idHt:`<br>`});
    inputs.push({id:'campo23', campo:'Decimales',selector:'input', type:'number', label:1, step:'1',value:parseInt(getLS('defaultDecimal')), clasinp:'text-right'});
    openModal(inputs,'.inputs','config');
    chargeCombo(myCP, 'combo_defClient', 'campo21', {selected:getLS('defaultClient'),  s2:true, placeholder:'Cliente por defecto'});
    chargeCombo(defDataCmb(21), 'combo_depósito', 'campo13', {selected:getLS('defaultDepot'),  s2:true, placeholder:'Depósito por defecto'});
    chargeCombo(defDataCmb(2), 'combo_banco', 'campo22', {selected:getLS('dbk'),  s2:true, placeholder:'Banco por defecto'});
    campo23.setAttribute('min', 0); campo23.setAttribute('max', 4);
    //console.log('prepareConfig', getLS('defaultDecimal'));
}

gId('btnConfig').addEventListener('click',function(){    
    subModal = 'config';    if (gIC([subModal])==null) prepareConfig();
    showModal_2([subModal, campo21, 'Ajustes']); 
    campo23.value = getLS('defaultDecimal') || 2;
    $('#campo21').select2('focus');
});

const defDataCmb = id =>{
    filtered=defData.filter(r => r.type==id&&r.stt==1); rows=[];
    filtered.forEach(r => {rows.push({ fieldId: r.did, fieldName: r.dName, dad:r.dad}); });
    rows.sort((a, b) => a.fieldName.localeCompare(b.fieldName));
    return rows;    
}
function prepareForm(){
    cmbCli = comboBuilder('cliente',clipro,'campo1','client','s-2 cmbcliente',true,true, cpCaption);
    cmbProd =comboBuilder('producto', 1, 'campo3', 'product', 's-2 cmbproducto', false, true);
    options = [{option:1,value:'Cotización'}];
    cotizacion = simpleCheck([{idcampo:'campo6', name:'campo', cap:'', def:0, title:"cotización", options}]);
    inputs = []; h=''; 

    inputs.push({id:'combo', idCmb:cmbCli});
    hMemoBtns = `<div class="memoBtnsCont"><button class="memoBtns" tabindex="-1">M1</button> <button class="memoBtns" tabindex="-1">M2</button> 
                <button class="memoBtns" tabindex="-1">M3</button> <button class="memoBtns" tabindex="-1">M4</button> </div>`;
    inputs.push({id:'campo2',campo:'art',selector:'textarea', rows:1,label:1, autofocus:'autofocus', clase:'ca2', style:'resize:none'})
    inputs.push({id:'combo', idCmb:cmbProd});
    inputs.push({id:'html', idHt:`${hMemoBtns}<p class="total fw-bold display-4 text-primary text-right">Total</p>`});
    inputs.push({id:'campo4', campo:'Entrada',selector:'input', type:'number', disabled:1, label:1, clase:'ca4 ncoti', step:'1000',clasinp:'text-right'});
    inputs.push({id:'campo5', campo:'Vuelto',selector:'input', type:'text', disabled:1, label:1, clase :'ncoti',clasinp:'text-right'});  
    inputs.push({id:'campo6', campo:'Vencimiento',selector:'input', type:'date', label:1, value:sumarDias(new Date(hoy()), 10).toISOString().substring(0, 10),clase:'d-none coti-due'});  
    inputs.push({id:'html', idHt:'<button class="btn btn-primary btSave" disabled>Confirmar</button>'});
    
    inps.innerHTML= drawForm(inputs);
    //campo4.classList.add('text-right'); //campo5.classList.add('text-right');
    campo2.style ='resize:none;';  //campo4.style ='resize:none;';
 }

const beforeSave = data=>{ arrAlert=[];   
  [page, titMod,arr1, arr2] = data;
  switch (titMod) {
    case 'Ajustes':
        setLS(['defaultClient',campo21.value]);campo1.value = campo21.value;
        setLS(['defaultClientName',campo21.options[campo21.selectedIndex].text]||'');

        setLS(['dbk',campo22.value]);
        setLS(['dbkName',campo22.options[campo22.selectedIndex].text]||'');

        setLS(['defaultDepot',campo13.value]);
        setLS(['defaultDepotName',campo13.options[campo13.selectedIndex].text]||'');

        setLS(['defaultDecimal',campo23.value]);

        createStatusInfo(); 
        $("#campo1").select2().trigger('change');
        $('#campo1').select2({width: '100%'});
        arrAlert[0]= '_close'; 
    break;
    case 'Producto sin registro': 
        rr=addRow('0');    arr2={};  arrAlert[0]= '_close'; 
    break
    case 'Cobranza mixta':
        console.log(page);
        const filas = gIC('tablita').querySelectorAll('.tdetails tr');        
        const result = Array.from(filas).map(fila => {
        return {
            bank: fila.getAttribute('bank'), // o fila.dataset.bank
            amount: fila.querySelector('.input-peso').value  };   });
        mixPayment=result;
        _save();
        arrAlert[0]= '_close'; 
        break;
    default:console.log('someaction'); break;
  }
  return arrAlert;
}

const afterSave = data=>{  
  switch (data[1]) { //model
    case "Venta":
        show(['alert']); setTimeout(function(){ hide(['alert']); }, 2000);
        //ca2.focus();
    break;
    case "Presupuesto":
        $('#campo1').select2({destroy:true, width: '100%'}); 
        window.open('pdf_presup/','_blank');
    break;
    case "Compra":
        gId("msgAlert").innerText = "Compra registrada.";
        show(['alert']); setTimeout(function(){ hide(['alert']); }, 2000);
        break;
    default: console.log('nada que hacer'); break;
  }
}

const change2 = data=>{    
    let sPage, titModal, cmb;
    [sPage, titModal, cmb] = data;
    if (cmb.id=='campo0'){
        tr = cmb.closest('tr');  tr.setAttribute('bank',cmb.value);
        if(cmb.options[cmb.selectedIndex]){
            bankName = cmb.options[cmb.selectedIndex].text;
            tr.setAttribute('bankName', bankName);
            tr.querySelector('.f-pago').textContent = bankName;
            tr.querySelector('input').focus();
            if (!tempName) tempName = bankName;
        }
        return;
    }
    
    _cmbs = ['campo13', 'campo21', 'campo22'];
    if (_cmbs.includes(cmb.id)){// oldCriteria(cmb.id==='campo21') {
        //console.log(cmb.value, cmb.options[cmb.selectedIndex].text);
        btnActionForm.disabled=false;   return null;
    }
    no=['campo13', 'campo21', 'campo22']; if(no.includes(cmb.id))return null;
    if(cmb.id==='campo1'){ca2.focus();return null;}
    if(cmb.value==='') return null;
    addRow([cmb.value]); show(['ca2']); hide(['cmbproducto']); 
    $('#campo3').val(null).trigger('change');
    ca2.focus();
  }

function createStatusInfo(){ 
    //gtSo2('data/getDefaults', stInfo); 
    //getSome3('data/getDefaults', stInfo); 
}

const stInfo = data=>{ defData = data;
    
    if (data.length===0){alert("not found default data "); return null;}

    foundItm = data.find((myItm)=> myItm.type==2 && myItm.stt==1); //bank
    _dbk = getLS('dbk'); _dep = getLS('defaultDepot');
    //console.log(_dbk, _dep);
    if (_dbk===undefined || _dbk==null || _dbk=='undefined' || _dbk=='null')
        {localStorage.dbk = foundItm.did; localStorage.dbkName = foundItm.dName;}
    if (_dbk!==foundItm.did) {localStorage.dbk = foundItm.did; localStorage.dbkName = foundItm.dName;}
    
    foundItm = data.find((myItm)=> myItm.type==21 && myItm.stt==1); //depot
    if (_dep===undefined || _dep==null || _dep=='undefined' || _dep=='null'  )
        { localStorage.defaultDepot = foundItm.did; localStorage.defaultDepotName = foundItm.dName;}
    if (_dep!==foundItm.did) {
        //localStorage.defaultDepot = foundItm.did; localStorage.defaultDepotName = foundItm.dName;
        setLS('defaultDepot','0');setLS('defaultDepotName','No establecido');
    }

    let st = document.querySelector('.stInfo');   if (st) st.remove();
    let stInfo = document.createElement('div'); stInfo.classList.add('stInfo'); stInfo.classList.add('ml-4');
    
    stInfo.innerHTML=`<p>Usuario: <span class="usrName">${localStorage.usrName}     (Caja ${localStorage.dbkName})</span></p>
                      <p>Depósito: <span class="dptName">${(localStorage.defaultDepotName===undefined)?'No establecido':localStorage.defaultDepotName}</span></p>
                      <p>Cliente x defecto: <span class="clName">${(localStorage.defaultClientName===undefined)?'No establecido':localStorage.defaultClientName}</span></p>`;
    document.querySelector('.title2').appendChild(stInfo);
    if (localStorage.defaultClientName===undefined) stInfo.querySelector(".clName").classList.add('text-danger');
    if (localStorage.defaultDepotName===undefined) stInfo.querySelector(".dptName").classList.add('text-danger');
    if (localStorage.dbkName===undefined) stInfo.querySelector(".usrName").classList.add('text-danger');
}


//ediTable**********
items.addEventListener("click", e => checkClick(e,items));
ticket.addEventListener("click", e => checkClick(e,ticket));
editedValue=''; cCell='';
function checkClick(e,el){ 
    cell = e.target;
    if(cell.closest('svg')&& cell.tagName==='path'||cell.tagName==='A'||cell.tagName==='I'){
        tr = cell.closest('tr');        row = cell.parentNode; 
        pridToFind = Number(tr.getAttribute('prid'));
        rowsTD = el.querySelectorAll(`tr[prid="${pridToFind}"]`);
        rowsTD.forEach(row => row.remove());   
        //update carrito
        indDel = carrito.findIndex(objeto => objeto.prid === pridToFind);
        itemDeleted = carrito.splice(indDel, 1);
        //update total
        gt = updtTotal(el);    setTotal(gt); ca2.focus();
    }
    if (cCell) cCell.classList.remove('edit');
    if(cell.contentEditable=='true'){
        cell.classList.add('edit'); cell.focus();  cCell=cell;
        document.execCommand('selectAll');
        //window.getSelection();
        editedValue = cell.textContent;
        document.querySelector('.btSave').setAttribute('disabled','1');
        ca4.value=''; ca4.setAttribute('disabled','true'); 
    }    
}

const keyUp1=(cell)=>{ 
    if (!(event.keyCode == 27||event.keyCode == 13)) return;
    cell.classList.remove('edit'); 
    if (event.keyCode ==27) {cell.textContent=editedValue; ca2.focus(); return;}
    //console.log('editedValue', editedValue, 'cell.textContent', cell.textContent);
    cell.textContent = cell.textContent.replace(/(\r\n|\n|\r)/gm, "");  
    cell.contentEditable = "true";    
    const row = cell.parentNode; 
    pridFind = row.getAttribute('prid');
    if (cell.classList.contains('p_')){ 
        row.setAttribute('price', currToNumber(cell.textContent)); 
        cell.textContent = currency(currToNumber(cell.textContent), decimals);
        row.querySelector('.a_').textContent = currency(currToNumber(cell.textContent)*Number(row.querySelector('.q_').textContent), decimals);
        
        gt =  updtTotal(row.closest("tbody")); setTotal(gt); POSState.total=gt;
    }
    const foundInCart = POSState.carrito.find((myItm)=> myItm.prid==pridFind);    
    if (foundInCart) {    //update carrito
        foundInCart.qty   = Number(row.querySelector('.q_').textContent);
        foundInCart.price = currToNumber(row.querySelector('.p_').textContent);
        foundInCart.amt   = foundInCart.qty * foundInCart.price;    }
    ca2.focus();          
}

const keyDown1=(cell)=>{ 
    //if (event.keyCode == 13) { cell.classList.remove('edit'); ca2.focus(); } 
        if (event.key === 'Tab') {
            event.preventDefault();
            //console.log(cell);
        //cell.focus;
        }

}

const input1=(cell)=> {
    row = cell.parentNode;  pridFind = row.getAttribute('prid');
    tRow = ticket.querySelector(`tr[prid="${pridFind}"]:has(td:nth-of-type(3)) `);      
    nRow = row||tRow; 
    qty = Number(nRow.querySelector('.q_').textContent);
    if (isNaN(qty)|| qty<=0) { 
        qty=1; nRow.querySelector('.q_').textContent=qty; editedValue=qty; document.execCommand('selectAll'); }
    // Verificar si tiene oferta
    if (cell.classList.contains('q_')){
        POSState.products.find((myItm)=> { 
            if (myItm.prid==pridFind){
                apd=(myItm.offApd===1)?true:false; //a partir de...
                if (qty===myItm.offQty){
                    _price = (myItm.offPrice/qty);  //precio 
                    if (apd) { _price = (myItm.offPrice); }
                } else { _price = (myItm.price); }
                nRow.querySelector('.p_').textContent = currency(_price, decimals);
                nRow.setAttribute('price', _price);
            }
        }); 
    }
    //pri = Number(nRow.querySelector('.p_').textContent);
    pri = Number(nRow.getAttribute('price'));
    tot = qty*pri;
    nRow.querySelector('.a_').textContent= currency(tot, decimals);
    el = nRow.closest("tbody");
    gt =  updtTotal(el); setTotal(gt); POSState.total=gt;
}

htsale.addEventListener('focusout', (event) => {    if (cCell) cCell.classList.remove('edit');});

htsale.addEventListener('keyup', (event) => { keyUp1(event.target);}, false);
htsale.addEventListener('input', (event) => { input1(event.target);}, false);
//htsale.addEventListener('keydown', (event) => { keyDown1(event.target);}, false);

function updtTotal(el){
    gt1=el.querySelectorAll('.a_');  gt=0;
    gt1.forEach(function(item){ gt += currToNumber(item.textContent); });
    return gt;
}

function cartReCreate(){
    rows=[];    carrito=[];    importe=hTotal.getAttribute('total');    
    trs = (android)? ticket.querySelectorAll('.ticket-line'): items.querySelectorAll('tr');
    trs.forEach(tr => {
        nameNR=(tr.getAttribute('prid')<1)? tr.querySelector('.name').textContent: '';
        rows.push({
            prid: tr.getAttribute('prid'),            name: tr.getAttribute('name'),
            qty: tr.querySelector('.q_').textContent,             price: tr.querySelector('.p_').textContent, 
            amt: tr.querySelector('.a_').textContent,            note: nameNR
        });
    });
    carrito = rows;
}

//ediTable end**********

const setTotal = data=>{
    hTotal.innerText = currency(data); hTotal.setAttribute('total',data.toFixed(2));}


hide(['container']); if (android) show(['container']);//barcode
function lecturaCorrecta(codigoTexto, codigoObjeto) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${codigoTexto}`, codigoObjeto);
  //Swal.fire(codigoTexto);
  
  try {
    res=(addRow([codigoTexto]));
    if (!res) {
        Swal.fire('no encontrado'); 
        beep(false);
        return null;    
    }
    beep(true);
    setTimeout(function(){ /*hide(['alert']);*/ }, 1000);
  } 
  catch (error){console.log(error);} 
   

    //  ca2.value=''; 

}

function errorLectura(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:  //console.warn(`Code scan error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: {width: 250, height: 250} },
  /* verbose= */ false);

html5QrcodeScanner.render(lecturaCorrecta, errorLectura);

// 1. Audio pre-cargado fuera de la función
const SOUND_SUCCESS = new Audio("data:audio/wav;base64,//uQRAAAAWMSLw...");
const SOUND_ERROR   = new Audio("data:audio/wav;base64,//uQRAAAAWMSLw...");

function playBeep(success = true) {
    const sound = success ? SOUND_SUCCESS : SOUND_ERROR;
    sound.currentTime = 0;
    sound.play().catch(err => console.warn("Audio play blocked:", err));
}

// revisar en el celu y eliminar si no hace falta*/ ref:002
    function beep(data = true) {
        if (!data) { //false
            var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="); 
        }
        var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
        snd.play();
    }

const simReader = data=>{
  try {
    res=(addRow(data));
    if (!res) {
        Swal.fire('no encontrado'); 
        playBeep(false);         //beep(false); //ref:002
        return null;    
    }
    playBeep(true); //beep();//ref:002
    setTimeout(function(){ hide(['alert']); }, 1000);
  } 
  catch (error){console.log(error);}    
}

/**
 * Encuentra el "siguiente menor" valor para la clave 'prid' en un array de objetos.
 * Si el array está vacío, devuelve -1.
 * Si el array tiene valores de 'prid', devuelve:
 * - El prid mínimo - 1, si el mínimo es negativo.
 * - -1, si el prid mínimo es 0 o positivo.
 *
 * @param {Array<Object>} array El array de objetos a inspeccionar.
 * @returns {number} El siguiente valor menor propuesto.
 */
const getNextMinorPrid = (array) => {
    // 1. Verificar si el array está vacío
    if (!array || array.length === 0) return -1;    
    // 2. Encontrar el valor mínimo de 'prid' en el array
    // Se inicializa con un valor muy grande para asegurar que cualquier 'prid' del array sea menor.
    let minPrid = Infinity;
    for (const item of array) {
        if (typeof item.prid === 'number' && item.prid < minPrid) {
            minPrid = item.prid;
        }
    }
    // Si minPrid sigue siendo Infinity (ej. si ningún elemento tenía 'prid' numérico),
    // se trata como un array vacío para nuestro propósito.
    if (minPrid === Infinity)         return -1;    
    // 3. Determinar el siguiente valor menor
    if (minPrid < 0) {
        // Si el valor mínimo de prid es negativo, el siguiente menor es mínimo actual menos 1.
        return minPrid - 1;
    } else {
        // Si el valor mínimo de prid es 0 o positivo, el siguiente menor sería -1.
        // Esto asume que queremos usar números negativos como IDs temporales/menores
        // y -1 es el primer valor negativo que queremos usar.
        return -1;
    }
};

const carritoAdd = data=>{
    [arr2, prid]=data; 
    let nameNR = (prid<1)? arr2.field3: '';
    POSState.carrito.push({
        art:0, name:arr2.field3, price:Number(arr2.field2), qty:Number(arr2.field1), 
        amt:(arr2.field1*arr2.field2),   prid:prid, note:nameNR }); 
}

const memoBtnsCont = gIC(['memoBtnsCont']);
memoBtnsCont.addEventListener('click', (e)=> memoBtn(e.target));
const memoBtn = data => {
    let btn = data; if (!btn.classList.contains('memoBtns')) return null;
    let mem = localStorage.getItem(`memo${btn.innerText}`);
    if (!mem) {
        if (POSState.carrito.length===0) { Swal.fire('¡El carrito está vacío!'); return null;}
        localStorage.setItem(`memo${btn.innerText}`, JSON.stringify(POSState.carrito));
        //Swal.fire(`Carrito guardado en M${btn.innerText}`);
    } else{
        localStorage.setItem(`memoTemp`, JSON.stringify(POSState.carrito));
        POSState.carrito = JSON.parse(mem);  rendCart(POSState.carrito); rendTicket(POSState.carrito);
        const sumall = POSState.carrito.map(item => item.amt).reduce((prev, curr) => prev + curr, 0);
        setTotal(sumall); ca2.focus();
        //Swal.fire(`Carrito M${btn.innerText} cargado. El carrito anterior se guardó en Mtemp.`);
    }
}
 
inp.addEventListener('keydown', (e)=>{  et = e.target;
    if(et.tagName==='SPAN' && et.closest('div').id==='combo_producto'){
            if (e.key === "Escape") {show(['ca2']); hide(['cmbproducto']); ca2.focus(); }
    }   });


$('#campo1').select2({
  templateResult: function(estado) {
    // Si no hay ID (por ejemplo, el elemento de carga), devuelve el texto original
    if (!estado.id) {
      return estado.text;
    }
    console.log(estado);
    // Crea un elemento HTML con la clase CSS dependiendo del valor de la opción
    var $estado = $(
      '<span class="bertoldi">' + estado.text + '</span>'
    );
    return $estado;
  }
});

const currToNumber = (value) => { // Eliminar cualquier carácter que no sea un dígito, punto o coma
    let numericValue = value.replace(/[^0-9.,-]+/g, "");    
    return parseFloat(numericValue.replace(",", "."));
}   