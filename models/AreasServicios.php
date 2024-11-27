<?php
// app/models/AreasServicios.php

class Areas_Servicios
{
    private $conn;
    private $tableAreaServicio = "Areas_Servicios";
    public $Id_Areas_Servicios;
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

    // Obtener un solo producto por ID
    public function getById($Id_Areas_Servicios) {
        $query = "SELECT * FROM " . $this->tableAreaServicio . " WHERE Id_Areas_Servicios = :Id_Areas_Servicios";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":Id_Areas_Servicios", $Id_Areas_Servicios);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear un producto nuevo
    public function create() {
        $query = "INSERT INTO " . $this->tableAreaServicio . " (Descripcion) VALUES (:Descripcion)";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':Descripcion', $this->Descripcion);
     
        return $stmt->execute();
    }

    // Actualizar un producto
    public function update($Id_Areas_Servicios) {
        // Aquí solo actualizamos la descripción
        $query = "UPDATE " . $this->tableAreaServicio . " SET Descripcion = :Descripcion WHERE Id_Areas_Servicios = :Id_Areas_Servicios";
        $stmt = $this->conn->prepare($query);
        
        // Enlazamos los parámetros
        $stmt->bindParam(':Descripcion', $this->Descripcion);
        $stmt->bindParam(':Id_Areas_Servicios', $Id_Areas_Servicios); // El Id_Areas_Servicios pasado no se modifica
        
        // Ejecutamos la consulta
        return $stmt->execute();
    }

    // Eliminar un producto
    public function delete($Id_Areas_Servicios) {
        $query = "DELETE FROM " . $this->tableAreaServicio . " WHERE Id_Areas_Servicios = :Id_Areas_Servicios";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':Id_Areas_Servicios', $Id_Areas_Servicios);
        return $stmt->execute();
    }

}
