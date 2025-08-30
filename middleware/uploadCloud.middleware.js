const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

module.exports.uploadSingle = (req, res, next) => {
  if(req.file){
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      req.body[req.file.fieldname] = result.secure_url;
      next();
    }

    upload(req);
  } else {
    next();
  }
}

module.exports.uploadMulti = async (req, res, next) => {
  if(req.files.length > 0){
    const files = req.files;
    const thumbnails = [];

    let streamUpload = (file) => {
      return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );

        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    };

    for (const file of files) {
      const result = await streamUpload(file);
      thumbnails.push(result.secure_url);
    }

    req.body[files[0].fieldname] = thumbnails;
    next();
  } else {
    next();
  }
}