const { user } = require("../models/user")

const findUser = async(id, req, res) => {
    try {
        const currentUser = await user.findById(
            id
        );
        if (currentUser) {
            return res.status(200).json({ status: "true", message: currentUser });
        } else {
            throw "User not found"
        }
    } catch (error) {
        return res.status(500).json({ status: "false", message: error });
    }

}

module.exports = {
    findUser,
}