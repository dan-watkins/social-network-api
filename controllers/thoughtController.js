const { Thought } = require('../models');

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
            const thought = await Thought.findOne({_id: req.params.id}).select("-__V");

            if (!thought) {
                res.status(404).json({message: 'No thought found with this ID!'})
            }
            res.json((
                thought
            ));
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.id });

            if (!thought) {
                res.status(404).json({ message: "No Thought found with that ID!"});
            }
            res.json({ message: "Thought successfully deleted!"})
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}