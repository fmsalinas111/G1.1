	<?php  

	    $page = "Assets/js/".$data['page_name'].".js";

		echo '<script> 

		    const base_url = "'.base_url().'"; 

		    

		</script>';        

	?>

	<br> <script  src="<?= media();?>/js/main.js"></script>

	<?php

	/*

		echo server();

		if($_SERVER["SERVER_NAME"] == "127.0.0.1" 

			or $_SERVER["SERVER_NAME"] == "localhost"

			or $_SERVER["SERVER_NAME"] == "0.0.0.0"

			)

			echo "<script src='$page'></script>";

		   	else */

		echo "<script src='".$page."?v=".filemtime($page)."'></script>";

		$fi = h($data['footerItems'],[]); 

		foreach ($fi as $i) { 

			//$l = "<script src='$i'". "?v=".  filemtime($i)  ."></script>";

			$l = "<script src='$i'></script>";

			

			echo $l.PHP_EOL;

			//echo $l."?v=".filemtime($l)".PHP_EOL; 

		}        

	?>

  </body>

</html>

