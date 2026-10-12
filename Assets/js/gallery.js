//const myModal3=document.getElementById("modal3"); modal3=new bootstrap.Modal(myModal3);

var arrayNegocios=[], arrayCategory=[], arrayRubros=[], rubList=[];
var sin_filtro=true;options='';
var con_bcard=false;
var CP; 
arrayRubros[0]='Todos';
getSome('Data/getDataByType/15','rubros');
//getSome('Companies/getCardsByGallery/'+localStorage.gallery,'cards');
getSome('gallery/getBannerByGallery/'+gallery,'banner');

function fillTC(texto, type){
  if (type=='rubros') rubros(texto);
  if (type=='cards')  fillTableCards(texto)
  if (type=='banner') fillTableBanner(texto)    
  if (type=='page')   fillPage(texto)
}

function rubros(txt){
  for(x of JSON.parse(txt)) {arrayRubros[x.fieldId]=x.fieldName;}
  getSome('Companies/getCardsByGallery/'+gallery,'cards');
}
function rubrosCo(txt){rubs = txt.split(',');
    rubs.forEach(function(rubro){
      rubro_index=(rubro==='')?0:parseInt(rubro);
      if (arrayRubros[rubro]!=='')rubList.push({rubId:rubro_index,rubName:arrayRubros[rubro]});
    });
    setXCli('bline', JSON.stringify(rubList));
}

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
      let carItem_img=(x.burl.substr(0,4)!=='http')? base_url+"Assets/images/"+x.burl:x.burl;
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

function fillPage(texto){
  alert(texto)
}

function fillTableCards(texto){
  h='', hRubro=`<label><input type="checkbox" value=0 id="chkTodos">Todos</label>`;
  if (arrayNegocios.length>0) {    obj = texto;
  }else{    obj=JSON.parse(texto);    arrayNegocios=obj;  }
  i=0; l='';//  var path = window.location.pathname; //var str = path.split("/");
  var nom_galeria = window.location.pathname;//path//str[2];
  arRubrosPrinted=[];
  for (x of obj) { //por cada galería
    if (x.cId==localStorage.iCo) con_bcard=true;
    cnfg=(x.cId==localStorage.iCo)?
      `<div class="col-md-3"><a href='misdatos' title="Configurar"><i class="fas fa-cog"></i><a></div>`:'';
    i=i+1;  rubs = x.bline.split(',');
    rubs.forEach(function(rubro){
      rubro_index=(rubro.length>0)?parseInt(rubro):0;
      if(rubro_index>0){
        if (!arRubrosPrinted.includes(arrayRubros[rubro_index])){
          hRubro+=`<label class="px-3"><input type="checkbox" value=${rubro_index}>${arrayRubros[rubro_index]}</label>`;
          arRubrosPrinted.push(arrayRubros[rubro_index]); }  }
    });
    if (!arrayCategory.includes(x.rubro)){ //lista de categ
      l+='<li data-filter=".filter-'+x.rubro.split(' ')[0]+'">'+x.rubro+'</li>'
      arrayCategory.push(x.rubro)
      if (sin_filtro==true) options += `<option value="${x.rubroid}">${x.rubro}</option>`;
    }
    let xd=(x.direccion)?x.direccion.replaceAll('\n','</br>'):'';
    h+=`
      <div class = "tarjeta filter-'${x.rubro.split(' ')[0]}'" 
        bline="${x.bline}" rubro="${arrayRubros[(rubro_index)]}">
        <div class="row"> ${cnfg}
          <div class="col">
            <h5 class="text-center"><a href="${nom_galeria+'/'+ x.empresa}" onclick="rubrosCo('${rubs}');">${x.empresa}</a></h5>
          </div>
        </div>  
        <hr>
        <div class="cara">
          <h6 class="text-center">${(x.direccion==null)?':(':xd}</h6>
          <p class="text-center"> ${coin('telefono', x.fono)}</p>
          <div class="social-links text-center">
            ${coin('wsp', x.whatsapp)}  ${coin('face', x.fb)}
            ${coin('insta', x.ins)}     ${coin('twt', x.twt)}
            <br> ${coin('web', x.web)}
          </div> 
        </div>
        <marquee class="marquee">${(x.notes==null)?'':x.notes}</marquee>
      </div> `;
  }       
  document.getElementById('cards').innerHTML = h;
  document.getElementById('category-list').innerHTML = (hRubro.length>70)?hRubro:'';
  if (!CP) CP = document.querySelectorAll(".tarjeta");

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
        return (dato.length>10)?`<a href="http://wa.me/${dato}" ><i class="fab fa-whatsapp"></i>&nbsp</a>`:''
        //return'<a href="http://wa.me/'+dato+'" target="_blank"><i class="bi bi-whatsapp"></i>&nbsp</a>'
        break;
      case 'face':
        return (dato.length>25)?'<a href="'+dato+'"><i class="fab fa-facebook-square"></i></a>':'';
        break;
      case 'insta':
        //return '<a ref="'+dato+'"><i class="fab fa-instagram"></i></a>';
        return (dato.length>26)?'<a href="'+dato+'"><i class="fab fa-instagram"></i></a>':'';    break;
      case 'twt':
        return (dato.length>24)?'<a href="'+dato+'"><i class="fab fa-twitter"></i></a>':'';    break;
       
      default:
        return '';
        break;
    }
  }else{
    return '</br>';
  }
}

//filtering by rubro
  nombres=[];var todosChecked; var ready;
  document.querySelector("#category-list").addEventListener("click", filtrar_por_rubro);
  function filtrar_por_rubro(e) {
    if (e.target&&e.target.tagName==='INPUT') {
      let casillas = document.querySelectorAll("input[type='checkbox']")
      nombres=[];
      casillas.forEach(c =>{//para cada casilla
        if (c.checked){
          if(c.value==0&&!ready) {todosChecked=true; return false;}
          else{nombres.push(c.value); ready=false;} }
      })
      if (todosChecked) {
        nombres=[0];
        casillas.forEach(c =>{//para cada casilla          
          if(c.checked&&c.value>0) {c.checked=false; ready=true}
        })
      }
      filterItems(nombres);
    }
  }

  function filterItems(keyword){ //filter
    const contCards = document.getElementById('cards');
    const items = CP;  contCards.innerText='';    
    items.forEach(function(item){
      rubs = item.getAttribute('bline')
      rub =  rubs.split(','); //array
      rub.forEach(function(ru){
        if (keyword.some(elem => elem === 0)) {
          contCards.appendChild(item);
          todosChecked=false; ready=true;
        }else{
          if (keyword.some(elem => elem === ru)) contCards.appendChild(item);
          document.getElementById('chkTodos').checked=false;
        }  
      })
    });
  }
