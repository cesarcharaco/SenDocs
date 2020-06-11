const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = use("fs")
const sharp = use("sharp")

exports.resizeFile = async (fileBase64) => {
  for (let i in fileBase64) {
    var data = fileBase64[i].src
    var decode = data.replace(/^data:image\/\w+;base64,/, '');
    var matches = data.match(/^data:[A-Za-z-]+\/([A-Za-z-]+)/);
    mkdirp.sync(`${Helpers.appRoot('storage')}/uploads/tmp/`)
    var profilePic = Helpers.appRoot('storage/uploads/tmp/') + 'tmpFile'+ i +'.' + matches[1]
    var profilePic2 = Helpers.appRoot('storage/uploads/tmp/') + 'tmpFileResize'+ i +'.' + matches[1]
    console.log(profilePic2)
    await fs.writeFile(profilePic, decode, {encoding: 'base64'}, (err) => {
      if (err) throw err
      sharp(profilePic).rotate().resize({ width: 300, height: 160 }).toFile(profilePic2, function(err) {

      });
    })
  }
};
