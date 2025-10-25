import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { TokenPayload } from "../types/types.js";

export const generateAccessToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET as Secret;
  const expiresIn = process.env.JWT_EXPIRES_IN as string; 

  if (!secret || !expiresIn) {
    throw new Error("No secrets or expiry provided");
  }

  return jwt.sign(payload as object, secret, {
    expiresIn: expiresIn as SignOptions["expiresIn"], 
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET as Secret;
  const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES as string;

  if (!refreshSecret || !refreshExpiresIn) {
    throw new Error("Invalid refresh token secret or expiry !!");
  }

  return jwt.sign(payload as object, refreshSecret, {
    expiresIn: refreshExpiresIn as SignOptions["expiresIn"],
  });
};

export const verifyRefreshToken = (token : string) : string|null =>{
  try{
      const secret = process.env.JWT_REFRESH_SECRET;
      if(!secret) {
         throw new Error('JWT SECRET MISSING');
       }
      const decoded = jwt.verify(token,secret) as JwtPayload;
      if(decoded && decoded.id){ 
      const payload = {
         id: decoded.id
      }
      const accessToken = generateAccessToken(payload);
      return accessToken;
    }else{
     return null;
  } 
}catch(err : unknown){
    if (err instanceof jwt.TokenExpiredError) {
            console.error("TokenExpiredError: Refresh token expired!", err.message);
        } else if (err instanceof jwt.JsonWebTokenError) {
            console.error("JsonWebTokenError: Invalid Refresh Token!", err.message);
        }
        return null
   }
}
