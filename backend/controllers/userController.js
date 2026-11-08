const User = require('../models/userSchema');
const Task = require('../models/taskSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });



exports.signUp = async (req, res) => {
    try {
        const { username, email, password, type } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message: "User already exists with this email." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword, type: type || 'user' });
        await newUser.save();

        // 4. Generate JWT Token for automatic login
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, type: newUser.type },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: "User registered successfully!",
            token,
            user: {
                username:newUser.username,
                email: newUser.email,
                type: newUser.type
            }
        });

    } catch (err) {
        res.status(500).json({message: "Internal Server Error!", error: err.message});
    }
};


exports.getUsers = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!req.user) {
            return res.status(401).json({ message: "Login karein!" });
        }

        if (req.user.type !== 'admin' && userId && req.user.id !== userId) {
            return res.status(403).json({ message: "Access Denied!" });
        }
        
        if (!userId) {
            if (req.user.type !== 'admin') {
                return res.status(403).json({ message: "Only Admin see users" });
            }
            const users = await User.find()
            .select('-password -otp -otpExpiry')
            .sort({createdAt: -1});  
            
            return res.status(200).json(users);
        }

        const user = await User.findById(userId).select('-password -otp -otpExpiry');
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json(user);

    } catch (err) {
        res.status(500).json({message: "Error fetching data!", error: err.message});
    }
};



exports.updateUser = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { username, email, newPassword, oldPassword } = req.body;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // 1. Username Update
        if (username && username.trim() !== "" && username !== user.username) {
            user.username = username;
        }

        // 2. Email Update (Already lowercased by middleware)
        if (email && email !== user.email) {
            user.email = email;
        }

        // 3. Password Logic
        if (newPassword && newPassword.trim() !== "") {
            const isAlreadySame = await bcrypt.compare(newPassword, user.password);

            if (!isAlreadySame) {
                // If user wants to change password, they MUST provide the old one
                if (!oldPassword) {
                    return res.status(400).json({ 
                        message: "Current password is required to set a new password." 
                    });
                }

                // Verify old password
                const isOldMatch = await bcrypt.compare(oldPassword, user.password);
                if (!isOldMatch) {
                    return res.status(400).json({ message: "Incorrect current password." });
                }
                user.password = await bcrypt.hash(newPassword, 10);
            }
        }
        await user.save();

        let successMessage = "Profile updated successfully! ✨";

        if (newPassword && newPassword.trim() !== "") {
            successMessage = "Password updated successfully! 🔐";
        }  

res.status(200).json({ 
    message: successMessage, 
    user: { username: user.username, email: user.email } 
});

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "This email is already in use by another account."});
        }
        
        res.status(500).json({message: "Internal Server Error!", error: err.message });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, type: user.type },
            process.env.JWT_SECRET,             
            { expiresIn: '1h' }              
        );

        res.status(200).json({
            message: "Login successful!",
            token: token,
            user: {
                username: user.username,
                email: user.email,
                type: user.type
            }
        });

    } catch (err) {
        res.status(500).json({message: "An internal server error occurred. Please try again.", error: err.message 
        });
    }
};





exports.forgotPassword = async (req, res) => {

    const { email } = req.body;

    try {
        // 1. Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found with this email." });
        }
        
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        
        user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000; 
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Hi ${user.username}, your OTP code for password reset is: ${otp}. It will expire in 5 minute.`
        };

        await transporter.sendMail(mailOptions);

        setTimeout(async () => {
            try {
                const findUser = await User.findById(user._id);
                if (findUser && findUser.otp === otp) {
                    findUser.otp = undefined;
                    findUser.otpExpiry = undefined;
                    await findUser.save();
                    console.log(`OTP for ${email} has been automatically cleared.`);
                }
            } catch (err) {
                console.error("Auto-cleanup error:", err.message);
            }
        }, 60 * 1000); 

        console.log(`Reset Request for: ${email} | OTP: ${otp}`);

        res.status(200).json({ message: "OTP sent successfully to your email!" });

    } catch (error) {
        console.error("Forgot Password Error:", error.message);
        res.status(500).json({ 
            message: "Failed to send OTP. Please try again later.", 
            error: error.message 
        });
    }
};




exports.resetPassword = async (req, res) => {

    const { email, otp, newPassword } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "No user found with this email address." });
        }

        if (!user.otp) {
            return res.status(400).json({ message: "No active OTP found. Please request a new one." });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP code. Please check and try again." });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP has expired. Please request a new password reset." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ message: "Password has been reset successfully. You can now login with your new password." });

    } catch (error) {
        res.status(500).json({message: "An internal server error occurred during password reset.", error: error.message });
    }
};




exports.deleteUserAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        // User ke tasks delete karein
        await Task.deleteMany({ userId });

        // User delete karein
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: "Aapka account aur tasks delete kar diye gaye hain." });

    } catch (err) {
        res.status(500).json({ message: "Error occurred!", error: err.message });
    }
};




