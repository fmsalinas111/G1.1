iCo=localStorage.iCo;
var edtImgName='';


function render(){
  document.getElementById('logo').setAttribute("src", localStorage.imgLogo);
  document.getElementById('imgMain').setAttribute("src", localStorage.imgMain);
  document.getElementById('coName').innerHTML= localStorage.titulo;
  let xd=localStorage.page_description.replaceAll('\r\n','</br>');
  document.getElementById('page_description').innerHTML=`${xd}`;  
}

render();
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
  idcampo="campo1";//para la imagen
  combo2 = `
    <a href="#"  id="a2" onclick='enlace();'> escribir o pegar enlace</a>&nbsp&nbsp
    <div id="enlace" style="display:none;">
      <div class="form-group ">
        <input class="form-control c1" id="${idcampo}" name="campo" type="text" value="${name}" oninput="ff();"> 
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
    if (atAction==='editarMain_text') {
      inputs = []; 
      page_description=localStorage.page_description;
      inputs.push({id:'campo1', campo:'title',selector:'input', type:'hidden', value:'abou', disabled:'' }) 
      inputs.push({id:'campo2',campo:'Texto principal',selector:'textarea',rows:7, innerHTML:page_description,  label:1})
      inputs.push({id:'campo11', campo:'code',selector:'input', type:'hidden', value:'abou', disabled:'' }) 
      inputs.push({id:'campo12', campo:'bid',selector:'input', type:'hidden', value:localStorage.bid, disabled:'' }) 
      openModal(inputs); showModal();
    }else{//imagenes
      if (atAction==='editarLogo') {
        imgName_sinRuta=localStorage.imgLogo;
        elem=document.getElementById('logo');
        img_elem='logo'
        titModal = "Actualizar logo ";
      }
      if (atAction==='editar_imgMain') {
        imgName_sinRuta=localStorage.imgMain;
        elem=document.getElementById('imgMain');
        img_elem='imgMain'
        titModal = "Actualizar imagen principal ";
        document.getElementById('id').value=localStorage.imgMain_;

      }
      if (atAction==='nuevoBanner') {
        titModal = "Nueva imagen carousel ";
      }

      imgName_sinRuta=imgName_sinRuta.substr(imgName_sinRuta.lastIndexOf('/')+1).split('?')[0];
      img = imgName_sinRuta;
      localStorage.setItem('imgToUpld', img);
      edtImgName=img;
      console.log('edtImgName: '+edtImgName);
      preparaModal(elem.src, document.getElementById('coName').innerHTML);
      showModal();
      document.querySelector('#titleModal').innerHTML = titModal;

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

  });
});


