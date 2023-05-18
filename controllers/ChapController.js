const Chap = require('../model/Chap')
const { v4: uuidv4 } = require("uuid")

const ChapController = {
  find: async (req, res) => {
    try {
      let { queryInput, sort } = req.body
      let stories = await Chap.find(queryInput).sort(sort)
      if (!stories.length) return res.json({ errorCode: 1, errorMsg: "No data" })
      return res.json({
        errorCode: 0,
        errorMsg: "Success",
        data: stories
      });
    } catch (error) {
      console.log("ChapController", error)
      res.error()
    }
  },
  create: async (req, res) => {
    try {
      let opt = {
        ...req.body,
        sid: uuidv4()
      }
      await Chap.create(opt)
      return res.json({
        errorCode: 0,
        errorMsg: "Success",
      })
    } catch (error) {
      console.log("ChapController", error)
      res.error()
    }
  }
}

module.exports = ChapController