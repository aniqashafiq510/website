import passwordValidator from "password-validator"
import User from "../Models/userModel.js"
import validator from "email-validator"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { clientSite, JWT_secret } from "../Config/config.js"
import {awsSES} from '../Config/AWS.js'
import emailTemplate from '../Helpers/emailTemplate.js'
import generateToken from "../Helpers/generateToken.js"
import {nanoid} from 'nanoid'



var schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 
.is().max(40)                                   // Maximum length 
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().symbols(1)                               // Must have at least 1 special character
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

var range = new passwordValidator();
range.is().min(8)
.is().max(40)  

var upperCase = new passwordValidator();
upperCase.has().uppercase() 

var lowerCase = new passwordValidator();
lowerCase.has().lowercase()

var digits = new passwordValidator(); 
digits.has().digits(2)  

var specialChar = new passwordValidator();
specialChar.has().symbols(1) 

var spaces =  new passwordValidator();
spaces.has().not().spaces() 
var blockedPasswords = new passwordValidator();
blockedPasswords .is().not().oneOf(['Passw0rd', 'Password123'])



const preSign = async (req, res) => {
    try {

        // 1. get input from user
        const {email,password,role} = req.body
    

        // 2.fill all fields logic
        if(!email || !password || !role) {
            return res.json({
                ok:false,
                error: "No field should be empty!"
            })
        }
        // 3.email should be authentic/valid(should have right format)

        const valid = validator.validate(email)
        if(!valid) {
            return res.json({
                ok:false,
                error: "Enter a valid email address! Your email might be missing @ or the format is not abc@xyz.com|org|edu"
            })
        }
        const validate =  schema.validate(password)
        if(!validate) {
            if(!range.validate(password)){
                 return res.json({
                    ok:false,
                    error:`Password length should be between 8-40 characters!`
                })
            }
            if(!upperCase.validate(password)) {
                return res.json({
                    ok:false,
                    error:`Your password must have atleast one Upper case letter!`
                })}
            if(!lowerCase.validate(password)) {
                return res.json({
                    ok:false,
                    error:`Your password must have atleast one lower case letter!`
                })}
            if(!digits.validate(password)) {
                return res.json({
                    ok:false,
                    error:`Your password must have atleast two digits!`
                })}
            if(!specialChar.validate(password)) {
                return res.json({
                    ok:false,
                    error:`Your password must have atleast one special character..(!@#$%&*)`
                })}
            if(!blockedPasswords.validate(password)) {
                return res.json({
                    ok:false,
                    error:`Your password shouldn't be like ['Passw0rd', 'Password123'] !`
                })}
            if(!spaces.validate(password)) {
                return res.json({
                    ok:false,
                    error:`Your password can't have spaces!`
                })}
        }
       
// email should be unique..
        const emailExist = await User.findOne({email})
        if(emailExist) {
            return res.json({
                ok:false,
                error:`This email{ ${email} } is already taken!`
            })
        }

        // sign token create krt h,, takes 3 arguments , 1.inputs from user 2.secret token 3.expiry time
        const token = jwt.sign({email,password,role}, JWT_secret, {expiresIn: '4h'})
       

        // send the verification link to reciever using aws-ses

        awsSES.sendEmail(emailTemplate(
                email,
                'signup verification link',
                `
                <h2> Sign up Verification Link</h2>
                <p> Click the link below to signup</p>
                <a href='${clientSite}/activate/${token}'>Create Account </a>
                <h2> Thank You</h2>
                <p>Wheelspot - Online Marketplace for vehicles</p>
                `
        ), 
        (err, Data) => {
            if(err) res.json ({
                ok:false,
                error:err
                
            })
            if(Data) 
                res.json({
                ok:true,
                message:`We have sent u email, Please  check ur email ${email} to complete the sign up proccess!`
            })
        })
         console.log(token)


        //  AWSSES.sendEmail(emailtemplate(), (err,data) => {  })
} catch (error) {
        console.log(error.message)
        
    }
}
const Signup = async (req, res) => {
    try {
        // Verify the token and extract email and password
        const { email, password,role } = jwt.verify(req.body.token, JWT_secret);

        // Check if email already exists in the database
        const user = await User.findOne({ email });
        if (user) {
            return res.json({
                ok: false,
                error: "Account is already created!"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const newUser = new User({
            email,
            password: hashPassword,
            role
        });
        await newUser.save();

        // Generate token with the new user
        generateToken(req, res, newUser);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            ok: false,
            error: "Server error"
        });
    }
};
const Login = async (req, res) => {
    try {
        // 1. get input from user
        const {email,password} = req.body
    

        // 2.fill all fields logic
        if(!email || !password) {
            return res.json({
                ok:false,
                error: "No field should be empty!"
            })
        }
        // 3.email should be authentic/valid
        // validator.validate is function of email-validator that will check the correct pattern of an email

        const valid = validator.validate(email)
        if(!valid) {
            return res.json({
                ok:false,
                error: "Enter a valid email address!"
            })
        }

        // email should exist in db
        const user = await User.findOne({email})
        if(!user) {
            return res.json({
                ok:false,
                error:"User not found!"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        // jo user password dy ga usy pehly likhna h compare me or db wala pswd bad me 
        if(!isMatch) {
            return res.json({
                ok:false,
                error: 'User not found!'
            })
        }

        generateToken(req,res,user)





        
    } catch (error) {
        console.log(error.message)
        
    }
}
const forgetPassword = async (req, res) => {
    try {
        const {email} = req.body
    

        // 2.fill alll fields logic
        if(!email) {
            return res.json({
                ok:false,
                error: "Please enter your email!"
            })
        }
        // 3.email should be authentic/valid
        // validator.validate is function of email-validator that will check the correct pattern of an email

        const valid = validator.validate(email)
        if(!valid) {
            return res.json({
                ok:false,
                error: "Enter a valid email address!"
            })
        }
        const emailExist = await User.findOne({email})
        if(!emailExist) {
            return res.json({
                ok:false,
                error:"This email isn't registered. You can register yourself with new email!"
            })
        }
        

        // nano id is a unique, hard-to-guess identifier(character string) that ties the reset link to this specific user and request.
        const nano_id = nanoid(10)
        console.log(nano_id)

        emailExist.resetPasswordkey = nano_id
        await emailExist.save()

        const resetToken = jwt.sign({nano_id}, JWT_secret, {expiresIn: "1h"})

        awsSES.sendEmail(emailTemplate(
                email,
                'Password Recovery Link',
                `
                <h2> Password Recovery Link</h2>
                <p> Click the link below to reset password! </p>
                <a href='${clientSite}/newPassword/${resetToken}'>Reset Password </a>
                <h2> Thank You</h2>
                <p>Wheelspot - Online Marketplace for vehicles</p>
                `
        ), 
        (err, Data) => {
            if(err) 
                return res.json ({
                ok:false,
                error:err
            })
            if(Data) 
               return res.json({
                ok:true,
                message:`We have sent u email, Please  check ur email ${email} to update your password!`
            })
        })



    } catch (error) {
        console.log(error.message)
        
    }
}

const resetPassword = async (req, res) => {
    try {
        const {nano_id} = jwt.verify(req.body.resetToken, JWT_secret)

        const user = await User.findOne({resetPasswordkey : nano_id}) 
        if (user) {
            return res.json({
                ok: true
            });
        }
        
        else{
            return res.json({
                ok:false,
                error:`Invalid or expired link!`
            })
        }

        
        
    } catch (error) {
        return res.json({
            ok:false,
            error: `Something went wrong. Try again!`
        })
        
    }
}

const changePassword = async (req, res) => {
    try {
        const {resetToken} = req.params
        console.log(resetToken)
        const {nano_id} = jwt.verify(resetToken,JWT_secret)
        const { password, confirm_password} = req.body

        if(!password || !confirm_password){
            return res.json({
                ok:false,
                error:`Enter both fields!`
            })
        }
        const validate =  schema.validate(password)
        if(!validate) {
            if(!range.validate(password)){
                 return res.json({
                    ok:false,
                    error:`Password length should be between 8-40 characters!`
                })
            }
            if(!upperCase.validate(password)) {
                return res.json({
                    ok:false,
                    error:`Your password must have atleast one Upper case letter!`
                })}
            if(!lowerCase.validate(password)) {
                return res.json({
                    ok:false,
                    error:`Your password must have atleast one lower case letter!`
                })}
            if(!digits.validate(password)) {
                return res.json({
                    ok:false,
                    error:`Your password must have atleast two digits!`
                })}
                if(!specialChar.validate(password)) {
                return res.json({
                    ok:false,
                    error:`Your password must have atleast one special character..(!@#$%&*)`
                })}
                if(!blockedPasswords.validate(password)) {
                return res.json({
                    ok:false,
                    error:`Your password shouldn't be like ['Passw0rd', 'Password123'] !`
                })}
                if(!spaces.validate(password)) {
                return res.json({
                    ok:false,
                    error:`Your password can't have spaces!`
                })}

        //    return  res.json({
        //     ok:false,
        //     error:`Your password:
        //     ✅Length should be between 3-50 characters!
        //     ✅Must contain upper case and lower case letters!
        //     ✅Must have atleast two digits!
        //     ✅Must have atleast one special character!
        //     ❌Should not have spaces!`
        //    })
        }
        
        if(password !== confirm_password) {
            return res.json({
                ok:false,
                error:`Password and Confirm_Password should be same!`
            })
        }

        

        const user = await User.findOne({resetPasswordkey: nano_id})
        if(!user){
            return res.json({
                ok:false,
                error: `User not found or Invalid token!`
            })
        }

        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password,salt)

        user.password= hashPassword
        user.resetPasswordkey = undefined
        await user.save()
        
        
        return res.json({
            ok:true,
            message:`Your password has updated!`
        })
        
    } catch (error) {
        res.json({
            ok:false,
            error:`Something went wrong. Try again!`
        })
        
    }
}

// const getUserProfile = async (req, res) => {
//   try {
//     const userId = req.params.id

//     const user = await User.findById(userId).populate("pp");

//     if (!user) {
//       return res.status(404).json({ ok: false, message: "User not found" });
//     }

//     res.json({
//       ok: true,
//       user,
//     });
//   } catch (error) {
//     console.error("getUserProfile error:", error);
//     res.status(500).json({ ok: false, message: "Server error" });
//   }
// };

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      name,
      email,
      address,
      city,
      state,
      country,
      zipcode,
      gender,
      dob,
      pp, // profile picture ID
    } = req.body;

    // Build update object
    const updateData = {
      name,
      email,
      address,
      city,
      state,
      country,
      zipcode,
      gender,
      dob,
    };

    // Include profile picture if provided
    if (pp) updateData.pp = pp;

    // Update the user document and populate profile picture
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,          // return the updated document
      runValidators: true // validate fields
    }).populate("pp");    // populate pp field

    if (!updatedUser) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    // Respond with updated user
    return res.json({ ok: true, user: updatedUser });

  } catch (error) {
    console.error("UpdateProfile error:", error);
    return res.status(500).json({
      ok: false,
      message: "Failed to update profile",
    });
  }
};


const fetchAllUsers = async (req,res) => {
    try {
        const users = await User.find().populate("pp")
     return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error("Get All Posts Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
}

const fetchSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID and populate profile picture
    const user = await User.findById(id).populate("pp");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Fetch Single User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user
    });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

const blockUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User blocked successfully",
      data: user
    });
  } catch (error) {
    console.error("Block User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// Unblock a user
 const unblockUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User unblocked successfully",
      data: user
    });
  } catch (error) {
    console.error("Unblock User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};



export {
    
    Login, preSign,Signup,
    forgetPassword,resetPassword,
    changePassword,updateUserProfile,fetchAllUsers,fetchSingleUser,
    deleteUser,blockUser,unblockUser
}