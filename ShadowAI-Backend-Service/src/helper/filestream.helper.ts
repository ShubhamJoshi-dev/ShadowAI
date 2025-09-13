import fs from 'fs';

class PromiseHelper {
  public async givebase64(filepath: string): Promise<string> {
    const chunks: Buffer[] = [];
    const stream = fs.createReadStream(filepath);

    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => {
        chunks.push(chunk as any);
      });

      stream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const base64 = buffer.toString('base64');
        resolve(base64);
      });

      stream.on('error', (err) => {
        reject(err);
      });
    });
  }
}
const filehelperinstance=()=>{
    return new PromiseHelper()
}
export default filehelperinstance