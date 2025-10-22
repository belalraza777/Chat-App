import jwt from "jsonwebtoken";

export function verifyAuth(req, res, next) {
    const token = req.cookies?.token;  // safely access token

    if (!token) {
        return res.status(401).json({
            success: false,
            error: "Authentication token missing. Please log in."
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                error: "Invalid or expired token. Please log in again."
            });
        }
        req.user = user;  // attach decoded user info to request
        next();
    });
}
