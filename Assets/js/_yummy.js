getSome('Pagedata/getPD/12','page');//page2

document.addEventListener('click',(e)=>{
  if (e.target.classList.contains('editmode')){
    if(e.target.textContent==='Editar sección'){
      section=(e.target.closest('section'))
      section.setAttribute('contentEditable',true)
      console.log('edit')
      //document.getElementsByTagName("body")[0].style.overflowY = "hidden";
      e.target.querySelector('button')
    }else{
      console.log('save')
    }
  }   
});
document.addEventListener('input',(e)=>{  
  e.target.querySelector('button').innerText='Guardar cambios'
});


function fillTC(texto, type){
  if (type==='page')   fillPageContent(texto)    
}

const fillPageContent = data=>{ 
  obj=JSON.parse(data);

  for (x of obj) {        
    pt = (x.arr).split('|');
    switch (x.section){
      case 1:
        hero.querySelector('h2').innerText=(x.title).replaceAll('\r\n','</br>');
        hero.querySelector('p').innerText=(x.text).replaceAll('\r\n','</br>');
        hero.setAttribute('pag_i', x.pageid)
      break;
      case 4:
        about.querySelector('h2').innerText=(x.title).replaceAll('\r\n','</br>');
        about.querySelector('p').innerText=(x.text).replaceAll('\r\n','</br>');
        about.querySelector('.fst-italic').innerText=(x.text).replaceAll('\r\n','</br>');
        about.setAttribute('pag_i', x.pageid)
        //<li class="abou"><i class="bi bi-check-circle"></i> ${pt[4]}</li>
        about.querySelector('p').innerText=(x.text).replaceAll('\r\n','</br>');
      break;
      default:console.log('section'); break;
    }
  }
}

function pe(){

}


function pageEdit(section, bnrId=''){  
  switch (parseInt(section)){
    case 1: //hero
      preparaModal(hero.querySelector('h2').innerText, hero.querySelector('p').innerText)
      showModal();
      titleModal.innerHTML=hero.id; titleModal.setAttribute('aux',1);
    break;
    case 2://pending

    break;
    case 4: //About
      about.setAttribute('contentEditable',true)
      break;
      preparaModal(about.querySelector('h2').innerText, about.querySelector('p').innerText, 
            about.querySelector('.fst-italic').innerText )
      showModal(); titleModal.innerHTML=about.id; titleModal.setAttribute('aux',4);
    break;

    default:console.log('SA pageEdit', section); break;
  }
}


function preparaModal(title='', text='', fts=''){
  inputs=[];
  inputs.push({id:'campo1', campo:'Título',selector:'textarea',rows:2, innerHTML:title, label:1})  
  inputs.push({id:'campo2', campo:'Texto / Descripción',selector:'textarea',rows:3, innerHTML:text, label:1})
  inputs.push({id:'campo3', campo:'Texto ',selector:'textarea',rows:3, innerHTML:fts, label:1})
  //inputs.push({id:'campo3', campo:'aux', selector:'input',type:'hidden', value:outstanding})    
  openModal(inputs);
}

const beforeSave = data=>{ arrAlert=[];
  arr1['campo4']=titleModal.getAttribute('aux');
  arr1['id']=hero.getAttribute('pag_i');
  fetch_URL=base_url+'Pagedata/setPageData';
  /*  
    switch (data[1]) {
      case 'hero':
        arr1['campo4']=titleModal.getAttribute('aux');
        arr1['id']=hero.getAttribute('pag_i');
        fetch_URL=base_url+'Pagedata/setPageData';
      break;
      case 'about':
        arr1['campo4']=titleModal.getAttribute('aux');
        arr1['id']=about.getAttribute('pag_i');
        fetch_URL=base_url+'Pagedata/setPageData';
      break;
      default:console.log('someaction'); break;
    }
  */
  return arrAlert;
}

const afterSave = data=>{  
  console.log(data, data[2]['campo1'])
  console.log('aux',titleModal.getAttribute('aux'));
  if (data[1]==='setPageData') {
    hero.querySelector('h2').innerText=data[2]['campo1'];
    hero.querySelector('p').innerText=data[2]['campo2'];
  }
}

function isInViewport(elem) {
    var distance = elem.getBoundingClientRect();
    return (
        distance.top < (window.innerHeight || document.documentElement.clientHeight) && distance.bottom > 0
    );
}

//var elem = document.getElementById('elemento');

if (about.querySelector('.btn')) {
  about.querySelector('.btn').addEventListener('click',(event)=>{
    console.log('pepe')
    if(event.target.innerText==='Guardar cambios'){
      console.log('pepe1')
      arr=[];  
      arr.push({h1:about.querySelector('.h1').innerText, h2:about.querySelector('.h2').innerText,
            p1:about.querySelector('.p1').innerText, p3:about.querySelector('.p3').innerText});

      arr1['campo1']=about.querySelector('.h1').innerHTML;
      arr1['arr'] = arr;
      arr1['campo4']=titleModal.getAttribute('aux');
      arr1['id']=about.getAttribute('pag_i');
      fetch_URL=base_url+'Pagedata/setPageData';
      const dato=new FormData(); dato.append('campos', JSON.stringify(arr1));
      save(fetch_URL, dato);

      //save()

    }

  });
}



