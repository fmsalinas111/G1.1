const myModalDlg=document.getElementById("modalDialog"); modalDlg=new bootstrap.Modal(myModalDlg);

const iCo=document.getElementById('iCo').value; const bid=document.getElementById('bid').value;
sec=document.getElementById('p_sections').value;
localStorage.setItem('cppm', 1);

const hBline= document.getElementById('bline-list');
var img2; arrayRubros=[]; myBlines=[]; hRubro='';

setAcc(1)//cuentas por cobrar

getSome('Ecommerce/getCarousel/'+iCo,'banner'); //banner 
getSome('Ecommerce/getPagedetails/'+bid, 'page');//page2
getSome('Data/getDataByType/15','rubros');//all from galleries
getSome('Pricelist/getListNames/'+iCo, 'listNames');

//tal vez sea la llamada al filtro transversal fuera de xmayor
//getSome('companies/getBlineBy/'+iCo,'bline');//blinebyCo toDel
showSection();

function fillTC(texto, type){
  if (type==='banner') fillTableBanner(texto);
  if (type==='page')   fillPageContent(texto)    
  if (type=='rubros') {
    for(x of JSON.parse(texto)) arrayRubros[x.fieldId]=x.fieldName;
  }
  if (type==='listNames') rendComboLists(texto)
}

const chPList = data=>{ 
  localStorage.setItem('PL',data[0]);  location.reload();
}

const rendComboLists = data=>{ 
  if(JSON.parse(data).length===0) {
    localStorage.setItem('PL',0);    return;
  }
  pricelist.innerHTML= `<div class="col-md-12"><div><label for="campo20">Listas</label></div><div id="combo_listas"></div></div></div>`;
  cargarCombo(data,'combo_listas', 'campo20',localStorage.PL,'Listas de precios' )
}

//secciones
function showSection(){
  document.getElementById('store').classList.remove('d-none');
  document.getElementById('e-commerce').classList.remove('d-none')
  document.getElementById('nosotros').classList.remove('d-none');
  document.getElementById('info1').classList.remove('d-none');
  document.getElementById('info2').classList.remove('d-none');
  document.getElementById('sectionInstagram').classList.remove('d-none');

  if (sec.substr(0,1)==='0'){
    document.getElementById('store').classList.add('d-none');
    document.getElementById('e-commerce').classList.add('d-none');
    document.getElementById('menu_store').classList.add('d-none')};
  if (sec.substr(1,1)==='0')document.getElementById('nosotros').classList.add('d-none');
  if (sec.substr(2,1)==='0')document.getElementById('info1').classList.add('d-none');
  if (sec.substr(3,1)==='0')document.getElementById('info2').classList.add('d-none');
  if (sec.substr(4,1)==='0'){addClass(['p-btn', 'd-none']);} else {removeClass(['p-btn', 'd-none'])}
  if (sec.substr(5,1)==='0')document.getElementById('sectionInstagram').classList.add('d-none');

}//secciones_fin

//logo
  strLogo = document.getElementById('logo').src;
  strLogo=(strLogo.substr(0,4)!=='http')? base_url+"Assets/images/"+strLogo:strLogo;
  if (strLogo.charAt(strLogo.length-1)==='?') document.getElementById('logo').style.display='none';
  document.getElementById('logo').src=strLogo;

function checkTemplate(campo,stt, Check_text){
  stt=(stt==0)?'':' checked ';
  return `<div class="col-md-6 "><div class="form-check">
              <label class="form-check-label" for="${campo}">
                <input type="checkbox" class="form-check-input"  name="campo" id="${campo}" ${stt}>${Check_text}
              </label></div></div>`;
}

function config2(){   inputs = [];
  sectionTienda  = sec.substr(0,1);   sectionNosotros = sec.substr(1,1);
  sectionInfo1   = sec.substr(2,1);   sectionInfo2    = sec.substr(3,1);
  sectionShowBuy = sec.substr(4,1);   sectionInstagram= sec.substr(5,1);
  check1 = checkTemplate('campo1',sectionTienda, 'Tienda virtual');
  check2 = checkTemplate('campo2',sectionNosotros, 'Nosotros');
  check3 = checkTemplate('campo3',sectionInfo1,'Info1');
  check4 = checkTemplate('campo4',sectionInfo2,'Info2');
  check5 = checkTemplate('campo5',sectionShowBuy,'Botón de compra');
  check6 = checkTemplate('campo6',sectionInstagram,'Instagram');

  inputs.push({id:'html',  idHt:'<div style="margin-left:50px;">'})
    inputs.push({id:'html', idHt:check1});    inputs.push({id:'html', idHt:check2});
    inputs.push({id:'html', idHt:check3});    inputs.push({id:'html', idHt:check4});
    inputs.push({id:'html', idHt:check5});    inputs.push({id:'html', idHt:check6});
  inputs.push({id:'html',  idHt:'</div>'})

  document.getElementById('id').value=bid;  openModal(inputs);  showModal();
  document.getElementById('titleModal').innerHTML='Secciones';
}

function pageEdit(code, bnrId=''){  
  if(code=='abou')  {
    outstanding=2; 
    bnrId    = document.getElementById('imgMain').getAttribute("bnrId");
    imgName  = document.getElementById('imgMain').src;
    titulo   = document.getElementById('titulo').innerHTML;
    subtitulo= document.getElementById('subtitulo').innerHTML;
    textD    = document.getElementById('page_description').innerText;
    atAction ='editar_imgMain';
    document.getElementById('id').value = bnrId;
    preparaModal(imgName, titulo, subtitulo, textD, outstanding);
    showModal();
    document.getElementById('titleModal').innerHTML='Imagen principal';    
  }

  if(code=='carousel') {
    outstanding=0; 
    localStorage.setItem('section', 0)
    window.location.href = base_url+"banner"; 
  }

  if(code=='info1') {
    outstanding=3;     
    localStorage.setItem('section', 3);    window.location.href = base_url+"banner"; 
  }
  if(code=='info2') {
    outstanding=4; 
    localStorage.setItem('section', 4);    window.location.href = base_url+"banner"; 
  }
}

var edtImgName='';//toDel?
function preparaModal(name='', titulo='', subtitulo='', target='', outstanding=0){
  var nuevaImg;
  if (name==''){
    nuevaImg= base_url+"Assets/images/fix/subir_imagen.jpg"
  }else{
    nuevaImg=(name.substring(0,4)!=='http')? base_url+"Assets/images/"+name:name;
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
  inputs = []; 
  inputs.push({id:'combo',  idCmb:combo1})  //preview
  //inputs.push({id:'combo',  idCmb:"<hr>"})
  inputs.push({id:'combo',  idCmb:combo2})  //campo1
  inputs.push({id:'combo',  idCmb:"<hr>"})
  inputs.push({id:'campo6', campo:'outstanding', selector:'input',type:'hidden', value:outstanding})  
  inputs.push({id:'campo2', campo:'Título', selector:'input',type:'text', value:titulo, label:1})  
  inputs.push({id:'campo3', campo:'Subtítulo', selector:'input',type:'text', value:subtitulo, label:1})  
  inputs.push({id:'campo4', campo:'Texto / Descripción',selector:'textarea',rows:3, innerHTML: target, label:1})  
  openModal(inputs);
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

function fillTableBanner(texto){
  i=0; j=0; h=''; info1='';info2=''; imgGallery=''; ig=0;
  obj=JSON.parse(texto);
  for (x of obj) {    
    let img2=(x.bannerurl.substr(0,4)!=='http')? base_url+"Assets/images/bnr/"+x.bannerurl:x.bannerurl;
    pt = (x.target).split('|'); xd=pt[2].replaceAll('\n','</br>');
    switch (Number(x.outstanding)) {
      case 0: //banner (carrousel)
        i++;  active=(i==1) ?' active':'';
        h+=`<div class="carousel-item ${active}">
             <img src="${img2}" class="d-block w-100" alt="carousel-item${i}""> </div>`;
        break;
      case 1: //destacado
        console.log('outstanding img found:'+x.outstanding, x.bannerurl)
        break;
      case 2: //ImgMain
        imgMain.src = img2;
        imgMain.setAttribute("imgName",img2);   imgMain.setAttribute("bnrId",x.bannerid);
        document.getElementById('titulo').innerHTML = pt[0]+' ' ;
        document.getElementById('subtitulo').innerHTML = pt[1];
        page_description.innerHTML=`${xd}`;
        break;
      case 3: //Info1
        edt=(editMode)?`<a href="#" bnrId=${x.bannerid} ><i class='fa fa-edit'></i> Editar</a>`:'';
        info1+=`<div class="col-lg-4 col-lg-6 i3" >
          <img src="${img2}" class="im" width="100"> <h2 class="ti">${pt[0]}</h2> <p class="te">${xd}</p> ${edt} 
          <p><a class="btn btn-secondary d-none" href="#">View details &raquo;</a></p>
        </div>`;
        break;

      case 4: //Info2
        edt=(editMode)?`<a href="#" bnrId=${x.bannerid} ><i class='fa fa-edit'></i> Editar</a>`:'';
        j++;
        if(j % 2 == 0) { 
          info2+=`
            <hr class="featurette-divider">
            <div class="row featurette i4">${edt} 
              <div class="col-md-7 order-md-2">
                <h2 class="featurette-heading ti">${pt[0]} <span class="text-muted su">${pt[1]}</span></h2>
                <p class="lead te">${xd}</p>
              </div><div class="col-md-5 order-md-1"> <img src="${img2}" class="im" width="400"> </div>              
            </div>`
        } else { 
          info2+=`
            <hr class="featurette-divider"> 
            <div class="row featurette i4" >${edt} 
              <div class="col-md-7">
                <h2 class="featurette-heading ti">${pt[0]}. <span class="text-muted su">${pt[1]}</span></h2>
                <p class="lead te">${xd}</p>  </div>
              <div class="col-md-5">  <img src="${img2}" class="im" width="400" > </div>
            </div>`
        }
        break;

      case 5://image gallery
        ig ++; edt = (editMode)?`<a href="#" class="gallery__link" bnrId=${x.bannerid}><i class='fa fa-edit'></i> Cambiar</a>`:'';
        imgGallery += `
        <figure class="gallery__picture">
          <img src="${img2}" class="gallery__img">   ${edt}
        </figure>`;
        break;
      default: break;
    }
  }//fin for
  /* probar esto alguna vez
  .carousel-inner > .item > img {
  object-fit: scale-down;
  height: 50vh;
  width: 100%;
  }*/
  document.getElementById('carousel-inner').innerHTML=h;
  if (i==0) {
    document.getElementById('carousel').classList.remove('con_carousel');
    document.getElementById('carousel').classList.add('sin_carousel');
  }
  if (info1.length>0) document.getElementById('info1').innerHTML=info1;
  if (info2.length>0) document.getElementById('info2').innerHTML=info2;
  //document.getElementById('info1').innerHTML=info1;
  if (imgGallery.length>-1) {
    if(ig < 6 && editMode) imgGallery+=`<figure class="gallery__picture">
          <img src="Assets/images/fix/subir_imagen.jpg" class="gallery__img">
          <a href="#" class="gallery__link strong"><i class="fas fa-plus-circle"></i> Nuevo</a>
        </figure>`;
    document.getElementById('imgGallery').innerHTML=imgGallery;}
  if (ig==0) galleryCont.style.display='none';

}

function fillPageContent(texto){
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

  let ad=document.getElementById('page_address').innerHTML.replaceAll('\n','</br>');        
  document.getElementById('page_address').innerHTML=`${ad}`;  
}

function percibir(slsid=0, importe=0, clName='pepe', clid=0, notas='', imagen=''){
  idcampo="campo10";   imgCpaco=setPreview(nuevaImg(imagen,'hm'), idcampo, imagen);
  cmbClient  = comboBuilder('cliente',1,'campo1','client');
  combo1 = `<div class="col-md-12"><div><label for="campo4">Banco (caja)</label></div><div id="combo_banco"></div></div></div>`;
  inputs = []; h='';
  //inputs.push({id: 'campo1' ,campo:'Cliente',selector:'input', type:'text',label:1, value:clName})
  inputs.push({id: 'combo', idCmb:cmbClient, value:clid});
  inputs.push({id: 'html', idHt:htR1});    inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'campo2' ,campo:'Fecha',selector:'input',type:'date',value:hoy(), label:1})
  inputs.push({id: 'html', idHt:htR2});   inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'campo3', campo:'Importe/saldo',selector:'input',type:'number', placeholder:'Importe', value: importe, label:1})  
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:htR2});
  inputs.push({id:'combo',  idCmb:combo1})// campo4 banco
  inputs.push({id:'campo9', campo:'Notas',selector:'textarea',rows:1.5, innerHTML:notas, label:1})
  inputs.push({id:'campo5', campo:'clid',  selector:'input', type:'hidden', value:clid,    disabled:''})
  inputs.push({id:'campo6', campo:'slsid', selector:'input', type:'hidden', value:slsid,   disabled:''})
  inputs.push({id:'campo7', campo:'amount',selector:'input', type:'hidden', value:importe, disabled:''})
  inputs.push({id:'campo8', campo:'acco',  selector:'input', type:'hidden', value:1,    disabled:''})
  
  inputs.push({id:'combo',  idCmb:imgCpaco})// enlace-actualizar
  openModal(inputs)
  document.querySelector('#titleModal').innerHTML = 'Cobrar'; //Cambiamos el titulo

  const data = new FormData(); data.append('src', 'data');
  getJson(base_url+'Data/getDataCmb/2', data, 'combo_banco', 'campo4',localStorage.getItem('dbk'),'Banco' )

  const dataProv = new FormData(); dataProv.append('src', 'client');
  getJson(base_url+'Data/getDataCmb/1', dataProv, 'combo_cliente', 'campo1', clid, 'Cliente')

  showModal();
}

function presupuesto(action, importe=0){
  inputs = [];
  cmbClient = comboBuilder('cliente',1,'campo1','client');
  cmbBanco  = comboBuilder('banco',2,'campo5','data','',false);

  check1 =`<div class="col-md-12 " style="padding-top: 15px;">
            <div class="form-check"><label class="form-check-label" for="campo11">
                <input type="checkbox" class="form-check-input" id="campo11" name="campo" ><b>Cuenta corriente</b>
                </label>     </div></div>`
  inputs.push({id: 'combo', idCmb:cmbClient});
  inputs.push({id: 'html', idHt:htR1});    inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'campo2' ,campo:'Fecha',selector:'input',type:'date',value:hoy(), label:1})
  inputs.push({id: 'html', idHt:htR2});   inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'campo3' ,campo:'Vencimiento',selector:'input',type:'date',value:hoy(), label:1})
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:htR2});
  inputs.push({id: 'campo4', campo:'Importe',selector:'input',type:'hidden', value: importe, label:1})  

  if (action==='Venta') {   
   inputs.push({id: 'html',idHt:`<div id="pagar">`})
    inputs.push({id: 'html', idHt:htR1});    inputs.push({id: 'html', idHt:ht6});
      //importe=Number(document.querySelector('.c-checkout').getAttribute('total'));
      inputs.push({id: 'campo4', campo:'Importe/saldo',selector:'input',type:'number', placeholder:'Importe', value: importe, label:1})  
    inputs.push({id: 'html', idHt:htR2});   inputs.push({id: 'html', idHt:ht6});
    inputs.push({id: 'combo', idCmb:cmbBanco});
    const dBank = new FormData(); dBank.append('src', 'data');
    getJson(base_url+'Data/getDataCmb/2', dBank, 'combo_banco', 'campo5',localStorage.dbk,'Banco')
    inputs.push({id:'campo7', campo:'amount',selector:'input', type:'hidden', value:importe, disabled:''})
    inputs.push({id:'campo8', campo:'acco',  selector:'input', type:'hidden', value:1,    disabled:''})
   inputs.push({id: 'html',idHt:`</div>`})    
   inputs.push({id: 'combo',  idCmb:check1, value:0})
  }
  inputs.push({id:'html', idHt:htR2});   inputs.push({id: 'html', idHt:htR2});
  
  inputs.push({id:'campo9', campo:'Notas',selector:'textarea',rows:1.5,  label:1})

  var data = new FormData(); data.append('src', 'client'); 
  fURL=base_url+'Data/getDataCmb/1'; getJson(fURL,data,'combo_cliente', 'campo1',0,'Cliente')
  openModal(inputs); showModal();
  document.getElementById('titleModal').innerHTML=action;
  //document.getElementById('btnDelete').innerHTML = "Ticket";
  //document.getElementById('btnDelete').classList.replace('btn-danger', 'btn-warning')

}

function ticket_(sid){
  getSome('Ecommerce/getTicket/'+sid,''); //banner 
  showDialog(['Ticket', 'Imprime ticket?','','trueno']);
}

function actionDlg(){  print_ticket();}

function print_ticket(){ 
  window.open(base_url+'pdf_ticket','_blank'); 
  modalDlg.hide();  
}

document.getElementById('e-commerce').addEventListener('click', function(e){ 
  mostrar = (document.getElementById('cart-items').style.display=='none')?'block':'none'; 
  cartEl = document.getElementById('cart-items').style.display=mostrar;
  window.scrollTo(0, 0)
});
function validEco(e){    
    if (campo3.value<campo2.value){//duedate
      document.getElementById('alert1').innerHTML=`
        <strong>Error: </strong> <span id="mensaje">Fecha de vencimiento errónea</span>`;
      removeClass(['alert','d-none']);
    }else {addClass(['alert','d-none']);}
    if (e.target&&e.target.id==='campo11') {
      if (document.getElementById('campo11').checked) {
        campo4.disabled=true; campo5.disabled=true;
        campo4.value=0; campo5.value=0
      }else{
        campo4.disabled=false; campo5.disabled=false;
        campo4.value=importe; campo5.value=localStorage.dbk
      }
    }
    //return data;
}

const showDialog = data=>{ 
  titModDlg.innerText = data[0];
  subTitModDlg.innerText = data[1];
  questionModDlg.innerText = data[2];
  modalDlg.show();
}


document.querySelector("#imgGallery").addEventListener("click", edtImgGallery);
function edtImgGallery(e) {
  edtImgName=(e.target.previousElementSibling).src;
  bnrId = (e.target).getAttribute('bnrId');
  editImg(edtImgName, bnrId);  img_elem='imgModal';
  localStorage.setItem('imgToUpld',edtImgName);
  document.getElementById('id').value = bnrId;
}

function editImg(imagen='', bnrId=0){
  idcampo="campo1";//para la imagen
  combo3 = setPreview(nuevaImg(imagen,'gallery'), idcampo, imagen);
  inputs = []; inputs.push({id:'combo',  idCmb:combo3})// preview
  openModal(inputs);
  document.querySelector('#titleModal').innerHTML = "Galería (editar imagen)"; 
  if (imagen.length==0){
    document.querySelector('#titleModal').innerHTML = "Galería (nueva imagen)";
    localStorage.setItem('imgToUpld','new');  edtImgName='';
  }
  document.getElementById('id').value =  bnrId;
  showModal(bnrId);
  document.querySelector('#btnActionForm').removeAttribute('disabled');
}

/*const beforeSave = data=>{ 
  localStorage.dbk=campo5.value;
  if (titModal=='Presupuesto'|| titModal=='Venta') {
    if (campo1.value==0) {alertError('Seleccione un cliente','campo1');return;} 
    if (titModal==='Venta') if (campo5.value==0&&!campo11.checked) {alertError('Seleccione un banco','campo5');return;} 
    const datPresu = new FormData(); 
    if (document.title=="Ecommerce") datPresu.append('changuito',JSON.stringify(changuito)); 
    else datPresu.append('changuito',[]);//to check
    datPresu.append('campos',JSON.stringify(arr1));
    save(base_url+'Buysal/setBuysal/'+titModal, datPresu); return 'stop';
  } 
}
*/
function textil(){  inputs=[];
  inputs.push({id:'html', idHt:tblTextil()});
  openModal(inputs); showModal();
}

const tblTextil =data=>{return `
  <div class="form-group col-md-12 htTextil" >
    <table id="tabDet" border="1" class="table-striped table-bordered responsive" cellpadding="4" cellspacing="6" style="width:98%;"" >
    <thead style="color: blue;"><th>Color</th><th class="text-center">Peso promedio</th><th class="text-center">Precio</th><th class="text-center">Importe</th>
    <th colspan="2" class="text-center">Acciones</th></thead>
    <tbody id="tDetails"></tbody>      </table>    </div>    `;}


document.querySelector(".marketing").addEventListener("click", edtInfo);    
function edtInfo(e) {  aaa=e.target; 
  if (aaa&&(aaa.tagName==='A'||aaa.tagName==='I')){
    dad=(aaa.closest('.i3')===null)?aaa.closest('.i4'):aaa.closest('.i3');
    outstanding=dad.classList.contains('i3')?3:4;

    imgName= dad.querySelector('.im').src;          titulo = dad.querySelector('.ti')?.innerText;
    subtit = dad.querySelector('.su')?.innerText;   textD  = dad.querySelector('.te')?.innerText;
    //atAction ='editar_imgMain';
    document.getElementById('id').value = aaa.getAttribute("bnrId");
    preparaModal(imgName, titulo, subtit, textD, outstanding);
    showModal(); document.getElementById('titleModal').innerHTML='Sección info'+(outstanding-2);    
    e.preventDefault();
  }
  
  //bnrId, img, tit, subtit, text
/*   edtImgName=(e.target.previousElementSibling).src;
  bnrId = (e.target).getAttribute('bnrId');
  editImg(edtImgName, bnrId);  img_elem='imgModal';
  localStorage.setItem('imgToUpld',edtImgName);
  document.getElementById('id').value = bnrId;
 */
}