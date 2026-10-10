arr1=new Object();

const getSome3 = async (model='', par = {}, fn = null) => {
  const fD = new FormData(); 
  for (const key in par) { if (par.hasOwnProperty(key)) fD.append(key, par[key]);  }  
  try {
    const res = await fetch(base_url + model, { method: 'POST', body: fD });
    if (!res.ok) throw new Error(`Error en la petición: ${res.status} ${res.statusText}`);
    const data = await res.json();
    if (fn) fn(data); else {return Array.isArray(data) ? data : (data|| []);};
  } catch (error) { console.error('errgts3',error); throw error;  } 
};

android = true;  // (navigator.userAgent.match(/Android/i))?true:false;
// Alias definitivo para seleccionar UN elemento (ID, clase o etiqueta)
const _$ = sel => document.querySelector(sel);
const _$$ = sel => document.querySelectorAll(sel);


const addClass=data=>{document.querySelectorAll('.'+data[0]).forEach(b=>{b.classList.add(data[1])})}
const removeClass=data=>{document.querySelectorAll('.'+data[0]).forEach(b=>{b.classList.remove(data[1])});}
const toggleClass = (el, className) => el.classList.toggle(className);
const delClass=data=>{[element, clasebuscada, claseaborrar] = data;
  element = (typeof element === 'string')? document.getElementById(element): element
  element.querySelectorAll('.'+clasebuscada).forEach(b=>b.classList.remove(claseaborrar));  
};
const hide2 = data => data?.forEach(item => addClass([item, 'hidden']));
const show2 = data => data?.forEach(item => removeClass([item, 'hidden']));

function btnSaveUI(before=true){
	  _$('#btnGuardar').disabled = true;
  	_$('#btnGuardarTexto').innerText = "Guardando...";
    	_$('#btnGuardarSpinner').classList.remove('hidden');
	if (!before){
		_$('#btnGuardar').disabled = false;
  		_$('#btnGuardarTexto').innerText = "Guardar";
    	_$('#btnGuardarSpinner').classList.add('hidden');		
	}
 }
 
 const setCampo2 = data =>{
  campos = document.getElementsByName(data); 
  arr1['_id']=_$('#_id').value;
  for (i = 0; i < campos.length; i++) {
    clave = campos.item(i).id; valor = campos.item(i).value||'';
    if (campos.item(i).type==='checkbox') valor = (campos.item(i).checked)?1:0;
    arr1[clave]=valor;    
  } 
}

function setLS(c="",v=""){localStorage.setItem(c, v); guardarCookie(c,v,100);} 
const getLS = clave => localStorage.getItem(clave);