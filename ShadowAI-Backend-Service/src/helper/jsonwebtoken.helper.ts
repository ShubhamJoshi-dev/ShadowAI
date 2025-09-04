import jwt from "jsonwebtoken";
import { getEnvValue } from "../utils/env.utils";

class JsonWebTokenHelper {
  public async createAccessToken(payload: Record<string, any>) {
    return new Promise((resolve, reject) => {
      const options = {
        issuer: "ShadowAI-Access",
        expiresIn: "1h",
      } as jwt.SignOptions;
      const secretKey = getEnvValue("ACCESS_TOKEN");
      const token = jwt.sign(payload, secretKey as string, options);
      if (token) {
        resolve(token);
      } else {
        resolve(null);
      }
    });
  }

  public async createRefreshToken(payload: Record<string, any>) {
    return new Promise((resolve, reject) => {
      const options = {
        issuer: "ShadowAI-Refresh",
        expiresIn: "1d",
      } as jwt.SignOptions;
      const secretKey = getEnvValue("REFRESH_TOKEN");
      const token = jwt.sign(payload, secretKey as string, options);
      if (token) {
        resolve(token);
      } else {
        resolve(null);
      }
    });
  }
  public async verifyAccessToken(token:string){
    return new Promise((resolve,reject)=>{
      try{
        const checkvalidity= jwt.verify(token,getEnvValue("ACCESS_TOKEN")as string)
        resolve(checkvalidity)
      }
      catch(err){
        reject(err)
      }
      })
}
}

const getJsonWebTokenInstance = (): JsonWebTokenHelper => {
  return new JsonWebTokenHelper();
};

export default getJsonWebTokenInstance;