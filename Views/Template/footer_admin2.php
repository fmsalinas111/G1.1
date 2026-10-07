	<?php  
	    $page = "Assets/js/".$data['page_name'].".js";
		echo '<script> 
		    const base_url = "'.base_url().'"; 
		    const page="'.$page.'";
		</script>';        
	?>
	<br> <script  src="<?= media();?>/js/main.js"></script>
	<?php
		if($_SERVER["SERVER_NAME"] == "127.0.0.1" or $_SERVER["SERVER_NAME"] == "localhost")
			echo "<script src='$page'></script>";
		   	else echo "<script src='".$page."?v=".filemtime($page)."'></script>";
	?>
  </body>
</html>
