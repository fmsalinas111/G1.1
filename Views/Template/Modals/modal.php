<?php 
  $modalSize = 'modal-md';
  if ($data['page_name']=='products') $modalSize=' modal-lg';
  if ($data['page_name']=='clprpames') $modalSize=' modal-lg';
  if ($data['page_name']=='k_hisconsultas') $modalSize=' modal-lg';
  if ($data['page_name']=='k_consultation') $modalSize=' modal-lg';
  if ($data['page_name']=='inventory') $modalSize=' modal-lg';
  if ($data['page_name']=='h_contracts') $modalSize=' modal-lg';
  if ($data['page_name']=='ecommerce') $modalSize=' modal-lg modal-dialog-scrollable';
?>
<div class="modal fade" id="modalForm" 
  data-bs-backdrop="static" data-bs-keyboard="false"
   role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable <?php echo($modalSize);?>" id="role" role="document">
    <div class="modal-content" id="modal-content">
      <div class="modal-header headerRegister">
        <h5 class="modal-title" id="titleModal"> Nuevo </h5>&nbsp;&nbsp;
        <div class="otherBtns" id="otherBtns">
          <a class="btn btn-info d-none" id="btnCopyNew" title="Copia los datos visibles en un nuevo registro, es muy útil para evitar reescribir" href="#" onclick="copy_new();" ><i class="fa fa-fw fa-lg fa-copy"></i>Copiar y nuevo</a>
        </div>
        <button type="button" id="btnClose" class="close modalButton" data-dismiss="modal" onclick="closeModal()"aria-label="Close
        " tabindex="-1">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="tile">
          <div class="tile-body">
            <form id="form" name="form" autocomplete="nope">
              <input type="hidden" id="id" name="id" value="">
              <div class="inputs" id="inputs"></div>
              <div class="tile-footer ml-15" id="tile-footer">
                <div id="alert1" class="alert alert-primary d-none" role="alert">
                  <strong>Actualizando: </strong><i class="fas fa-spinner fa-pulse fa-3x fa-fw"></i> <span id="mensaje">Por favor espere</span>
                </div>
                <br>
                <button id="btnActionForm" disabled class="btn btn-primary modalButton" type="submit" style="margin-bottom: 0px;">
                  <i class="fa fa-fw fa-lg fa-check-circle"></i><span id="btnText">Guardar</span></button>&nbsp;&nbsp;&nbsp;                 
                <a class="btn btn-secondary modalButton" id="btnCancel" href="" data-dismiss="modal"onclick="closeModal();event.preventDefault();" >
                  <i class="fa fa-fw fa-lg fa-times-circle"></i>Cancelar</a>&nbsp;&nbsp;&nbsp;
                <a class="btn btn-danger modalButton btnDelete" id="btnDelete" href="#"  
                  style="display: none; "><i class="fa fa-fw fa-lg fa-trash" title="Eliminar"></i></a>
              </div>
            </form>
          </div>                   
        </div>
      </div>
    </div>
  </div>
</div>
<script defer type="text/javascript">
/*
select = document.querySelectorAll('.selectEl');
console.log(select)
    select.addEventListener('keypress', e => {
    if(e.repeat){
      e.preventDefault();
      return;
    }
    // Lógica aquí

    console.log('keypress ' + String.fromCharCode(e.which || e.keyCode))
    });*/
</script>
