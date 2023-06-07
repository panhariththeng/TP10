const express = require('express');
const { joiValidation } = require('../middlewares/joiValidate');
const { registerSchema, loginSchema } = require('../schemas');
const { login } = require('../services/login');
const { register } = require('../services/register');
const router = express.Router();
const { checkAuth } = require('../middlewares/checkAuth');
const { findAuth } = require('../middlewares/findAuth');
const { findUser, currentUser, updateUser, deleteUser, updatePassword } = require('../services/user');

router.post('/login', findAuth("sign in"), joiValidation(loginSchema), async(req, res, next) => {
    const { email, password } = req.body;
    await login(email, password, req, res);
})

router.post('/logout', checkAuth("Sign out"), async(req, res, next) => {
    //delete Cookie
    res.status(200).clearCookie('access_token').json({ status: "True", message: "Log out successful" })
})
router.post('/user/:id', checkAuth("get user info"), async(req, res, next) => {
    const { id } = req.params;
    //find detail info user
    await findUser(id, req, res);
})

router.post('/me', checkAuth("get user info"), async(req, res, next) => {
    //find detail info user
    await currentUser(req, res);
})
router.post('/update-user', checkAuth("update user"), async(req, res, next) => {
    //update username and last name
    await updateUser(req.body, req, res);
})
router.post('/update-password', checkAuth("update password"), async(req, res, next) => {
    //update username and last name
    await updatePassword(req.body, req, res);
})
router.post('/delete-user', checkAuth("delete user"), async(req, res, next) => {
    //delete current user
    await deleteUser(req, res);
})
router.post('/register', findAuth("register"), joiValidation(registerSchema), async(req, res, next) => {
    await register(req.body, res)
})

module.exports = router;