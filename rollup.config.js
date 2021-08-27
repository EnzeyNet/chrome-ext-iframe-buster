import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;

const bundleSvelte = (inputFile, outputFile) => {
    const baseFileName = path.basename(outputFile);
    const regexFileName = /(.+)\..*$/;
    const fileName = regexFileName.exec(baseFileName)[1];

    return {
    	input: inputFile,
    	output: {
    		sourcemap: true,
    		format: 'iife',
    		name: fileName,
    		file: outputFile
    	},
    	plugins: [
    		svelte({
    			compilerOptions: {
    				// enable run-time checks when not in production
    				dev: !production
    			},
    		}),
    		// we'll extract any component CSS out into
    		// a separate file - better for performance
    		css({ output: `${fileName}.css` }),

    		// If you have external dependencies installed from
    		// npm, you'll most likely need these plugins. In
    		// some cases you'll need additional configuration -
    		// consult the documentation for details:
    		// https://github.com/rollup/plugins/tree/master/packages/commonjs
    		resolve({
    			browser: true,
    			dedupe: ['svelte', 'page']
    		}),
    		commonjs(),

    		// If we're building for production (npm run build
    		// instead of npm run dev), minify
    		terser()
    	],
    	watch: {
    		clearScreen: false
    	}
    }
}

const bundleJS = (inputFile, outputFile) => {
    const baseFileName = path.basename(outputFile);
    const regexFileName = /(.+)\..*$/;
    const fileName = regexFileName.exec(baseFileName)[1];

    return {
    	input: inputFile,
    	output: {
    		sourcemap: true,
    		format: 'module',
    		name: fileName,
    		file: outputFile
    	},
    	plugins: [
    		commonjs(),

    		// If we're building for production (npm run build
    		// instead of npm run dev), minify
    		terser()
    	],
    	watch: {
    		clearScreen: false
    	}
    }
}

export default [
    bundleSvelte('src/optionsPage/optionsPage.js', 'build/optionsPage.js'),
    bundleSvelte('src/optionsPopup/optionsPopup.js', 'build/optionsPopup.js'),
    bundleJS('src/main/app.js', 'build/main.js'),
    bundleJS('src/background/app.js', 'build/background.js')
];
