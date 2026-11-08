
const validateInput = (req, res, next) => {
    const { username, email, password } = req.body;
    const path = req.path;

    // 1. Email Normalization (Sare routes ke liye jahan email aati hai)
    if (email) {
        req.body.email = email.toLowerCase().trim();
    }

    // 2. SIGNUP Check (Sab kuch lazmi hai)
    if (path === '/sign-up') {
        if (!username) return res.status(400).json({ error: "Username likhna zaroori hai!" });
        if (!email) return res.status(400).json({ error: "Email dena lazmi hai!" });
        if (!password) return res.status(400).json({ error: "Password dalna zaroori hai!" });
    }

    // 3. LOGIN Check (Sirf Email aur Password lazmi hain)
    if (path === '/login') {
        if (!email) return res.status(400).json({ error: "Email dena lazmi hai!" });
        if (!password) return res.status(400).json({ error: "Password dena zaroori hai!" });
    }

    // 4. FORGOT PASSWORD Check (Sirf Email lazmi hai)
    if (path === '/forgot-password') {
        if (!email) return res.status(400).json({ error: "Email dena lazmi hai taake OTP bheja ja sake!" });
    }

    // 5. Password Length Validation (Jahan bhi password ho, length check karo)
    if (password) {
        if (password.length < 3 || password.length > 15) {
            return res.status(400).json({ error: "Password 3 se 15 characters tak hona chahiye!" });
        }
    }

    next(); 
};

module.exports = validateInput;