const myModal3=document.getElementById("modal3"); modal3=new bootstrap.Modal(myModal3);
if(localStorage.page==='null'&&logged)  modal3.show()

function fillTC(texto, type){
  if (type=='cards')  fillTableCards(texto)
  if (type=='banner') fillTableBanner(texto)    
}
arrayNegocios=[]; arrayCategory=[];
sin_filtro=true;options=''; con_bcard=false;

getSome('Companies/getCards/0','cards');
getSome('Galeria/getBanner','banner');

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
      comboCat = `<label for="cmbCat">Filtro</label>
        <select name="cmbCat" id="cmbCat"  onchange ="cmbChange2(this)" class="form-control">
          <option style="display:none;">(Todos)</option>
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
