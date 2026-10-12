document.querySelectorAll('.tom-select').forEach((el) => {
  new TomSelect(el, {
    create: true,
    sortField: { field: "text", order: "asc" },
    plugins: ['remove_button']
  });
});

/*
{
  "rubro": "Farmacia",
  "campos_activos": {
    "requiere_receta": true,
    "laboratorio": true,
    "lote_vencimiento": true,
    "unidad_medida": "Comprimidos / ML",
    "fraccionable": true
  }
}
*/

// Alternar Vista Tabla / Cards
function cambiarVista(tipo) {
  const tabla = document.getElementById('vistaTabla');
  const cards = document.getElementById('vistaCards');
  const btnTabla = document.getElementById('btnVistaTabla');
  const btnCards = document.getElementById('btnVistaCards');

  if (tipo === 'tabla') {
    tabla.classList.remove('hidden');
    cards.classList.add('hidden');
    btnTabla.className = "px-3 py-1 text-xs font-medium rounded-md bg-white text-gray-800 shadow-sm transition";
    btnCards.className = "px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-gray-800 transition";
  } else {
    tabla.classList.add('hidden');
    cards.classList.remove('hidden');
    btnCards.className = "px-3 py-1 text-xs font-medium rounded-md bg-white text-gray-800 shadow-sm transition";
    btnTabla.className = "px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-gray-800 transition";
  }
}

// Control de Abrir / Cerrar Modales
function toggleModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.toggle('hidden');
  }
}












let galeriaImagenes = [];

async function procesarImagenes(archivos) {
  const contenedor = document.getElementById('contenedorPreviews');

  // Usamos bucle for...of clásico para asegurar que las promesas de compresión
  // y renderizado de imágenes se ejecuten ordenadamente sin bloquear el hilo principal.
  for (const archivo of archivos) {
    if (galeriaImagenes.length >= 5) {
      alert("Solo se permiten hasta 5 imágenes por producto.");
      break;
    }

    try {
      // Compresión Canvas JS
      const imagenComprimida = await comprimirImagenCanvas(archivo, 800, 0.85);
      
      const idUnico = Date.now() + Math.random().toString(36).substring(2, 5);
      galeriaImagenes.push({ id: idUnico, blob: imagenComprimida.blob, dataUrl: imagenComprimida.dataUrl });

      // Renderizar la miniatura en el DOM
      const card = document.createElement('div');
      card.id = `img-${idUnico}`;
      card.className = "relative group rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-100";
      card.innerHTML = `
        <img src="${imagenComprimida.dataUrl}" class="w-full h-full object-cover">
        <button type="button" onclick="eliminarImagen('${idUnico}')" 
                class="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-90 hover:opacity-100 transition">
          <i class="fa-solid fa-xmark"></i>
        </button>
      `;
      contenedor.appendChild(card);
    } catch (e) {
      console.error("Error al comprimir la imagen:", e);
    }
  }
}

// Función Canvas para comprimir imágenes del lado del cliente
function comprimirImagenCanvas(file, maxDimension = 800, calidad = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Redimensionar proporcionalmente
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Exportar como WebP para máxima compresión
        const dataUrl = canvas.toDataURL('image/webp', calidad);
        canvas.toBlob((blob) => {
          resolve({ blob, dataUrl });
        }, 'image/webp', calidad);
      };
      img.onerror = (error) => reject(error);
    };
  });
}

function eliminarImagen(id) {
  galeriaImagenes = galeriaImagenes.filter(item => item.id !== id);
  const el = document.getElementById(`img-${id}`);
  if (el) el.remove();
}

// ==========================================
// CONTROL DE ESTADOS DE CARGANDO Y ERROR
// ==========================================

// 1. Muestra esqueletos animados (Skeletons) mientras se obtienen los productos
function showLoadingState() {
    const grid = document.getElementsByTagName('tbody')[0];
    if (!grid) return;

    // Genera 4 tarjetas "esqueleto" vacías con animación de pulso
    grid.innerHTML = Array(4).fill(0).map(() => `
                  <tr class="hover:bg-gray-50/50 transition">
            <td class="p-4 flex items-center gap-3">
              <img src="" class="w-10 h-10 rounded-lg object-cover border" alt="Prod">
              <div>
                <p class="font-medium text-gray-800"></p>
                <p class="text-xs text-gray-400"></p>
              </div>
            </td>
            <td class="p-4 text-gray-600"></td>
            <td class="p-4 font-semibold text-gray-800"></td>
            <td class="p-4"><span class="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium"></span></td>
            <td class="p-4 font-semibold text-emerald-600"></td>
            <td class="p-4">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Visible
              </span>
            </td>
            <td class="p-4 text-right space-x-1">
              <button class="p-2 text-gray-400 hover:text-indigo-600 transition" title="Editar"><i class="fa-solid fa-pen"></i></button>
              <button class="p-2 text-gray-400 hover:text-red-600 transition" title="Inactivar"><i class="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>

    `).join('');
}

function showErrorState(message = "Ocurrió un error al cargar los productos.") {
    const grid = document.getElementById('vistaTabla');
    if (!grid) return;

    grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-500">
            <div class="inline-flex p-3 bg-red-50 text-red-500 rounded-full mb-3">
                <i data-lucide="alert-circle" class="w-8 h-8"></i>
            </div>
            <p class="font-bold text-slate-800 text-lg mb-1">¡Ups! Algo salió mal</p>
            <p class="text-sm text-slate-500 mb-4">${message}</p>
            <button onclick="initApp()" class="px-4 py-2 bg-blue-600 text-white font-medium text-xs rounded-xl hover:bg-blue-700 transition">
                Reintentar
            </button>
        </div>
    `;
    if (window.lucide) lucide.createIcons();
}

async function getProducts() {
    const API_URL = base_url +'/Ecommerce/getProducts6/' + getLS('iCo');      
    try {
        const response = await fetch(API_URL, {
            method: 'GET', headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) {//si la respuesta del servidor fue exitosa (código 200-299)
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // Retornar los datos (asegurando un array por seguridad)
        return Array.isArray(data) ? data : (data.products || []);

    } catch (error) {
        console.error(" Error al obtener productos en getProducts():", error);
        // Lanzamos el error hacia arriba para que initApp() pueda mostrar el estado de error en la UI
        throw error; 
    }
}


let productsData = []; let categoriasUnicasOrdenadas = [];
async function initApp() {
    showLoadingState(); // Muestra esqueletos / spinner
    try {
        // La ejecución se PAUSA aquí hasta que getProducts() termina de traer los datos
        //if (!android) hide2(['gridcols']);
        productsData = await getProducts();
        categoriasUnicasOrdenadas = [...new Set(productsData.map(p => p.category))].sort();
        renderCategoryButtons(categoriasUnicasOrdenadas.filter(Boolean)); // Filtra categorías vacías
        renderProducts(productsData);
    } catch (error) {
        // Si la API falla o da error 404/500, capturamos el fallo suavemente
        showErrorState("No pudimos cargar los productos en este momento.");
    }
}


if (document.readyState !== 'loading') { 
  initApp();
}else {
  document.addEventListener('DOMContentLoaded', initApp);
}

//jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj







var arrayRubros=[]; myBlines=[];
hRubro='';
getSome('Data/getDataByType/15','rubros');
getSome('companies/getMyBlines','misRubros');//blinebyCo
function fillTC(texto, type){
  if (type=='rubros') rubros(texto);
  //if (type=='misRubros') misRubros(texto);
}

function misRubros(txt){
  var objData = JSON.parse(txt);
  rubs=(objData.data.blines).split(',');
  rubs.forEach(function(rubro){
    rubro_index=(rubro==='')?0:parseInt(rubro);
    myBlines.push({rubId:rubro_index,rubName:arrayRubros[rubro]})
    hRubro+=`<label class="px-3"><input type="checkbox" value=${rubro_index}>${arrayRubros[rubro]}</label>`;
  });
  document.getElementById('bline-list').innerHTML = hRubro;
}
function rubros(txt){ 
  for(x of JSON.parse(txt)) {
    arrayRubros[x.dataid]=x.dataname;
  }
}

function categories(){
  cmbCategories = comboBuilder('Categoría',3,'category','data','',false);
  const dataCat = new FormData(); dataCat.append('src', 'data');
  f_URL = base_url+'Data/getDataCmb/3'; 
  getJson(f_URL, dataCat, 'category', 'campoZ',0,'Categoría')
  //console.log(document.getElementById('category').innerHTML)
}


function preparaModal(prodname='', description='', price=0,status=1, doc=0, especialidad=0, factor=1, marca=0, proveedor=0, insumo=0,imagen=''){
  let prodCf=(document.getElementById('btnConfig').getAttribute('prodConfig'))
  factorVisible=(prodCf.substring(0,1)==='0')?' d-none ':'cc';
  brandVisible =(prodCf.substring(1,2)==='0')?' d-none ':'';
  categVisible =(prodCf.substring(2,3)==='0')?' d-none ':'';
  vendorVisible=(prodCf.substring(3,4)==='0')?' d-none ':'';

  categoria = especialidad;
  status=(status==0)?'':' checked ';
  combo2=`<div class="col-md-12"><label class="labels">Doctor</label>
          </div><div id="combo_doctor"></div> <br></div>`;
  combo3 = `<div class="col-md-12"><label class="labels">Especialidad</label>
          </div><div id="combo_especialidad"></div> <br></div>`;
  
  cmbDoctor= comboBuilder('doctor',4,'campo8','client')
  cmbEspec = comboBuilder('especialidad',4,'campo6','client')

  idcampo="campo10";  imgProduct=setPreview(nuevaImg(imagen,'uploads'), idcampo, imagen);

  cmbBrand = comboBuilder('marca',    1,'campo5','data',brandVisible);
  cmbCateg = comboBuilder('categoría',3,'campo6','data',categVisible);
  cmbVendor= comboBuilder('proveedor',2,'campo8','client',vendorVisible);

  check1 =`<div class="col-md-3 " style="padding-top: 15px;">
            <div class="form-check"><label class="form-check-label" for="campo4">
                <input type="checkbox" class="form-check-input" id="campo4" name="campo" ${status}><b>Activo</b>
                </label>     </div></div>`
  inputs = []; h='';
  //inputs.push({id: 'html', idHt:'<div class="row"><div class="col-md-12">'});
  inputs.push({id: 'html', idHt:'<br>'+htR1});
    inputs.push({id: 'html', idHt:'<div class="col-md-4">'});
    inputs.push({id:'combo',  idCmb:imgProduct})// preview
  inputs.push({id: 'html', idHt:htR2});
  inputs.push({id: 'html', idHt:'<div class="col">'});
    inputs.push({id: 'campo1' ,campo:'Nombre',selector:'input',type:'text',placeholder:'Producto o servicio', value:prodname, label:1, required:''})
      inputs.push({id: 'html', idHt:'<div class="row ">'});
        inputs.push({id: 'html', idHt:'<div class="col-md-9">'})
          inputs.push({id: 'campo2' ,campo:'Descripción',selector:'input',type:'text', placeholder:'Descripción', value:description, label:1})
        inputs.push({id: 'html', idHt:'</div>'});
        inputs.push({id: 'combo',  idCmb:check1, value:0})//Activo
      inputs.push({id: 'html', idHt:htR2});//fin row
      inputs.push({id: 'html', idHt:htR1});//otro row
        inputs.push({id: 'html', idHt:ht6})
          inputs.push({id:'campo3', campo:'Precio',selector:'input', type:'number', value:price, label:1})
        inputs.push({id: 'html', idHt:htR2})    
        inputs.push({id: 'html', idHt:ht6})
          inputs.push({id: 'campo7' ,campo:'Factor (mayorista)',selector:'input', type:'number', value:factor, label:1})
        inputs.push({id: 'html', idHt:htR2})
      inputs.push({id: 'html', idHt:htR2});//fin row
      inputs.push({id: 'html', idHt:htR1});//otro row
        inputs.push({id: 'html', idHt:ht6})
        inputs.push({id: 'combo',  idCmb:cmbBrand, value:marca}); inputs.push({id: 'html', idHt:htR2})
        inputs.push({id: 'html', idHt:ht6})
        inputs.push({id: 'combo',  idCmb:cmbCateg, value:categoria}); inputs.push({id: 'html', idHt:htR2})
      inputs.push({id: 'html', idHt:htR2}); //fin row
    inputs.push({id: 'html', idHt:htR2});  
    inputs.push({id: 'combo', idCmb:cmbVendor, value:proveedor});
    inputs.push({id: 'campo9', campo:'type',selector:'input', type:'number', value:localStorage.prod_source})
    if (localStorage.APP == '3') {//klk
      inputs.push({id: 'html', idHt:htR2}); //fin row
      inputs.push({id: 'html', idHt:htR1});//otro row
        inputs.push({id: 'html', idHt:ht6})
        inputs.push({id: 'combo',  idCmb:cmbDoctor}); inputs.push({id: 'html', idHt:htR2});
        inputs.push({id: 'html', idHt:ht6})
        inputs.push({id: 'combo',  idCmb:cmbEspec}); inputs.push({id: 'html', idHt:htR2});
      inputs.push({id: 'html', idHt:htR2}); //fin row        
    }
  //inputs.push({id: 'html', idHt:'</div><div class="col-md-3"><label>image product</label></div></div>'})
  
  openModal(inputs);
  document.getElementById('campo9').style.display = 'none';  //type
  document.getElementById('campo7').parentNode.classList.add(`${factorVisible}`)
  switch (localStorage.getItem('APP')) {
    case '3'://klk
      const data = new FormData(); data.append('src', 'client');
      f_URL = base_url+'Data/getDataCmb/1'; getJson(f_URL, data, 'combo_doctor', 'campo8', doc, 'Doctor' )
      
      const data1 = new FormData(); data1.append('src', 'data');
      f_URL = base_url+'Data/getDataCmb/4'; getJson(f_URL, data1, 'combo_especialidad', 'campo6',especialidad,'Especialidad' )
    break;
    default:
      const dataMarca = new FormData(); dataMarca.append('src', 'data');
      f_URL = base_url+'Data/getDataCmb/1'; getJson(f_URL, dataMarca, 'combo_marca', 'campo5',marca,'Marca');
      
      const dataCat = new FormData(); dataCat.append('src', 'data');
      f_URL = base_url+'Data/getDataCmb/3'; getJson(f_URL, dataCat, 'combo_categoría', 'campo6',categoria,'Categoría')

      const dataProv = new FormData(); dataProv.append('src', 'client');
      f_URL = base_url+'Data/getDataCmb/2'; getJson(f_URL, dataProv,'combo_proveedor','campo8',proveedor,'Proveedor Habitual')

    break;
  }
}
function prepara_abreModal(){    preparaModal();  showModal();}
///datatable///
prod=[' Productos ',' Servicios ',' Insumos '];
icon=['<i class="fa fa-box"></i>','<i class="fa fa-book"></i>','<i class="fa fa-barcode"></i>']
var table
type = localStorage.prod_source||1;
//console.log('prod_source', type)
//document.getElementById('title')?.innerHTML = icon[type-1]+prod[type-1];
//botones = "<button  type='button' class='botonmodificar btn btn-warning btn-sm'><i class='fa fa-upload'></i></button> ";
botones = `<button type='button' class='botonmodificar btn btn-warning btn-sm' title='Editar'><i class='fa fa-edit'></i></button>
           `;
//           <button  type='button' class='botonVender btn btn-info btn-sm' title='vender'><i class='fa fa-cart-plus'></i></button>
ojoAbierto = "<center><button  type='button' class='botonInvisible btn btn-success btn-sm' title='mostrar en la tienda virtual'><i class='fa fa-eye'></i></button> </center>";
ojoCerrado = "<center><button  type='button' class='botonInvisible btn btn-danger btn-sm' title='ocultar en la tienda virtual'><i class='fa fa-eye-slash'></i></button> </center>";
document.addEventListener('DOMContentLoaded', function() {
  imgPath = base_url+'Assets/images/uploads/';
  table=$('#tableProducts').DataTable({
    "aProcessing": true,  "aServerside": true,
    "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
    "ajax": { "url": " " + base_url + "/Products/getProducts/"+type,   "dataSrc": ""  },
    "columns": [
      {"data": "prid" },
      {"data": "nombre" },
      {"data": "descripcion" },
      {"data": "precio", className: "text-right"  },
      {"data": "imagen",
        "render":function(data,type,row){
          img = (data==null||data=='')?'noimage.jpg':data;
          return `<center><img src = ${imgPath}${img} width="80" height ="auto"></center>`;
        },"orderable": false 
      },
      {"data": "invisible",
        "render":function(data,type,row){
         return (data==0)? ojoAbierto: ojoCerrado;
        },"orderable": false 
      },      
      { "data": null,"orderable": false},
    ],
    "columnDefs": [ 
      { targets: 0, visible: false},//id
      { targets: 4, visible: false},//id
      { targets: 6, "defaultContent":botones, data: null, className: "text-center"  }  
    ],
    "responsieve": "true",
    "bDestroy": true,
    "iDisplayLength": 10,
    "order": [  [0, "desc"] ]
  });
})

$('#tableProducts').on('click', 'button.botonInvisible', function() {
  const registro = table.row($(this).parents('tr')).data();
  if (registro.invisible==0)toggle=1; else toggle=0;
  console.log(registro.invisible, toggle)
  arr1.id=registro.prid;  arr1.campo1 = toggle;

  const dato = new FormData();  dato.append('campos',JSON.stringify(arr1));
  f_URL = base_url+'products/toggleVisible';  save(f_URL, dato);
});
  
$('#tableProducts').on('click', 'button.botonmodificar', function() {
  let registro = table.row($(this).parents('tr')).data();
  document.getElementById('id').value = registro.prid
  
  preparaModal(registro.nombre, registro.descripcion, registro.precio,
    registro.estado, registro.doc, registro.categoria, registro.factor, 
    registro.marca, registro.proveedor, registro.insumo, registro.imagen)
  showModal(1);
  document.getElementById('btnCopyNew').classList.remove('d-none');
  localStorage.setItem('imgToUpld',registro.imagen);
  edtImgName=registro.imagen;

});

$('#tableProducts').on('click', 'button.botonupload', function() {    
  let registro = table.row($(this).parents('tr')).data();
  document.getElementById('id').value = registro.prid;
  arr1.campo1=(registro.imagen==null)? 'new': registro.imagen;  
  document.getElementById('image').click();
});

document.getElementById('btnConfig').addEventListener('click',function(){
  let prodCf=(this.getAttribute('prodConfig'))
  let factorCheck =(prodCf.substring(0,1)==='1')?' checked ':'';
  let brandCheck  =(prodCf.substring(1,2)==='1')?' checked ':'';
  let categCheck  =(prodCf.substring(2,3)==='1')?' checked ':'';
  let providCheck =(prodCf.substring(3,4)==='1')?' checked ':'';
  const img_layout=prodCf.substring(4,5);
  check2=`
  <div class="container">    
    <label class="toggle">
      <input class="toggle-checkbox" type="checkbox" ${factorCheck}id="campo1" name="campo">
      <div class="toggle-switch"></div>
      <span class="toggle-label">Factor (para mayoristas)</span>
    </label>
    <hr>

    <label class="toggle">
      <input class="toggle-checkbox" type="checkbox" ${brandCheck} id="campo2" name="campo">
      <div class="toggle-switch"></div><span class="toggle-label">Marca</span>
    </label>
    <hr>
    <label class="toggle">
      <input class="toggle-checkbox" type="checkbox" ${categCheck} id="campo3" name="campo">
      <div class="toggle-switch"></div><span class="toggle-label">Categoría</span>
    </label>
    <hr>
    <label class="toggle">
      <input class="toggle-checkbox" type="checkbox" ${providCheck} id="campo4" name="campo">
      <div class="toggle-switch"></div><span class="toggle-label">Proveedor</span>
    </label>
    <hr>
  </div>

  <div>
    <fieldset>
      <legend align="right">Orientación de imagen:</legend>
      <label class="btn btn-outline-info" >
        <input type="radio" class="btn-check" name="img_layout" value="1" ${(img_layout==1?'checked':'')}>
      Vertical      </label>
      
      <label class="btn btn-outline-info" >
        <input type="radio" class="btn-check" name="img_layout" value="2" ${(img_layout==2?'checked':'')}>
      Cuadrado      </label>

      <label class="btn btn-outline-info" >
        <input type="radio" class="btn-check" name="img_layout" value="3" ${(img_layout==3?'checked':'')}>
      Horizontal      </label>
    </fieldset>
  </div>`;
  inputs = [];
  inputs.push({id: 'combo',  idCmb:check2, value:0})//insumo 
  openModal(inputs);
  showModal( )
  document.getElementById('titleModal').innerHTML='Configuración';
})

function actionA1 (){}
