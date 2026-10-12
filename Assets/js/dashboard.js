Toperceive={};
hLinks=document.getElementById('links'); hInfo=document.getElementById('info');
const getLink = data=>{ //console.log(data)
    xtra = data[5]? `<canvas id="pie-chart"></canvas>`:'';
    return  `
	<div class="col-xl-3 col-md-6 mb-4">
		<a href="${data[0]}" ${data[1]}">
        <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body ">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                            ${data[2]}</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">${data[4]}</div>
                    </div>
                    <div class="col-auto">  <i class="${data[3]}"></i> ${xtra}</div>
                </div>            </div>        </div>        </a>    </div>    `;
}

const getInfo = data=>{
    return  `
	<div class="col-xl-3 col-md-6 mb-4 mt-5 ">
        <div class="card-header bg-primary text-white">${data[2]}</div>
        <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
                <label >Nombre
                <input type="text" value="${data[0]}" class="form-control " readonly=""></label>
                <br>
                <label>${data[3]}:</label>
                <textarea class="form-control" rows="1.7">${data[1]} </textarea>
            </div>        </div>    </div>   `;    

 }


h=''; 
d1=new FormData(); d1.append('src','client'); f_URL=base_url+'Cpacos/summToPerception/-99';
gJSON(f_URL,d1).then((json)=>{ Toperceive=json;    render(Toperceive);
}).catch((err)=>console.log("Err:", err));

const render =data=>{text_link=''; //console.log(data);
    for (x of data) { text_link='Cuentas por '; text_link+= (x.type==1)?'cobrar':'pagar'; 
        h+=getLink(['cpacos',`onclick="setAcc(${x.type})"`, text_link, 'fas fa-dollar-sign fa-2x text-gray-300',x.saldo])
    }   hLinks.innerHTML=h;
}
if (APP===2) {
    

    const rend2=data=>{ data=JSON.parse(data);
        for (x of data){
            h+=getLink(['clprpames','onclick="setXslt(5)"','Inquilinos','fas fa-user fa-2x text-gray-300',x.cantCli]);
        }   hLinks.innerHTML=h;  
    }

    gtSo('Clprpames/contarClprpames/5',rend2,'tenant','tenant')
    const rend3=data=>{ h1=''; data=JSON.parse(data);
        for (x of data){  h1+=`<li>${x.est} ${x.qty}</li>`;  }   
        h+=getLink(['ufs','','disponibilidad','fas fa-user fa-2x text-gray-300', h1, true]);
        hLinks.innerHTML = h;     
    }
    gtSo('Hm/availableAvg',rend3)
    getSome('Hm/updtHM','');

}
hInfo.innerHTML = getInfo([hInfo.getAttribute('coname'), hInfo.getAttribute('codesc'), 'Datos de la Empresa','Descripción'])+
                  getInfo([hInfo.getAttribute('uname'),  hInfo.getAttribute('umail'),'Datos del usuario','Email'])
                  