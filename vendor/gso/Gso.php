<?php

require_once "simple_html_dom.php";
require_once "Cache.php";

function pr($v){
    echo '<pre>';
    print_r($v);
    echo '</pre>';
}

class Timetable
{
    private $type, $element, $week, $lessons;

    private $typesMap = array(
        'classes' => 'c',
        'teachers' => 't',
        'rooms' => 'r'
    );

    public function __construct($type, $element, $week){
        $this->type = $type;
        $this->element = $element;
        $this->week = str_pad($week, 2 ,'0', STR_PAD_LEFT);

        $filename = $this->element.$this->type.$this->week;
        $cache = Cache::Read($filename, 10);
        if($cache === false){
            $this->get();
            Cache::Write($filename, $this->lessons);
        }else{
            $this->lessons = $cache;
        }
    }

    public static function weeks(){
        $cache = Cache::Read("weeks-available", 1440);
        if($cache === false){
            $html = new simple_html_dom();
            $html->load_file('http://stupid.gso-koeln.de/frames/navbar.htm');
            $select = $html->find('select[name=week]', 0);
            $options = $select->find('option');

            $return = array();
            foreach ($select->children() as $key => $value) {
                $return[] = (int)date("W",strtotime($value->innertext));
            }
            Cache::Write("weeks-available", $return);
        }else{
            $return = $cache;
        }

        return $return; 
    }

    public function week(){
        return $this->lessons;
    }

    private function get(){

        $html = new simple_html_dom();
        $html->load_file('http://stupid.gso-koeln.de/'.$this->week.'/'.$this->typesMap[$this->type].'/'.$this->typesMap[$this->type].$this->getRemoteId().'.htm');

        $this->lessons = array();

        $empty = array(
            1 => array(),
            2 => array(),
            3 => array(),
            4 => array(),
            5 => array()
        );

        // Gehe durch die Zeilen
        for ($i=1; $i < 32; $i++) {

            // Jede 2. ist ein Dummy, also überspringen
            if ($i%2==1) continue;

            // Hole den Zeileninhalt
            $node = $html->find('table[border="3"] > tr['.$i.']');
            $row = $node[0];

            // Hole die ersten Zellen)
            $cells = $row->find('td[colspan="6"]');

            $hour = $i/2;


            $lesson = false;
            $k = 0;
            for ($day = 1; $day < 6; $day++){
                if (in_array($hour, $empty[$day])){
                    continue;
                }

                $cell = $cells[$k];
                $k++;

                if(trim($cell->plaintext) != ''){
                    $lesson  = $this->extractCell($cell);
                    $lesson['hour'] = $hour;
                    $lesson['day'] = $day;

                    $this->lessons[] = $lesson;
                }

                for ($j = 1; $j < $cell->rowspan/2; $j++){
                    if ($lesson){
                        $lesson['hour'] = $hour+$j;
                        $this->lessons[] = $lesson;
                    }

                    $empty[$day][] = $hour+$j;
                }
            }
        }
    }

    private function extractCell($cell){
        $return = array(
            'red' => false
        );
        if (preg_match("/#FF0000/",$cell->innertext)){
            $return['red'] = true;
        }

        preg_match_all('/(\S)+/', $cell->plaintext, $match);

        $return['content'] = implode('<br />', $match[0]);

        return $return;

    }

    private function getRemoteId(){
        $i = 0;
        $types = array();

        switch($this->type){
            case "classes":
                $types = Elements::classes();
                break;
            case "rooms":
                $types = Elements::rooms();
                break;
            case "teachers":
                $types = Elements::teachers();
                break;
        }

        foreach ($types as $item){
            $i++;
            if ($item['name'] == $this->element){
                $remoteId = str_pad($i, 5 ,'0', STR_PAD_LEFT);
            }
        }

        return $remoteId;
    }
}


