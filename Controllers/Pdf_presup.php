<?php 

if (session_status() == PHP_SESSION_NONE) session_start(); 
require('export/fpdf/fpdf.php');
class Pdf_presup extends FPDF{
	function Header(){
		$client = json_decode($_SESSION['pdfClient'], true);
	    // Logo
		$ruta = base_url().'/Assets/images/logo/';
		$logo = (strlen($_SESSION['logo'])==0)?logoJPG($_SESSION['app']):$_SESSION['logo'];
		$logo = $ruta.$logo;
		$img_type = imageType($logo);
        $this->Image($logo, 10,8,30,30,$img_type); //"jpg"
        //fin logo----
        
        //company data
		$cDes = $_SESSION['companyDescription'];
		$cds = array_map('trim', preg_split('/\R/', $cDes));
        //end company data
		$name = ($client["fullname"]?? ''); 
	  	$ads = array_map('trim', preg_split('/\R/', $client['addr']?? ''));

	    $this->SetFont('Arial','',10);
	    $this->setXY(50,5);	$this->Cell(80,10, $cds[0],0,0,'L',0);
		$this->setXY(50,9); $this->Cell(80,10,$cds[1],0,0,'L',0);
		$this->setXY(50,13); $this->Cell(80,10,$cds[2],0,0,'L',0);
		$this->setXY(50,20); $this->Cell(80,10,$cds[3],0,0,'L',0);
		$this->setXY(50,24); $this->Cell(80,10,$cds[4],0,0,'L',0);
		$this->setXY(50,28); $this->Cell(80,10,$cds[5],0,0,'L',0);
		$this->setXY(50,32); $this->Cell(80,10,$cds[6],0,0,'L',0);

		$this->setXY(140,10);
		$this->Cell(50,10,"Fecha: ".$client['fecha'],1,0,'L',0);
	    
		$this->setXY(140,20);
        $this->Cell(50,10,"Presupuesto:  {$client['sid']}",1,1,'L');
        $this->Ln(15); $this->Cell(5);  
        $this->Cell(100,10,"Cliente: $name",0,0,'L');
        $this->Ln(6); $this->Cell(5);  
        $this->Cell(100,10, utf8_decode('Dirección: '. $ads[0]),0,0,'L');
        $this->Ln(6); $this->Cell(5);  
        $this->Cell(100,10, utf8_decode(''. $ads[1].', '.$ads[2]),0,0,'L');

		$this->setXY(140,44); $this->Cell(80,10,'CUIT  '.$client['cuit'],0,0,'L',0);
		$this->setXY(140,48); $this->Cell(80,10,'IVA:  '.$client['iva'],0,0,'L',0);        


	    // Salto de línea
	    $this->Ln(25);
		$this->Cell(98,10,'Producto',1,0,'C',0);
		$this->Cell(22,10,'Cantidad',1,0,'C',0);
		$this->Cell(30,10,'Precio',1,0,'C',0);
	    $this->Cell(30,10,'Importe',1,1,'C',0);
	}	

    function Footer() {   // Posición: a 1,5 cm del final
        $this->SetY(-15);
        $this->SetFont('Arial','I',8);
        //$this->Cell(0,10,('Página ').$this->PageNo().'/{nb}',0,0,'C');
        //$this->Cell(0,10,utf8_decode('Página ').$this->PageNo().'/{nb}',0,0,'C');
    }
    function matriz(){
    	$info = json_decode($_SESSION['pdfJson'], true);
    	$client = json_decode($_SESSION['pdfClient'], true);
    	print_r($client);
    	foreach ($info as $v) echo $v["product"].' '. $v["precio"].'<br>';

    }
}

$pdf = new Pdf_presup();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',12);
$i=0; $cant=0; $numProd=0;
$info = json_decode($_SESSION['pdfJson'], true);
$client = json_decode($_SESSION['pdfClient'], true);
foreach ($info as $v)	{
    $pdf->Cell(98,8,utf8_decode($v["product"].' '.$v['notas']),1);
    //$pdf->Cell(150,8,utf8_decode($v['product'].' '.$v['notas']),1);
    $pdf->Cell(22,8,$v['cantidad'],1,0,'C',0);
    $pdf->Cell(30,8,$v['precio'],1,0,'C',0);
    $pdf->Cell(30,8,number_format($v['cantidad']*$v['precio']),1,1,'R',0);

    $i = $i +  ($v['precio']*$v['cantidad']);
    $cant = $cant +  $v['cantidad'];
    $numProd = $numProd + 1;	    
}
$pdf->SetFont('Arial','B',14);
$prendas= 'unidades';//(($_SESSION['app']==13))?'unidades':'';
$pdf->Cell(150,10,'Son: '.$numProd." productos ($cant $prendas)                            Total:",1,0,'C',0);
$pdf->Cell(30,10, number_format($i,0).' ', 1,1,'R',0);

ob_end_clean();
$pdf->Output();

?>