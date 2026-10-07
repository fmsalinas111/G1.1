<!-- Modal -->
<div class="modal fade" id="modalCl" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <h5 class="modal-title" id="titleModal"> Nuevo </h5> -->
        Buscar paciente...
               <button type="button" class="close" data-dismiss="modal" onclick="closeCli()"aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="tile">
            <div class="tile-body">
     <main >

      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <div class="tile-body">              
              <div class="table-responsive">
                <table class="table table-hover table-bordered" id="tableClprpame" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Nombre</th>
                      <th>Dirección</th>
                      <th>Teléfono</th>
                      <th>Nro docum</th>
                      <th>Email</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>    
    </main>


            </div>                   
          </div>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
  
  document.addEventListener('DOMContentLoaded', function() {
    type = localStorage.getItem('cppm');
    botones = `<button  type='button' class='botonEncontrar btn btn-success btn-sm'><i class='fa fa-desktop'></i></button>`;

  tableCli=$('#tableClprpame').DataTable({
      "aProcessing": true,  "aServerside": true,
      "language": {"url": " "+ base_url+"/Assets/js/plugins/Spanish.json"},
      "ajax": { "url": " " + base_url + "/Clprpames/getClprpames/3", "dataSrc": ""},
      "columns": [
          {"data": "cid"},
          {"data": "fullname"},
          {"data": "clientaddress"},
          {"data": "celu"},
          {"data": "clientci"},
          {"data": "clientemail"},
          {"data": null,"orderable": false},
      ],
        "columnDefs": [ 
        { targets: 0, visible: false},//id
        { targets: 5, visible: false},//email
        { targets: 6, "defaultContent":botones, data: null }  ],
      "responsieve": "true",
      "bDestroy": true,
      "iDisplayLength": 10,
      "order": [  [0, "desc"] ]
    });





    $('#tableClprpame').on( 'click', 'tr', function () {      
        if ( $(this).hasClass('selected') ) {$(this).removeClass('selected');
        }else {tableCli.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');}
    } );
 
/*    $('#button').click( function () {
        table.row('.selected').remove().draw( false );
    } );
*/
    $('#tableClprpame').on('click', 'button.botonEncontrar', function() {
        let registro = tableCli.row($(this).parents('tr')).data(); 
        //btoa("category=textile&user=user1") //atob("Y2F0ZWdvcnk9dGV4dGlsZSZ1c2VyPXVzZXIx")
        //window.location.href = "k_file.php?data="+btoa(registro.clientid) +'&pn='+btoa(registro.clientname);
        document.getElementById('campo4').value = registro.cid;
        closeCli()
        
    });
})

</script>