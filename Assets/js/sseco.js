//================== ECO SALE JS =====================//
const gridContainer = document.querySelector('.grid-container');
const totalQuantityDisplay = document.getElementById('total-quantity');
const totalAmountDisplay = document.getElementById('total-amount');
const templateProd = document.getElementById('productCard').content;
const fragmentEco = document.createDocumentFragment();
const itemsEco = document.querySelector('.grid-container');
const btnContinuar = document.querySelector('.sticky-submit-btn');
const hCats = document.querySelector('.cats'); arrCats=[];
const hBline = document.querySelector('.bline'); arrBline=[];
const hFilter = gIC('filtering');

const ecoOf = () => {
    cart.checked = false; hide(['grid-container','filtering','sticky-submit-btn']);
    show(['pos']); ca2.focus();
}

const ecoOn = () => {
    cart.checked = true;  show(['grid-container','filtering']);   hide(['pos']);
}

ecoOf(); if (getLS('cart')==='true') ecoOn();
if (!android) {
    show(['pos-detail']); hide(['ticket']);
    ca2.focus();    
}else{
    hide(['pos-detail']); show(['ticket']);
    show(['pos']);
    gIC('ticket').querySelector('.tile').classList.remove('tile');
    ca2.focus();
}

const toContinue = data => {
    totalAmountDisplay.textContent = carrito.map(item => item.amt).reduce((prev, curr) => prev + curr, 0);
};

const pintarCategN = data=>{  
  arrCats.forEach(categ => {
    label=crEl2('label',`btn btn-outline-secondary text-uppercase filter-btn m-2 btn-sm CAT${categ.dataId}`,
        {"data-id": categ.dataId,"name":"cat", 'for':'bl'+categ.dataId},categ.dataName,);
    hCats.appendChild(label);
    part=crEl2('input','',{'type':'radio',"id":'bl'+categ.dataId});
    label.appendChild(part);

  });
}

const pintarCateg = data=>{  
  arrCats.forEach(categ => {
    part = document.createElement("a");    
    part.className = `btn btn-outline-secondary text-uppercase filter-btn m-2 btn-sm CAT${categ.dataId}`;
    part.setAttribute ("filter", categ.dataName);  part.setAttribute ("data-id", 'CAT'+categ.dataId);  
    part.innerText = categ.dataName; part.name = 'cat';hCats.appendChild(part);
  });
}


const pintarBline = data =>{hRubro='';    
    myBlines.forEach(r=>{
        hRubro+=`<label class="px-3 "><input type="checkbox"value="BL${r.dataId}" class="filter-bl">${r.dataName}</label>`
    })    
    hBline.innerHTML = hRubro;  //hide(['rubro0']);
}
const rendProd=data=>{  
    itemsEco.innerHTML=''; 
    imgPath = base_url+'Assets/images/uploads/';
    i=0; classToAdd='';
    data.forEach(producto=>{i++;  
        blines = producto.bline.split(','); blines.forEach(r=>{ if (!arrBline.includes(r)) arrBline.push(r); })
        //templateDetail.querySelector('.stk').textContent = producto.prid;//
        //templateProd.querySelector('.img-box').style.backgroundImage = `url(${imgProd})`;
        imgProd = isValidUrl(producto.img)? producto.img: imgPath+producto.img;    
        templateProd.querySelector('.img-box').setAttribute('src', imgProd);
        templateProd.querySelector('.img-box').setAttribute('alt', `sin imagen `);
        templateProd.querySelector('.name').textContent = producto.name;  
        templateProd.querySelector('.xm').textContent = producto.multiplo;
        templateProd.querySelector('.product-price').textContent = producto.price;
        templateProd.querySelector('.quantity-input').setAttribute('data-price', producto.price);
        templateProd.querySelector('.quantity-control').setAttribute('data-prid', producto.prid);
        templateProd.querySelector('.quantity-control').setAttribute('data-xm', producto.multiplo);
        templateProd.querySelector('.p-item').setAttribute ('filter', producto.categoria);

        const cadenaOriginal = producto.bline;  const prefijo = 'BL';
        const nuevaCadena = cadenaOriginal.split(',').map(item => `${prefijo}${item.trim()}`).join(' ');

        classToAdd = `${nuevaCadena}`+ ' CAT'+producto.cid; //filter
        templateProd.querySelector('.p-item').className='product-card p-item '+classToAdd;
        if (!hasCId(producto.cid))  arrCats.push({dataId:producto.cid, dataName:producto.categoria});
        const clone = templateProd.cloneNode(true);
        fragmentEco.appendChild(clone);
    });    itemsEco.appendChild(fragmentEco);
    if (hCats.innerHTML.length===0)  sortCats(true);
  //  if (hBline.innerHTML.length===0) sortCats(false);
}
const hasCId = data => arrCats.some(cid => cid.dataId === data);
// Función para recalcular el total de todos los inputs
const updateTotalQuantity = () => {
    let total = 0;
    // Selecciona todos los inputs de cantidad
    const quantityInputs = gridContainer.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => { // Convierte el valor a un número y suma al total
        total += parseInt(input.value) || 0; 
    });
    // Actualiza el texto en el botón sticky
    if (total > 0) show(['sticky-submit-btn']);
    else hide(['sticky-submit-btn']);
    totalQuantityDisplay.textContent = total;
    toContinue();
};

// Delega el evento click a todo el contenedor para manejar todos los botones
gridContainer.addEventListener('click', (event) => {
    const target = event.target;        
    // Comprueba si el click fue en un botón de sumar o restar
    if (target.classList.contains('btn-plus') || target.classList.contains('btn-minus')) {
        // Encuentra el input relacionado
        const controlDiv = target.closest('.quantity-control');
        const input = controlDiv.querySelector('.quantity-input');
        let currentValue = parseInt(input.value);

        if (target.classList.contains('btn-plus')) {//sumar
            
            if (xm.checked) {
                const xmValue = parseInt(controlDiv.getAttribute('data-xm')) || 1;
                currentValue += xmValue; }
            else currentValue++;
            addRow([controlDiv.getAttribute('data-prid'), currentValue]);

        } else if (target.classList.contains('btn-minus')) {// Restar, >= 0
            if (currentValue > 0) {
                currentValue--;
                //addRow(controlDiv.getAttribute('data-prid'),  currentValue);
            }
        }

        // Actualiza el valor del input y recalcula el total
        input.value = currentValue;
        updateTotalQuantity();
    }
});

// Inicializa el total al cargar la página
updateTotalQuantity();

cart.addEventListener('click', function(event) {
    const isChecked = cart.checked;
    if (isChecked) { ecoOn();  setLS(['cart', 'true']); updateTotalQuantity();        } 
    else { ecoOf();  setLS(['cart', 'false']); /*updateTotalQuantity();      */  }
});

xm.addEventListener('click', function(event) {
    const xmChecked = xm.checked;
    if (xmChecked) show(['xm']); else hide(['xm']);
    //if (isChecked) {            ecoOn();  setLS(['cart', 'true']); updateTotalQuantity();        } 
    //else {            ecoOf();  setLS(['cart', 'false']); /*updateTotalQuantity();      */  }
});

coti.addEventListener('click', function(event) {
    const isCoti = coti.checked;
    btConfirm=gIC('btSave');
    if (isCoti) {
        btConfirm.innerText='Generar Cotización';
        btConfirm.classList.add('btn-warning');btConfirm.classList.remove('btn-primary');  
        show(['coti-due']); hide(['ncoti']);
        btConfirm.disabled=false;
    } else {
        btConfirm.innerText='Confirmar'; 
        btConfirm.classList.add('btn-primary');btConfirm.classList.remove('btn-warning');  
        btConfirm.disabled=true;
        hide(['coti-due']);show(['ncoti']);
    }
    ca2.focus();
});


btnContinuar.addEventListener('click', function() {
    ecoOf();  show(['pos']);
    if (!android) {
        show(['pos-detail']); hide(['ticket']);
    } else{
        show(['ticket']); hide(['pos-detail']);
    }
    ca2.focus();
});

function sortCats(){
  arrCats = arrCats.filter(item => item.dataId !== -1);
  arrCats.sort((a, b) => a.dataName.localeCompare(b.dataName));
  arrCats.unshift({dataId:-1, dataName:'todos'});
  if (arrCats.length > 2) pintarCateg();
  //pintarBline();
}

//filtering
var CP;   keyword2='todos';
const filtrar2 = e =>{
    el=e.target; _cat='';_catSel=''; filterBuilder=[];checkeds=[];
    _items = gIC('grid-container').querySelectorAll('div.p-item');
    if (el&&el.tagName==='A'){//categorías
        e.preventDefault(); //_cat = 'CAT'+el.getAttribute("data-id"); 
        removeClass(['filter-btn', 'categ-selected']);  e.target.classList.add('categ-selected');    
    }
    if (gIC('categ-selected')) _catSel='CAT'+gIC('categ-selected').getAttribute('data-id');
    if (el&&el.tagName==='INPUT'){ _bl  = el.value;
        //const showeds = gIC('grid-container').querySelectorAll('div.p-item:not(.d-none)');
    } 
    checkeds=[]; checkeds = hBline.querySelectorAll('input[type="checkbox"]:checked'); 
    checkeds.forEach(c=>filterBuilder.push(c.value));
    console.log(_catSel, filterBuilder);
    hide(['p-item']); if (_catSel==='CAT-1') show(['p-item']);
    if (_catSel.length>0) show([_catSel]);  
    const nodos = gIC('grid-container').querySelectorAll('div.p-item:not(.d-none)');
    const arrayNodos = [...nodos];    console.log(arrayNodos);
    //const showeds = gIC('grid-container').querySelectorAll('div.p-item:not(.d-none)');
    _items.forEach(s=>{     
        filterBuilder.forEach(f=>{
            if (!(s.classList.contains(f))) s.classList.add('d-none');
            else s.classList.remove('d-none');
        })
    });
}

function filtrar3(e) {
    el = e.target;
    const productos = document.querySelectorAll('.p-item');
    // 1. Obtener valores seleccionados (ejemplo: de radio buttons o select)
    //const catSeleccionada = document.querySelector('input[name="cat"]:checked')?.value || "";
    if (el&&el.tagName==='A'){//categorías
        e.preventDefault(); //_cat = 'CAT'+el.getAttribute("data-id"); 
        removeClass(['filter-btn', 'categ-selected']);  e.target.classList.add('categ-selected');
    }
    catSeleccionada = (gIC('categ-selected'))? gIC('categ-selected').getAttribute('data-id'):'';
    if (catSeleccionada==='CAT-1') {
        productos.forEach(producto => producto.style.display = "block"); 
        removeClass(['filter-btn', 'categ-selected']);
        checkeds = hBline.querySelectorAll('input[type="checkbox"]:checked'); 
        checkeds.forEach(c=>{c.checked = ''});
        return null;}   
    // Obtener rubros seleccionados (checkboxes)
    const blSeleccionados = Array.from(document.querySelectorAll('.filter-bl:checked'))
                                .map(cb => cb.value);
    // 2. Seleccionar todos los productos
    productos.forEach(producto => { let coincideCat = true;    let coincideBl = true;
        // 3. Verificar Categoría (si se seleccionó una)
        if (catSeleccionada !== "") coincideCat = producto.classList.contains(catSeleccionada);
        // 4. Verificar Rubros (si se seleccionaron)
        if (blSeleccionados.length > 0) { // El producto tiene al menos una de las clases 'bl##'
            coincideBl = blSeleccionados.some(bl => producto.classList.contains(bl));
        }
        // 5. Mostrar u Ocultar
        
        if (coincideCat && coincideBl) {
            producto.style.display = "block"; // O "flex", etc. 
        } else {producto.style.display = "none"; }
    });
}


hFilter.addEventListener('click',filtrar3);
//end filtering

const xx = data=>{//construye los blines de la compañía
    AllRubs=defDataCmb(15); 
    data.blines.split(',').forEach(r=>{
        if(r)  myBlines.push({dataId:r,dataName:dName([AllRubs,r])})
    });
}