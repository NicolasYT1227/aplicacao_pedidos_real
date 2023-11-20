<?php

	class userLog
	{
		public $conexao;
	
		function __construct(){
			$this->conexao = new mysqli('localhost', 'root', '', 'pastelaria');
		}
	
		public function buscarUser(){
			$sql = "SELECT * FROM usuario";
			return $this->conexao->query($sql);
		}	
	}

?>