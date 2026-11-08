const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ error: "Access Denied." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); 
        
        // 4. Token se nikali hui ID ko request object (req.user) mein daal dena
        req.user = verified; 
        
        next(); // Agle step (Controller) par jao
    } catch (err) {
        res.status(400).json({ error: "Token sahi nahi hai!" });
    }
};

module.exports = auth;