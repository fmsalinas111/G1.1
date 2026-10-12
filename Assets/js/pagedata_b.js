iCo=localStorage.iCo;
imgMain=false;
var img2; 
var edtImgName='';
localStorage.setItem('imgToUpld','');

render();//logo:bcard
function render(){  // bcard
  document.getElementById('coName').innerHTML= localStorage.titulo;
  document.getElementById('logo').setAttribute("src", localStorage.imgLogo);

  let xd=localStorage.page_description.replaceAll('\r\n','</br>');
  document.getElementById('page_description').innerHTML=`${xd}`;
}

function preparaModal(name='', titulo=''){
  let nuevaImg;
  if (name==''){
    nuevaImg= base_url+"Assets/images/subir_imagen.jpg"
  }else{
    nuevaImg=(name.substr(0,4)!=='http')? base_url+"Assets/images/"+name:name;
  }      

  combo1 = `<br>
    <div class="col-md-12" style="background-color: #f2ebeb;" onclick="document.getElementById('image').click();">
     <div class="preview"> <img id="file-ip-1-preview"> </div>
        <img id="imgModal" class="preview " src="${nuevaImg}" title="cambiar imagen">
    </div>`;
      //<i class="fa fa-refresh" aria-hidden="true"></i>
  combo2 = `
    <a href="#"  id="a2" onclick='enlace();'> escribir o pegar enlace</a>&nbsp&nbsp
    <div id="enlace" style="display:none;">
      <div class="form-group ">
        <input class="form-control c1" id="campo1" name="campo" type="text" value="${name}" oninput="ff();"> 
      </div>
    </div>    `;    

  inputs = []; h='';  
  inputs.push({id:'combo',  idCmb:combo1})  
  //inputs.push({id:'combo',  idCmb:"<hr>"})
  inputs.push({id:'combo',  idCmb:combo2})  //campo1
  inputs.push({id:'combo',  idCmb:"<br>"})
  inputs.push({id:'campo2', campo:'Título', selector:'input',type:'text', value:titulo, label:1})  
  openModal(inputs);
}

function prepara_abreModal(){preparaModal(); showModal();}

var buttons = document.querySelectorAll('.buttons');
buttons.forEach(function(button){ 
  button.addEventListener('click', function(e){
    e.preventDefault();
    atAction = (e.target.getAttribute('action'))
    console.log(atAction, e.target.name)
    if (atAction==='editarLogo') {
      imgName_sinRuta=localStorage.imgLogo.substr(localStorage.imgLogo.lastIndexOf('/')+1).split('?')[0];
      img=(imgName_sinRuta=='happyface.jpg')? 'new':imgName_sinRuta;
      localStorage.setItem('imgToUpld', img);
      document.getElementById('id').value = iCo;
      preparaModal(document.getElementById('logo').src, document.getElementById('coName').innerHTML);
      showModal();
      document.querySelector('#titleModal').innerHTML ="Actualizar logo ";
    }
    if (atAction==='nuevoBanner') {
      imgName_sinRuta=localStorage.imgLogo.substr(localStorage.imgLogo.lastIndexOf('/')+1).split('?')[0];
      img=(imgName_sinRuta=='happyface.jpg')? 'new':imgName_sinRuta;
      localStorage.setItem('imgToUpld', img);
      document.getElementById('id').value = iCo;
      //preparaModal(document.getElementById('logo').src, document.getElementById('coName').innerHTML);
      preparaModal();
      showModal();
      document.querySelector('#titleModal').innerHTML ="Nueva imagen carousel ";
    }
 
    if (atAction==='editarMain_text') {
      inputs = []; 
      //page_description=document.getElementById('page_description').innerHTML;
      page_description=localStorage.page_description;
      inputs.push({id:'campo1', campo:'title',selector:'input', type:'hidden', value:'abou', disabled:'' }) 
      inputs.push({id:'campo2',campo:'Texto principal',selector:'textarea',rows:7, innerHTML:page_description,  label:1})
      inputs.push({id:'campo11', campo:'code',selector:'input', type:'hidden', value:'abou', disabled:'' }) 
      inputs.push({id:'campo12', campo:'bid',selector:'input', type:'hidden', value:localStorage.bid, disabled:'' })  
      openModal(inputs); showModal();
    }
 
    if (atAction==='editarCarousel') {
      alert('edit carousel')
    }
      
    if (e.target.innerHTML==='Guardar'){
      fetch_URL = 'Ecommerce/setBanner';
      localStorage.imgToUpld=document.getElementById(img_elem).getAttribute('imgName');
      arr1.campo1=document.getElementById(img_elem).getAttribute('imgName');
      arr1.campo2=2;
      record_id=document.getElementById(img_elem).getAttribute('bnrId');
      console.log(localStorage.imgToUpld, arr1)
      if (defineSubirImagen()){
        imgName=arr1.campo1;//(document.getElementById(img_elem).src);
        imgName_sinRuta = imgName.substr(imgName.lastIndexOf('/')+1).split('?')[0];
        imgName = (record_id==0)? Date.now(): imgName_sinRuta;
        fetch_UPLD = base_url+'Controllers/upload.php'; 
        imgDestination = '../Assets/images/';
        subirImagen(fetch_UPLD, imgDestination, fetch_URL, imgName, imgSubir, record_id);
      }
      console.log(imgName)
    }
    document.getElementById('btnImgMain').style.display='none';
  });
});


function cambiarImagen(event){
  img_elem=event.target.id;//
  document.getElementById('image').click();
}

//getSome('Galeria/getBanner','banner');
getSome('Ecommerce/getCarousel/'+iCo,'banner');

function fillTC(texto, type){
  //if (type==='banner') fillTableBanner(texto)
}

function fillTableBanner(texto){
  var i=0; j=0; h='';
  obj=JSON.parse(texto)
  for (x of obj) {
    if (x.outstanding==2){//imgmain
      img2=base_url+'Assets/images/'+ x.bannerurl;//base_url}Assets/images/uploads/${img2}
      document.getElementById('imgMain').src = img2;
      document.getElementById('imgMain').setAttribute("imgName",(x.bannerurl=='0.jpg')?'new':x.bannerurl);
      document.getElementById('imgMain').setAttribute("bnrId",(x.bannerurl=='0.jpg')?0:x.bannerid);
    }
    if (x.outstanding==1) {//outstanding
      //document.getElementById('imgMain').setAttribute("b_target",x.target);
    }
    if(x.outstanding==0){//carousel
      i++;  active=(i==1) ?' active':'';
      h+=`
      <div class="carousel-item ${active}">
      <img src="http://localhost/gestionando/Assets/images/${x.bannerurl}" class="d-block w-75" alt="..." >
      <a href="#" action="editarCarousel">cambiar imagen ${i}</a>
      <button class="buttons" action="editarCarousel">cambImagen</button>
      </div>`;
    }//fin si
  }//fin for
  document.getElementById('carousel-inner').innerHTML=h;
}

function enlace(){
  if (document.getElementById('a2').innerHTML=='Actualizar imagen') {
    src=document.getElementById("campo1").value;
    var preview = document.getElementById("imgModal");
    preview.src = src;
    document.getElementById('a2').innerHTML='escribir o pegar enlace';

  }else{
    if (document.getElementById('enlace').style.display=='none') {//si no se vé
      document.getElementById('enlace').style.display='block';
    }else{
      document.getElementById('enlace').style.display='none';
    }
  }
}

function ff(){  
  let label = document.getElementById('a2');
  label.innerHTML = (event.target.value.substr(0,4)=='http')?  
  'Actualizar imagen':'escribir o pegar enlace';  
  localStorage.setItem('imgToUpld',document.getElementById('campo1').value);
}

function fillTableBanner(texto){
  return
  var i=0; j=0; h='';
  obj=JSON.parse(texto)
  for (x of obj) {
    if (x.outstanding==2){//imgmain
      img2=base_url+'Assets/images/'+ x.bannerurl;
      document.getElementById('imgMain').src = img2;
      document.getElementById('imgMain').setAttribute("imgName",(x.bannerurl=='0.jpg')?'new':x.bannerurl);
      document.getElementById('imgMain').setAttribute("bnrId",(x.bannerurl=='0.jpg')?0:x.bannerid);
    }
    if (x.outstanding==1) {//outstanding
      //document.getElementById('imgMain').setAttribute("b_target",x.target);
    }
    if(x.outstanding==0){//carousel
      i++;  active=(i==1) ?' active':'';
      h+=`
      <div class="carousel-item ${active}">
      <img src="http://localhost/gestionando/Assets/images/${x.bannerurl}" class="d-block w-75" alt="..." >
      <a href="#" action="editarCarousel">cambiar imagen ${i}</a>
      <button class="buttons" action="editarCarousel">cambImagen</button>
      </div>`;
    }//fin si
  }//fin for
  //document.getElementById('carousel-inner').innerHTML=h;
}

var cart;
  fetchURL = base_url+'Ecommerce/getCarousel/'+iCo;     
  const data = new FormData(); data.append('src', 'data');
  fetch(fetchURL, { method: 'POST', body: data})
  .then(function(response) {
     if(response.ok) {return response.text()} else {throw "Error Ajax";}
  })
  .then(function(texto) {
    products=(JSON.parse(texto));
    cart = {
      // (A) PROPERTIES
      hPdt : null, // HTML products list
      hItems : null, // HTML current cart
      items : {}, // Current items in cart

      // (C) INITIALIZE
      init : function () {
        // (C1) GET HTML ELEMENTS
        cart.hPdt   = document.getElementById("carousel-inner");
        cart.hItems = document.getElementById("caro");

        // (C2) DRAW PRODUCTS LIST
        cart.hPdt.innerHTML = "";
        let p, item, part, j=0;
        //console.log(products)
        for (let id in products) {
          j=j+1; // WRAPPER
          p = products[id];
          //console.log(p)
          item = document.createElement("div");
          item.className = `carousel-item ${(j==1)?' active':''}`;
          cart.hPdt.appendChild(item);

          imgPath=base_url+'Assets/images/'; //a menos que sea un enlace
          part = document.createElement("img");
          part.src = imgPath + p.bannerurl;
          part.className = "p-img";
          part.setAttribute("id","img-"+j);
          item.appendChild(part);

/*          // outstanding
          part = document.createElement("div");
          part.innerHTML = p.outstanding;
          part.className = "p-name";
          item.appendChild(part);
*/
          // ADD TO CART
          part = document.createElement("a");
          part.type = "button";
          part.innerHTML = `Editar ${j}`
          part.className = "cart buttons cambiarImagen ";
          part.setAttribute("id","b"+j);
          part.setAttribute("action","editarCarousel");
          part.setAttribute("imgBanner",imgPath + p.bannerurl);
          part.onclick = cart.edit;
          part.dataset.id = id;
          item.appendChild(part);
        }

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
      },

      add : function () {
        if (cart.items[this.dataset.id] == undefined) {
          cart.items[this.dataset.id] = 1;
        } else {
          cart.items[this.dataset.id]++;
        }
        cart.save();
        cart.list();
      },

      edit : function (e) {
        let sr=(e.path[0].id)
        let imgName=(document.getElementById(sr).getAttribute('imgBanner'))

        imgName_sinRuta=imgName.substr(imgName.lastIndexOf('/')+1).split('?')[0];
        img=(imgName_sinRuta=='happyface.jpg')? 'new':imgName_sinRuta;
        localStorage.setItem('imgToUpld', img);
        atAction='editarCarousel';
        document.getElementById('id').value = iCo;
        preparaModal(img);
        showModal();
        document.querySelector('#titleModal').innerHTML ="Actualizar imagen ";
      }
      
    };
  
  cart.init();
})    
