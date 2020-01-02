const parsedOptions = require('./parseOptions');
/*eslint-disable no-magic-numbers*/
const extractUpperLines = function (content, numOfLines) {
  const upperLines = content.split('\n').slice(0, numOfLines).join('\n');
  return upperLines;
};
/*eslint-enable no-magic-numbers*/
const errorHandler = function(error, path){
  const errors = {
    illegalOption: `head: illegal line count -- ${path}`,
    fileMissing: `head: ${path}: No such file or directory`
  };
  return errors[error];
};

const head = function (args, fs, show) {
  const { writeToOutputStream, writeToErrorStream } = show;
  const { options, areOptionsValid } = parsedOptions(args);
  const { path, numOfLines } = options;

  if(!areOptionsValid){
    return writeToErrorStream(errorHandler('illegalOption', path));
  }
  const onHeadCompletion = function (error, data) {
    if (error) {
      writeToErrorStream(errorHandler('fileMissing', path));
      return;
    }
    writeToOutputStream(extractUpperLines(data, numOfLines ));
  };
  fs.readFile(path, 'utf-8', onHeadCompletion);
};

module.exports = { head };
