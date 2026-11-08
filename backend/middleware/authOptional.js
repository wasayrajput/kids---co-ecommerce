const jwt = require('jsonwebtoken');

const authOptional = (req, res, next) => {
    // 1. Header se token uthao
    const authHeader = req.header('Authorization');
    const token = authHeader?.split(' ')[1];

    // 2. AGAR TOKEN NAHI HAI:
    if (!token) {
        req.user = null; // Controller ko batane ke liye ke banda Guest hai
        return next();   // Agay jaane do, block mat karo
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = verified; 
        next();
    } catch (err) {
        
        req.user = null;
        next();
    }
};

module.exports = authOptional;