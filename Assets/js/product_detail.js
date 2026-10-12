let params = new URLSearchParams(location.search);
var app = params.get('app');

function render(){	
	URL = base_url+'Portfolio_details/pfd/3';			
		const data = new FormData(); 
	  data.append('mode', -99);
	  fetch(URL, { method: 'POST', body: data})
	  .then(function(response) {
	     if(response.ok) {return response.text()} else {throw "Error Ajax";}
	  })
	  .then(function(texto) {
	  	alert(texto)
	  })
	  .catch(function(err) {console.log(err);});
}

//render();


document.getElementById('pr_title').innerHTML=app;