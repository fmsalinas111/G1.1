function fillTC(texto, type){
  if (type=='gallery')fillGallery(texto)
  if (type=='banner') fillTableBanner(texto)    
}

getSome('Companies/getCards/gallery','gallery');
getSome('Galeria/getBanner','banner');
arrCities=[];

function fillGallery(texto){
  obj=JSON.parse(texto);  let  h='';
  for (x of obj) {
    //Si no existe en arrCities, add, simil a categ
    if (!arrCities.includes(x.city)){
      arrCities.push (x.city)
      h+=`<p class="display-5"> ${x.city}</p>`;
    }
    
    h+=`
      <div>
        <h5 class="text-center gallery"><a href="${x.empresa}" data-id=${x.cId}
        onclick="setGalleryTitle(${x.cId},'${x.empresa}')">${x.empresa} 
        <small>(${x.nroLocales})</small><br>
        <span class="text-muted">${(x.direccion===null)?"</br>":x.direccion}</span>
        </a>
        </h5>
      </div>`;
  }       
  document.getElementById('cards').innerHTML = h;
}

function setGalleryTitle(id, text){
  localStorage.gallery = id;
  localStorage.galleryName = text;
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
