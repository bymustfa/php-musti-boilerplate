<?php

namespace Blood72\Minify\Tests;

use JSMin\JSMin as JSMinifier;
use Minify_CSSmin as CSSMinifier;
use PHPUnit\Framework\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    /** @var array */
    protected $options = [];

    protected static $path = __DIR__ . '/views';

    /**
     * This method is called before each test.
     */
    protected function setUp(): void
    {
        $this->options = [
            'cssMinifier' => [CSSMinifier::class, 'minify'],
            'jsMinifier' => [JSMinifier::class, 'minify'],
        ];
    }

    /**
     * @param string $file
     * @param string $extension
     * @return array
     */
    protected function loadTestFiles($file, $extension)
    {
        $actual = file_get_contents(self::$path . "/$file.$extension");
        $expected = file_get_contents(self::$path . "/$file.min.$extension");

        return [$actual, $expected];
    }
}
