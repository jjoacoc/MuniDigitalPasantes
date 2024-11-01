<?php
// app/models/Origen.php

class Origen
{
    private $conn;
    private $tableOrigen = "Origen";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Obtener todos los productos
    public function getAll()
    {
        $query = "SELECT * FROM " . $this->tableOrigen;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }


}
