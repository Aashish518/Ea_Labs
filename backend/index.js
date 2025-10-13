const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const connectDB=require("./database/db");
connectDB();

const path = require("path");

const PORT = process.env.PORT;
const sliderImages = require("./routers/sliderimages");
const testCategory = require("./routers/testcategory");
const tests = require("./routers/tests");
const visiter = require("./routers/visitor");
const contactUs = require("./routers/contactUs");
const location = require("./routers/location");
const testPackageCategory = require("./routers/testpackagecategory");

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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/sliders", sliderImages);
app.use("/api/testcategory", testCategory);
app.use("/api/tests", tests);
app.use("/api/visitor", visiter);
app.use("/api/contacts", contactUs);
app.use("/api/location", location);
app.use("/api/testpackagecategory", testPackageCategory)



app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} `)
});

