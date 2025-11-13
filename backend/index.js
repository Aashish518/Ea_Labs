const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const connectDB=require("./database/db");
connectDB();

const path = require("path");
const fs = require("fs");


const PORT = process.env.PORT;
const sliderImages = require("./routers/sliderimages");
const testCategory = require("./routers/testcategory");
const tests = require("./routers/tests");
const visiter = require("./routers/visitor");
const contactUs = require("./routers/contactUs");
const location = require("./routers/location");
const testPackageCategory = require("./routers/testpackagecategory");
const testMenu = require("./routers/testmenu");
const aboutus=require("./routers/aboutus");
const resource=require("./routers/resource");

const cors = require("cors");

const allowedOrigins = [
    "http://localhost:5173", 
    "http://localhost:5174",
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error("CORS policy: Not allowed by CORS"), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Custom file-serving route that supports inline display & video streaming
app.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  // 🎥 For video files (mp4, webm, ogg) — enable partial streaming
  if ([".mp4", ".webm", ".ogg"].includes(ext)) {
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
        "Content-Disposition": "inline",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
        "Content-Disposition": "inline",
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    // 📄 For images, PDFs, etc. (normal inline view)
    const mimeType =
      ext === ".pdf"
        ? "application/pdf"
        : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".png"
        ? "image/png"
        : "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": mimeType,
      "Content-Disposition": "inline",
    });
    fs.createReadStream(filePath).pipe(res);
  }
});
app.use("/api/sliders", sliderImages);
app.use("/api/testcategory", testCategory);
app.use("/api/tests", tests);
app.use("/api/visitor", visiter);
app.use("/api/contacts", contactUs);
app.use("/api/location", location);
app.use("/api/testpackagecategory", testPackageCategory);
app.use("/api/testmenu", testMenu);
app.use("/api/aboutus",aboutus);
app.use("/api/resource",resource);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `)
});

