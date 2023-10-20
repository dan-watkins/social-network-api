const { User, Thought } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      const userObj = {
        users,
      };
      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params._id }).select("-__V");

      if (!user) {
        res.status(404).json({ message: "No User found with that ID!" });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params._id });

      if (!student) {
        res.status(404).json({ message: "No User found with that ID!" });
      }
      res.json({ message: "User successfully deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
