import gulp from 'gulp';
import avif from 'gulp-avif';
import { filePaths } from '../config/paths.js';
import { logger } from "../config/logger.js";

const images = (isBuild, serverInstance) => {
	return (
		gulp.src([filePaths.src.images, '!src/images/sprite/**/*'])
			.pipe(logger.handleError('IMAGES'))
			.pipe(avif({ quality: 75 }))
			.pipe(gulp.dest('dist/images'))
			.pipe(gulp.src([filePaths.src.images, '!src/images/sprite/**/*']))
			.pipe(gulp.dest('dist/images'))
			.pipe(gulp.src('src/images/svg/**/*.svg', { base: 'src/images' }))
			.pipe(gulp.dest('dist/images'))
			.pipe(serverInstance.stream())
	);
};

export { images };
