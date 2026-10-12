iCo=document.getElementById('iCo').value;
bid=document.getElementById('bid').value;
sec=document.getElementById('p_sections').value;
var img2;

//secciones
function showSection(){
  document.getElementById('store').classList.remove('d-none');
  document.getElementById('e-commerce').classList.remove('d-none')
  document.getElementById('nosotros').classList.remove('d-none');
  document.getElementById('info1').classList.remove('d-none');
  document.getElementById('info2').classList.remove('d-none');

  if (sec.substr(0,1)==='0'){document.getElementById('store').classList.add('d-none');document.getElementById('e-commerce').classList.add('d-none')};
  if (sec.substr(1,1)==='0')document.getElementById('nosotros').classList.add('d-none');
  if (sec.substr(2,1)==='0')document.getElementById('info1').classList.add('d-none');
  if (sec.substr(3,1)==='0')document.getElementById('info2').classList.add('d-none');
}
//secciones_fin

//logo
  strLogo = document.getElementById('logo').src;
  strLogo=(strLogo.substr(0,4)!=='http')? base_url+"Assets/images/"+strLogo:strLogo;
  if (strLogo.charAt(strLogo.length-1)==='?') document.getElementById('logo').style.display='none';
  document.getElementById('logo').src=strLogo;

function checkTemplate(campo,stt, Check_text){
  stt=(stt==0)?'':' checked ';
  return `<div class="col-md-6 ">
            <div class="form-check">
              <label class="form-check-label" for="${campo}">
                <input type="checkbox" class="form-check-input"  name="campo" id="${campo}" ${stt}>${Check_text}
              </label>
          </div></div>`
}
function config2(){
  sectionTienda=sec.substr(0,1);
  sectionNosotros=sec.substr(1,1);
  sectionInfo1=sec.substr(2,1);
  sectionInfo2=sec.substr(3,1);
  check1 = checkTemplate('campo1',sectionTienda, 'Tienda virtual');
  check2 = checkTemplate('campo2',sectionNosotros, 'Nosotros');
  check3 = checkTemplate('campo3',sectionInfo1,'Info1');
  check4 = checkTemplate('campo4',sectionInfo2,'Info2');
  
  inputs = [];
  inputs.push({id: 'html',  idHt:'<div style="margin-left:50px;">'})
  inputs.push({id: 'html',  idHt:check1})
  inputs.push({id: 'html',  idHt:check2})
  inputs.push({id: 'html',  idHt:check3})
  inputs.push({id: 'html',  idHt:check4})
  inputs.push({id: 'html',  idHt:'</div>'})

  document.getElementById('id').value=bid;
  openModal(inputs);  showModal();
  document.getElementById('titleModal').innerHTML='Secciones';
}


function pageEdit(code){  
  if(code=='abou') main_code='about-content';
  if(code=='servi')main_code='services';
  if(code=='faa')main_code='faq';
  if(code=='cart')main_code='cart';
  if(code=='products')main_code='portfolio';
  preparaModal(code, main_code);
  showModal();
}


var edtImgName='';
function preparaModal(name='', target='', outstanding=0){
  var nuevaImg;
  if (name==''){
    nuevaImg= base_url+"Assets/images/subir_imagen.jpg"
  }else{
    nuevaImg=(name.substr(0,4)!=='http')? base_url+"Assets/images/"+name:name;
  }      
  combo1 = `<br>
    <div class="col-md-12" style="background-color: gray;" onclick="document.getElementById('image').click();">
     <div class="preview"> <img id="file-ip-1-preview"> </div>
        <img id="imgModal" class="preview " src="${nuevaImg}" >
    </div>`;
      //<i class="fa fa-refresh" aria-hidden="true"></i>
  idcampo='campo1';
  combo2 = `
    <a href="#"  id="a2" onclick='enlace();'> escribir o pegar enlace</a>&nbsp&nbsp
    <div id="enlace" style="display:none;">
      <div class="form-group ">
        <input class="form-control c1" id="${idcampo}" name="campo" type="text" value="${name}" oninput="ff();"> 
      </div>
    </div>    `;
  //sele = (x.fieldId==selected)?  'selected':''; //console.log(x.fieldName)    
  srcCombo3=
    `[
        {"fieldId":"0","fieldName":"Carousel"},
        {"fieldId":"1","fieldName":"Destacado"},
        {"fieldId":"2","fieldName":"Imágen principal"},
        {"fieldId":"3","fieldName":"Info1"},
        {"fieldId":"4","fieldName":"Info2"}
      ]`
  combo3 = `<div><label for="">Sección </label></div><div id="combo_section"></div></div>`;

  inputs = []; h='';  
  inputs.push({id:'combo',  idCmb:combo1})  
  //inputs.push({id:'combo',  idCmb:"<hr>"})

  inputs.push({id:'combo',  idCmb:combo2})  //campo1
  inputs.push({id:'combo',  idCmb:"<hr>"})
  inputs.push({id:'combo',  idCmb:combo3})  //campo6
  inputs.push({id:'campo2', campo:'Título', selector:'input',type:'text', value:target, label:1})  
  inputs.push({id:'campo3', campo:'Subtítulo', selector:'input',type:'text', value:target, label:1})  
  //  inputs.push({id:'campo4', campo:'Texto', selector:'input',type:'text', value:target, label:1})  
  inputs.push({id:'campo4', campo:'Texto / Descripción',selector:'textarea',rows:2, innerHTML: target, label:1})  
  //inputs.push({id:'campo3', campo:'outstanding', selector:'input',type:'text', value:outstanding, label:1})  
  openModal(inputs);
  //getJson(f_URL, data, 'combo_banco', 'campo4',localStorage.getItem('dbk'),'Banco' )
  cargarCombo(srcCombo3, 'combo_section', 'campo6', outstanding, 0);
}


function preparaModal1(code, main_code){
  //console.log(code, main_code)
  let content = document.getElementById(main_code);
  let items = content.getElementsByClassName(code);
  let data = [].map.call(items, item => item.textContent);
  inputs = []; h=''; j=0;
  lbls = ['','Título', 'Subtítulo', 'Párrafo 1', 'Párrafo 2', 'op 1', 'op 2', 'op 3'];titModal='Presentación';
  if (main_code=='services') {lbls =['',
      'Título servicio 1','Descripción servicio 1',
      'Título servicio 2','Descripción servicio 2',
      'Título servicio 3','Descripción servicio 3'];titModal='Servicios';}
  if (main_code=='faq') {lbls =['',
      'pregunta 1','Respuesta 1',
      'pregunta 2','Respuesta 2',
      'pregunta 3','Respuesta 3',
      'pregunta 4','Respuesta 4',
      'pregunta 5','Respuesta 5'];titModal = 'Preguntas frecuentes';}
  if (main_code=='cart') {lbls =['',
      'Mayorista','Descripción servicio 1',
      'Minorista','Descripción servicio 2',
      'Otro','Descripción servicio 3'];titModal='Carrito';}
  if (main_code=='portfolio') {
    ht=`<fieldset>
          <legend>Altura de imagen (px)</legend>
          <input type="radio" name="altura" value="2" id="campo1"> 200</input>
          <input type="radio" name="altura" value="3" id="campo2" checked> 300</input>
          <input type="radio" name="altura" value="4" id="campo3"> 400</input>
        </fieldset>`;
      inputs.push({id:'combo', idCmb:ht});
      inputs.push({id:'campo11', campo:'code',selector:'input', type:'hidden', value:code, disabled:'' }) 
      inputs.push({id:'campo12', campo:'bid',selector:'input', type:'hidden', value:bid, disabled:'' })  
      openModal(inputs);
      document.querySelector('#titleModal').innerHTML='Productos';
      return null;
  }

  
  for(var i=0; i<data.length;i++){ 
    j++;
    inputs.push({id: 'campo'+j, campo:lbls[j],selector:'input',type:'text',placeholder:'Presentación', value:data[i], label:1})
  }  
  inputs.push({id:'campo11', campo:'code',selector:'input', type:'hidden', value:code, disabled:'' }) 
  inputs.push({id:'campo12', campo:'bid',selector:'input', type:'hidden', value:bid, disabled:'' })  
  /*
    data.forEach(element =>     
    inputs.push({id: 'campo' ,campo:'Título ',selector:'input',type:'text',placeholder:'Presentación', value:element, label:1})
    );
  */
  openModal(inputs);
  document.querySelector('#titleModal').innerHTML=titModal;
}

getSome('Ecommerce/getCarousel/'+iCo,'banner'); //banner 
getSome('Ecommerce/getPagedetails/'+bid,'page');//page2
showSection();

function fillTC(texto, type){
  if (type==='banner') fillTableBanner(texto)    
  if (type==='page') fillPageContent(texto)    
}
function fillTableBanner(texto){
  //  console.log(texto)
  var i=0; j=0; h=''; info1='';info2='';
  obj=JSON.parse(texto)
  for (x of obj) {
    let img2=(x.bannerurl.substr(0,4)!=='http')? base_url+"Assets/images/"+x.bannerurl:x.bannerurl;
    switch (Number(x.outstanding)) {
      case 0: //banner (carrousel)
        i++;  active=(i==1) ?' active':'';
        h+=`<div class="carousel-item ${active}">
              <img src="http://localhost/gestionando/Assets/images/${x.bannerurl}" 
              class="d-block w-50" alt="carousel-item${i}"" >
            </div>`;
        break;
      case 1: //destacado
        console.log('outstanding img found:'+x.outstanding, x.bannerurl)
        break;

      case 2: //ImgMain
        document.getElementById('imgMain').src = img2;
        document.getElementById('imgMain').setAttribute("imgName",img2);
        document.getElementById('imgMain').setAttribute("bnrId",x.bannerid);
        break;
      case 3: //Info1
        info1+=`<div class="col-lg-4" >
          <img src="${img2}" width="100">
          <h2>Precio</h2>
          <p>${x.target}</p>
          <p><a class="btn btn-secondary d-none" href="#">View details &raquo;</a></p>
        </div>`
        break;

      case 4: //Info2
        
        info2+=`
          <hr class="featurette-divider">
          <div class="row featurette" >
            <div class="col-md-7">
              <h2 class="featurette-heading">Nuestra historia. <span class="text-muted">Nuestro objetivo.</span></h2>
              <p class="lead">${x.target}</p>
            </div>
            <div class="col-md-5">
              <img src="${img2}"  width="500">
            </div>
          </div>`

        break;

      default://Statements executed when none of
        //the values match the value of the expression
        break;
    }
  }//fin for
  document.getElementById('carousel-inner').innerHTML=h;
  if (info1.length>0) document.getElementById('info1').innerHTML=info1;
  if (info2.length>0) document.getElementById('info2').innerHTML=info2;
  //document.getElementById('info1').innerHTML=info1;
}

function fillPageContent(texto){//page2
  var linea; var h;  var i;     
  h='' ; content=''
  obj=JSON.parse(texto);   
  for (x of obj) {        
    pt = (x.pagetext).split('|');
    if (x.code=='abou') aboutContent=`      
      <h2><b class="abou">${pt[0]}</b> 
      </h2><h3 class="abou">${pt[1]}</h3>
      <p class="abou">${pt[2]}</p><p class="abou">${pt[3]}</p>
      <ul>
        <li class="abou"><i class="bi bi-check-circle"></i> ${pt[4]}</li>
        <li class="abou"><i class="bi bi-check-circle"></i> ${pt[5]}</li>
        <li class="abou"><i class="bi bi-check-circle"></i> ${pt[6]}</li>
      </ul>
    `;  page_description=pt[1];
    if (x.code=='servi') {
      document.getElementById('st1').innerHTML=pt[0];
      document.getElementById('st2').innerHTML=pt[2];
      document.getElementById('st3').innerHTML=pt[4];
      document.getElementById('sp1').innerHTML=pt[1];
      document.getElementById('sp2').innerHTML=pt[3];
      document.getElementById('sp3').innerHTML=pt[5];
    }
    if (x.code=='faa') {
      document.getElementById('fq1').innerHTML=pt[0];
      document.getElementById('fa1').innerHTML=pt[1];
      document.getElementById('fq2').innerHTML=pt[2];
      document.getElementById('fa2').innerHTML=pt[3];
      document.getElementById('fq3').innerHTML=pt[4];
      document.getElementById('fa3').innerHTML=pt[5];
      document.getElementById('fq4').innerHTML=pt[6];
      document.getElementById('fa4').innerHTML=pt[7];
      document.getElementById('fq5').innerHTML=pt[8];
      document.getElementById('fa5').innerHTML=pt[9];
    }
  }    
  if (document.getElementById('about-content')) document.getElementById('about-content').innerHTML = aboutContent;

  //document.getElementById('page_description').innerHTML=page_description;

  let xd=(page_description.length>0)?page_description.replaceAll('\r\n','</br>')
  :document.getElementById('page_description').innerHTML;
  document.getElementById('page_description').innerHTML=`${xd}`;  
}


document.getElementById('e-commerce').addEventListener('click', function(e){ 
  mostrar = (document.getElementById('cart-items').style.display=='none')?'block':'none'; 
  cartEl = document.getElementById('cart-items').style.display=mostrar;
  window.scrollTo(0, 0)
});

function pagedata(){
  localStorage.setItem('iCo', iCo);
  localStorage.setItem('bid', bid);
  localStorage.setItem('imgLogo', document.getElementById("logo").src);
  localStorage.setItem('titulo', document.getElementById("coName").innerHTML.trim());
  if(page_description) page_description=document.getElementById('page_description').innerHTML;
  localStorage.setItem('page_description', page_description);
  localStorage.setItem('imgMain', document.getElementById('imgMain').src)
  localStorage.setItem('imgMain_', document.getElementById('imgMain').getAttribute('bnrId')) ;  
}

