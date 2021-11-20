<?php

namespace Blood72\Minify\Tests;

use Blood72\Minify\Blade;

class MinifyTest extends TestCase
{
    /**
     * @param string $file
     * @param string $extension
     * @test
     * @dataProvider minificationTestFileProvider
     */
    public function possible_to_minify($file, $extension)
    {
        [$actual, $expected] = $this->loadTestFiles($file, $extension);

        $this->assertEquals($expected, Blade::minify($actual, $this->options));
    }

    /** @test */
    public function minify_php_blocks()
    {
        $withEcho = '<?php echo \'test\'; ?>';
        $withoutEcho = '<?php sleep(0) ?>';

        // Do not process only encountered echo blocks
        $this->assertEquals("{$withEcho} {$withEcho}", Blade::minify("{$withEcho} {$withEcho}"));
        $this->assertEquals("{$withEcho}{$withoutEcho}", Blade::minify("{$withEcho} {$withoutEcho}"));
        $this->assertEquals("{$withoutEcho}{$withEcho}", Blade::minify("{$withoutEcho} {$withEcho}"));
        $this->assertEquals("{$withoutEcho}{$withoutEcho}", Blade::minify("{$withoutEcho} {$withoutEcho}"));
    }

    /**
     * @return array
     */
    public function minificationTestFileProvider()
    {
        return [
            ['app', 'php'],
            ['register', 'php'],
            ['register', 'html'],
            ['welcome', 'html'],
            ['x-layout', 'php'],
        ];
    }
}
