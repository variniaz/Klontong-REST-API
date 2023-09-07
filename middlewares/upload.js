const multer = require('multer');
const path = require('path');
// const storage = multer.memoryStorage();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + process.env.LOCAL_IMAGE_PATH));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  // limits: { fileSize: 1048576 },
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      callback(null, true);
    } else {
      callback(null, false);
      callback(new Error('only png, jpg, and jpeg allowed to upload!'));
    }
  },
  onError: function (err, next) {
    console.log('error', err);
    next(err);
  },
});

module.exports = upload;
