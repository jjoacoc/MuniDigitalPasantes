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

    #Hasheo pass
    public function setPassword($Pass) {
        // Aquí podrías agregar hashing de la contraseña
        $this->Pass = password_hash($Pass, PASSWORD_BCRYPT);
    }

    #Verificacion Pass    
    public function checkPassword($Pass) {
        return password_verify($Pass, $this->Pass);
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

      
    public function getUserByEmail($email) {
        $query = "SELECT * FROM Usuarios WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);  // Corregido: pasar el correo como valor
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Crear un usuario nuevo
    public function create()
    {
        $query = "INSERT INTO " . $this->table . " (Nombres, email, Pass, Id_Grupos) VALUES (:Nombres, :email, :Pass, :Id_Grupos)";
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
        $query = "UPDATE " . $this->table . " SET Nombres = :Nombres, email = :email, Pass = :Pass, Id_Grupos = :Id_Grupos WHERE Id_Grupos = :Id_Grupos";
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

}
