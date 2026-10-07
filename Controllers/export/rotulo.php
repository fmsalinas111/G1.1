<?php
require('fpdf/fpdf.php');

class PDF extends FPDF
{
// Cabecera de página
function Header()
{
    // Logo
    $this->Image('logo_pb.png',5,8,60);

    require '../ajax/db_connection.php';

    $consulta = "SELECT * from g_clientes 
        WHERE id_cliente  = ". $_GET['id'];

    $resultado = $con->query($consulta);
    $row = mysqli_fetch_array($resultado);
    $name =  utf8_encode($row['nombre']);     $name = utf8_decode($name);

    $this->Cell(35);
    $this->SetFont('Arial','B',15);       
    $this->Cell(50);        $this->Cell(70,10,'Sr/a: '.$name,1,1);

    $this->SetFont('Arial','B',14);
    $this->Ln(5);  $this->Cell(45); $this->Cell(40,10,'Sr/a: '. $name);
        //$this->Cell(45); $this->cell(50,10,utf8_decode($name),0,0,'L');
    $this->Ln(5);  $this->Cell(20); $this->Cell(40,10,utf8_decode('Dirección: '));
        $this->Cell(45); $this->cell(50,10,utf8_decode($row['direccion']),0,0,'L');
        //$pdf->Cell(0,10,utf8_decode('Imprimiendo línea número ').$i,0,1);
    $this->Ln(5);  $this->Cell(20); $this->Cell(40,10,'Localidad: '.$row['telefono'],0,0,'L');
    $this->Ln(5);  $this->Cell(20); $this->Cell(40,10,'CUIT/DNI: '.$row['cuit'],0,0,'L');
  

    //$this->Cell(100,10,'GUIA DE DESPACHO'. $_GET['id'].' Cliente: '.$_GET['cliente'],1,0,'C');
    // Salto de línea

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
 