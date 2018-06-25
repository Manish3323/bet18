var fs = require('fs')
var path = require('path')
var moment = require('moment')
// const walkSync = (dir, filelist = []) => fs.readdirSync(dir)
//   .map(file => fs.statSync(path.join(dir, file)).isDirectory()
//     ? walkSync(path.join(dir, file), filelist)
//     : filelist.concat(path.join(dir, file))[0])

// var list = walkSync('D:/reactNative/products/Bet18/src/img/flags')

// var stream = fs.createWriteStream('D:/reactNative/products/Bet18/file.txt')
// stream.once('open', function (fd) {
//   for (let each in list) {
//     let splits = list[each].split('\\')
//     let temp = splits[splits.length - 1]
//     stream.write(temp.split('.')[0] + ' : require(' + list[each] + '),\n')
//   }
//   stream.end()
// })
const getCurrentTime = () => {
  console.log(moment().format('DD/MM/YYYY HH:mm:ss'))
  return moment().valueOf()
}
getCurrentTime();