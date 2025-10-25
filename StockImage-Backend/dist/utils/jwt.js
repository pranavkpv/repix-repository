import jwt from "jsonwebtoken";
export const generateAccessToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    if (!secret || !expiresIn) {
        throw new Error("No secrets or expiry provided");
    }
    return jwt.sign(payload, secret, {
        expiresIn: expiresIn,
    });
};
export const generateRefreshToken = (payload) => {
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES;
    if (!refreshSecret || !refreshExpiresIn) {
        throw new Error("Invalid refresh token secret or expiry !!");
    }
    return jwt.sign(payload, refreshSecret, {
        expiresIn: refreshExpiresIn,
    });
};
export const verifyRefreshToken = (token) => {
    try {
        const secret = process.env.JWT_REFRESH_SECRET;
        if (!secret) {
            throw new Error('JWT SECRET MISSING');
        }
        const decoded = jwt.verify(token, secret);
        if (decoded && decoded.id) {
            const payload = {
                id: decoded.id
            };
            const accessToken = generateAccessToken(payload);
            return accessToken;
        }
        else {
            return null;
        }
    }
    catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            console.error("TokenExpiredError: Refresh token expired!", err.message);
        }
        else if (err instanceof jwt.JsonWebTokenError) {
            console.error("JsonWebTokenError: Invalid Refresh Token!", err.message);
        }
        return null;
    }
};
