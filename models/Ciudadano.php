<?php
// app/models/Ciudadano.php

class Ciudadano
{
    private $conn;
    private $table = "Ciudadanos";
    public $Id_Ciudadanos;
    public $Dni;
    public $Apellido_Nombre;

    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    public function getAll()
    {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }


    // Obtener un solo Ciudadano por ID
    public function getById($Id_Ciudadanos)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE Id_Ciudadanos = :Id_Ciudadanos";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":Id_Ciudadanos", $Id_Ciudadanos);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }


    // public function getCiudadanoByDni($Dni)
    // {
    //     $query = "SELECT * FROM " . $this->table . " WHERE Dni = :Dni";
    //     $stmt = $this->conn->prepare($query);
    //     $stmt->bindParam(':Dni', $Dni);
    //     $stmt->execute();
    //     return $stmt->fetch(PDO::FETCH_ASSOC);
    // }

    // Crear un Ciudadano nuevo
    public function create()
    {
        $query = "INSERT INTO " . $this->table . " (Dni, Apellido_Nombre) VALUES (:Dni, :Apellido_Nombre)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':Dni', $this->Dni);
        $stmt->bindParam(':Apellido_Nombre', $this->Apellido_Nombre);
        return $stmt->execute();
    }

    // Actualizar un Ciudadano
    public function update($Id_Ciudadanos)
    {
        $query = "UPDATE " . $this->table . " SET Dni = :Dni, Apellido_Nombre = :Apellido_Nombre, WHERE Id_Ciudadanos = :Id_Ciudadanos";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':Id_Ciudadanos', $Id_Ciudadanos);
        $stmt->bindParam(':Dni', $this->Dni);
        $stmt->bindParam(':Apellido_Nombre', $this->Apellido_Nombre);
        return $stmt->execute();
    }

    // deshabilitar un Ciudadano
    public function delete($Id_Ciudadanos)
    {
        $query = "DELETE FROM " . $this->table . " WHERE Id_Ciudadanos = :Id_Ciudadanos";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':Id_Ciudadanos', $Id_Ciudadanos);
        return $stmt->execute();
    }
}
