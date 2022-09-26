const gulp = require("gulp");
const browsersync = require("browser-sync");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps")
const rename = require('gulp-rename');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const dist = "./dist/";
const src = "./src/";

gulp.task("copy-html", () => {
  return gulp.src("./src/index.html")
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task("copy-json", () => {
  return gulp.src("./data.json")
    .pipe(gulp.dest(dist))
    .on("end", browsersync.reload);
});

gulp.task("copy-fonts", () => {
  return gulp.src("./src/fonts/**/*.*")
    .pipe(gulp.dest(dist + "/fonts"))
    .on("end", browsersync.reload);
});

gulp.task("copy-assets", () => {
  return gulp.src("./src/assets/**/*.*")
    .pipe(gulp.dest(dist + "/assets"))
    .on("end", browsersync.reload);
})

gulp.task("build-ts", () => {
  return tsProject.src()
    .pipe(tsProject()).js
    .pipe(gulp.dest(src + "/buildJS"));
})

gulp.task("build-js", () => {
  return gulp.src("./src/buildJS/main.js")
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'bundle.js'
      },
      watch: false,
      devtool: "source-map",
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(dist + "/scripts"))
    .on("end", browsersync.reload);
});

gulp.task("build-styles", () => {
  return gulp.src("./src/styles/main.@(scss|sass)")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(rename("style.css"))
    .pipe(gulp.dest(dist + "/styles"))
    .on("end", browsersync.reload);
})

gulp.task("watch", () => {
  browsersync.init({
    server: "./dist/",
    port: 4000,
    notify: true
  });

  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./data.json", gulp.parallel("copy-json"));
  gulp.watch("./src/scripts/**/*.ts", gulp.parallel("build-ts"));
  gulp.watch("./src/buildJS/**/*.js", gulp.parallel("build-js"));
  gulp.watch("./src/styles/**/*.@(scss|sass)", gulp.parallel("build-styles"));
  gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/fonts/**/*.*", gulp.parallel("copy-fonts"));
})

gulp.task("build", gulp.parallel("copy-html", /*"copy-json",*/ "build-ts", "build-js", "build-styles", /*"copy-assets", "copy-fonts"*/));

gulp.task("default", gulp.parallel("watch", "build"))