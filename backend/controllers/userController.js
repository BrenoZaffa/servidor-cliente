const {User: UserModel} = require('../models/user');

const userController = {

    create: async (req, res) => {
        try {
            console.log("teste");
            const service = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
            };
            const response = await UserModel.create(service);

            res.status(201).json({response, msg: 'User created successfully'});

        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = userController;