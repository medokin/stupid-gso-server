<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Niko
 * Date: 12.11.12
 * Time: 19:57
 * To change this template use File | Settings | File Templates.
 */
set_time_limit(0);
require_once 'Cache.php';
require_once 'Elements.php';
require_once 'Gso.php';

class Cron
{
    public function __construct(){
        
        $elements = Elements::classes();
        foreach($elements as $e){
            //sleep(1);
            $t = new Timetable('classes', $e['name'], date('W'));
            $t->week();
        }

        // $elements = Elements::rooms();
        // foreach($elements as $e){
        //     sleep(1);
        //     $t = new Timetable('rooms', $e['name'], date('W'));
        //     $t->week();
        // }

        // $elements = Elements::teachers();
        // foreach($elements as $e){
        //     sleep(1);
        //     $t = new Timetable('teachers', $e['name'], date('W'));
        //     $t->week();
        // }

        Cache::Clear();
    }

    private function Busy(){
        for ($i=0; $i < 10; $i++) { 
            $t = $i*$i-$i-$this->Busy();
        }
        return $t;
    }
}
