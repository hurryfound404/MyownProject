var muilter = require('./upFile.js');

var muilterIndex = require('./upFileIndex.js');
//multer有single()中的名称必须是表单上传字段的name名称。 
// var upload = muilter.single('file');
var upload = muilter.array('file', 5);
var uploadIndex = muilterIndex.array('file', 3);
function dataInput (req, res) {
  upload(req, res, function (err) {
    //添加错误处理 
    if (err) {
      return console.log(err);
    }
    //文件信息在req.file或者req.files中显示。
    // console.log(req.file)
    console.log(req.files)
    // let photoPath = req.file.path;
    // photoPath = photoPath.replace(/public/, "");//将文件路径中的public\去掉，否则会和静态资源配置冲突 
    // //将photoPath存入数据库即可 
    // console.log(photoPath);
    // res.send(photoPath);
    let photoPathArr = [];
    req.files.forEach(ele => {
      // ele.filename = 'images/PrL-Img/' + ele.filename
      photoPathArr.push(ele.filename)
      // photoPathArr.push(ele.path.replace(/public/, ""))
    });
    console.log(photoPathArr);
    req.session.photoPathArr = photoPathArr;
    res.send(photoPathArr);
  });
}

function dataInputIndex (req, res) {
  uploadIndex(req, res, function (err) {
    //添加错误处理 
    if (err) {
      return console.log(err);
    }
    //文件信息在req.file或者req.files中显示。
    // console.log(req.file)
    console.log(req.files)
    // let photoPath = req.file.path;
    // photoPath = photoPath.replace(/public/, "");//将文件路径中的public\去掉，否则会和静态资源配置冲突 
    // //将photoPath存入数据库即可 
    // console.log(photoPath);
    // res.send(photoPath);
    let photoPathArr = [];
    req.files.forEach(ele => {
      // ele.filename = 'images/PrL-Img/' + ele.filename
      photoPathArr.push(ele.filename)
      // photoPathArr.push(ele.path.replace(/public/, ""))
    });
    console.log(photoPathArr);
    req.session.photoPathArr = photoPathArr;
    res.send(photoPathArr);
  });
}

module.exports = {
  dataInput,
  dataInputIndex
}; 