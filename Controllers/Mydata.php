<?php 
	if (session_status() == PHP_SESSION_NONE) session_start(); 
    $path = __DIR__ . '/../Helpers/Sanitizer.php';
    if (!file_exists($path)) die("El archivo no existe en: " . realpath(__DIR__ . '/..') . '/Helpers/Sanitizer.php');    
    require_once $path;
	
	class Mydata extends Controllers {public function __construct(){parent:: __construct();}	
	public function mydata(){
		$data['page_id']=100; 
		$data['page_name']= 'mydata';		
		$data['page_title']= 'Mis datos';
        $arrResp = $this->getPerfil('xd');
        $data['bcard'] = json_encode($arrResp);        
		$this->views->getView($this, $data['page_name'], $data);
	}

    public function getPerfil(string $x=''){ //bcard and co 
		$arrData = $this->model->selPerfil();
        $img = $arrData['logo']; 
        if (!empty($img)){  	
            if (!filter_var($img, FILTER_VALIDATE_URL)) $img = base_url().'Assets/images/logo/' .$img;
            $arrData['logo'] = $img;} 
            else $img = null;
            //hacer lo mismo con banner web
        
        if ($x==='xd') {return $arrData;}
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);	die();
	}

	private function procesarImagenSegura(array $file, string $prefix): array {
        // 1. Validar tamaño máximo (Ej. 3 MB)
        $maxSize = 3 * 1024 * 1024;
        if ($file['size'] > $maxSize) {
            return ['exito' => false, 'error' => 'La imagen excede el tamaño máximo permitido (3MB).'];
        }

        // 2. Validar Tipo MIME real (No confiar en $file['type'])
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        //finfo_close($finfo);
        unset($finfo);

        $tiposPermitidos = [
            'image/jpeg' => 'jpg',
            'image/png'  => 'png',
            'image/webp' => 'webp'
        ];

        if (!array_key_exists($mimeType, $tiposPermitidos)) {
            return ['exito' => false, 'error' => 'El archivo no es una imagen válida (Formatos permitidos: JPG, PNG, WEBP).'];
        }

        // 3. Inspección física de que sea una imagen real[span_7](start_span)[span_7](end_span)
        if (@getimagesize($file['tmp_name']) === false) {
            return ['exito' => false, 'error' => 'El archivo subido está dañado o es corrupto.'];
        }

        // 4. Generar un nombre de archivo único para evitar sobrescribir[span_8](start_span)[span_8](end_span)
        $extension = $tiposPermitidos[$mimeType];
        $nombreUnico = $prefix . '_' . uniqid() . '_' . time() . '.' . $extension; //[span_9](start_span)[span_9](end_span)

        // 5. Mover el archivo a la carpeta pública de subidas
        $destino = './Assets/images/logo/' . $nombreUnico;
        //$uploadPath = "../Assets/images/uploads/"; // Ruta subida productos

        if (move_uploaded_file($file['tmp_name'], $destino)) {
            return ['exito' => true, 'nombre_archivo' => $nombreUnico];
        }

        return ['exito' => false, 'error' => 'No se pudo guardar la imagen en el servidor.'];
    }

	
	
	public function setPerfil() { //dep($_POST);
        //header('Content-Type: application/json');
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
            return;    }
        // -------------------------------------------------------------
        // A. SANITIZACIÓN Y VALIDACIÓN DE TEXTOS Y REDES
        // -------------------------------------------------------------
        $nombreEmpresa = Sanitizer::cleanString($_POST['nombre_empresa'] ?? '');
        $eslogan       = Sanitizer::cleanString($_POST['eslogan'] ?? '');
        $whatsapp      = Sanitizer::cleanNumbersOnly($_POST['whatsapp'] ?? '');
        $telefono      = Sanitizer::cleanString($_POST['telefono'] ?? '');
        $emailContacto = Sanitizer::cleanEmail($_POST['email_contacto'] ?? '');
        $horarios      = Sanitizer::cleanString($_POST['horarios'] ?? '');
        $direccion     = Sanitizer::cleanString($_POST['direccion'] ?? '');
        // Redes sociales (Limpiamos usernames/URLs)
        $instagram = Sanitizer::cleanString($_POST['instagram'] ?? '');
        $facebook  = Sanitizer::cleanString($_POST['facebook'] ?? '');
        $tiktok    = Sanitizer::cleanString($_POST['tiktok'] ?? '');
        $sitioWeb  = Sanitizer::cleanUrl($_POST['sitio_web'] ?? '');
        // Datos Fiscales y de Cobro
        $razonSocial  = Sanitizer::cleanString($_POST['razon_social'] ?? '');
        $cuit         = Sanitizer::cleanNumbersOnly($_POST['cuit'] ?? '');
        $condicionIva = Sanitizer::cleanNumbersOnly($_POST['condicion_iva'] ?? '');
        $aliasBanco   = Sanitizer::cleanString($_POST['alias_banco'] ?? '');
        $cbuBanco     = Sanitizer::cleanNumbersOnly($_POST['cbu_banco'] ?? '');

        // Validaciones mínimas requeridas
        if (empty($nombreEmpresa)) {
            echo json_encode(['status' => 'error', 'message' => 'El nombre del emprendimiento es obligatorio.']);
            return;    }

        if (empty($whatsapp)) {
            echo json_encode(['status' => 'error', 'message' => 'Ingresa un número de WhatsApp válido.']);
            return;    }

        // -------------------------------------------------------------
        // B. VALIDACIÓN Y SUBIDA SEGURA DE IMÁGENES (Logo / Banner)
        // -------------------------------------------------------------
        $logoNombreGuardado = null;
        
        if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
            $resultadoLogo = $this->procesarImagenSegura($_FILES['logo'], 'logo');            
            if ($resultadoLogo['exito']) {
                $logoNombreGuardado = $resultadoLogo['nombre_archivo'];
            } else {
                echo json_encode(['status' => 'error', 'message' => $resultadoLogo['error']]);
                return;
            }
        }

        // -------------------------------------------------------------
        // C. GUARDAR EN BASE DE DATOS A TRAVÉS DEL MODELO
        // -------------------------------------------------------------
        $datosSanitizados = [
            'nombre_empresa' => $nombreEmpresa,     'eslogan'   => $eslogan,
            'whatsapp'       => $whatsapp,          'telefono'  => $telefono,
            'email_contacto' => $emailContacto,     'horarios'  => $horarios,
            'direccion'      => $direccion,
            'instagram'      => $instagram,            'facebook'       => $facebook,
            'tiktok'         => $tiktok,               'sitio_web'      => $sitioWeb,
            'razon_social'   => $razonSocial,          'cuit'           => $cuit,
            'condicion_iva'  => $condicionIva,         'alias_banco'    => $aliasBanco,
            'cbu_banco'      => $cbuBanco, 
            'logo'           => $logoNombreGuardado // Guardar la ruta/nombre en la BD
        ];
        $coData = ['pagename'=>$nombreEmpresa, 'razon'=>$razonSocial, 'cuit'=>$cuit, 'catIva'=>$condicionIva, 
                    'logo'=>$logoNombreGuardado, 'alias'=>$aliasBanco, 'cbu'=>$cbuBanco];

        // Llamada a tu modelo (ejemplo PDO con Sentencias Preparadas)
        $saveCompany = $this->model->updCo($coData); 
        $guardadoOk = $this->model->updPerfil($datosSanitizados);
        
        if ($guardadoOk && $saveCompany) {   
            //$_SESSION['company']=$this->Coname;
            $_SESSION['page']=$nombreEmpresa;
            echo json_encode(['status' => 'success', 'message' => 'Configuración guardada exitosamente.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar en la base de datos.']);
        }
    }


}?>