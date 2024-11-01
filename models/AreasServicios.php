<?php
// app/models/Areas_Servicios.php

class Areas_Servicios
{
    private $conn;
    private $tableAreaServicio = "Areas_Servicios";

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

}
