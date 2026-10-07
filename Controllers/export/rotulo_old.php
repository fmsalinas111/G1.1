<?php
require('fpdf/fpdf.php');

class PDF extends FPDF
{
// Cabecera de página
function Header()
{
    // Logo
    $this->Image('logo_pb.png',5,8,60);
    $this->Cell(35);
    $this->SetFont('Arial','B',15);       
    $this->Cell(50);        $this->Cell(60,10,'GUIA DE DESPACHO',1,1,'C');

    $this->Ln(14); 
    $this->Cell(80);
    $this->Cell(80,10,'FECHA:',1,0,'L');
    $this->Ln(10); 

    $this->SetFont('Arial','B',10);
    $this->Ln(5);    $this->Cell(80);    $this->Cell(80,10,'CUIT: 20-92948887-4',0,0,'L');
    $this->Ln(5);    $this->Cell(80);    $this->Cell(80,10,'ING. BRUTOS: 20-92948887-4',0,0,'L');
    $this->Ln(5);    $this->Cell(80);    $this->Cell(80,10,'INIC. ACT: 01/06/2005',0,0,'L');
    // Arial bold 15
    $this->Line(18,68,190,68); //col, fila Inicial, largo, col final 
    $this->Line(18,95,190,95);
/*
$this->Ln(50);
$this->SetFillColor(255, 99, 71);
$this->Rect(10, 55, 190, 140, 'F');
$this->Line(10, 55, 15, 40);
$this->SetXY(15, 40);
$this->Cell(15, 6, '10, 35', 0 , 1);
*/
    require '../ajax/db_connection.php';

    $consulta = "SELECT * from g_clientes 
        WHERE id_cliente  = ". $_GET['id'];

    $resultado = $con->query($consulta);
    $row = mysqli_fetch_array($resultado);




    $this->SetFont('Arial','B',14);
    $this->Ln(5);  $this->Cell(20); $this->Cell(40,10,'Sr/a:      ');
        $this->Cell(45); $this->cell(50,10,utf8_decode($row['nombre']),0,0,'L');
    $this->Ln(5);  $this->Cell(20); $this->Cell(40,10,utf8_decode('Dirección: '));
        $this->Cell(45); $this->cell(50,10,utf8_decode($row['direccion']),0,0,'L');
        //$pdf->Cell(0,10,utf8_decode('Imprimiendo línea número ').$i,0,1);
    $this->Ln(5);  $this->Cell(20); $this->Cell(40,10,'Localidad: '.$row['telefono'],0,0,'L');
    $this->Ln(5);  $this->Cell(20); $this->Cell(40,10,'CUIT/DNI: '.$row['cuit'],0,0,'L');
  

    //$this->Cell(100,10,'GUIA DE DESPACHO'. $_GET['id'].' Cliente: '.$_GET['cliente'],1,0,'C');
    // Salto de línea

    $this->Ln(30);
	$this->Cell(30,10,'Cantidad',1,0,'C',0);
	$this->Cell(30,10,'Detalle',1,0,'C',0);


}



// Pie de página
function Footer()
{
    // Posición: a 1,5 cm del final
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Número de página
    $this->Cell(0,10,utf8_decode('Página ').$this->PageNo().'/{nb}',0,0,'C');
}
}
/*
require '../ajax/db_connection.php';

$consulta = "SELECT * from g_clientes 
    WHERE id_cliente  = ". $_GET['id'];

$resultado = $con->query($consulta);
*/
// Creación del objeto de la clase heredada
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',12);
//for($i=1;$i<=40;$i++)
 //   $pdf->Cell(0,10,utf8_decode('Imprimiendo línea número ').$i,0,1);
/*
$i=0;
while($row = mysqli_fetch_array($resultado)){
    $pdf->Cell(90,10,$row['nombre'],1,0,'L',0);
	$pdf->Cell(30,10,$row['telefono'],1,0,'C',0);
	$pdf->Cell(30,10,$row['cuit'],1,0,'R',0);
	$pdf->Cell(30,10,$row['direccion'],1,1,'R',0);
//    $i = $i +  ($row['det_precio']*$row['cantidad']);
}
*/
$pdf->SetFont('Arial','B',15);

$pdf->Cell(150,10,('Total pedido'),1,0,'C',0);
$pdf->Cell(30,10, '$i', 1,1,'R',0);

$pdf->Output();
?>
 