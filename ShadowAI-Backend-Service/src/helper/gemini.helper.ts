import { GoogleGenerativeAI } from "@google/generative-ai";
import { getEnvValue } from "../utils/env.utils";
import { preferancePrompt } from "../constant/prompt.constant";

class GeminiHelper{
    public genAi:GoogleGenerativeAI

    constructor(){
        this.genAi=new GoogleGenerativeAI(getEnvValue("API-KEY")as string)
    }
    public async giveModel(){
        return this.genAi.getGenerativeModel({
            model:getEnvValue("MODEL-NAME") as string
        })
    }

    public async generateResponse(query:string){
        const createPrompt= preferancePrompt({
            userQuery:query
        })

    const generateModel= await this.giveModel();
    const generateResponse= await generateModel.generateContent(createPrompt)
    const formattedText= generateResponse.response.text()
    return formattedText

    }

}
const geminiInstance=()=>{
    return new GeminiHelper()
}

export default geminiInstance