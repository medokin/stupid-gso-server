<?php
class Cache {

    private static function Check($name, $min){
        $time = $min*60;
        if ($handle = opendir(STATIC::$dir)) {
            $filename = "";
            $stamp = 0;
            /* Das ist der korrekte Weg, ein Verzeichnis zu durchlaufen. */
            while (false !== ($file = readdir($handle))) {
                $p = explode("__", $file);
                if ($p[0] == $name) {
                    if((int)$p[1] > $stamp){
                        $filename = $file;
                        $stamp = (int)$p[1];
                    }
                }
            }

            closedir($handle);

            if ((time()-$time) > $stamp) {
                return false;
            }

            return $filename;
        }
    }

    private static $path = "/home/nj/web/api-gso-medok-in/vendor/gso/cache/";
    private static $dir = "/home/nj/web/api-gso-medok-in/vendor/gso/cache";

    public static function Write($name, $data){
        $test =  file_put_contents(STATIC::$path.$name."__".time(), serialize($data));

    }

    public static function Read($name, $min = 0){
        $filename = STATIC::Check($name, $min);
        if(!$filename){
            return false;
        }

        return unserialize(file_get_contents(STATIC::$path.$filename));
    }

    public static function Clear($min = 20){
        $time = $min*60;
        if ($handle = opendir(STATIC::$dir)) {
            $filename = "";
            $stamp = 0;

            while (false !== ($file = readdir($handle))) {
                if($file == '.' OR $file == '..'){
                    continue;
                }
                $p = explode("__", $file);
                    if ($p[1] < time()-$time) {
                        unlink(STATIC::$path.$file);
                    }
            }

            closedir($handle);
        }
    }
}
