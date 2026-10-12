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

android = (navigator.userAgent.match(/Android/i))?true:false;
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

function showToast() {
    const toast = document.getElementById('toast-success');
    toast.classList.remove('hidden');
    setTimeout(closeToast, 4000);
}
function closeToast() {
    document.getElementById('toast-success').classList.add('hidden');
}


function setLS(c="",v=""){localStorage.setItem(c, v); guardarCookie(c,v,100);} 
const getLS = clave => localStorage.getItem(clave);

 /**
 * Envía datos a un servidor usando Fetch API.
 * @param {string} url - La dirección de destino.
 * @param {Object|FormData} formData - Los datos a enviar (Objeto plano o FormData).
 * @param {Function|null} fn - Función callback opcional que recibe la respuesta del servidor.
 */
async function save2(url, formData = {}, fn = null) {
    try {
        // 1. Detectar si es FormData, si no, convertir el objeto a JSON
        const esFormData = formData instanceof FormData;
        const opciones = {
            method: 'POST',
            body: esFormData ? formData : JSON.stringify(formData),
            headers: {}
        };
        // 2. Si es JSON, necesitamos especificar el Content-Type
        // Nota: Si es FormData, el navegador asigna el Content-Type y el boundary automáticamente
        if (!esFormData) { opciones.headers['Content-Type'] = 'application/json';        }
        // 3. Realizar la petición
        const respuesta = await fetch(url, opciones);
        // 4. Validar si la respuesta HTTP es correcta (status 200-299)
        if (!respuesta.ok) { throw new Error(`Error en la petición: ${respuesta.status} ${respuesta.statusText}`);}
        // 5. Procesar los datos (asumiendo que el servidor responde con JSON)
        const datos = await respuesta.json();
        // 6. Ejecutar el callback si fue proporcionado
        if (typeof fn === 'function') { fn(datos); }
        return datos;
    } catch (error) {
        console.error('Error al guardar:', error.message);
        // Aquí puedes agregar alertas globales como Swal.fire() o toastr si usas alguna librería
        throw error; 
    }
}
