import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import postcssGroupMedia from 'postcss-sort-media-queries';
import sourcemaps from "gulp-sourcemaps";

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';
import { logger } from "../config/logger.js";

const sass = gulpSass(dartSass);

const scss = (isBuild, serverInstance) => {
	// Определяем PostCSS плагины заранее
	const postCssPlugins = [
		autoprefixer({
			grid: true,
			overrideBrowserslist: [
				'last 5 versions',
				'ie >= 11',
				'iOS >= 13',
				'Android >= 6'
			],
			cascade: true
		}),
		postcssPresetEnv(),
		postcssGroupMedia({ sort: 'desktop-first' })
	];

	return gulp.src(filePaths.src.scss)
		.pipe(logger.handleError('SCSS'))
		// Sourcemaps только для разработки
		.pipe(plugins.if(!isBuild, sourcemaps.init()))
		// Компиляция SASS/SCSS
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		// PostCSS обработка всегда
		.pipe(postcss(postCssPlugins))
		// Сначала сохраняем несжатую версию
		.pipe(gulp.dest(filePaths.build.css))
		// Минификация только для продакшена
		.pipe(plugins.if(isBuild,
			cleanCss({
				level: {
					1: {
						specialComments: 0,
						removeEmpty: true,
						removeWhitespace: true
					},
					2: {
						mergeMedia: true,
						removeEmpty: true,
						removeDuplicateFontRules: true,
						removeDuplicateMediaBlocks: true,
						removeDuplicateRules: true,
						removeUnusedAtRules: false
					}
				}
			})
		))
		// Переименование в .min.css
		.pipe(rename({ extname: '.min.css' }))
		// Записываем sourcemaps только для разработки
		.pipe(plugins.if(!isBuild, sourcemaps.write('.')))
		// Сохраняем минифицированную версию
		.pipe(gulp.dest(filePaths.build.css))
		// Обновляем браузер
		.pipe(plugins.if(!!serverInstance, serverInstance.stream()));
};

export { scss };
