import multer from "multer";
import path from "path";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
    destination,
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".").pop();
        console.log(path.basename(file.originalname));
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
    }
  })
  
  const upload = multer({ storage });

  export default upload;