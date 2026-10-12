<?php
class Tenant extends Controllers {
    public function __construct() {parent::__construct();}
	public function store(){
		//echo TENANT_SLUG;
		$data['page_id']=1; 
		$data['page_name']= 'eco6';		
		$data['page_page']= TENANT_SLUG;		
		$data['page_title']= TENANT_SLUG; 'title';//clientes, pacientes, inquilinos, etc
		$rPage = $this->model->getPage(TENANT_SLUG);
        if (empty($rPage)) {  //page not found
          $data['error'] = 404; $this->views->getView($this,"error",$data);
        }else{
          # si existe método en el controller (dentro de una gale)
         // if (strlen($method)>0) $rPage = $this->model->getPage($method);	
		# data
            $data['page_idCo'] = $rPage['companyid'];
            $data['page_app'] = $rPage['APP'];
            $data['page_idBcard'] = $rPage['bcardid'];
            $data['page_nameCo'] = $rPage['companyname'];
            $data['page_page'] = $rPage['page'];
            $data['page_address'] = $rPage['address'];
            $data['page_wsp'] = $rPage['wsp'];
            $data['page_phone'] = $rPage['phone'];
            $data['page_web'] = $rPage['web'];
            $data['page_sections'] = $rPage['sections'];
            $data['page_template'] = $rPage['template'];
            $data['page_prod_layout']=substr($rPage['productconfig'],-1);
            
            $logo = $rPage['logo'];
            /*
            if (strlen($rPage['logo'])==0) {
              $logo = media().'/images/logo/'.logo($rPage['APP']);
            }else{
              $logo = (substr($rPage['logo'], 0, 4)==='http')?
              $rPage['logo']: media().'/images/'.$rPage['logo'];        
            }
			*/
            $data['page_logo'] = $logo;
            //$data['page_insta'] = ($rPage['insta']<>'')?'<a href="'.$rPage['insta'].'" class="instagram"><i class="bi bi-instagram"></i></a>':'';
            //$data['page_face'] = ($rPage['face']<>'')?'<a href="'.$rPage['face'].'" class="facebook"><i class="bi bi-facebook"></i></a>':'';
            # redes

              $data['page_face'] = ($rPage['face']<>'')?$rPage['face']:'';
              $data['page_insta'] = ($rPage['insta']<>'')?$rPage['insta']:'';
              $data['page_insta'] = substr($data['page_insta'],26);
              $data['page_twitter'] = ($rPage['twitter']<>'')?'<a href="'.$rPage['twitter'].'" class="twitter"><i class="bi bi-twitter"></i></a>':'';
              $data['page_tiktok']  = ($rPage['tiktok']<>'')?'<a href="'.$rPage['tiktok'].'" class="tiktok"><i class="bi bi-tiktok"></i></a>':'';

            $data['page_category'] = $rPage['businesscategory'];
            $data['page_email'] = $rPage['email'];
            
          

          
         // if (USR()==0) $this->autoLogin($rPage['companyid']);          
          //echo $controller.'/'.$method.':  '.$data['page_name']; exit();
          $this->views->getView($this,$data['page_name'],$data);

				
		}
	}
	
    public function buscarTenant($slug, $method = '', $params = '') {
        // Aquí buscas en MariaDB si el $slug existe como tienda/cliente
        // $empresa = $this->model->getTenantBySlug($slug);
		echo $slug;
        $tenantExiste = true; // Simulación de tu consulta a BD

        if ($tenantExiste) {
            // Cargas el catálogo o la vista de la tienda del cliente
            echo "Cargando la tienda/catálogo de: " . htmlspecialchars($slug);
             $this->views->getView($this, "info", $data);
        } else {
            // Si el slug tampoco existe en la BD, recién ahí mostramos 404
            require_once("Controllers/Error.php");
            $err = new Errors();
            $err->notFound();
        }
    }
    
    
}?>

