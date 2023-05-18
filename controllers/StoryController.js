const Story = require('../model/Story')
const { v4: uuidv4 } = require("uuid")

const StoryController = {
  find: async (req, res) => {
    try {
      let { queryInput, sort } = req.body
      let stories = await Story.find(queryInput).sort(sort)
      if (!stories.length) return res.json({ errorCode: 1, errorMsg: "No data" })
      return res.json({
        errorCode: 0,
        errorMsg: "Success",
        data: stories
      });
    } catch (error) {
      console.log("StoryController", error)
      res.error()
    }
  },
  create: async (req, res) => {
    try {
      if (Object.keys(req.body).length <= 0) {
        return res.json({
          errorCode: 1,
          errorMsg: "Failed",
        })
      }

      let opt = {
        ...req.body,
        sid: uuidv4()
      }
      await Story.create(opt)
      return res.json({
        errorCode: 0,
        errorMsg: "Success",
      })
    } catch (error) {
      console.log("StoryController", error)
      res.error()
    }
  }
}

module.exports = StoryController