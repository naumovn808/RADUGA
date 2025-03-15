import gulp from 'gulp';

import fs from 'fs';

import fonter from 'gulp-fonter-fix';

import ttf2woff2 from 'gulp-ttf2woff2';

import plumber from 'gulp-plumber'; // Убедитесь, что у вас установлен gulp-plumber



import { filePaths } from '../config/paths.js';

import { logger } from '../config/logger.js';



const fontFacesFile = 'src/scss/fonts.scss';

const fontsHtmlFile = 'src/html/components/fonts.html';



const italicRegex = /italic/i;

const cleanSeparator = /(?:_|__|-|\s)?(italic)/i;



const fontWeights = {

	thin: 100,

	hairline: 100,

	extralight: 200,

	ultralight: 200,

	light: 300,

	regular: 400,

	medium: 500,

	semibold: 600,

	demibold: 600,

	bold: 700,

	extrabold: 800,

	ultralight: 800,

	black: 900,

	heavy: 900,

	extrablack: 950,

	ultrablack: 950,

};



const fontFaceTemplate = (name, file, weight, style) => `@font-face {
	font-family: '${name}';
	font-display: swap;
	src: url("../fonts/${file}.woff2") format("woff2"),
	url("../fonts/${file}.woff") format("woff");
	font-weight: ${weight};
	font-style: ${style};
}\n\n`;

const preloadLinkTemplate = (file) => `<link rel="preload" href="./fonts/${file}" as="font" type="font/${file.endsWith('woff2') ? 'woff2' : 'woff'}" crossorigin="anonymous">`;


/** Конвертация различных форматов шрифтов */

const convertFonts = () => {

	return gulp.src(`${filePaths.src.fonts}/*.{ttf,woff,woff2,otf}`, {})

		.pipe(plumber(logger.handleError('FONTS [convertFonts]')))

		.pipe(fonter({ formats: ['ttf'] })) // Конвертируем .otf в .ttf

		.pipe(gulp.dest(filePaths.src.fonts))

		.pipe(gulp.src(`${filePaths.src.fonts}/*.ttf`)) // Конвертируем .ttf в .woff и .woff2

		.pipe(ttf2woff2())

		.pipe(gulp.dest(filePaths.build.fonts))

		.pipe(gulp.src(`${filePaths.src.fonts}/*.ttf`))

		.pipe(fonter({ formats: ['woff'] }))

		.pipe(gulp.dest(filePaths.build.fonts));

};



/** Генерация файлов стилей и HTML */

const fontStyle = async () => {

	try {

		if (!fs.existsSync('src/html/components')) {

			logger.info('Создаю директорию src/html/components');

			fs.mkdirSync('src/html/components', { recursive: true });

		}

		await fs.promises.writeFile(fontFacesFile, '');
		await fs.promises.writeFile(fontsHtmlFile, '');
		const fontFiles = await fs.promises.readdir(filePaths.build.fonts);

		if (!fontFiles.length) {
			logger.error('Нет сконвертированных шрифтов');
			return;
		}

		let newFileOnly;

		for (const file of fontFiles) {

			const [fileName] = file.split('.');

			if (newFileOnly !== fileName) {

				const [name, weight = 'regular'] = fileName.split('-');

				const weightString = fontWeights[weight.replace(cleanSeparator, '').toLowerCase()] || 400;
				const fontStyle = italicRegex.test(fileName) ? 'italic' : 'normal';
				const css = fontFaceTemplate(name, fileName, weightString, fontStyle);
				await fs.promises.appendFile(fontFacesFile, css);
				newFileOnly = fileName;

			}
			const preloadLink = preloadLinkTemplate(file);
			await fs.promises.appendFile(fontsHtmlFile, preloadLink);
		}
		await fs.promises.appendFile(fontsHtmlFile, '');
		console.log(`Файл ${fontsHtmlFile} успешно создан!`);

	} catch (err) {
		console.error('Ошибка при обработке шрифтов:\n', err);
	}
};


export { convertFonts, fontStyle };
