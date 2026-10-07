arr1=new Object();

///main.js
const getSome3 = async (model='', par = {}, fn = null) => {
  const fD = new FormData(); 
  for (const key in par) { if (par.hasOwnProperty(key)) fD.append(key, par[key]);  }  
  try {
    const res = await fetch(base_url + model, { method: 'POST', body: fD });
    if (!res.ok) throw new Error(`Error en la petición: ${res.status} ${res.statusText}`);
    const data = await res.json();
    //return Array.isArray(data) ? data : (data.products || []);
    //if (fn) fn(data); else return data;
    if (fn) fn(data); else {return Array.isArray(data) ? data : (data|| []);};
  } catch (error) { console.error('errgts3',error); throw error;  } 
};

android = (navigator.userAgent.match(/Android/i))?true:false;
// Alias definitivo para seleccionar UN elemento (ID, clase o etiqueta)
const _$ = sel => document.querySelector(sel);
const _$$ = sel => document.querySelectorAll(sel);
