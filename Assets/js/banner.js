imgPath = base_url+'Assets/images/bnr/';
var edtImgName='';
document.querySelector("#btnNuevo").addEventListener('click',()=>prepara_abreModal());

function preparaModal(name='', titulo='', subtitulo='', target='', outstanding=0){
  if (Number(localStorage.section)>0) outstanding=Number(localStorage.section);
  var nuevaImg;
  if (name==''){
    nuevaImg= base_url+"Assets/images/fix/subir_imagen.jpg"
  }else{
    nuevaImg=(name.substring(0,4)!=='http')? imgPath+name:name;
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
  clase = (Number(localStorage.iCo)>-1)?'d-none':'xd';
  combo3 = `<div class="${clase}"><div><label for="">Sección </label></div><div id="combo_section"></div></div></div>`;

  inputs = []; h='';  
  inputs.push({id:'combo',  idCmb:combo1})  
  //inputs.push({id:'combo',  idCmb:"<hr>"})

  inputs.push({id:'combo',  idCmb:combo2})  //campo1
  inputs.push({id:'combo',  idCmb:"<hr>"})
  inputs.push({id:'combo',  idCmb:combo3})  //campo6
  inputs.push({id:'campo2', campo:'Título', selector:'input',type:'text', value:titulo, label:1})  
  if(outstanding!==3) inputs.push({id:'campo3', campo:'Subtítulo', selector:'input',type:'text', value:subtitulo, label:1})  
  inputs.push({id:'campo4', campo:'Texto / Descripción',selector:'textarea',rows:2, innerHTML: target, label:1})  
  openModal(inputs);
  //getJson(f_URL, data, 'combo_banco', 'campo4',localStorage.getItem('dbk'),'Banco' )

  cargarCombo(srcCombo3, 'combo_section', 'campo6', outstanding, 0);
}

function prepara_abreModal(){
  preparaModal(); 
  showModal();   
  localStorage.setItem('imgToUpld','new');  
  edtImgName='';
}
///datatable///
var table; 

section = Number(localStorage.getItem('section'));
fec_URL=base_url+"Banner/getBanner";
if (section>-1) fec_URL=base_url+"Banner/getBannerBysection/"+section;
titleCaption = ['Carousel','','', 'Info1', 'Info2']
document.getElementById('page_title').innerHTML = titleCaption[section];
botones = `<button  type='button' class='botonmodificar btn btn-warning btn-sm ' ><i class='fa fa-edit'></i></button>`;
document.addEventListener('DOMContentLoaded', function() {
    table=$('#tableBanner').DataTable({
        "aProcessing": true,  "aServerside": true,
        "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
        "ajax": { "url": " " + fec_URL, "dataSrc": ""  },
        "columns": [
          { "data": "bannerid" },
          { "data": "bannerurl",
            "render":function(data,type,row){
              if (data==null) {
                return '<center><img src = '+imgPath+'noimage.jpg'+' width="80" height ="80" /></center>';
              }else{
                if (data.substr(0,4)=='http') {
                  return '<center><img src = '+data+' width="80" height ="80" /></center>';
                }else{
                  return '<center><img src = '+imgPath+data+' width="80" height ="80" /></center>';
                }
              }
            },"orderable": false 
          },
          { "data": "target" },
          { "data": "outstanding"},
          { "data": null,"orderable": false},
        ],
        "columnDefs": [
         { targets: 0, visible: false},//id
         { targets: 3, visible: false},//outstt
         { targets: 4, "defaultContent":botones, data: null }],
        "responsieve": "true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order": [  [0, "desc"] ]
    });
})


$('#tableBanner').on('click', 'button.botonmodificar', function() {
  const registro = table.row($(this).parents('tr')).data();
  document.getElementById('id').value = registro.bannerid 
  pt = (registro.target).split('|');
  preparaModal(registro.bannerurl, pt[0], pt[1], pt[2], registro.outstanding);
  showModal(1);//con opcion borrar
  img_elem='imgModal';
  imgName_sinRuta=registro.bannerurl;  
  imgName_sinRuta=imgName_sinRuta.substr(imgName_sinRuta.lastIndexOf('/')+1).split('?')[0];
  img = imgName_sinRuta;
  localStorage.setItem('imgToUpld', img);
  edtImgName=registro.bannerurl;
});

