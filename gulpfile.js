/**
 * FLL 2015 Scoreboard
 * @author Clark Winkelmann <clark.winkelmann@gmail.com>
 * @license MIT
 */

var gulp     = require('gulp');
var concat   = require('gulp-concat');
var sass     = require('gulp-sass');
var uglify   = require('gulp-uglify');

var bower_path = './bower_components/';
var src_path = './src/';

var dest_path = './site/';
var assets_dest_path = dest_path + 'assets/';

gulp.task('scripts', function() {
	return gulp.src([
			bower_path + 'react/react-with-addons.js',
			bower_path + 'fll-robotgame-scorer-2015/src/scorer.js',
			src_path + 'js/*.js',
			src_path + 'js/locales/*.js'
		])
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest(assets_dest_path));
});

gulp.task('styles', function() {
	return gulp.src([
			src_path + 'scss/*.scss'
		])
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(concat('style.css'))
		.pipe(gulp.dest(assets_dest_path));
});

gulp.task('images', function() {
	return gulp.src([
			src_path + 'img/*.jpg'
		])
		.pipe(gulp.dest(assets_dest_path));
});

gulp.task('html', function() {
	return gulp.src([
			src_path + 'html/*.html'
		])
		.pipe(gulp.dest(dest_path));
});

gulp.task('default', ['scripts', 'styles', 'images', 'html']);

gulp.task('watch', ['default'], function() {
	gulp.watch(src_path + '**/*', ['default']);
});
