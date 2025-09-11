import multer from "multer"
import path from "node:path"
import fs from "node:fs"
import is from "zod/v4/locales/is.cjs"
import shadowAiLogger from "../libs/logger.libs"


const newLocation = path.join(process.cwd(),'/images')
const isfileexists= fs.existsSync(newLocation)

if(isfileexists){
    shadowAiLogger.info(`Creating a new file`)

    fs.mkdirSync(newLocation,{
        recursive:true
    })
}

const storageoconfig= multer.diskStorage({
    destination:newLocation,
    filename:(req,file,cb)=>{
        cb(
            null,
            file.fieldname + "-" +Date.now() + path.extname(file.originalname)
        )
    }
}
    
)

const upload= multer({
    storage:storageoconfig,
    limits:{
        fieldSize:10000
    }
})
export default upload