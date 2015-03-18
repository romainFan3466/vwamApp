<?php

class passwordHash {

    // blowfish
    private static $algo = '$2a';
    // cost parameter
    private static $cost = '$10';

    // mainly for internal use
    private static function unique_salt() {
        return substr(sha1(mt_rand()), 0, 22);
    }


    /**
     * Hash
     * this will be used to generate a hash
     * @param $password
     * @return string
     */
    public static function hash($password) {
        return crypt($password, self::$algo .
                self::$cost .
                '$' . self::unique_salt());
    }


    /**
     * check_password
     * return true if hash param is the password param, otherwise false
     * @param $hash
     * @param $password
     * @return bool
     */
    public static function check_password($hash, $password) {
        $full_salt = substr($hash, 0, 29);
        $new_hash = crypt($password, $full_salt);
        return ($hash == $new_hash);
    }

}

?>
