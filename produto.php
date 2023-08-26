<?php

class Produto
{
	public $conexao;
	
	function __construct(){
		$this->conexao = new mysqli('localhost', 'root', '', 'pastelaria');
	}

	public function buscar(){
		$sql = "SELECT * FROM produto";
		return $this->conexao->query($sql);
	}		
}
?>