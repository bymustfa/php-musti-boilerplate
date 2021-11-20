<?php

namespace Core;

use App\Models\Menus;

class MultiLanguage
{

    public static $activeLang = "tr";
    public static $langsFolder = "/langs/";
    public static $activeWords = [];
    public static $langFiles = [];

    public static function init($lang = null)
    {
        if (!$lang && isset($_COOKIE['lang'])) {
            self::$activeLang = $_COOKIE['lang'];
        } else {
            self::$activeLang = $lang ? $lang : "tr";
            setcookie("lang", self::$activeLang, time() + (10 * 365 * 24 * 60 * 60), '/');
        }

        $dir = scandir(realpath(".") . self::$langsFolder . "words/");
        unset($dir[0]);
        unset($dir[1]);
        $files = [];
        foreach ($dir as $item) {
            $files[explode(".", $item)[0]] = $item;
        }
        self::$langFiles = $files;
    }

    public static function getActiveLang()
    {
        return self::$activeLang;
    }

    static public function getRouterLink($routerKey)
    {
        $router = self::getRouter();
        $link = "#";
        foreach ($router as $item) {
            if ($item['router'] == $routerKey) {
                $link = isset($item['not_link']) ? "#" : (is_array($item['slug']) ? $item['slug'][0] : $item['slug']);
                break;
            } elseif (isset($item['child']) && is_array($item['child'])) {
                foreach ($item['child'] as $child) {
                    if ($child['router'] == $routerKey) {
                        $link = (is_array($item['slug']) ? $item['slug'][0] : $item['slug']) . "/" . (is_array($child['slug']) ? $child['slug'][0] : $child['slug']);
                        break;
                    }
                }
            }
        }
        return $link;
    }

    static public function getRouterLinkByLang($routerKey, $lang = "en")
    {
        $router = self::getRouterByLang($lang);
        $link = "#";
        foreach ($router as $item) {
            if ($item['router'] == $routerKey) {
                $link = isset($item['not_link']) ? "#" : (is_array($item['slug']) ? $item['slug'][0] : $item['slug']);
                break;
            } elseif (isset($item['child']) && is_array($item['child'])) {
                foreach ($item['child'] as $child) {
                    if ($child['router'] == $routerKey) {
                        $link = (is_array($item['slug']) ? $item['slug'][0] : $item['slug']) . "/" . (is_array($child['slug']) ? $child['slug'][0] : $child['slug']);
                        break;
                    }
                }
            }
        }
        return $link;
    }

    public static function getRouter()
    {
        $dir = scandir(realpath(".") . self::$langsFolder . "router/");
        unset($dir[0]);
        unset($dir[1]);
        $files = [];
        foreach ($dir as $item) {
            $files[explode(".", $item)[0]] = $item;
        }

        $routerArray = json_decode(file_get_contents(realpath(".") . self::$langsFolder . "router/" . $files['router']), true);
        $activeMenus = json_decode(file_get_contents(realpath(".") . self::$langsFolder . "router/" . $files[self::$activeLang]), true);

        $router = [];
        foreach ($activeMenus as $key => $activeMenu) {
            $router[$key] = self::addController($activeMenu, $routerArray);
        }
        return $router;

    }

    static function addController($menu, $router)
    {
        $controllerKey = $menu['router'];
        foreach ($router as $data) {
            if ($data['key'] == $controllerKey) {
                $menu['controller'] = $data['controller'];
            }
        }
        if (isset($menu['child'])) {
            $key = 0;
            foreach ($menu['child'] as $child) {
                foreach ($router as $item) {
                    if ($item['key'] == $child['router']) {
                        $menu['child'][$key]['controller'] = $item['controller'];
                    }
                }
                $key++;
            }

        }
        return $menu;
    }

    public static function getRouterByLang($langCode = "en")
    {
        $dir = scandir(realpath(".") . self::$langsFolder . "router/");
        unset($dir[0]);
        unset($dir[1]);
        $files = [];
        foreach ($dir as $item) {
            $files[explode(".", $item)[0]] = $item;
        }

        $routerArray = json_decode(file_get_contents(realpath(".") . self::$langsFolder . "router/" . $files['router']), true);
        $activeMenus = json_decode(file_get_contents(realpath(".") . self::$langsFolder . "router/" . $files[$langCode]), true);

        $router = [];
        foreach ($activeMenus as $key => $activeMenu) {
            $router[$key] = self::addController($activeMenu, $routerArray);
        }
        return $router;

    }

    public static function getWord($word)
    {
        if (isset(self::$activeWords)) {
            self::getActiveWords();
        }
        return isset(self::$activeWords[$word]) ? self::$activeWords[$word] : "";


    }

    public static function getActiveWords()
    {
        $activeFolder = self::$langFiles[self::$activeLang];
        self::$activeWords = json_decode(file_get_contents(realpath(".") . self::$langsFolder . "words/" . $activeFolder), true);
        return self::$activeWords;
    }


}
?>
