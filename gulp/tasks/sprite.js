import gulp from 'gulp';
import svgstore from 'gulp-svgstore';
import cheerio from 'gulp-cheerio';
import rename from 'gulp-rename';

const createSprite = () => {
	return gulp.src('src/images/sprite/*.svg')
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(cheerio({
			run: ($) => {
				$('svg').attr('style', 'display:none');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(rename('sprite.html'))
		.pipe(gulp.dest('src/html/components'));
};

export { createSprite }
