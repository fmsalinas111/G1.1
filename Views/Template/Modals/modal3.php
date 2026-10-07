<?php   //  $modalSize = 'modal-md';?>
<div class="modal fade" id="modal3" 
  data-bs-backdrop="static" data-bs-keyboard="false"
  tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable <?php echo($modalSize);?>" id="role" role="document">
    <div class="modal-content" id="modal-content">
      <div class="modal-header headerRegister">
        <h5 class="modal-title" id="titleModal3"> Nuevo </h5>&nbsp;&nbsp;
        <button type="button" id="btnClose" class="close modalButton" data-dismiss="modal" onclick="closeModal(3)"aria-label="Close
        " tabindex="-1"> <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="tile">
          <div class="tile-body">
            <form id="form3" name="form3" autocomplete="nope">
              <input type="hidden" id="id" name="id" value="">
              <div class="inputs3" id="inputs3"></div><br>
              <div class="tile-footer ml-15" id="tile-footer">
                <div id="alert1" class="alert alert-primary d-none" role="alert">
                  <strong>Actualizando: </strong><i class="fas fa-spinner fa-pulse fa-3x fa-fw"></i> <span id="mensaje">Por favor espere</span>
                </div>
                <br>
                <button id="btnActionForm3" class="btnActionForm3 btn btn-primary modalButton" type="submit" style="margin-bottom: 0px;">
                  <i class="fa fa-fw fa-lg fa-check-circle"></i><span id="btnText">Guardar</span></button>&nbsp;&nbsp;&nbsp;                 
                <a class=" btnCancel btn btn-secondary modalButton" id="btnCancel" href="" data-dismiss="modal"onclick="closeModal(3);event.preventDefault();" >
                  <i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar</a>&nbsp;&nbsp;&nbsp;
                <a class="btnDelete btn btn-danger modalButton d-none" id="btnDelete" href="#">
                  <i class="fa fa-fw fa-lg fa-trash" title="Eliminar"></i></a>
              </div>
            </form>
          </div>                   
        </div>
      </div>
    </div>
  </div>
</div>
