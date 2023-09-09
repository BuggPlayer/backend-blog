const express = require("express");
const router = express.Router();
const Blog = require("../Models/Blog");
const { Types } = require("mongoose");

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const {
  listPostByCategory,
  searchPosts,
  updateBlogStatus,
} = require("../Controllers/BlogController");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.png`);
      },
    }),
  });

// const uploadSingle = upload("blog-img-testing").single("croppedImage");

router.post("/createPost", async (req, res, next) => {
  const uploadSingle = upload("blog-img-testing").single("imageThumb");
  // console.log("reqqqq body", req.body);
  // console.log("req file", req.file);

  uploadSingle(req, res, async (err) => {
    // console.log("body", req.body);
    // console.log("file", req.file);

    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

  
    let img = req.file.location;
    // console.log("req.file",img);
    await Blog.create({
      imageThumb: img,
      content: req.body.content,
      title: req.body.title,
      category: new Types.ObjectId(req.body.category),

      // comment: req.body.comment._id||"",
      status: req.body.status,
    });
    res.status(200).json({ data: req.file.location });
  });

  // try {
  //   uploadSingle(req, res, async (err) => {
  //     if (err)
  //       return res.status(400).json({ success: false, message: err.message });

  //     await Blog.create({
  //       content,
  //       title,
  //       category: new Types.ObjectId(category),
  //       imageThumb: data.Location,
  //       comment: comment._id,
  //       status: status,
  //     });

  //     res.status(200).json({ data: req.file.location });
  //   });
  // } catch (error) {
  //   console.log("err", error);
  //   return res
  //     .status(400)
  //     .json({ status: "failed", message: "Unable to create post" });
  // }

  // when the payload is empty

  // try {
  //   const { content, title, category, imageThumb, status } = req.body.data;
  //   if (imageThumb) {
  //     /** upload base64 data into cloudinary */
  //     // const uploadedResponse =  await cloudinary.uploader.upload(imageThumb, { upload_preset: 'samples/ecommerce' });
  //     const uploadedResponse = {
  //       url: "https://cdn.pixabay.com/photo/2018/08/26/23/55/woman-3633737_1280.jpg",
  //     };

  //     if (uploadedResponse) {
  //       const comment = await new Comment({
  //         commentArray: [],
  //         bookmark: [],
  //       }).save();

  //       if (!comment) {
  //         console.log("Error : >>", "Unable to create comment");
  //       }
  //       const blog = new Blog({
  //         content,
  //         title,
  //         category: new Types.ObjectId(category),
  //         imageThumb: uploadedResponse?.url,
  //         comment: comment._id,
  //         status: status,
  //       });

  //       const savedblog = await blog.save();
  //       // res.status(200).send(savedblog);

  //       if (!savedblog)
  //         return res
  //           .status(400)
  //           .json({ status: "fail", message: "the blog cannot be created!" });
  //       return res.status(200).json({ status: "Success", data: blog });
  //     }
  //   } else {
  //     console.log("No Images attached");
  //   }
  // } catch (error) {
  //   console.log("err", error);
  //   return res
  //     .status(400)
  //     .json({ status: "failed", message: "Unable to create post" });
  // }
});

router.get("/getBlogs", async (req, res) => {
  //for pagination
  // const page = parseInt(req.query.page);
  // const limit = parseInt(req.query.limit);
  // const skipIndex = (page - 1) * limit;

  const getallblogs = await Blog.find().sort({ _id: -1 }).populate("category");
  if (!getallblogs) return res.status(400).send("the blogs is not found");
  res.status(200).json({ data: getallblogs });
});

// signel data
router.get("/getsingle/:slug", async (req, res) => {
  if (!req.params?.slug) {
    return res.status(400).json({ message: "Please provide slug" });
  }

  const getsignleblog = await Blog.findOne({ slug: req.params.slug }).populate(
    "comment"
  );
  if (!getsignleblog)
    return res
      .status(400)
      .json({ message: "The User with the given ID was not found." });
  res.status(200).json({ data: getsignleblog });
});

router.get("/postByCategory", listPostByCategory);
router.get("/search", searchPosts);
router.post("/updateStatus", updateBlogStatus);

module.exports = router;

// Blog.find()
//   .populate("writer")
//   .exec((err, blogs) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).json({ success: true, blogs });
//   });

// const { auth } = require("../middleware/auth");
//=================================
//             Blog
//=================================

// fieldname: 'file',
// originalname: 'React.png',
// encoding: '7bit',
// mimetype: 'image/png',
// destination: 'uploads/',
// filename: '1573656172282_React.png',
// path: 'uploads/1573656172282_React.png',
// size: 24031
