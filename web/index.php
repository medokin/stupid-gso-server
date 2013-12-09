<?php
error_reporting(E_ALL);
ini_set( 'display_errors','1');

require_once '../vendor/gso/Gso.php';
require_once '../vendor/gso/Elements.php';
require_once '../vendor/gso/Cron.php';
require_once __DIR__.'/../vendor/autoload.php';


$app = new Silex\Application();



$app->get('/', function() use ($app)  {
    return '
    <h1>Stupid API:</h1>
    <h2>Typen</h2>
    <p>Cache: 2 Tage</p>
    <a href="/classes.json">/classes.json</a><br>
    <p>Wenn man nur die Klasses einer Stufe will:<br>
    Stufen holen: <a href="/grades.json">/grades.json</a><br>
    Klassen einer Stufe: <a href="/grades/FIA.json">/grades/FIA.json</a></p>
    <a href="/teachers.json">/teachers.json</a><br>
    <a href="/rooms.json">/rooms.json</a><br>
    <h2>Wochenplan</h2>
    <p>Cache: 10 Min</p>
    <a href="/timetable/classes/FIA23/'.date("W").'/week.json">/timetable/{type}/{element}/{week}/week.json</a><br>
    <i>{type} string: ist "classes", "teachers" oder "rooms"</i><br>
    <i>{element} string: ist der "name" aus einem Typen, NICHT die ID! z.B. FIA23 oder KE</i><br>
    <i>{week} int: Kalenderwoche, verfügbar: <a href="/weeks-available.json">/weeks-available.json</a></i><br><br>
    <a href="/timetable/classes/FIA23/week.json">/timetable/{type}/{element}/week.json</a><br>
    <i>Immer die aktuelle Woche</i>
    <br>
    <h2>INFO</h2>
    <p>Alles auch als xml, einfach die Endung ändern</p>
    <p>Wenn etwas nicht funktioniert, Pech. Die Api habe ich an einem kurzen Abend gemacht.</p>
    <p>Bald kommt eine neue Version, diese hier wird man aber immernoch benutzen können. Vielleicht unter einer anderen Adresse</p>
    <p>KEINE HAFTUNG!</p>
    <h3>Impressum</h3>
                <p>Nikodem Jaworski <br> Falltorstra&szlig;e 35 <br>51429 Bergisch Gladbach <br>nikodemjaworski@gmail.com</p>
    ';
});

$app->get('/weeks-available.json', function() use ($app)  {
    return $app->json(Timetable::weeks());

});
$app->get('/classes.json', function() use ($app)  {
    return $app->json(Elements::classes());
});
$app->get('/grades.json', function() use ($app)  {
    $classes = Elements::classes();
    $return = array();
    foreach($classes as $key => $value){
        $return[] = substr($value['name'],0,3);
    }
    $return = array_values(array_unique($return));
    return $app->json($return);
});
$app->get('/grades/{class}.json', function($class) use ($app)  {
    $classes = Elements::classes();
    $return = array();
    foreach($classes as $value){
        if(substr($value['name'],0,3) == $class){
            $return[] = $value;
        }
        
    }
    $return = $return;
    return $app->json($return);
});

$app->get('/teachers.json', function() use ($app)  {
    return $app->json(Elements::teachers());
});

$app->get('/rooms.json', function() use ($app)  {
    return $app->json(Elements::rooms());
});
$app->get('/timetable/{type}/{element}/{week}/week.json', function($type, $element, $week) use ($app)  {
	$t = new Timetable($type, $element, $week);
    $result = $t->week();
    if(empty($result)){
        return "[]";
    }
    return $app->json($t->week());
});
$app->get('/timetable/{type}/{element}/week.json', function($type, $element) use ($app)  {
    $t = new Timetable($type, $element, date("W"));
    $result = $t->week();
    if(empty($result)){
        return "[]";
    }
    return $app->json($t->week());
});

$app->get('/classes.xml', function() use ($app)  {
    return ArrayToXML::toXml(Elements::classes());
});
$app->get('/grades.xml', function() use ($app)  {
    $classes = Elements::classes();
    $return = array();
    foreach($classes as $key => $value){
        $return[] = substr($value['name'],0,3);
    }
    $return = array_values(array_unique($return));
    return ArrayToXML::toXml($return);
});
$app->get('/grades/{class}.xml', function($class) use ($app)  {
    $classes = Elements::classes();
    $return = array();
    foreach($classes as $value){
        if(substr($value['name'],0,3) == $class){
            $return[] = $value;
        }
        
    }
    $return = $return;
    return ArrayToXML::toXml($return);
});
$app->get('/teachers.xml', function() use ($app)  {
    return ArrayToXML::toXml(Elements::teachers());
});

$app->get('/rooms.xml', function() use ($app)  {
    return ArrayToXML::toXml(Elements::rooms());
});
$app->get('/timetable/{type}/{element}/{week}/week.xml', function($type, $element, $week) use ($app)  {
    $t = new Timetable($type, $element, $week);
    return ArrayToXML::toXml($t->week());
});
$app->get('/timetable/{type}/{element}/week.xml', function($type, $element) use ($app)  {
    $t = new Timetable($type, $element, date("W"));
    return ArrayToXML::toXml($t->week());
});

$app->run();


class ArrayToXML
{
    /**
     * The main function for converting to an XML document.
     * Pass in a multi dimensional array and this recrusively loops through and builds up an XML document.
     *
     * @param array $data
     * @param string $rootNodeName - what you want the root node to be - defaultsto data.
     * @param SimpleXMLElement $xml - should only be used recursively
     * @return string XML
     */
    public static function toXml($data, $rootNodeName = 'data', $xml=null)
    {
        // turn off compatibility mode as simple xml throws a wobbly if you don't.
        if (ini_get('zend.ze1_compatibility_mode') == 1)
        {
            ini_set ('zend.ze1_compatibility_mode', 0);
        }

        if ($xml == null)
        {
            $xml = simplexml_load_string("<?xml version='1.0' encoding='utf-8'?><$rootNodeName />");
        }

        // loop through the data passed in.
        foreach($data as $key => $value)
        {
            // no numeric keys in our xml please!
            if (is_numeric($key))
            {
                // make string key...
                $key = "Node". (string) $key;
            }

            // replace anything not alpha numeric
            $key = preg_replace('/[^a-z]/i', '', $key);

            // if there is another array found recrusively call this function
            if (is_array($value))
            {
                $node = $xml->addChild($key);
                // recrusive call.
                ArrayToXML::toXml($value, $rootNodeName, $node);
            }
            else
            {
                // add single node.
                $value = htmlentities($value);
                $xml->addChild($key,$value);
            }

        }
        // pass back as string. or simple xml object if you want!
        return $xml->asXML();
    }
}
