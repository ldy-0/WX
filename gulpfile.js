const gulp = require('gulp');
const _ = require('lodash');
const argv = require('yargs').argv;
const shell = require('shelljs');
const stringify = require('js-stringify');
const fs = require('fs');
const path = require('path');

gulp.task('clean', function () {
  shell.rm('-rf', 'dist');
  shell.mkdir('dist');
  shell.cp('-R', 'src/images', 'dist/images');
});

gulp.task('dev', function () {
  run(argv);
});

gulp.task('default', function () {
  run(argv);
});

const run = function (argv) {
  // 设置环境变量
  let env = "development";
  if (argv.l) {
    env = "local";
  } else if (argv.p) {
    env = "production";
  }
  process.env.NODE_ENV = env;
  const currentEnv = `const ENV = "${env}"`;
  const templatePath = path.resolve(__dirname, 'src/constant/configTemplate.js');
  const configPath = path.resolve(__dirname, 'src/constant/configConstant.js');
  let configContent = fs.readFileSync(templatePath, 'utf8');
  configContent = configContent.replace(/const ENV = \"\w*\"/, currentEnv);
  fs.writeFileSync(configPath, configContent, 'utf8');
  // 运行
  shell.exec("wepy build --watch");
};
