<?php
session_start();
session_destroy(); 
header("Location: cadastro.html"); 
exit();
?>
