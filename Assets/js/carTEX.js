var chango=[],  hRubro, cart;
const lgd=(document.getElementById('phone').getAttribute('lgd')=='0')?false:true;
fetchURL = base_url+'Ecommerce/getProducTEX/'+iCo;     
const data = new FormData(); data.append('src', localStorage.PL);
fetch(fetchURL, { method: 'POST', body: data})
.then(function(response) {
    if(response.ok) return response.text(); else throw "Error Ajax"; })
.then(function(texto) {
  products=(JSON.parse(texto));
  cart = {
    // (A) PROPERTIES
    hPdt : null, // HTML products list
    hItems : null, // HTML current cart
    items : {}, // Current items in cart
    tienda:'cart_'+document.getElementById('tienda').innerHTML,

    // (B) LOCALSTORAGE CART  // (B1) SAVE CURRENT CART INTO LOCALSTORAGE
    save : function () { localStorage.setItem(tienda, JSON.stringify(cart.items)); },

    // (B2) LOAD CART FROM LOCALSTORAGE
    load : function () {
      cart.items = localStorage.getItem(tienda);
      cart.items = (cart.items == null)? cart.items = {}: JSON.parse(cart.items);
    },
    // (B3) EMPTY ENTIRE CART
    nuke : function () {if (confirm("Vaciar carrito?")) {cart.vaciar();}},
    vaciar: function(){
        cart.items = {};                   chango=[]; 
        localStorage.removeItem(tienda);   cart.list();
    },
    categ: function(filterCateg){  //category filter
      item = crEl("a");
      item.className = "btn btn-outline-secondary btn-black btn-sm text-uppercase filter-btn m-2";
      item.setAttribute ("filter", filterCateg); item.innerHTML = filterCateg; 
      cart.hCat.appendChild(item);
    },
    bline: function(index,bline){        
      part = crEl("label");
      part.innerHTML = `<input type="checkbox" value=${index}>${bline}`
      part.classList.add ('px-3');          cart.hBline.appendChild(part);
    },

    // (C) INITIALIZE
    init : function () {// (C1) GET HTML ELEMENTS
      cart.hCat   = document.getElementById("category-products");
      cart.hBline = document.getElementById("bline-list");
      cart.hPdt   = document.getElementById("cart-products");
      cart.hItems = document.getElementById("cart-items");
      clLayout="p-img-vertical";
      if(prodLayout==1) clLayout="p-img-vertical";
      if(prodLayout==2) clLayout="p-img-box";
      if(prodLayout==3) clLayout="p-img-landscape";
      lstRubs=[];

      // (C2) DRAW PRODUCTS LIST
      //cart.hPdt.innerHTML = "";
      let p, item, part, j=0; ctg=''; arrColors=[]; 
      arrayCategory =['todos'];  if(products.length>0) this.categ('todos');          
      imgPath=base_url+'Assets/images/uploads/';
      console.log (products);
      for (let id in products) {
          p = products[id];  
          // WRAPPER           
          filterCateg = (p.subCateg==null)? 'todos': p.subCateg;
          if (!arrayCategory.includes(filterCateg)){
          arrayCategory.push(filterCateg); this.categ(filterCateg);   }
          // flip-card-front   
          if (!(ctg===p.dd)) {  j = j + 1; 
              flip = crEl("div"); flip.setAttribute ("filter", filterCateg);
              flip.className = `flip-card`; cart.hPdt.appendChild(flip);

              iFront = crEl("div"); iFront.className = `p-item flip-card-front ${p.categ} ${p.subcat} `;
              //iFront.setAttribute ("filter", filterCateg); iFront.setAttribute ("bline", p.bline);
              flip.appendChild(iFront);

              iBack = crEl("div");
              iBack.className = `p-item flip-card-back d-none`;
              flip.appendChild(iBack);
                                  
              // cont image - PRODUCT IMAGE
              part = crEl("div");       part.className = "c-img";
              part.setAttribute("id","rel"+j);            iFront.appendChild(part);

              imgPath=base_url+'Assets/images/uploads/';
              part = crEl("img");  part.className = clLayout;
              part.src = (p.img.substr(0,4)!=='http')? imgPath+p.img:p.img;
              document.getElementById("rel"+j).appendChild(part);
                            
              part = crEl("div");  // PRODUCT NAME
              part.innerHTML = p.name; part.className = "p-name";  
              iFront.appendChild(part);

              // PRODUCT DESCRIPTION
              part = crEl("div");  part.innerHTML = p.subCateg;
              part.className = "p-desc";       iFront.appendChild(part);

              part = crEl("div");  // PRODUCT PRICE
              part.innerHTML="$" + p.price; part.className="p-price"; iFront.appendChild(part);
              
              part = crEl("input");  // ADD TO CART
              part.type = "button";
              if (coAPP===13) {
                  part.value = "Detalles"; part.className = "cart p-btn p-add ";
                  part.onclick = cart.details13;
              }else{
                  if (p.price>0) {
                      part.value = "Agregar";  part.className = "cart p-btn p-add ";
                      part.onclick = cart.add;
                  }else{
                      part.value = "Consultar";
                      part.className = "cart p-btn ";
                      part.onclick = cart.whatsa;
                  }
              }
              part.dataset.id = id;
              if (sec.substr(4,1)==='0') part.className+='d-none';
              iFront.appendChild(part);

              //flip front
              part = crEl("input");
              part.type = "button";  part.value = "Voltear"; 
              part.className = "cart p-btn p-add btn-voltear";  part.onclick = cart.details13;
              iBack.appendChild(part);
          }
            
          //arrColors.push ({'color':p.color,'peso':p.input});
          part = crEl("div");
          part.innerHTML = `${p.color}:${p.input} <a href="" onclick="event.preventDefault()"><i class="fa-solid fa-cart-plus"></i> </a>`;
          //part.className = "cart p-btn p-add ";
          part.dataset.id = id;
          part.setAttribute("div-itm","vid"+id);
          part.onclick = cart.add;

          part.className = "p-desc"; 
          //iBack.appendChild(part);
          btnBack = iBack.querySelector('input');
          iBack.insertBefore(part, btnBack);

          ctg=p.dd;        
        }
  

        if (j>0) document.getElementById('emptyStore').style.display='none';
        else {
            hBline.style.display='none'; 
            document.getElementById('info').style.display='none';
        }
        document.getElementById('info').innerText=`Categorías encontradas: ${j}`;
        if (j==1) hBline.style.display='none'; 

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
        if(cart.items.hasOwnProperty(key)) { empty = false; break; }
      }

      // (D2) CART IS EMPTY
      if (empty) {
        item = crEl("div"); item.innerHTML = "Carrito vacío";
        document.getElementById('qty').innerHTML=0;
        cart.hItems.appendChild(item);
      } else {  // (D3) CART IS NOT EMPTY - LIST ITEMS
        let p, total = 0, subtotal = 0, i=0, chango=[], txt='';

        for (let id in cart.items) {
          // ITEM
          i=i+1; p = products[id];
          item = crEl("div"); item.className = "c-item";
          cart.hItems.appendChild(item);

          // NAME
          part = crEl("div"); part.innerHTML = `${p.name} <b>${p.color}</b>`;//part.innerHTML = p.name;
          part.className = "c-name";
          item.appendChild(part);

          // REMOVE
          part = crEl("input");
          part.type = "button";            part.value = "X";
          part.dataset.id = id;            part.className = "c-del cart";
          part.addEventListener("click", cart.remove);
          item.appendChild(part);

          // QUANTITY
          part = crEl("input");
          part.type = "hidden";           //part.type = "number";
          part.value = cart.items[id];    part.dataset.id = id;           
          part.className = "c-qty";       part.addEventListener("change", cart.change);
          item.appendChild(part);         cant = part.value;

            // kg
            part = crEl("label");
            part.innerHTML = p.input; part.className = "c-prz";
            item.appendChild(part);


          // price
          part = crEl("label");
          part.innerHTML = ' $ '+ p.price;     part.className = "c-prz";
          item.appendChild(part);

          //tot line
          part = crEl("label");
          x = (coAPP===13)? p.input:p.multiplo;
          part.innerText = ' $ '+ new Intl.NumberFormat().format(p.price*cant*x);
          part.className = "c-tot";        item.appendChild(part);

          // SUBTOTAL
          subtotal = cart.items[id] * p.price * x;
          total += subtotal;
          //icon cart
          chango.push({cantidad:cant, precio:p.price, producto:p.name, 
            importe:`${p.multiplo*p.price*cant}`, dset:id, pid:p.id, multiplo:x});
        }
        document.getElementById('qty').innerHTML=i;

        // CHECKOUT BUTTONS
        item = crEl("input");
        item.type = "button";
        item.value = "Total:  " + "$ " + new Intl.NumberFormat().format(total) +"    - "+ ((lgd)?' Vender':' Comprar');
        //(Math.round(num * 100) / 100).toFixed(2);
        item.addEventListener("click", cart.checkout);
        item.className = "c-checkout cart";       item.setAttribute('total',total);
        cart.hItems.appendChild(item);

        //prepare whatsapp
          for (let i in chango) {
            txt+=`${chango[i].producto}\n ${chango[i].cantidad*chango[i].multiplo} x ${chango[i].precio}    *${new Intl.NumberFormat().format(chango[i].importe)}*\n\n`;
          }
          changuito=chango;
          item = crEl("a");      phone = document.getElementById('phone').value;
          mensaje=encodeURI("Hola, Este es mi pedido, favor confirmar stock. Gracias:\n\n");
          pedido =encodeURI(txt)+`Total: *${new Intl.NumberFormat().format(total)}*`;
          whats ="https://api.whatsapp.com/send?phone="+phone+"&text="+mensaje +pedido;

          item.setAttribute("href",whats);         item.innerHTML="Pedir por whatsapp";
          item.setAttribute("id","wA");            item.style.display='none';
          cart.hItems.appendChild(item);

        // EMPTY BUTTONS
        item = crEl("input");       item.type = "button"; item.value = "Vaciar";
        item.addEventListener("click", cart.nuke);    item.className = "c-empty cart";
        cart.hItems.appendChild(item);

        // EXPORT BUTTONS

        if (lgd==true) {
          item = crEl("input");
          item.type = "button";            item.value = "Presupuesto";
          item.className = "btn btn-outline-secondary";
          item.addEventListener("click", cart.presup);
          cart.hItems.appendChild(item);

        }
      }
    },

    // (E) ADD ITEM INTO CART  importe=Number(document.querySelector('.c-checkout').getAttribute('total'));
    presup: function(){ 
      presupuesto('Presupuesto',Number(document.querySelector('.c-checkout').getAttribute('total')));
    },

    //ticket: function(){        ticket_(changuito);      },

    add : function () {
      if (cart.items[this.dataset.id] == undefined)
        cart.items[this.dataset.id] = 1;
        else  cart.items[this.dataset.id]++;        
      cart.save(); cart.list(); this.style.display='none';
    },

    // (F) CHANGE QUANTITY
    change : function () {
      if (this.value == 0) {
        delete cart.items[this.dataset.id];
      } else {
        cart.items[this.dataset.id] = this.value;
      }
      cart.save(); cart.list();
    },
    
    // (G) REMOVE ITEM FROM CART
    remove : function () {
      delete cart.items[this.dataset.id];
      chango.splice([this.dataset.id])
      cart.save(); cart.list();
    },
    
    // (H) CHECKOUT
    checkout : function () {
      // SEND DATA TO SERVER
      // CHECKS
      // SEND AN EMAIL
      // RECORD TO DATABASE
      // PAYMENT
      // WHATEVER IS REQUIRED
      if(lgd){
        importe=Number(document.querySelector('.c-checkout').getAttribute('total'));
        presupuesto('Venta', importe);
      }else{
        document.getElementById('wA').click()
      }
      /*
      var data = new FormData();
      data.append('cart', JSON.stringify(cart.items));
      data.append('products', JSON.stringify(products));
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "SERVER-SCRIPT");
      xhr.onload = function(){ ... };
      xhr.send(data);
      */
    },

    // (I) wsp
    whatsa : function(){
      phone = document.getElementById('phone').value;
      mensaje =encodeURI("Hola, este es mi pedido web, por favor confirmar. Gracias:\n\n");
      location.href ="https://api.whatsapp.com/send?phone="+phone+"&text="+mensaje 
    },
    landing:function(){
      alert(this.dataset.id)
      location.href =`${base_url}product_detail?prid=09`
    },

    details13: function (e) {
      padre=e.target.parentNode.parentNode
      frente=padre.querySelector('.flip-card-front');
      dorso =padre.querySelector('.flip-card-back');
      if (frente.classList.contains('d-none')){
        frente.classList.remove('d-none'); dorso.classList.add('d-none');
      }else{
        frente.classList.add('d-none'); dorso.classList.remove('d-none');
      }
      return
      /*if (cart.items[this.dataset.id] == undefined)
        cart.items[this.dataset.id] = 1;
        else  cart.items[this.dataset.id]++;        
      console.log(this.dataset.id, this.value);
      cart.save(); cart.list();*/
      //textil();
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
    casillas.forEach(c =>{nombres.push(c.value);});
    filterItems(keyword2, nombres);
  }
}

const cleanBtn=()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('categ-selected'))}
document.querySelector("#category-products").addEventListener("click", filtrar);
function filtrar(e) {
  if (!CP) CP = document.querySelectorAll(".flip-card");
  e.preventDefault(); keyword = e.target.getAttribute("filter"); keyword2=keyword
  cleanBtn(); e.target.classList.add('categ-selected');
  let casillas = document.querySelectorAll("input[type='checkbox']");nombres=[];
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
  document.getElementById('pa').innerText = keyword2 + nombres+keyword+allowChk;
  let imgs = contProducts.querySelectorAll('img');
  document.getElementById('info').innerText=`Categorías encontradas: ${imgs.length}`;
}
