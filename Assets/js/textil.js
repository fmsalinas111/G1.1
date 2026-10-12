const getLink = data=>{  
  return  `
	<div class="col-xl-3 col-md-6 mb-4">
		<a href="${data[0]}" ${data[1]}">
        <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                            ${data[2]}</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">$</div>
                    </div>
                    <div class="col-auto">
                        <i class="${data[3]}"></i>
                    </div>
                </div>
            </div>
        </div>
        </a>
    </div>  
  `
}

hLinks=document.getElementById('links');
hLinks.innerHTML=getLink(['cpacos','onclick="setXslt(1)"','Cuentas por cobrar', 'fas fa-dollar-sign fa-2x text-gray-300'])