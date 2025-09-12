import fs from 'fs';
class PromiseHelper{
    public async givebase64(filepath:string):Promise<string>{
        return new Promise((resolve,reject)=>{
            let baseresult:string=''
  const readFile = fs.createReadStream(filepath)
  readFile.on('data', async (chunk)=>{
     baseresult= baseresult+chunk.toString('base64')
    
  })
  readFile.on('end',()=>{
    resolve(baseresult)
  })
        })
    }
}
const filehelperinstance=()=>{
    return new PromiseHelper()
}
export default filehelperinstance