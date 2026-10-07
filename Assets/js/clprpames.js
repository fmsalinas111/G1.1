let categIva = []; let clientes = [];
async function initApp() {
  try {
    categIva = await getSome3('Data/getDataCmb/22',{'src':'data'});
    clientes =  await getDatos();
    render();
    if (android) cambiarVista('cards');
    } catch (error) {        console.log(error);    }
}
const getDatos = async () => {return await getSome3 ('Clprpames/getClprpames2/1');}

let categoriasIva =  JSON.parse(localStorage.getItem("categoriasIva")) ||
    [ {      nombre: "Responsable Inscripto",      codigo: "RI"    },
      {      nombre: "Monotributista",      codigo: "MT"    },
      {      nombre: "Consumidor Final",      codigo: "CF"    },
      {      nombre: "Exento",      codigo: "EX"    }    ];
let vistaActual =  localStorage.getItem("vistaClientes") || "tabla";
let paginaActual = 1;
const clientesPorPagina = 6;
/* =====================================================
   PAISES
===================================================== */
const paises = {
  AR: "+54",
  UY: "+598",
  CL: "+56",
  BR: "+55",
  PY: "+595",
  BO: "+591",
  ES: "+34"
};
/* =====================================================
   INICIO
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  actualizarCodigoPais();
  cargarCategoriasIva();
  //cambiarVista(vistaActual);
  initApp();
});
/* =====================================================
   LOCAL STORAGE
===================================================== */
    function guardarDatos() {
      localStorage.setItem(    "clientes",    JSON.stringify(clientes)  );
      localStorage.setItem(    "categoriasIva",    JSON.stringify(categoriasIva)  );
    }
function guardarCatIva(event) {
  event.preventDefault();
  const formData = new FormData(this);  
  save2(base_url + 'addr/setaddr', formData, (result) => {
    if (result.success) {
      alert('¡Categoría de IVA guardada correctamente!'); 
    } else {
      alert('Error: ' + result.message);
    }
  });
  //localStorage.setItem("categoriasIva", JSON.stringify(categoriasIva));
}
/*
document.getElementById('formPerfilNegocio').addEventListener('submit', async function(e) {
    e.preventDefault();    
    // FormData captura automáticamente todos los inputs (textos, selects y archivos)
    const formData = new FormData(this);    // crear función setSome o similar
    console.log(base_url + 'mydata/setPerfil');
    try {
        const response = await fetch(base_url + 'mydata/setPerfil', {
            method: 'POST', body: formData
        });        
        const result = await response.json();
        console.log('Respuesta del servidor:', result);
        if (result.success) {
            alert('¡Datos guardados correctamente!');
        } else {
            alert('Error: ' + result.message);
        }
    } catch (err) {
        console.error('Error enviando datos:', err);
    }
});
*/
/* =====================================================
   CATEGORIAS IVA
===================================================== */
function cargarCategoriasIva() {
  const select = document.getElementById("categoriaIva");
  select.innerHTML = "";
  categoriasIva.forEach(categoria => {
    const option =
      document.createElement("option");
      option.value = categoria.nombre;
      option.textContent =`${categoria.nombre} (${categoria.codigo || "-"})`;
      select.appendChild(option);
  });
}
function abrirModalIva() {  show2(['modaliva']);}
function cerrarModalIva() {  hide2(['modaliva']);}
function guardarCategoriaIva(event) {
  event.preventDefault();
  const nombre = gId("nuevoIva").value.trim();
  const codigo = gId("codigoIva").value.trim();
  if (categoriasIva.some(c => c.nombre.toLowerCase() === nombre.toLowerCase())) {
      alert("Esta categoría ya existe.");    return;  }
  categoriasIva.push({    nombre,    codigo  });
  guardarDatos();//LS
  guardarCatIva(event);
  cargarCategoriasIva();
  // Seleccionar automáticamente
  document.getElementById("categoriaIva").value =
    nombre;
  document.getElementById("nuevoIva").value = "";
  document.getElementById("codigoIva").value = "";
  cerrarModalIva();
}
/* =====================================================
   CODIGO DE PAIS
===================================================== */
function actualizarCodigoPais() {
  const pais = document.getElementById("pais").value;
  document.getElementById("codigoPais").value = paises[pais] || "";
}
/* =====   GUARDAR CLIENTE   ==================== */
function guardarCliente(event) {
  event.preventDefault();
  const id =    document.getElementById("clienteId").value;
  const pais =    document.getElementById("pais").value;
  const datos = {
    nombre:      document.getElementById("nombre").value.trim(),
    apellido:      document.getElementById("apellido").value.trim(),
    documento:      document.getElementById("documento").value.trim(),
    pais,
    codigoPais:      paises[pais],
    telefono:      document.getElementById("telefono").value.trim(),
    email:      document.getElementById("email").value.trim(),
    direccion:      document.getElementById("direccion").value.trim(),
    iva:      document.getElementById("categoriaIva").value,
    estado:      document.getElementById("estado").value
  };
  if (id) {
    const index =      clientes.findIndex(c => c.cid == id);
    clientes[index] = {
      ...clientes[index],
      ...datos
    };
  }
  else {
    clientes.push({      id: Date.now(),      ...datos    });
  }
  guardarDatos();
  cerrarModal();
  render();
}
/* =====================================================
   RENDER
===================================================== */
function render() {
  const busqueda = document.getElementById("busqueda")
      .value.toLowerCase();
  const filtro =document
      .getElementById("filtroEstado").value;
  let filtrados =  clientes.filter(cliente => {
      const texto =
        `${cliente.nombre}
         ${cliente.apellido}
         ${cliente.documento}
         ${cliente.telefono}
         ${cliente.email}`
          .toLowerCase();
      const coincideBusqueda = texto.includes(busqueda);
      const coincideEstado = filtro === "todos" || cliente.estado === filtro;
      return coincideBusqueda && coincideEstado;
    });
  const totalPaginas = Math.max(1, Math.ceil( filtrados.length / clientesPorPagina));
  if (paginaActual > totalPaginas)     paginaActual = totalPaginas;
  const inicio =(paginaActual - 1) * clientesPorPagina;
  const pagina =    filtrados.slice(      inicio,      inicio + clientesPorPagina    );
  const total = filtrados.length;
  //console.log("Clientes filtrados:", filtrados, paginaActual, totalPaginas, pagina);
  resultCount.textContent =`${total} ${total === 1? "cliente": "clientes"}`;              
  renderTabla(pagina);
  renderTarjetas(pagina);
  renderPaginacion(totalPaginas);
}
/* =====================================================
   TABLA
===================================================== */
function renderTabla(lista) {
  const tbody = document.getElementById("tablaClientes");
  if (!lista.length) {
    tbody.innerHTML = `
      <tr><td colspan="7" class="p-10 text-center text-gray-500">
          No se encontraron clientes. </td> 
      </tr> `;
    return;
  }
  //console.log(lista);
  tbody.innerHTML = lista.map(cliente => `
      <tr class="border-b hover:bg-gray-50">
        <td class="p-4">
          <input type="checkbox" class="checkboxCliente"
            value="${cliente.cid}"
            onchange="actualizarSeleccion()">
        </td>
        <td class="p-4">
          <div class="font-semibold">
            ${cliente.nombre} ${cliente.apellido}
          </div>
          <div class="text-xs text-gray-500">
            ${cliente.email || "Sin email"}
          </div>
        </td>
        <td class="p-4">
          ${cliente.documento || "-"}
        </td>
        <td class="p-4">
          <a href="${linkWhatsApp(cliente)}" target="_blank"
            class="text-green-600 hover:underline">
            ${cliente.telefono}
          </a>
        </td>
        <td class="p-4"> ${cliente.iva} </td>
        <td class="p-4"> ${badgeEstado(cliente.estado)} </td>
        <td class="p-4 text-right whitespace-nowrap">
            <button prid="e,${cliente.cid}" onclick="abrirModal(${cliente.cid})" class="_edit p-2 text-gray-400 hover:text-indigo-600 transition" title="Editar"><i class="fa-solid fa-pen"></i></button>
            <button prid="d,${cliente.cid}" onclick="eliminar(${cliente.cid})" class="_delete p-2 text-gray-400 hover:text-red-600 transition" title="Inactivar"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>
    `).join("");
}
/* ========   TARJETAS  ================================= */
function renderTarjetas(lista) {
  const contenedor = document.getElementById("vistaTarjetas");
  if (!lista.length) {
    contenedor.innerHTML = `
      <div class="col-span-full bg-white rounded-xl p-10 text-center text-gray-500">
        No se encontraron clientes.
      </div>    `;
    return;
  }
  contenedor.innerHTML =
    lista.map(cliente => `
      <article
        class="bg-white rounded-xl shadow-sm p-5 border">
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-3">
            <div
              class="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              ${cliente.nombre[0] || ""} ${cliente.apellido[0] || ""}
            </div>
            <div>
              <h3 class="font-bold">
                ${cliente.nombre} ${cliente.apellido}
              </h3>
              <p class="text-xs text-gray-500">
                ${cliente.documento || "Sin documento"}
              </p>
            </div>
          </div>
          ${badgeEstado(cliente.estado)}
        </div>
        <div class="space-y-2 text-sm">
          <div>
            <a href="${linkWhatsApp(cliente)}" target="_blank"
              class="text-green-600 font-medium hover:underline">
              📱 ${cliente.codigoPais||''}
              ${cliente.telefono}
            </a>
          </div>
          <div>
            ✉️ ${cliente.email || "Sin email"}
          </div>
          <div> 📍 ${cliente.direccion || "Sin dirección"} </div>
          <div>
            🧾 ${cliente.iva}
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-5 pt-4 border-t">
          <button prid="e,${cliente.cid}" onclick="abrirModal(${cliente.cid})"
            class="_edit p-2 bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition">
            <i class="fa-solid fa-pen"></i> Editar
          </button>
          <button prid="d,${cliente.cid}" onclick="eliminar(${cliente.cid})"
                  class="_delete p-2 text-gray-400 hover:text-red-600 transition" title="Inactivar">
                  <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </article>
    `).join("");
}
/* =====================================================
   BADGE ESTADO
===================================================== */
function badgeEstado(estado) {
  if (estado == "1") {
    return `
      <span
        class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        ●Activo
      </span>
    `;
  }
  return `
    <span
      class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
      ●Inactivo
    </span>
  `;
}
/* =====================================================
   WHATSAPP
===================================================== */
function linkWhatsApp(cliente) {
  /*
    WhatsApp necesita el número
    en formato internacional.
    Quitamos espacios, guiones y otros caracteres.
  */
  let numero =    `${cliente.codigoPais}${cliente.telefono}`
      .replace(/\D/g, "");
  return `https://wa.me/${numero}`;
}
/* =====================================================
   ELIMINAR
===================================================== */
function eliminarBak(id) {
  const cliente = clientes.find(c => c.cid === id);
  if (!cliente) return;
  const confirmar =    confirm(`¿Eliminar a ${cliente.nombre} ${cliente.apellido}?` );
  if (!confirmar) return;
  clientes =    clientes.filter(c => c.cid !== id);
  guardarDatos();
  render();
}
/* =====================================================
   SELECCIÓN
===================================================== */
function actualizarSeleccion() {
  const seleccionados =
    document.querySelectorAll(
      ".checkboxCliente:checked"
    );
  const acciones =
    document.getElementById("accionesMasivas");
  document.getElementById(
    "contadorSeleccionados"
  ).textContent =    `${seleccionados.length} seleccionados`;
  if (seleccionados.length) {
    acciones.classList.remove("hidden");
  }
  else {
    acciones.classList.add("hidden");
  }
}
function seleccionarTodos(estado) {
  $$(".checkboxCliente").forEach(checkbox => {
       checkbox.checked = estado;
    });
  actualizarSeleccion();
}
function eliminarSeleccionados() {
  const seleccionados = [...document.querySelectorAll(".checkboxCliente:checked")]
      .map(input => Number(input.value));
  if (!seleccionados.length) return;
  const confirmar =  confirm(      `¿Eliminar ${seleccionados.length} clientes?`    );
  if (!confirmar) return;
  clientes = clientes.filter(
      cliente =>        !seleccionados.includes(cliente.cid)    );
  guardar();
  render();
}

/* =====================================================
   PAGINACIÓN
===================================================== */
function renderPaginacion(totalPaginas) {
  const contenedor =  document.getElementById("paginacion");
  contenedor.innerHTML = "";
  for (    let i = 1;    i <= totalPaginas;    i++  ) {
    const boton = document.createElement("button");
      boton.textContent = i;
      boton.className = `px-3 py-2 rounded-lg border  
            ${i === paginaActual? "bg-blue-600 text-white": "bg-white"}`;
      boton.onclick = () => {
        paginaActual = i;
        render();
    };
    contenedor.appendChild(boton);
  }
}
function fillModalForm(id) {
  
  const form = gId("form");
  //renderCategorySelectModal(categories); //
  form.reset();  document.getElementById("_id").value = "";
  if (id !== null) {
    const cliente = clientes.find(c => c.cid === id);  if (!cliente) return;    
    //document.getElementById("clienteId").value = cliente.cid;
    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("apellido").value = cliente.apellido;
    document.getElementById("documento").value = cliente.documento;
    document.getElementById("pais").value = cliente.pais;
    actualizarCodigoPais();
    document.getElementById("telefono").value = cliente.telefono;
    document.getElementById("email").value = cliente.email;
    document.getElementById("direccion").value = cliente.direccion;
    document.getElementById("categoriaIva").value = cliente.iva;
    document.getElementById("estado").value = cliente.estado;
  }
}



async function guardar(e){
  if (e) e.preventDefault();
	btnSaveUI();
	setCampo2('c'); arr1.dttp = 1;
  try {
      r = await getSome3 ('clprpames/setClprpame2', {"campos":JSON.stringify(arr1)});
      console.log(r)   ;  
	}
	catch (err)   { console.error('Error en la petición AJAX:', err);
  		alert('Ocurrió un error al enviar los datos al servidor.');
 	} 
	finally {  
     	//showToast();      //showToast('¡Catálogo actualizado!', 'success');
    	btnSaveUI(false);
      clientes = await getDatos();    
      render();
      cerrarModal();
  }
}
 //********* del ******
 async function eliminar(id){
	if (!confirm('¿ Seguro de eliminar este registro ?')) return;
		//x = customConfirm.showModal();
		//console.log(x);
		arr1.cltp = 1; arr1._id=id;
       console.log(_id, arr1);
		try 	{
      		r = await getSome3 ("Clprpames/delCl", {"campos":JSON.stringify(arr1)});
      		console.log(r)   ;  
		}
	  catch (err)   { 
  		console.error('Error AJAX:', err);
  		alert('Ocurrió un error al enviar los datos.');
 	  } 
	  finally {  	
        clientes = await getDatos();    
        render();
        cerrarModal();
 	  }
 }

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
        if (typeof fn === 'function') {            fn(datos);        }
        return datos;
    } catch (error) {
        console.error('Error al guardar:', error.message);
        // Aquí puedes agregar alertas globales como Swal.fire() o toastr si usas alguna librería
        throw error; 
    }
}
