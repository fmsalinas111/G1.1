xcli    = localStorage.getItem('xcli');//
var idr    = localStorage.getItem('idr');//
var DatosJson;
var avai=[];

//getAvai();
    function getAvai(){
    
      URL = base_url+'K_avai/getAvai/'+idr;     
        const data = new FormData(); 
        data.append('src', 'data');
        fetch(URL, { method: 'POST', body: data})

        .then(data =>data.json())
        .then(data =>{            
            var DatosJson = JSON.parse(JSON.stringify(data));
            //console.log(DatosJson)

        })

    }


   function generateGrid( rows, cols ) {
        
      var grid = '<table class="tftable">';
      // grid += '<caption>Availability sheet</caption>';
      grid += '<thead> <th></th> <th style="width: 0.1 rem">Lun</th> <th style="width: 0.1 rem">Mar</th> <th>Mie</th><th>Jue</th> <th>Vie</th> <th>Sab</th> </thead>';
      grid += '<tbody>';
      for ( row = 1; row <= rows; row++ ) {
          grid += "<tr>"; 
          for ( col = 1; col <= cols; col++ ) {  
            //$( this ).css( 'background-color', 'green' );
              grid += '<td style="white-space:nowrap;" id="'+row+'-'+col+'">' 
              if (col == 1){
                grid += (row+6)+' a '+(row+7);
              }else{
                //grid += '';              
              }
              grid += "</td>";
          }
          grid += "</tr>"; 
      }
      grid += '</tbody>';
      return grid;
   }


function pinta(texto){
  console.log('txt: '+texto)
  json = JSON.parse(texto);
  for (var i in json) { 
    dia = parseInt(json[i].avday)+1;
    hora = json[i].avtime;
    posi = hora+'-'+dia;         
    document.getElementById(posi).style.backgroundColor="green";
    avai.push({avtime:hora, dia:json[i].avday})
  }   

}

document.getElementById('tableContainer').innerHTML = generateGrid(13,7);

getAvai();

  $( "td" ).click(function() {
      var ind=-1;
      var index = $( "td" ).index( this );
      var row = Math.floor( ( index ) / 7) + 1;
      var col = ( index % 7 );
      if (col>0) {        
        selcol = ($( this ).css('background-color'));
        hora = row;     dia = col;         
        ind = avai.findIndex(avai => avai.avtime === row );        
        if (selcol=='rgba(0, 0, 0, 0)') {
            valor = 1;
            //$( this ).css( 'background-color', 'green' );
            this.style.backgroundColor = 'green';
              avai.push({avtime:hora, dia:dia})
        }else{
            //$( this ).css( 'background-color', '' );
            this.style.backgroundColor = '';
            ind = avai.findIndex(avai => avai.dia === col.toString() && avai.avtime === row.toString() );    
            avai.splice(ind,1)
        }
      }
  });   

  document.getElementById('btnGuardar').addEventListener('click', function(){
    registrar (avai);  })

    function registrar(avai){
        drid = document.getElementById('txtId').value;        
        //console.log(avai)
        const json = JSON.stringify(avai)
        const data = new FormData();
        data.append('datos', json);
        data.append('mode', idr);
        //data.append('paciente', 9);
        URL = base_url+'K_avai/setAvai/';
        //fetch('controller/C_avai.php', {
        fetch(URL, {method: 'POST',body: data})
        .then(function(response) {
           if(response.ok) {return response.text()}else{ throw "Error Ajax";}
        })
        .then(function(texto) {
           //console.log(texto);
              var objData = JSON.parse(texto);
              alert (objData.msg)                  
           
        })
        .catch(function(err) {
           console.log(err);
        });
    }

  /*
  Una petición ajax funciona de manera asíncrono y es por eso que si intentas devolver una variable y asignarla a otra devolverá undefined. Es por ello que tienes que acostumbrarte a escribir código de forma asíncrona. Una forma como han comentado son los callbacks, aunque este tipo de pattern puede llevar a hacer el código poco legible. Para tu ejemplo deberías hacer algo así :

  function funcionAsync (datos, callback){
    jQuery.ajax({
      type: 'POST',
      url: ajaxurl,
      data: datos,
      success: function (data) {
         callback(null, data);
      },
      error: function (errorThrown) {callback(errorThown);}
    });
  }
  Y para la ejecución de la función :

  funcionAsync(mis_datos, function(errorLanzado, datosDevueltos){
    if(errorLanzado) // Ha habido un error, deberías manejarlo :/
      return;
    // Tu código para hacer algo con datosDevueltos va aquí
  });
  Desde ECMAESCRIPT 6 existe una clase llamada Promise la cual es especialemnte util para trabajar con código asíncrono :

  Ten en mente la función asíncrono de antes, con Promise harías algo así :

  function funcionAsync (datos){
    // La primera diferencia es que no se le pasa un callback,
    // La función devuelve una Promise
    return new Promise(function(resolver, rechazar){
      jQuery.ajax({
        ...
        success : function(data){resolver(data)},
        error : function(error){rechazar(error)}
      });
    });
  }
  Ahora para utilizarla :

  funcionAsync(datos)
  .then(function(datosDevueltos){
    // Aquí el código para hacer algo con datosDevueltos
  }, function(errorLanzado){
    // Aquí el código para hacer algo cuando ocurra un error.
  });

  */
