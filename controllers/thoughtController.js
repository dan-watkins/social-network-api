const { Thought, User } = require("../models");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      const thoughtObj = {
        thought,
      };
      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id }).select(
        "-__V"
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID!" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought.id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought created bo no user with that username" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID!" });
      }
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found by that ID!" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID!" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.id });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No Thought found with that ID!" });
      }

      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought.id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought deleted but no user with this ID!" });
      }
      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
