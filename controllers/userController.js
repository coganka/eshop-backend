const User = require('../models/User');

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('Successfully Deleted');
    } catch (err) {
        res.status(500).json(err);
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(401).json('No user found');
        }

        const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    deleteUser,
    getUser
};