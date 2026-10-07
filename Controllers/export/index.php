<?php
require('fpdf/fpdf.php');

class PDF extends FPDF
{
    // Cabecera de página
    function Header(){
        // Logo
        $this->Image('logo_pb.png',10,8,33);
        // Arial bold 15
        $this->SetFont('Arial','B',15);
        // Movernos a la derecha
        $this->Cell(60);
        // Título
        $name =  utf8_decode($_GET['cliente']);  
        //$name =  ($_GET['cliente']);  

        $this->Cell(120,10,'Pedido:'. $_GET['id'].'    Cliente: '.$name,1,0,'C');
        // Salto de línea
        $this->Ln(30);
    	$this->Cell(98,10,'Producto',1,0,'C',0);
    	$this->Cell(22,10,'Cantidad',1,0,'C',0);
    	$this->Cell(30,10,'Precio',1,0,'C',0);
        $this->Cell(30,10,'Importe',1,1,'C',0);
    }

    // Pie de página
    function Footer()
    {
        // Posición: a 1,5 cm del final
        $this->SetY(-15);
        // Arial italic 8
        $this->SetFont('Arial','I',8);
        // Número de página
        //$this->Cell(0,10,utf8_decode('Página ').$this->PageNo().'/{nb}',0,0,'C');
        $this->Cell(0,10,('Página ').$this->PageNo().'/{nb}',0,0,'C');
    }
}

//require '../ajax/db_connection.php';
    include '../BD/conexion.php';


/*$consulta = "select salesid, ms_details.price, ms_details.productid, quantity, comments, productname from ms_details 
    INNER JOIN ms_products on ms_details.productid = ms_products.productid
    INNER JOIN ms_sales on ms_details.salesid = ms_sales.salesid
    INNER JOIN ms_clients on ms_clients.clientid = ms_sales.clientid
    WHERE ms_sales.salesid = ". $_GET['id'];
*/
    $consulta = "select salesid, ms_details.price, ms_details.productid, quantity, comments, productname from ms_details INNER JOIN ms_products on ms_details.productid = ms_products.productid WHERE salesid =". $_GET['id'];

$resultado = $conexion->query($consulta);

// Creación del objeto de la clase heredada
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',12);
//for($i=1;$i<=40;$i++)
 //   $pdf->Cell(0,10,utf8_decode('Imprimiendo línea número ').$i,0,1);
$i=0; $cant=0; $numProd=0;


while($row = mysqli_fetch_array($resultado)){
    $pdf->Cell(98,10,utf8_decode($row['productname']),1,0,'L',0);
	$pdf->Cell(22,10,$row['quantity'].'    ',1,0,'R',0);
	$pdf->Cell(30,10,$row['price'].'  ',1,0,'R',0);
	$pdf->Cell(30,10,number_format($row['quantity']*$row['price']).'  ',1,1,'R',0);
    $i = $i +  ($row['price']*$row['quantity']);
    $cant = $cant +  $row['quantity'];
    $numProd = $numProd + 1;
}
$pdf->SetFont('Arial','B',15);

$pdf->Cell(150,10,'Son: '.$numProd.' productos, ('.$cant.' prendas)                            Total:',1,0,'C',0);
$pdf->Cell(30,10, number_format($i,0).' ', 1,1,'R',0);

ob_end_clean();
$pdf->Output();
?>
 