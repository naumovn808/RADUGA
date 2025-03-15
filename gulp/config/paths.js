import path from 'path';

const buildFolder = './dist';
const srcFolder = './src';

const filePaths = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		images: `${buildFolder}/images/`,
		fonts: `${buildFolder}/fonts/`,
		static: `${buildFolder}/`,
		sprite: `${buildFolder}/images/sprite/`
	},
	src: {
		js: `${srcFolder}/js/*.js`,
		images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif}`,
		svg: `${srcFolder}/images/**/*.svg`,
		scss: [`${srcFolder}/scss/main.scss`, `${srcFolder}/scss/pages/*.scss`],
		html: `${srcFolder}/html/pages/*.html`,
		static: `${srcFolder}/static/**/*.*`,
		svgIcons: `${srcFolder}/icons/*.svg`,
		fontFacesFile: `${srcFolder}/scss/fonts.scss`,
		fonts: `${srcFolder}/fonts/`,
		sprite: `${srcFolder}/images/sprite/`
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
		sprite: `${srcFolder}/images/sprite/`,
		static: `${srcFolder}/static/**/*.*`,
	},
	buildFolder,
	srcFolder,
	projectDirName: path.basename(path.resolve()),
	ftp: ``,
};

export { filePaths };
