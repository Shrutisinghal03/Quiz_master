import superAdmin from "../models/SuperAdminSchema.js";
import ResponseHandler from "../middlewares/error.middleware.js";
import student, { comparepassword } from  '../models/StudentSchema.js'
import { sendtoken } from "../utils/basicfxn.js";
import { sendOTPEmail } from '../utils/basicfxn.js'; 
import admin from "../models/AdminSchema.js";
import OTP from "../models/Otp.js";
import Profile from "../models/profileSchema.js";
import Quiz from "../models/quizSchema.js";
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
}
 export const Register = async (req, res, next) => {
    const { name, email, password, confirmPassword,otp } = req.body;
    try {
        // Check if  superAdmin already exists
        
        if (password !== confirmPassword) {
			return res.status(200).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}
        const existinguser = await  superAdmin.findOne({ email });
        if (existinguser) {
            return next(new ResponseHandler(" superAdmin already exists!", 200,false));
        }

        const response= await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        
    
        if (response.length === 0) {
			// OTP not found for the email
			return res.status(200).json({
				success: false,
				message: "Invalid Email",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(200).json({
				success: false,
				message: "Invalid Otp",
			});
		} 
        // Create a new  superAdmin (without saving to database yet)
        const newUser = new  superAdmin({
            name,
            email,
            password,
        });
       const result= await newUser.save(); 
      if(!result)
        return next(new ResponseHandler("there is some error in the input", 200,false));
      
        const profileDetails = await Profile.create({
			gender: null,
			dob: null,
            contactNumber: null,
            superAdmin:result._id
		});
        newUser.profileID=profileDetails._id; 
        await newUser.save(); 
        sendtoken( newUser,200,res," superAdmin registered Successfully !!!!!");
        return next(new ResponseHandler("superAdmin registered Successfully", 209,true));

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res,next) => {
    const email = req.body.email;
    const password = req.body.password;


    try {
        const  User =  await  superAdmin.findOne({email}); 
        
    if(!  User )
        return next(new ResponseHandler(" superAdmin Does nort Existt ", 200,false));
    const decode=await comparepassword( User,password);  
    if (!decode)
        return next(new ResponseHandler("Incorrect Password !!! ", 200));

    sendtoken( User,200,res," superAdmin LOgged Inn Successfully !!!!!");
    } catch (error) {  
        return next(new ResponseHandler(error, 400,false));
    }
    

}
export const logout=async(req,res,next)=>{
    console.log("kya hbbe"); 
    try {
       return res
        .status(201).
        cookie("token","",{
            httpOnly:true,
            expires:new Date(Date.now()) })
        .json({
            message:" superAdmin Logged Out Successfully"
        })
    } catch (error) {
        return res.send("wrong error",404)
    }
  
}  
export const forgotpassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const response = await superAdmin.findOne({ email });

        if (!response) {
            return next(new ResponseHandler("superAdmin does not exist", 200));
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);

        if (otpBody) {
            return next(new ResponseHandler("OTP sent to your email for password reset.", 202, true));
        }

    } catch (error) {
        console.error("Error in forgot password:", error);
        // Use next() to pass the error to the error handling middleware
        return next(new ResponseHandler("Failed to process forgot password request.", 500));
    }
};
    export  const verifyOtpandResetPassword= async (req, res, next) => {
        const { email, otp, password } = req.body;
        try {
          
            // Find  superAdmin by email and OTP
            const User =await  superAdmin.findOne({ email });
    
            // If  superAdmin not found
            if (! User) {
                return next(new ResponseHandler(" superAdmin Does nort Existt ", 200,false));
            }
            const response= await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
            if (response.length === 0) {
                // OTP not found for the email
                return res.status(200).json({
                    success: false,
                    message: "The OTP is not valid",
                });
            } else if (otp !== response[0].otp) {
                // Invalid OTP
                return res.status(200).json({
                    success: false,
                    message: "The OTP is not valid",
                });} 
    

        // Update password
           User.password = password; // Assuming newPassword is already hashed
            await User.save();
    
            res.status(200).json({ message: "Password reset successful." });
            }
        catch (error) {
            
         res.status(500).json({ message: "Failed to verify OTP and reset password.",error });
        }
    }

        export const changePasswrd=async(req,res,next)=>{
            const {email}=req.user; 
            const {password,newpassword}=req.body; 
        try {
            const User = await  superAdmin.findOne({ email });
    
            // If  superAdmin not found
            if (! User) {
                return res.status(202).json({ message: " superAdmin not found" });
            }
            const decode=await comparepassword( User , password);  
            if (!decode)
                return next(new ResponseHandler("Incorrect Password !!! ", 200));
            else{
               User.password=newpassword; 
                await User.save(); 
                return next(new ResponseHandler("password set successfully ", 200,true));
            }
        } catch (error) {
            return next(new ResponseHandler("There is Some Error in chnging passwrd",error)); 
        }
        }

        
        export const RegisterAdmin = async (req, res, next) => {
            const sauser = req.user;
            const { name, email, password, confirmPassword } = req.body;
          
            try {
              // Check if superAdmin already exists
              const existingSuperAdmin = await superAdmin.findOne({ email: sauser.email });
              if (!existingSuperAdmin) {
                return next(new ResponseHandler("You are not allowed to perform this action.", 403));
              }
          
              // Validate password match
              if (password !== confirmPassword) {
                return res.status(400).json({
                  success: false,
                  message: "Password and Confirm Password do not match. Please try again.",
                });
              }
          
              // Validate email uniqueness (if required)
          
              // Create new admin document
              const newAdmin = new admin({ name, email, password });
          
              // Save new admin
              const savedAdmin = await newAdmin.save();
          
              if (!savedAdmin) {
                return res.status(500).json({ success: false, message: "Admin not registered. Please try again later." });
              }
          
              // Create related profile document
              const profileDetails = await Profile.create({
                gender: null,
                dob: null,
                contactNumber: null,
                admin: savedAdmin._id,
              });
          
              // Update newAdmin with profileID
              newAdmin.profileID = profileDetails._id;
              await newAdmin.save();
          
              // Send OTP email for password change
              sendOTPEmail(email, password, "Change Your Password");
          
              // Update existing superAdmin with adminCreated
              existingSuperAdmin.adminCreated.push(savedAdmin._id);
              await existingSuperAdmin.save();
          
              // Respond with success message and status
              res.status(200).json({ success: true, message: "Admin registered successfully.", email: email });
          
            } catch (error) {
              console.error("Error in registering admin:", error);
              next(error); // Forward the error to the error handling middleware
            }
          };
          

       export   const getAllAdmins = async (req, res, next) => {
            const { email } = req.user;
            console.log(email);
            try {
              const superAdmins = await superAdmin.findOne({ email }); // Find the super admin by email
             
              if (!superAdmins) {
                return next(new ResponseHandler("You are not allowed to do this", 200));
              }
              const admins = await admin.find({});
              return res.send({ admins }); // Wrap admins in an object
            } catch (error) {
              console.error("Error fetching admins:", error); // Log the error
              return next(new ResponseHandler("Failed to fetch admins", 400, error));
            }
          };
          
  export const getAllStudent= async (req, res,next) => {
    const {email}=req.user;
     console.log(email); 
    try {
        const stu=await student.findOne({email}); 
        if(stu)
      return next(new ResponseHandler("tou are not allowed to do thiss...", 200,false));
      const  Students= await  student.find({}); // Find all  students
  
      return res.json({ success: true,  Students});
    } catch (error) {
      
        return next(new ResponseHandler("Failed to fetch students", 400,error));
    }
  };
  
export const getAdminHistory=async(req,res,next)=>{
    const user=req.user; 
    const { email}=req.body
    try {
          const isadmin=await admin.findOne({email:email}) ; 
          if(!isadmin)
            return next(new ResponseHandler("Wrong email",206));
            const quizzes=await Quiz.find({author:isadmin._id}); 
            if(!quizzes)
                return next(new ResponseHandler(" no data found",206));

         
         return res.status(200).json({"list of quizzes " : quizzes});

    } catch (error) {
         return next(new ResponseHandler("There is Some Error in fetching admin history",error)); 
    }
}