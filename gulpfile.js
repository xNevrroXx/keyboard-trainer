const gulp = require("gulp");
const webpack = require("webpack-stream");
const sourcemaps = require("gulp-sourcemaps");
const rename = require('gulp-rename');
const nodemon = require("gulp-nodemon");
const env = require("gulp-env");
const sass = require('gulp-sass')(require('sass'));

const dist = "./dist/";
const src = "./src/";

gulp.task("copy-handlebar-views", () => {
  return gulp.src(src + "/views/**/*.hbs")
    .pipe(gulp.dest(dist + "/views"))
});

gulp.task("copy-fonts", () => {
  return gulp.src(src + "/fonts/**/*.*")
    .pipe(gulp.dest(dist + "/public/fonts"))
});

gulp.task("copy-assets", () => {
  return gulp.src(src + "/assets/**/*.*")
    .pipe(gulp.dest(dist + "/public/assets"))
})

gulp.task("copy-server", () => {
  return gulp.src(src + "/server/**/*.js")
    .pipe(gulp.dest(dist));
})
gulp.task("copy-env-file", () => {
  return gulp.src(src + "/server/.env.json")
    .pipe(gulp.dest(dist));
})

gulp.task("serve", () => {
  env({
    file: dist + "/.env.json"
  })
  nodemon({
    script: dist + "/index.js",
    ext: 'js hbs css'
  })
})

gulp.task("build-ts", () => {
  return gulp.src(src + "/scripts/main.ts")
      .pipe(webpack({
        mode: 'production',
        watch: false,
        devtool: "source-map",
        module: {
          rules: [{
            test: /\.tsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'ts-loader',
            }
          }]
        },
        resolve: {
          extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
          filename: 'bundle.js'
        },
      }))
      .pipe(gulp.dest(dist + "/public/scripts"))
});

gulp.task("build-styles", () => {
  return gulp.src(src + "/styles/main.@(scss|sass)")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(rename("style.css"))
    .pipe(gulp.dest(dist + "/public/styles"))
})

gulp.task("watch", () => {
  gulp.watch(src + "server/**/*.js", gulp.series("copy-server"));
  gulp.watch(src + "views/**/*.hbs", gulp.parallel("copy-handlebar-views"));
  gulp.watch(src + "scripts/**/*.ts", gulp.parallel("build-ts"));
  gulp.watch(src + "styles/**/*.@(scss|sass)", gulp.parallel("build-styles"));
  gulp.watch(src + "assets/**/*.*", gulp.parallel("copy-assets"));
  gulp.watch(src + "fonts/**/*.*", gulp.parallel("copy-fonts"));
})

gulp.task("build", gulp.parallel(gulp.series("copy-env-file", "copy-server", "serve"), "build-ts", "copy-handlebar-views", "build-styles", "copy-assets"/*"copy-fonts"*/));

gulp.task("default", gulp.parallel("watch", "build"));