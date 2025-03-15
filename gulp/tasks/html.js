import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import htmlMin from 'gulp-htmlmin';

import { filePaths } from '../config/paths.js';
import { logger } from "../config/logger.js";

const html = (isBuild, serverInstance) => {
  return gulp.src(filePaths.src.html)
    .pipe(logger.handleError('HTML'))
    .pipe(fileInclude())
    .pipe(
      htmlMin({
        useShortDoctype: true,
        sortClassName: true,
        removeComments: isBuild,

        /** Раскомментировать если требуется минификация html */
        //collapseWhitespace: isBuild,
      })
    )

    .pipe(gulp.dest(filePaths.buildFolder))
    .pipe(serverInstance.stream());
};

export { html };
