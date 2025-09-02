import dotenv from "dotenv";
dotenv.config();

const getEnvValue = (key: string): string | undefined => {
  let envValue = null;
  if (Object.prototype.hasOwnProperty.call(process.env, key)) {
    envValue = process.env[key];
  }
  if (!envValue) {
    throw new Error(`The Environment Variable : ${key} is Missing on the .env`);
  }
  return envValue;
};

export { getEnvValue };
