import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import postcssGroupMedia from 'postcss-sort-media-queries';

export const plugins = [
	autoprefixer(),
	postcssPresetEnv(),
	postcssGroupMedia({ sort: 'desktop-first' }),
];
