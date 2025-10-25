import jwt from 'jsonwebtoken';
import { StatusCode } from '../enum/StatusCode.js';
import { StatusMessage } from '../enum/StatusMessage.js';
export function auth(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log("Token ::", token);
        if (!token) {
            res.status(StatusCode.UNAUTHORIZED)
                .json({ success: false, message: StatusMessage.UNAUTHORIZED });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    }
    catch (err) {
        res.status(StatusCode.UNAUTHORIZED)
            .json({ success: false, message: StatusMessage.INVALID });
    }
}
