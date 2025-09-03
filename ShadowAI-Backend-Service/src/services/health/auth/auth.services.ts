import { StatusCodes } from "http-status-codes"
import { DatabaseException } from "../../../exceptions"
import { ISignup } from "../../../interface/auth.interface"
import { IAPIResponse } from "../../../interface/api.interface"
import searchInstance from "../../../database/operations/select"
import userModel from "../../../database/entities/user.model"
import cryptohelper from "../../../helper/crypto.helper"
import createInstance from "../../../database/operations/create"
import { excludeObjectKey } from "../../../utils/common.utils"

async function signupService(payload:Partial<ISignup>):Promise<IAPIResponse>{
    const searchquery= searchInstance()
    const createquery= createInstance()
    const cryptoinstance = cryptohelper()
    const {username,email,password}= payload

    const findusername =await searchquery.search('username',username,userModel)
    

    if(findusername){
        throw new DatabaseException(
            StatusCodes.BAD_REQUEST,
            `The username: ${username} you provided already exists on system ,please signup using a new username `
        )
        }

    const findemail=await searchquery.search('email',email,userModel)
    
    if(findemail){
        throw new DatabaseException(
            StatusCodes.BAD_REQUEST,
            `The username: ${username} you provided already exists on system ,please signup using a new username `
        )
        }
        const hashPassword= cryptoinstance.encryptKeys(password as string)

        const {text,key,iv}=hashPassword

        const dbPayload ={
            username,
            email,
            password:text,
            passHashKey:key,
            passiv:iv
        }

        const savetoDatabase= await createquery.create(dbPayload,userModel)


    

    return {
        message:"Signup completed",
        data : excludeObjectKey(savetoDatabase,["password","pashHashKey","passiv"])
    }

}
async function loginService(){

}
async function logoutService(){

}

export  {
    signupService,
    loginService,
    logoutService
}