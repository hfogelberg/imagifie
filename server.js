const express = require('express'),
      cors = require('cors'),
      path = require('path'),
      port  = process.env.PORT || 80,
      app = express();

app.use(cors());

app.use("/", express.static(__dirname + "/"));
app.get("/", (req, res) => {
  res.send(path.join(__dirname + "/index.html"));
});

app.get("/api/appsettings", (req, res) => {
  settings = {
    cloudinaryBaseUrl: process.env.CLOUDINARY_BASE_URL,
    cloudinaryUploadUrl: process.env.CLOUDINARY_UPLOAD_URL,
    cloudinaryPreset: process.env.CLOUDINARY_PRESET,
    cloudinaryThumbUrl: process.env.CLOUDINARY_THUMB_URL,
    clarifaiKey: process.env.CLARIFAI_KEY
  }

  console.log("Returning app settings", settings);

  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ settings }));
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
