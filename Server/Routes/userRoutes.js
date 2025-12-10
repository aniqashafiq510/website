import express from "express"
import { changePassword, forgetPassword, Login, preSign, resetPassword, Signup, 
    updateUserProfile,fetchAllUsers,deleteUser,blockUser,unblockUser,fetchSingleUser
 } from "../Contollers/userController.js"

const router = express.Router()

router.post('/login', Login)
router.post('/preSign' , preSign)
router.post('/signup', Signup)
router.post('/forgetPassword', forgetPassword)
router.post('/resetPassword', resetPassword)
router.post('/updatePassword/:resetToken', changePassword)
// router.get("/profile/:id", getUserProfile)
router.put("/update-profile/:id", updateUserProfile);
router.get("/all", fetchAllUsers)
router.delete('/delete/:id', deleteUser);
router.put('/block/:id', blockUser);
router.put('/unblock/:id', unblockUser)
router.get("/:id", fetchSingleUser)


export default  router


