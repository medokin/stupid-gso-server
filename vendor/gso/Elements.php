<?php
class Elements {
    private static $elements;

    private static function get(){
        $html = new simple_html_dom();
        $html->load_file('http://stupid.gso-koeln.de/frames/navbar.htm');
        $scriptTag = $html->find('script', 1);
        preg_match_all('/\[".+?\"]/', $scriptTag->innertext, $match, PREG_OFFSET_CAPTURE);

        $elements = array(
            'classes' => STATIC::extractType($match[0][0][0]),
            'teachers' => STATIC::extractType($match[0][1][0]),
            'rooms' => STATIC::extractType($match[0][2][0]),
        );

        STATIC::$elements = $elements;
    }

    private static function extractType($array){
        preg_match_all('/([A-Z0-9])+/', $array, $match, PREG_OFFSET_CAPTURE);

        foreach ($match[0] as $m){
            $return[] = array(
                'id' => $m[1],
                'name' => $m[0]
            );
        }

        return $return;
    }

    public static function classes(){
        if($cache = STATIC::Cache("classes")){
            return $cache;
        }
        return STATIC::$elements["classes"];
    }

    public static function teachers(){
        if($cache = STATIC::Cache("teachers")){
            return $cache;
        }
        return STATIC::$elements["teachers"];
    }

    public static function rooms(){
        if($cache = STATIC::Cache("rooms")){
            return $cache;
        }
        return STATIC::$elements["rooms"];
    }

    private static function Cache($type){
        if($cache = Cache::Read($type, 2880)){
            return $cache;
        }
        STATIC::get();
        Cache::Write($type, STATIC::$elements[$type]);

        return false;
    }

}