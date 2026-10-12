const myModal3=document.getElementById("modal3"); modal3=new bootstrap.Modal(myModal3);
if(localStorage.page==='null')  modal3.show()


Toperceive={};
hLinks=document.getElementById('links');
const getLink = data=>{    return  `
	<div class="col-xl-3 col-md-6 mb-4">
		<a href="${data[0]}" ${data[1]}">
        <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                            ${data[2]}</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">$${data[4]}</div>
                    </div>
                    <div class="col-auto">  <i class="${data[3]}"></i> </div>
                </div>            </div>        </div>        </a>    </div>    `;
}

d1=new FormData(); d1.append('src','client'); f_URL=base_url+'Cpacos/summToPerception/-99';
gJSON(f_URL,d1).then((json)=>{ Toperceive=json;    render(Toperceive);
}).catch((err)=>console.log("Err:", err));

const render =data=>{    h=''; text_link=''
    for (x of data) {
        text_link='Cuentas por '; text_link+= (x.type==1)?'cobrar':'pagar'; 
        h+=getLink(['cpacos',`onclick="setAcc(${x.type})"`, text_link, 'fas fa-dollar-sign fa-2x text-gray-300',x.saldo])
    }
    hLinks.innerHTML=h;
}


link1=getLink(['cpacos','onclick="setAcc(1)"','Cuentas por cobrar', 'fas fa-dollar-sign fa-2x text-gray-300'])
link2=getLink(['cpacos','onclick="setAcc(2)"','Cuentas por pagar', 'fas fa-dollar-sign fa-2x text-gray-300'])
//hLinks.innerHTML=link1+link2;


