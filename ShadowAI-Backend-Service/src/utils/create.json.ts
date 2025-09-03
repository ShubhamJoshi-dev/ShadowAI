import path from "path"
import databaseInstance from "../database/connect"
import fs from "node:fs"
import fsPromises from "fs/promises"
import shadowAiLogger from "../libs/logger.libs"

const createJson = async (isConnected: string) => {
  const createPath = path.join(process.cwd(), "mongo-status.json");
  const isFileExist = fs.existsSync(createPath);
  shadowAiLogger.info(`createJson called with ${isConnected}`);

  if (!isFileExist) {
    const jsonData = JSON.stringify(
      { mongoConnection: isConnected },
      null,
      2
    );

    fs.writeFileSync(createPath, jsonData); 
    shadowAiLogger.info(`File created  ${createPath}`);
  } else {
    shadowAiLogger.error("Cannot create file");
  }
};


const readfromJson= (key:string)=>{
    const data= fs.readFileSync('mongo-status.json','utf-8')
    const jsonData= JSON.parse(data)
    const value= jsonData[key]
    return value
}

const  deleteFile= async()=>{
     try{
    const fullPath= path.join(process.cwd(),'mongo-status.json')
    const pathexists=fs.existsSync(fullPath)
   
        if(pathexists){
            await fsPromises.unlink(fullPath)
            shadowAiLogger.info(`file is deleted with pathname ${fullPath}`)
        }
        else{
            shadowAiLogger.error(`file is already deleted`)
        }
    }
    catch(err){
        throw err
    }

}
export {
    createJson,
    readfromJson,
    deleteFile
}

