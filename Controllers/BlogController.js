const Blog = require("../Models/Blog")
const { Types } = require('mongoose')

const listPostByCategory = async (req, res) => {
    const data = await Blog.find({ category: new Types.ObjectId(req.query.categoryId) }).populate("category")
    if (!data || data?.length === 0) {
        return res.status(400).json({ message: `No posts found under categoryId ${req.query.categoryId}` })
    }
    return res.status(200).json({ data: data })
}


const searchPosts = async (req, res) => {
    if (req.query.input === "") {
        return res.status(400).json({ message: `Please type some words` })
    }
    const search_data = await Blog.find({ title: { $regex: req.query.input, $options: "i" } })
    if (!search_data || search_data?.length === 0) {
        return res.status(400).json({ message: `Blogs not found` })
    }
    return res.status(200).json({ data: search_data })
}


const updateBlogStatus = async (req, res) => {
    if (req.body === "" || req.body === undefined) {
        return res.status(400).json({ message: `Status should not be empty` })
    }
    const update = await Blog.updateOne({ _id: new Types.ObjectId(req.body.id) }, { $set: { status: req.body.status } })
    if (!update) {
        return res.status(400).json({ message: `Unable to update the status of the blog` })
    }
    return res.status(200).json({ message: `Status updated successfully` })

}


module.exports = {
    listPostByCategory, searchPosts, updateBlogStatus
}