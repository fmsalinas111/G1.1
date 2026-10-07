	<?php  
		//$app = $appId = intval(h($_SESSION['app'],0));
		$app = intval(h($_SESSION['app'],0));
		echo '
		  <script> 
			const base_url = "'.base_url().'";  const APP = '.$app.'; 
		  </script>';
		  //validar la carga de jquery desde el file loader
		if (h($data['page_jquery'])) {	?>
			<!-- <script  src="<?=media(); ?>/js/plugins/jquery-3.3.1.min.js"></script> -->
			<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
		<?php } 
		if (h($data['page_datatable'])) { ?>

		<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
		<script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
<!-- 
		<script  src="<?=media(); ?>/js/plugins/jquery.dataTables.min.js"></script>
		<script  src="<?=media(); ?>/js/plugins/dataTables.bootstrap.min.js"></script> 
 -->
		<?php } ?>
	<script  src="<?= media();?>/js/script2.js"></script>
	<script  src="<?= specJS($data); ?>"></script>        
  </body>
</html>
