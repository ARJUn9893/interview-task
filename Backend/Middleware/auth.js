var jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const auth = (req, res, next) => {
    try {
        const token = req.header('auth-token');
        // console.log(token);
        if (!token) {
            return res.status(401).json({
                error: "No token provided, authorization denied"
            });
        }

        const decoded = jwt.verify(token,jwtSecret);
        if (!decoded) {
            return res.status(401).json({
                error: "Invalid token, authorization denied",
            });
        }
        req.user = decoded.user;

        next();
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

module.exports = auth;