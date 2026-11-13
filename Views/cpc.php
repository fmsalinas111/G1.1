<?php
   headerAdmin2($data); 
   getModal('_clpr', $data);   
   //getModal('_cat',$data);  miniModal
   
  echo "<script >  
    const clType =".clType().";  
    
  </script>";  

?>

<main class="flex-1 p-4 md:p-6 space-y-6">
  <h1>cpc</h1>
</main>

<?php   footerAdmin2($data); ?>
<script>
  console.log(getLS('dttp'));
</script>
