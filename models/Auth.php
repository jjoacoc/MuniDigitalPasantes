<?php

// app/models/Auth.php

class Auth {
    private $conn;
    private $table = "Usuarios";

    public $Id_Usuario;
    public $eemail;
    public $Pass;
    public $Id_Grupos;

    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    //autenticar usuario
    public function authenticate($email, $Pass)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE email = :email AND Pass = :Pass";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':Pass', $Pass);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}