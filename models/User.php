<?php
// app/models/User.php

class User
{
    private $conn;
    private $table = "Usuarios";
    public $Id_Usuarios;
    public $Nombres;
    public $email;
    public $Pass;
    public $Id_Grupos;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Obtener todos los productos
    public function getAll()
    {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Obtener un solo usuario por ID
    public function getById($Id_Usuarios)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE Id_Usuarios = :Id_Usuarios";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":Id_Usuarios", $Id_Usuarios);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear un usuario nuevo
    public function create()
    {
        $query = "INSERT INTO " . $this->table . " (Nombres, email, Pass, Id_Usuarios) VALUES (:Nombres, :email, :Pass, :Id_Usuarios)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':Nombres', $this->Nombres);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':Pass', $this->Pass);
        $stmt->bindParam(':Id_Grupos', $this->Id_Grupos);
        return $stmt->execute();
    }

    // Actualizar un usuario
    public function update($Id_Usuarios)
    {
        $query = "UPDATE " . $this->table . " SET Nombres = :Nombres, email = :email, Pass = :Pass, Id_Usuarios = :Id_Usuarios WHERE Id_Usuarios = :Id_Usuarios";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':Id_Usuarios', $Id_Usuarios);
        $stmt->bindParam(':Nombres', $this->Nombres);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':Pass', $this->Pass);
        $stmt->bindParam(':Id_Grupos', $this->Id_Grupos);
        return $stmt->execute();
    }

    // deshabilitar un usuario
    public function delete($Id_Usuarios)
    {
        $query = "DELETE FROM " . $this->table . " WHERE Id_Usuarios = :Id_Usuarios";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':Id_Usuarios', $Id_Usuarios);
        return $stmt->execute();
    }

        // auth user
        public function authenticate($email, $Pass)
        {
            $query = "SELECT * FROM " . $this->table . " WHERE email = :mail AND Pass = :Pass";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':Pass', $Pass);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

}
