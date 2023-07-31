const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const postController = require("../controllers/post");
const userController = require("../controllers/user");

const uploadDir = path.join(__dirname, "../../uploads/images/");

const uploadMiddleware = (req, res, next) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) return next(err);

    req.body = fields;
    req.files = files;

    next();
  });
};

router.post("/", uploadMiddleware, async (req, res) => {
  try {
    let { payload } = req.body;

    payload = JSON.parse(payload);

    if (!Array.isArray(payload.tagItems) || payload.tagItems.length == 0)
      return res.status(422).send({ msg: "Tag at least one person!" });

    const file = req?.files?.image[0];

    if (!file) return res.status(422).send({ msg: "Image not found!" });

    const fileName = `${Date.now().toString()}-${file?.originalFilename}`;
    const filePath = path.join(uploadDir, fileName);

    fs.copyFileSync(file?.filepath, filePath);
    fs.unlinkSync(file?.filepath);

    payload.image = `/uploads/images/${fileName}`;

    const user = await userController.getByEmail(req.user.email);
    payload.user = { _id: user._id };

    const post = await postController.save(payload);

    if (!post) return res.status(422).send({ msg: "Something went wrong!" });

    return res.status(200).send({ msg: "Post uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const allPosts = await postController.getAllPosts();

    return res.status(200).send({ data: allPosts });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

router.get("/image/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await postController.getById(postId);

    if (!post) return res.status(422).status({ msg: "Post not found!" });

    const imagePath = path.join(__dirname, "../..", post.image.substring(1));

    res.sendFile(imagePath);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

module.exports = router;
