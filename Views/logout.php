<?php
	//session_start();
	$appId=APP();  $isTermux=termux(); 
  if ($isTermux) {
	echo"<h1>fin</h1>";
	die();
	}

  echo"
	

<script>
    	localStorage.logged=false;
    	localStorage.removeItem('page');
		localStorage.removeItem('APP');
		localStorage.removeItem('logged');
		//localStorage.clear();		
    	console.log('testLogout');    </script>";
	$fLarray = ["galeria","hm","klinike","gpt", "pos", "galeria", "iuri",
				'pelucan', 'sco','taller','gcomercial', 'revista'];
    session_destroy();
	$url  = base_url().$fLarray[$appId-1];
	$page = $_SESSION['page'];
	print_r($data);
	echo '</hr>';
	echo(strlen($page)).': '.$page.'<hr>'.$appId;
    if ($appId==11){
    	if (strlen($page)>0) 
    		$url=base_url().$_SESSION['page'];
    	else
			$url=base_url();//.$fLarray[$appId-1];
		//header('Location:' . getenv('HTTP_REFERER'));
		//header('location:'.$_SESSION['page']);
		echo $url;
	}
	//exit();

	//header('location:'.$url.'?a='.$appId);
    //header('location:'.base_url().$farray[$appId-1]);//'hm');//'?app='.$app);
    #borrar todo del localstorage menos los carritos
	header('location:'.base_url());
?>
