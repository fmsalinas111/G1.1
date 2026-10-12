var chango=[],  hRubro;  var cart;

document.getElementById('e-commerce').addEventListener('click', function(e){ 
  mostrar = (document.getElementById('cart-items').style.display=='none')?'block':'none'; 
  cartEl = document.getElementById('cart-items').style.display=mostrar;
  window.scrollTo(0, 0)
});

  fetchURL = base_url+'pedidos_tex/getTextilReport';
  const data = new FormData(); data.append('src', 'data');
  fetch(fetchURL, { method: 'POST', body: data})
  .then(function(response) {if(response.ok) return response.text(); else throw "Err Ajax";})
  .then(function(texto) {
    products=(JSON.parse(texto));
    products=products.filter(miembro => miembro.input >0);
    cart = {
      // (A) PROPERTIES
        hPdt  : null, // HTML products list
        hItems: null, // HTML current cart
        items : {}, // Current items in cart
        tienda:'cart_'+document.getElementById('tienda').innerHTML,

        // (B) LOCALSTORAGE CART
        // (B1) SAVE CURRENT CART INTO LOCALSTORAGE
        save : function() {localStorage.setItem(tienda, JSON.stringify(cart.items));},

        // (B2) LOAD CART FROM LOCALSTORAGE
        load : function() {
          cart.items = localStorage.getItem(tienda);
          cart.items = (cart.items == null)? cart.items = {}: JSON.parse(cart.items);
        },

        // (B3) EMPTY ENTIRE CART
        nuke  : function() { if (confirm("Vaciar carrito?")) {
          cart.vaciar(); cart.hCat.innerHTML=''; cart.hBline.innerHTML=''; 
          cart.init();
        } },
        vaciar: function(){
            cart.items = {};    localStorage.removeItem(tienda);
            chango=[];          cart.list();      },

      categ: function(filterCateg){
          item = crEl("a"); item.className = "btn btn-outline-secondary btn-black btn-sm text-uppercase filter-btn m-2";
          item.setAttribute ("filter", filterCateg); item.innerHTML = filterCateg; 
          cart.hCat.appendChild(item);
      },

      bline: function(bline, dad){ 
          part = crEl("label");     part.className = `px-3 d-none bline ${bline} ${dad}`;
          part.innerHTML = `<input type="checkbox" value=${bline}>${bline}`
          cart.hBline.appendChild(part);
      },

      // (C) INITIALIZE
        init : function () {
          // (C1) GET HTML ELEMENTS
          //products= JSON.parse(document.getElementById('products').innerHTML);
          cart.hCat   = document.getElementById("category-products");
          cart.hBline = document.getElementById("bline-list");
          cart.hPdt   = document.getElementById("cart-products");
          cart.hItems = document.getElementById("cart-items");
          cart.hBline = document.getElementById("bline-list");
          clLayout="p-img-vertical";
          lstRubs=[];

          // (C2) DRAW PRODUCTS LIST
          cart.hPdt.innerHTML = "";   let p, item, part, j=0;
          arrayCategory =['todos'];  if(products.length>0) this.categ('todos');

          imgPath=base_url+'Assets/images/uploads/';
          for (let id in products) {
            p = products[id];  j=j+1; // WRAPPER
            //
            filterCateg = (p.dad==null)? 'todos':p.dad;
            if (!arrayCategory.includes(filterCateg)){
              arrayCategory.push(filterCateg);    this.categ(filterCateg);
            }

            //bline            
            rubs = p.subCateg;
            console.log(rubs);
            /*
            if(rubs.length>0){
              if(!lstRubs.includes(rubs)) {lstRubs.push(rubs); cart.bline(rubs, p.dad);}  
            }
            */
            //
            item = crEl("div"); item.className = `p-item`; item.setAttribute("filter", filterCateg);
            item.setAttribute ("bline", p.subCateg);
            item.setAttribute("id","vid"+id); cart.hPdt.appendChild(item);
            
            // PRODUCT NAME
            part = crEl("div");  part.innerHTML = p.subCateg + ': ' +p.color;
            part.className = "p-name";      item.appendChild(part);

            // PRODUCT DESCRIPTION
            part = crEl("div"); part.innerHTML = p.productname +` <strong>$${p.price}</strong>`;
            part.className = "p-desc";    item.appendChild(part);

            // PRODUCT PRICE/qty
            part = crEl("div");  
            if (p.d1===-1) {
              mi = crEl("input"); mi.setAttribute('type', 'number');
              mi.setAttribute('value', p.input);  mi.style.width = "35%"; mi.style.background = "yellow"; 
            } else {mi = crEl('label');  mi.innerText = p.input; }
            part.className = "p-price";  part.appendChild(mi);  item.appendChild(part);

            // ADD TO CART
            part = crEl("input");     part.type = "button";
            part.value = "Agregar al carrito";  part.className = "cart p-btn p-add ";
            part.onclick = cart.add;  part.dataset.id = id;
            part.setAttribute("div-itm","vid"+id);
            //if (sec.substr(4,1)==='0') part.className+='d-none';
            item.appendChild(part);

            /*          // LANDING
            part = document.createElement("input");
            part.type = "button";
              part.value = "landing";
              part.className = "cart p-add";
              part.onclick = cart.landing;
            part.dataset.id = id;
            item.appendChild(part);

            */

          }
          /*
          if (j>0) document.getElementById('emptyStore').style.display='none';
            else {
              hBline.style.display='none'; 
              document.getElementById('info').style.display='none';
            }
            */
          document.getElementById('info').innerText=`Productos encontrados: ${j}`;

          // (C3) LOAD CART FROM PREVIOUS SESSION
          cart.load();

          // (C4) LIST CURRENT CART ITEMS
          cart.list();
        },



      // (D) LIST CURRENT CART ITEMS (IN HTML)
      list : function () {
        // (D1) RESET
        cart.hItems.innerHTML = "";
        let item, part, pdt;
        let empty = true;
        for (let key in cart.items) {
          if(cart.items.hasOwnProperty(key)) {empty=false; break;}
        }

        // (D2) CART IS EMPTY
        if (empty) {
          item = crEl("div"); item.innerHTML = "Carrito vacío";
          document.getElementById('qty').innerHTML=0;
          cart.hItems.appendChild(item);
        } else {  // (D3) CART IS NOT EMPTY - LIST ITEMS
          let p, total = 0, subtotal = 0, i=0, chango=[], txt='';
          for (let id in cart.items) {
            i=i+1;
            // ITEM
            p = products[id];            //console.log(p)
            item = crEl("div"); item.className = "c-item";  cart.hItems.appendChild(item);

            // NAME
            part = crEl("div"); //part.innerHTML = `${p.productname} ${p.color}`;
            part.innerHTML = `${p.productname} - ${p.color}`; part.className = "c-name";
            item.appendChild(part);

            // REMOVE
            part = crEl("input"); part.type = "button"; part.value = "X"; part.dataset.id = id;
            //part.className = "fa fa-trash";//c-del cart";
            //part.i = <i action="eyeToggle" class='fa fa-eye'></i>
            part.addEventListener("click", cart.remove); item.appendChild(part);

            // QUANTITY
            part = crEl("input"); part.type = "hidden";
            part.value = cart.items[id]; part.dataset.id = id; part.className = "c-qty";
            part.addEventListener("change", cart.change); item.appendChild(part);
            cant = part.value;

            // kg
            part = crEl("label"); part.innerHTML = p.input;
            if (p.d1===-1) {part.innerHTML = p.kgr;  p.input=p.kgr; }
            part.className = "c-prz"; item.appendChild(part);

            // price
            part = crEl("label");  part.innerHTML = p.price;  part.className = "c-prz";
            item.appendChild(part);

            //tot line
            part = crEl("label"); part.className = "c-tot";
            part.innerHTML = new Intl.NumberFormat().format(p.price*p.input);
            item.appendChild(part);

            // SUBTOTAL
            subtotal = (p.input * p.price);
            total += subtotal;
            //icon cart
            chango.push({cantidad:p.input, precio:p.price, producto:p.productname, importe:p.price*p.input, 
              dset:id, pid:p.id, invid:p.invid, d1:p.d1, inp:p.input})
          }
          document.getElementById('qty').innerHTML=i;

          // CHECKOUT BUTTONS
          item = document.createElement("input");
          item.type = "button";

          item.value = "Total:  " + "$ " + new Intl.NumberFormat().format(total) +" - confirmar";//+ ((lgd)?' Vender':' Comprar');
          item.addEventListener("click", cart.checkout);
          item.className = "c-checkout cart";   item.setAttribute('total',total);
          cart.hItems.appendChild(item);

          for (let i in chango) {
            txt+=`${chango[i].cantidad*chango[i].precio}  ${chango[i].producto}  ${chango[i].precio}  *${chango[i].importe}*\n`;
          }
          changuito=chango;

          // EMPTY BUTTONS
          item = crEl("input");  item.type = "button"; item.value = "Vaciar";
          item.addEventListener("click", cart.nuke);  item.className = "c-empty cart";
          cart.hItems.appendChild(item);
        }
      },


      // (E) ADD ITEM INTO CART
      add : function (e) {
        if (cart.items[this.dataset.id] == undefined)
          cart.items[this.dataset.id] = 1; 
        else cart.items[this.dataset.id]++;
        cart.save(); 
        document.getElementById(this.getAttribute('div-itm')).style.display='none';
        
        qqtt = document.getElementById(this.getAttribute('div-itm')).querySelector('input').value;
        idx = this.getAttribute('div-itm'); 
        products[idx.substring(3)]['kgr']=qqtt;
        //console.log(qqtt, idx, idx.substring(3))
        cart.list();
      },

      // (G) REMOVE ITEM FROM CART
      remove : function () {
        document.getElementById('vid'+this.dataset.id).style.display='block';
        delete cart.items[this.dataset.id];
        chango.splice([this.dataset.id])
        cart.save(); cart.list();
      },
      
      // (H) CHECKOUT
      checkout : function () {
        // SEND DATA TO SERVER
        // RECORD TO DATABASE
        // PAYMENT
        // WHATEVER IS REQUIRED
          generar('Pedido');
      },

      landing:function(){
        alert(this.dataset.id)
        location.href =`${base_url}product_detail?prid=09`
      }

    };
  
  cart.init();
})  

//filtering  //CP=container products
  var CP; var allowChk=true;  keyword2='todos';
  document.querySelector("#bline-list").addEventListener("click", filtroBline);
  function filtroBline(e){
    if (e.target&&e.target.tagName==='INPUT'){
      if (!CP) CP = document.querySelectorAll(".p-item");
      let casillas = document.querySelectorAll("input[type='checkbox']:checked");nombres=[];
      casillas.forEach(c =>{nombres.push(c.value);})
      filterItems(keyword2, nombres)
    }
  }

  const cleanBtn=()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('categ-selected'))}
  document.querySelector("#category-products").addEventListener("click", filtrar);
  
  function filtrar(e) {
    if (!CP) CP = document.querySelectorAll(".p-item");
    e.preventDefault(); keyword = e.target.getAttribute("filter"); keyword2=keyword
    cleanBtn(); e.target.classList.add('categ-selected');
    //to sel categ, show chkList w/subcats and other one w/colors
    let casillas = document.querySelectorAll("input[type='checkbox']"); nombres=[];

    addClass(['bline','d-none']); removeClass([keyword,'d-none']);

    casillas.forEach(c =>{// try to optimize
      if (keyword==='todos') { c.checked=false;
      }else{if (c.checked) nombres.push(c.value);}
    })
    if (e.target&&e.target.tagName==='A') filterItems(keyword, nombres);
  }
  function filterItems(keyword, checkeds){ 
    const contProducts = cart.hPdt;
    const items = CP;  contProducts.innerText='';
    items.forEach(function(item){
      item.getAttribute("filter").toLowerCase().includes(keyword.toLowerCase())
      if(!keyword||keyword=='todos'||item.getAttribute("filter").toLowerCase().includes(keyword.toLowerCase())){
        if(checkeds.length>0){
          rub=item.getAttribute('bline').split(','); //product.bline
          rub.forEach(function(ru){if (checkeds.some(elem => elem === ru)) contProducts.appendChild(item);})
        }else{contProducts.appendChild(item);}
      } 
    });
    //document.getElementById('p').innerText = keyword2 + nombres+keyword+allowChk;
    let qFounded = contProducts.querySelectorAll('.p-name');
    document.getElementById('info').innerText=`Productos encontrados: ${qFounded.length}`;

  }
        

function generar(){inputs = [];
  cmbClient = comboBuilder('cliente',1,'campo1','client');
  inputs.push({id:'combo', idCmb:cmbClient});
  inputs.push({id:'html', idHt:htR1});    inputs.push({id:'html', idHt:ht6});
    inputs.push({id:'campo2', campo:'Fecha', selector:'input', type:'date', value:hoy(), label:1})
  inputs.push({id:'html', idHt:htR2});   inputs.push({id:'html', idHt:ht6});
  inputs.push({id:'html', idHt:htR2});   inputs.push({id:'html', idHt:htR2});
  
  inputs.push({id:'campo9', campo:'Notas',selector:'textarea',rows:1.5,  label:1})

  var data = new FormData(); data.append('src', 'client'); 
  fURL=base_url+'Data/getDataCmb/1'; getJson(fURL,data,'combo_cliente', 'campo1',0,'Cliente')
  openModal(inputs); showModal();document.getElementById('titleModal').innerHTML='Confirmar pedido';
}