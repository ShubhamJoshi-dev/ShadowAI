import { createWorker } from "tesseract.js";
import shadowAiLogger from "../libs/logger.libs";


class TesseractHelper{
    public async extractText(filepath:string){
        const worker= await createWorker("eng")
        try{
            const {data:{
                text
            }}=await worker.recognize(filepath)
            return text;
        }
        catch(err){
            shadowAiLogger.error(`Error while extracting the image`)
        }
        finally{
            await worker.terminate()
        }
    }
}
const tesseractinstance=()=>{
    return new TesseractHelper()
}
export default tesseractinstance