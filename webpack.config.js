import path from 'path';
import { resolve, join } from 'path';
import { readDir } from './gulp/config/read-dir.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const webpackConfig = async (isMode) => {
	const paths = {
		src: resolve('src'),
		build: resolve('dist'),
	};

	const context = join(paths.src, 'js');

	return {
		context,
		entry: await readDir(context),
		mode: isMode ? 'development' : 'production',
		output: {
			path: join(paths.build, 'js'),
			filename: '[name].min.js',
			chunkFilename: '[name].js',
			clean: true,
		},
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'esbuild-loader',
						options: { target: 'es2020', },
					},
					resolve: {
						fullySpecified: false,
					},
				},
			],
		},
		resolve: {
			extensions: ['.js'],
			alias: {
				gsap: path.resolve(__dirname, 'node_modules/gsap'),
			},
		},
		optimization: {
			splitChunks: {
				chunks: 'all',
				name: false,
			},
		},
		mode: 'development',
		devtool: 'source-map',

	};
};
