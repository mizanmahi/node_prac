const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    // constructing file name
    const extName = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(extName, '')
        .toLocaleLowerCase()
        .split(' ')
        .join('-') +
      '-' +
      Date.now();

    cb(null, fileName + extName);
  },
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
      ? cb(null, true)
      : cb(new Error('This image format is not supported'));
  },
  limits: {
    fileSize: 1000000, // 1MB
  },
});

app.post('/', upload.single('avatar'), (req, res) => {
  const { originalname, size } = req.file;
  res.json({ originalname, size });
});

app.use((err, req, res, next) => {
  if (!err) {
    res.status(200).send('Success');
  } else {
    res.send(err.message);
  }
});

app.listen(3000, () => console.log(`Server is running on 3000`));
