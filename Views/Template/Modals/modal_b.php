<?php 
    switch ($data['page_name']) {
        case 'miperfil':
            $title = 'Mi perfil' ;
            $logo ='<input type="hidden" id="txt_campo8" class="fields">
                        <div class="col-lg-8">
                            <form onsubmit="return false" class="oculto" method="post" enctype="multipart/form-data" id="formUpload">
                            <label>Logo</label>
                            <input type="file" class="form-control" name="image" onchange="upload_img();">
                            </form>
                        </div>  
                        <div class="col-lg-4" >
                            <img id="logo" width="60px;" src="'.media().'/images/sinlogo.png" >
                        </div>';
            $cmbLoc = cmb_constructor('loc', 'Localidad','cmb1','loc',1,'col-sm-6');
            $cmbCat = cmb_constructor('cat', 'Categoría','cmb1','cat',1,'col-sm-4');
            $area = txtarea('notas','txt_campo10', 'Notas');
            $obste = array(
                array("Empresa o negocio","txt_campo1", "text", "Nombre del negocio" ,"col-sm-8",""),
                array('cmbCat'),
                array("Dirección","txt_campo2", "text", "Domicilio" ,"col-md-6",""),
                array('cmbLoc'),
                array("Facebook","txt_campo3","text", "Facebook" ,"col-sm-6",""),
                array("Web","txt_campo4","text", "Web" ,"col-sm-6",""),
                array("Instagram","txt_campo5","text", "Instagram" ,"col-sm-4",""),
                array("Teléfono","txt_campo6","text", "Teléfono fijo" ,"col-sm-4",""),
                array("Whats app","txt_campo7","text", "Whats app" ,"col-sm-4",""),
                array('area'),
                array('logo')
            );            
            break;
        case 'admin':
          $title = 'Admin ';
            $obste=array(
                array("Nombre de usuario","txt_campo1", "text", "username" ,"col-sm-8",""),
                array("Email","txt_campo2", "text", "email" ,"col-sm-8",""),
                array("Teléfono","txt_campo3", "text", "Celular" ,"col-sm-8",""),
                array("pass","txt_campo4", "text", "pass" ,"col-sm-8",""),
            );            
            break;
        default:
            # code...
            break;
    }

 ?>
    <!-- registro de ....... -->
<script>
    function upload_img(){// 
        var formData = new FormData($("#formUpload")[0]);
        campo8 = document.getElementById('txt_campo8').value ; c8=campo8;
        var id = Date.now();
        if (campo8.length>0) {
            id = campo8.replace(/\.[^/.]+$/, "")// recorta la extensión
            //console.log('id a enviarse: '+id)
        }
        formData.append('id', id);    
        $.ajax({
            type: 'POST',    url: 'Controllers/upload.php',
            data: formData,  contentType: false, processData: false    
            }).done(function(resp){  
            if (resp.split(' ')[0]=='Error:') { 
                alert('Error: no se pudo subir la imagen seleccionada');
                return false;
            }    
            //console.log('resp: '+resp);       console.log('c8: '+c8)
            //if (c8.length==0) { console.log('new') }else{ console.log('edit') }
            image=base_url+'Assets/images/uploads/'+resp
            document.getElementById('logo').src = image +'?'+ new Date().getTime();
            document.getElementById('txt_campo8').value = resp
        })    
    }
</script>    
        <div class="modal fade" id="modal_registro" role="dialog" tabindex="-1">
            <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="title" style="text-align: center;"><b><?php echo $title; ?>  </b></h4>
                    <button type="button" class="close" data-dismiss="modal" onclick="LimpiarRegistro();cerrarModal();">&times;</button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="txt_ID" style="width : 20px" >
                    <input type="hidden" id="txt_usID" style="width : 20px">
                    <div class="row">
                        <?php
                            for($i=0; $i<count($obste); $i++) 
                                if ($obste[$i][0]=="lbl2") { echo $lbl2;
                                }elseif ($obste[$i][0]=="lbl3")   {echo $lbl3;
                                }elseif ($obste[$i][0]=="line")   {echo $line;
                                }elseif ($obste[$i][0]=="cmbLoc") {echo $cmbLoc;
                                }elseif ($obste[$i][0]=="cmbCat") {echo $cmbCat;
                                }elseif ($obste[$i][0]=="area") {echo $area;    
                                }elseif ($obste[$i][0]=="logo") {echo $logo;        
                                }else{
                                    echo '<div class="'.$obste[$i][4].'" id= "field'.$i.'">
                                    <input type="'.$obste[$i][2].'" 
                                    class="form-control fields" 
                                     id="'.$obste[$i][1].'" 
                                     placeholder="'.$obste[$i][3].'"'
                                     .$obste[$i][5].'>      <br></div> ';
                            }
                        ?>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="eliminar" class="btn btn-danger" onclick="eliminar()">Eliminar</button>
                    <button id="registrar" class="btn btn-primary" onclick="registrar()">Guardar</button>
                    <button type="button" class="btn btn-secondary" onclick="cerrarModal()">Cancelar</button>
                </div>
            </div>
            </div>
        </div>
