var chango=[],  hRubro
const lgd=(document.getElementById('phone').getAttribute('lgd')=='0')?false:true;
var cart;
  fetchURL = base_url+'Ecommerce/getProducts5/'+iCo;     
  const data = new FormData(); data.append('src', localStorage.PL);
  fetch(fetchURL, { method: 'POST', body: data})
  .then(function(response) {
     if(response.ok) return response.text(); else throw "Error Ajax";
  })
  .then(function(texto) {
    products=(JSON.parse(texto));
    cart = {
      // (A) PROPERTIES
        //hTbl : '<table><thead>producto</thead><thead>precio</thead><thead>factor</thead></table>',
        hPdt : null, // HTML products list
        hItems : null, // HTML current cart
        items : {}, // Current items in cart
        tienda:'cart_'+document.getElementById('tienda').innerHTML,

        // (B) LOCALSTORAGE CART
        // (B1) SAVE CURRENT CART INTO LOCALSTORAGE
        save : function () {localStorage.setItem(tienda, JSON.stringify(cart.items));},

        // (B2) LOAD CART FROM LOCALSTORAGE
        load : function () {
          cart.items = localStorage.getItem(tienda);
          cart.items = (cart.items == null)? cart.items = {}: JSON.parse(cart.items);
        },

        // (B3) EMPTY ENTIRE CART
        nuke : function () {if (confirm("Vaciar carrito?")) {cart.vaciar();}},
        vaciar: function(){
            cart.items = {}; chango=[]; localStorage.removeItem(tienda); 
            cart.list();
        },
      categ: function(filterCateg){ 
          item = crEl("a");  item.setAttribute ("filter", filterCateg);
          item.className = "btn btn-outline-secondary btn-black btn-sm text-uppercase filter-btn m-2";
          item.innerHTML = filterCateg; cart.hCat.appendChild(item);
      },
      sort_categ: function(){
          cats = Array.from(this.hCat.querySelectorAll('a')).map(a=>a.getAttribute('filter'));
          const newCats = cats.filter(cat => cat !== 'todos');
          newCats.sort(); this.hCat.innerHTML = ''; newCats.unshift('todos');
          newCats.forEach(function(cat){   //            this.categ(cat);
            item = crEl("a");  item.setAttribute ("filter", cat);
            item.className = "btn btn-outline-secondary btn-black btn-sm text-uppercase filter-btn m-2";
            item.innerHTML = cat; cart.hCat.appendChild(item);
          });

      },

      bline: function(index,bline){        
          part = crEl("label");  part.classList.add ('px-3');
          part.innerHTML = `<input type="checkbox" value=${index}>${bline}`
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
          clLayout="p-img-vertical";
          if(prodLayout==1) clLayout="p-img-vertical"
          if(prodLayout==2) clLayout="p-img-box"
          if(prodLayout==3) clLayout="p-img-landscape"
          lstRubs=[];

          // (C2) DRAW PRODUCTS LIST
          //cart.hPdt.innerHTML = "";
          let p, item, part, j=0;
          arrayCategory =['todos'];  if(products.length>0) this.categ('todos');

          imgPath=base_url+'Assets/images/uploads/';
          for (let id in products) {
            j=j+1; // WRAPPER
            p = products[id];
            //
            filterCateg = (p.categoria==null)? 'todos':p.categoria;
            if (!arrayCategory.includes(filterCateg)){
              arrayCategory.push(filterCateg);
              this.categ(filterCateg);
            }
            //bline            
            if(p.bline.length>0){
              rubs = p.bline.split(',');
              rubs.forEach(function(rub){
                r_index=(rub.length>0)?parseInt(rub):0;
                //if (!lstRubs.includes(arrayRubros[r_index]))console.log('no está',arrayRubros[r_index], r_index)
                if(!lstRubs.includes(arrayRubros[r_index])){
                  lstRubs.push(arrayRubros[r_index]);cart.bline(r_index,arrayRubros[r_index]);
                }
              });
            }
            
            //
            item = crEl("div"); item.className = `p-item`;
            item.setAttribute ("filter", filterCateg); item.setAttribute ("bline", p.bline);
            cart.hPdt.appendChild(item);

            // cont image - PRODUCT IMAGE
            part = crEl("div"); part.className = "c-img lazy";
            part.setAttribute("id","rel"+j); item.appendChild(part);

            //imgPath=base_url+'Assets/images/uploads/';
            part = document.createElement("img");
            part.src = (p.img.substr(0,4)!=='http')? imgPath+p.img:p.img;
            //part.setAttribute('data-src',(p.img.substr(0,4)!=='http')? imgPath+p.img:p.img);
            part.className = clLayout; part.setAttribute('loading','lazy');

            document.getElementById("rel"+j).appendChild(part);
            
            // PRODUCT NAME
            part = crEl("div"); part.innerHTML = p.name;  
            part.className = "p-name";  item.appendChild(part);

            // PRODUCT DESCRIPTION
            part = crEl("div");  part.className = "p-desc";
            part.innerHTML = p.desc;  item.appendChild(part);

            // PRODUCT FACTOR
            if(Number(p.multiplo)>1) {
              part = document.createElement("div");
              part.innerHTML = "Factor: "+p.multiplo;
              part.className = "p-factor";
              //item.appendChild(part);//hide factor
            }

            // PRODUCT PRICE
            part = document.createElement("div");
            part.innerHTML = "$" + p.price;
            part.className = "p-price";
            item.appendChild(part);

            // ADD TO CART
            part = document.createElement("input");
            part.type = "button";
            //if (localStorage.APP==='13') {
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

          if (j>0) document.getElementById('emptyStore').style.display='none';
          else {
              hBline.style.display='none'; 
              document.getElementById('info').style.display='none';
          }
          document.getElementById('info').innerText=`Productos encontrados: ${j}`;
          if (j==1) hBline.style.display='none'; 

          cart.sort_categ();

          // (C3) LOAD CART FROM PREVIOUS SESSION
          cart.load();

          // (C4) LIST CURRENT CART ITEMS
          cart.list();
        },



      // (D) LIST CURRENT CART ITEMS (IN HTML)
      list : function () {
        // (D1) RESET
        cart.hItems.innerHTML = "";
        let item, part, pdt;   let empty = true;
        for (let key in cart.items) {
          if(cart.items.hasOwnProperty(key)) { empty = false; break; }
        }

        // (D2) CART IS EMPTY
        if (empty) {
          item = document.createElement("div");
          item.innerHTML = "Carrito vacío";
          document.getElementById('qty').innerHTML=0;
          cart.hItems.appendChild(item);
        } else {  // (D3) CART IS NOT EMPTY - LIST ITEMS
          let p, total = 0, subtotal = 0, i=0, chango=[], txt='';
          //tabla por menor
          item = document.createElement("table");
          item.className="table table-responsive table-hover table-bordered table-striped  tMinor";

          document.getElementById('cart-minor').appendChild(item);
          for (let id in cart.items) {
            i=i+1;
            // ITEM
            p = products[id];
            item = crEl("div");  item.className = "c-item";
            cart.hItems.appendChild(item);

            // NAME
            part = crEl("div"); part.innerHTML = p.name; 
            part.className = "c-name"; item.appendChild(part);

            // REMOVE
            part = crEl("input");  part.type = "button";
            part.value = "X";      part.className = "c-del cart";
            part.dataset.id = id;  part.addEventListener("click", cart.remove);
            item.appendChild(part);

            // QUANTITY
            part = crEl("input");  part.type = "number";  part.value = cart.items[id];
            part.dataset.id = id;  part.className = "c-qty";
            part.addEventListener("change", cart.change);
            item.appendChild(part);  cant = part.value;

            //factor
            if(Number(p.multiplo)>1) {
              part = crEl("label");  part.innerHTML = ' <strong>('+ p.multiplo+')</strong>';
              part.className = "c-factor";  item.appendChild(part);
            }

            // price
            part = crEl("label");
            //console.log(p['offQty'],cant, p.offQty)
            price = (p.offQty==cant)? p.offPrice/cant:p.price;
            part.innerHTML =  ' $ '+ currency(redondear(price,2));
            part.className = "c-prz";  item.appendChild(part); 

            //tot line
            part = crEl("label"); part.className = "c-tot";
            part.innerText = ' $ '+ currency(price*cant*p.multiplo);
            item.appendChild(part);

            //line
            part = crEl("hr");  item.appendChild(part)

            // SUBTOTAL
            subtotal = cart.items[id] * price * p.multiplo;
            total += subtotal;
            //icon cart
            chango.push({cantidad:cant, precio:price, producto:p.name, 
              importe:`${p.multiplo* price*cant}`, dset:id, pid:p.id, multiplo:p.multiplo});
          }
          document.getElementById('qty').innerHTML=i;

          // CHECKOUT BUTTONS
          item = document.createElement("input");
          item.type = "button";
          item.value = "Total:  " + "$ " + new Intl.NumberFormat().format(total) +"    - "+ ((lgd)?' Vender':' Comprar');
          //(Math.round(num * 100) / 100).toFixed(2);
          item.addEventListener("click", cart.checkout);
          item.className = "c-checkout cart";   item.setAttribute('total',total);
          cart.hItems.appendChild(item);

          //prepare whatsapp
            for (let i in chango) {
              txt+=`${chango[i].producto}\n ${chango[i].cantidad*chango[i].multiplo} x ${redondear(chango[i].precio,2)}    *${new Intl.NumberFormat().format(chango[i].importe)}*\n\n`;
            }
            changuito=chango;
            item = document.createElement("a");
            phone = document.getElementById('phone').value;
            mensaje=encodeURI("Hola, Este es mi pedido, Por favor confirmar. Gracias:\n\n");
            pedido =encodeURI(txt)+`Total: *${new Intl.NumberFormat().format(total)}*`;
            delivery = encodeURI("Por favor entregar en:\n\n Nombre:");
            whats ="https://api.whatsapp.com/send?phone="+phone+"&text="+mensaje +pedido+delivery;

            item.setAttribute("href",whats);
            item.innerHTML="Pedir por whatsapp";
            item.setAttribute("id","wA");
            item.style.display='none';
            cart.hItems.appendChild(item);

          // EMPTY BUTTONS
          item = document.createElement("input");
          item.type = "button"; item.value = "Vaciar";
          item.addEventListener("click", cart.nuke);
          item.className = "c-empty cart";
          cart.hItems.appendChild(item);
          // EXPORT BUTTONS
          if (lgd==true) {
            item = crEl("input");  item.type = "button";
            item.value = "Presupuesto";  item.className = "btn btn-outline-secondary";
            item.addEventListener("click", cart.presup);     cart.hItems.appendChild(item);
            /*
            item = document.createElement("input");
            item.type = "button"; item.value = "Ticket";
            item.addEventListener("click", cart.ticket);
            cart.hItems.appendChild(item);
            */
            if (localStorage.APP==11) {
              item = document.createElement("input");       item.type = "button"; item.value = "Por menor";
              item.addEventListener("click", cart.xmenor);  item.className = "btn btn-outline-secondary bt";
              cart.hItems.appendChild(item);
            }
            
            if (iCo== 1) { 
              item = document.createElement("input");       item.type = "button"; item.value = "Capturar";
              item.addEventListener("click", cart.capture); item.className = "btn btn-outline-secondary bt";
              cart.hItems.appendChild(item);            
            }
          }
        }
      },

      // (E) ADD ITEM INTO CART  importe=Number(document.querySelector('.c-checkout').getAttribute('total'));
      presup: function(){ 
        presupuesto('Presupuesto',Number(document.querySelector('.c-checkout').getAttribute('total')));
      },

      //ticket: function(){        ticket_(changuito);      },

      xmenor: function(){
        document.getElementById("cart-minor").style.display='block';
        th=`<thead><tr><th>Producto</th><th>Cant</th><th>Precio</th><th class="text-right">Importe</th></tr></thead><tbody>`;
        tr=''; tot_minor=0; //tMinor.innerHTML='';
        changuito.forEach(function(chan){
          tr+=`<tr><td prid=${chan.pid}>${chan.producto}</td>
               <td class="text-center q_" contentEditable = "true">${chan.cantidad}</td>
               <td class="text-right p_" contentEditable = "true">${chan.precio}</td>
               <td class="text-right a_">${chan.cantidad*chan.precio}</td></tr>`
               tot_minor+=(chan.cantidad)*(chan.precio);
        });
        t_minor=new Intl.NumberFormat().format((tot_minor));
        document.getElementById('cart-minor').querySelector('.tMinor').innerHTML=th+tr+`</tbody></table><br>`;
        document.getElementById('cart-minor').querySelector('.t_').value=`Total:  $ ${t_minor}    -  Vender`;
        document.getElementById('cart-minor').querySelector('.t_').setAttribute('total',tot_minor);
        //document.getElementById('cart-minor').innerHTML+= `<hr><br>`;
        document.querySelector('.bt').disabled=true
      },
      capture: function(){
        capture_();
      },
      add : function () {
        if (cart.items[this.dataset.id] == undefined)
          cart.items[this.dataset.id] = 1;
        else  cart.items[this.dataset.id]++;        
        cart.save(); cart.list();
      },

      // (F) CHANGE QUANTITY
      change : function () {
        if (this.value == 0) {
          delete cart.items[this.dataset.id];
        } else {
          console.log(products[this.dataset.id]['offQty'], this.value);
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

      details13: function () {
        /*if (cart.items[this.dataset.id] == undefined)
          cart.items[this.dataset.id] = 1;
          else  cart.items[this.dataset.id]++;        
        console.log(this.dataset.id, this.value);
        cart.save(); cart.list();*/
        textil();
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
    if (!CP) CP = document.querySelectorAll(".p-item");
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
    //document.getElementById('p').innerText = keyword2 + nombres+keyword+allowChk;
    let imgs = contProducts.querySelectorAll('img');
    document.getElementById('info').innerText=`Productos encontrados: ${imgs.length}`;
  }
        

//ediTable**********
editedValue=''; cCell='';
document.querySelector("#cart-minor").addEventListener("click", checkClick);
function checkClick(e){
  cell = e.target;  if (cCell) cCell.classList.remove('edit');
  if(cell.contentEditable=='true'){
    cell.classList.add('edit'); cell.focus(); cCell=cell;
    editedValue = cell.textContent;
  }

  if(cell.id==='bSlsMinor'){ //btnsls
    importe=(document.getElementById('cart-minor').querySelector('.t_').getAttribute('total'));
    localStorage.dossier='minor';
    rows=[];
    trs=document.querySelectorAll('tr')
    for (let i = 1; i < trs.length; i++) {
      rows.push({pid:trs[i].cells[0].getAttribute('prid'),
        precio:trs[i].cells[2].textContent, cantidad:trs[i].cells[1].textContent, 
        importe:trs[i].cells[3].textContent, multiplo:1 });
    }  
    changuito = rows;
    presupuesto('Venta',importe);
  }  
  if(cell.id==='bCloseMinor') closeMinor();

}


document.querySelector("#cart-minor").addEventListener('keyup', (event) => {
    if (event.keyCode == 27||event.keyCode == 13) { 
      cCell.classList.remove('edit');
      if (event.keyCode ==27) cCell.textContent=editedValue;
      if (event.keyCode ==13) {
          cCell.textContent=cCell.textContent.replace(/(\r\n|\n|\r)/gm, "");
        }
    } 
}, false);


document.querySelector("#cart-minor").addEventListener('input', (event) => {
    cell=(event.target);
    if(cell.contentEditable=='true'){
      row=cell.parentNode;//conseguir la fila
      qty=(row.querySelector('.q_').textContent);
      pri=(row.querySelector('.p_').textContent);
      tot=qty*pri;
      row.querySelector('.a_').textContent=tot;
      gt1=(row.parentNode.querySelectorAll('.a_'));  gt=0;
      gt1.forEach(function(gt2){gt+=Number(gt2.textContent)});
      gtFormatted=new Intl.NumberFormat().format(gt);
      document.querySelector("#cart-minor").querySelector('.t_').value=`Total:  $ ${gtFormatted}    -  Vender`;
      document.querySelector("#cart-minor").querySelector('.t_').setAttribute('total',gt);
    } 
}, false);

function closeMinor(){
  if(document.querySelector('.bt')) document.querySelector('.bt').disabled=false;
  document.getElementById('cart-minor').style.display='none';
}
//ediTable end**********
function currencyCart(v){
  return new Intl.NumberFormat().format(v);
}

//testing for lazy loading
document.addEventListener("DOMContentLoaded", function(){
  var lazyLoadImages;
  if (IntersectionObserver in window) {
    lazyLoadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      })
    })
    lazyLoadImages.forEach(function(image){
      imageObserver.observe(image);
    })
  }
})