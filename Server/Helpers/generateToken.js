import jwt from 'jsonwebtoken'
import { JWT_secret } from '../Config/config.js';



const generateToken = (req, res, user) => {
    const token = jwt.sign({ id: user._id }, JWT_secret, { expiresIn: '1d' });
    const refreshToken = jwt.sign({ id: user._id }, JWT_secret, { expiresIn: '1d' });
    user.password = undefined;
    user.resetPasswordkey = undefined;
    return res.json({
        ok: true,
        token,
        refreshToken,
        user
    });
};
// jwt.sign token create krt h,, takes 3 arguments , 1.inputs from user 2.secret token 3.expiry time
// but as this token will be given on the email we have already stored in db.. we will take access that email through id..thats why here the first argument is id

export default generateToken