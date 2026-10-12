const hRubros= document.getElementById('rubro-list')
arrayRubros=[]; myBlines=[]; myBlinesArr=[];hRubro='';

if(localStorage.page==='null') {
  if (confirm('Desea ingresar la información de su negocio ahora?')) {
    window.location.href = base_url+'misdatos';
  }
}

function fillTC(texto, type){
  if (type=='cards')  fillTableCards(texto)
  if (type=='banner') fillTableBanner(texto)
  if (type=='rubros') {// console.log(texto)
    for(x of JSON.parse(texto)) arrayRubros[x.dataid]=x.dataname;
    getSome('companies/getMyBlines','misRubros');
      misRubros(texto);
  }
  if (type=='misRubros') misRubros(texto);    
}

function misRubros(txt){
  let listaRubros=''; console.log(txt)
  var objData = JSON.parse(txt);  rubs=(objData.data.blines).split(',');
  rubs.forEach(function(rubro){
    rubro_index=(rubro==='')?0:parseInt(rubro);
    myBlines.push({rubId:rubro_index,rubName:arrayRubros[rubro]})
    myBlinesArr[rubro_index]=arrayRubros[rubro];
    listaRubros+=`<label class="px-3"><input type="checkbox" value=${rubro_index}>${arrayRubros[rubro]}</label>`;
  }); hRubros.innerHTML = hRubro;
}

/*
function fillTableBanner(texto){
  var ca;  i=0; j=0;
  obj=JSON.parse(texto)
  for (x of obj) {
    if (x.bout==1) {//destacado
      j++;
      var newDiv_related = document.createElement("div");
      newDiv_related.setAttribute("class","");
      newDiv_related.setAttribute("id","rel"+j);
      //newDiv_related.setAttribute("margin","0 auto");
      //newDiv_related.setAttribute("padding","10px");
      document.getElementById('related-section').appendChild(newDiv_related);
      //document.getElementById("rel"+j).setAttribute('padding', '10px');
      var newA = document.createElement("a");
      newA.setAttribute("id","d"+j);
      newA.setAttribute("href",x.urlDestination);
      document.getElementById("rel"+j).appendChild(newA);

      var y = document.createElement("IMG");
      let carItem_img=(x.burl.substr(0,4)!=='http')? base_url+"Assets/images/bnr/"+x.burl:x.burl;
      y.setAttribute("src", carItem_img);
      //y.setAttribute("height", "390");
      y.setAttribute("width", "100%");
      y.setAttribute("alt", "d"+j);
      
      document.getElementById('d'+j).appendChild(y);
      document.getElementById('d'+j).className ="imgrela";

      var newA = document.createElement("h5");
      newA.innerHTML='..';
      document.getElementById("rel"+j).appendChild(newA);
    }else{ //carousel
      i++;  active=(i==1) ?' active':'';
      var newDiv = document.createElement("div");
      newDiv.setAttribute("id","banner"+i);    
      document.getElementById('carousel-inner').appendChild(newDiv);
      
      var y = document.createElement("IMG");
      let carItem_img=(x.burl.substr(0,4)!=='http')? base_url+"Assets/images/bnr/"+x.burl:x.burl;
      y.setAttribute("src", carItem_img);
      //y.setAttribute("height", "304");
      //y.setAttribute("width", "228");
      y.setAttribute("alt", "banner"+i);
      y.setAttribute("class","d-block w-100")
      document.getElementById('banner'+i).appendChild(y);
      document.getElementById('banner'+i).className =`carousel-item ${active}`;

    }
  }
}
*/
var arrayNegocios=[];
var arrayCategory=[];
var sin_filtro=true;options='';
var con_bcard=false;

getSome('Companies/getCards/0','cards');
getSome('Galeria/getBanner','banner');
getSome('Data/getDataByType/15','rubros');

function fillTableCards(texto){
    var h;
    if (arrayNegocios.length>0) {
      obj = texto;
    }else{
      obj=JSON.parse(texto);
      arrayNegocios=obj;
    }
    i=0; h='' ; l=''; 
    for (x of obj) {
      if (x.cId===localStorage.iCo) con_bcard=true;
      i=i+1;
      if (!arrayCategory.includes(x.rubro)){ //lista de categ
        l+='<li data-filter=".filter-'+x.rubro.split(' ')[0]+'">'+x.rubro+'</li>'
        arrayCategory.push(x.rubro)
        if (sin_filtro==true) options += `<option value="${x.rubroid}">${x.rubro}</option>`;
      }
      let xd=(x.direccion)?x.direccion.replaceAll('\n','</br>'):'';
      h+=`<div class = "tarjeta filter-'${x.rubro.split(' ')[0]}' ">
            <h5 class="text-center"><a href="${x.empresa}">${x.empresa} </a></h5>
            <hr>
            <div class="cara">
              <h6 class="text-center">${(x.direccion==null)?':(':xd}</h6>
              <p class="text-center"> ${ coin('telefono', x.fono)}</p>
              <div class="social-links text-center">
                ${coin('wsp', x.whatsapp)}${coin('face', x.fb)}${coin('insta', x.ins)}
                </br></br>${coin('web', x.web)}
              </div>    
            </div>
            <marquee class="marquee">${(x.notes==null)?'':x.notes}</marquee>
         </div>
         `;
    }       

    document.getElementById('cards').innerHTML = h;
    if (sin_filtro){
      comboCat = `
        <select name="cmbCat" id="cmbCat"  onchange ="cmbChange2(this)" class="form-control">
          <option style="display:none;"></option>
          ${options}
        </select>`; 
        document.getElementById('combo_cat').innerHTML = comboCat;
    }
    sortDropDownListByText('cmbCat')
}


function coin(red,dato){
  if (dato) {
    switch (red) {      
      case 'web':
        return'<a href="'+dato+'"><i class="fas fa-globe"></i>&nbsp</a>';   break;
      case 'telefono':
        return '<i class="fas fa-phone-alt"></i>&nbsp '+dato; break;
      case 'wsp':
        return'<a href="http://wa.me/'+dato+'"><i class="fab fa-whatsapp"></i>&nbsp</a>'
        //return'<a href="http://wa.me/'+dato+'" target="_blank"><i class="bi bi-whatsapp"></i>&nbsp</a>'
        break;
      case 'face':
        return (dato.length>25)?'<a href="'+dato+'"><i class="fab fa-facebook-square"></i></a>&nbsp':'';
        break;
      case 'insta':
        //return '<a ref="'+dato+'"><i class="fab fa-instagram"></i></a>';
        return (dato.length>26)?'<a href="'+dato+'"><i class="fab fa-instagram"></i></a>&nbsp':'';
        break;
      default:
        return 'defa';
        break;
    }
  }else{
    return '</br>';
  }
}
