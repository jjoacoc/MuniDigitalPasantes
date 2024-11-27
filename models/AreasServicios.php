<?php
// app/models/Areas_Servicios.php

class Areas_Servicios
{
    private $conn;
    private $tableAreaServicio = "Areas_Servicios";
    public $Descripcion;


    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    public function getAll()
    {
        $query = "SELECT * FROM " . $this->tableAreaServicio;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    
    public function create()
    {
        $query = "INSERT INTO " . $this->tableAreaServicio . " (Descripcion) VALUES (:Descripcion)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':Descripcion', $this->Descripcion);
        return $stmt->execute();
    }

}
