const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("File type is not supported"), false);
    }
  },
});

module.exports = upload;
