<!-- Modal2 -->
<div class="modal fade" id="modal2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog ">
    <div class="modal-content" id="modal-content2">
      <div class="modal-header ">
        <h5 class="modal-title" id="titleModal2">Modal title</h5>
        <button type="button" class="close " data-bs-dismiss="modal" aria-label="Close" tabindex="-1">x</button>
      </div>
      <div class="modal-body">
          <div class="tile-body">
            <form id="form2" name="form2" autocomplete="nope">
              <input type="hidden" id="id2" name="id2">
              <div class="inputs2" id="inputs2"></div>
              <div class="modal-footer">
                <div class="alert alert-primary d-none" role="alert">
                  <strong>Actualizando: </strong><i class="fas fa-spinner fa-pulse fa-3x fa-fw"></i> <span id="mensaje">Por favor espere</span>
                </div><br>
                  <button id="btnActionForm2" class="btn btn-primary modalButton save" type="submit" style="margin-bottom: 0px;">
                    <i class="fa fa-fw fa-lg fa-check-circle"></i><span id="btnText">Guardar</span></button>
                  <a class="btn btn-secondary modalButton cancel" href="#" data-dismiss="modal"onclick="closeModal2()" >
                  <i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar</a>
              </div>
            </form>
          </div>                   
      </div>

    </div>
  </div>
</div>
