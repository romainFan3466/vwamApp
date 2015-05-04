<?php
include('phpseclib/Crypt/AES.php');


class AESgenerator {

    private $privateKey = "";
    private $publicKey = "";
    private $aes;

    public function __construct(){

        $this->aes = new Crypt_AES(CRYPT_AES_MODE_ECB);
        $key = file_get_contents('RSAkey/aes.key');
        $this->aes->setKey($key);

    }

    public function encrypt($plainText){
        return $this->aes->encrypt($plainText);
    }

    public function decrypt($cipherText){
        return $this->aes->decrypt($cipherText);
    }
}
