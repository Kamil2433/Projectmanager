const API_URL = import.meta.env.VITE_API_URL;
const NODEMAILER_FROM_EMAIL = import.meta.env.NODEMAILER_FROM_EMAIL;
const NODEMAILER_PASSWORD = import.meta.env.NODEMAILER_PASSWORD;
const Mode=import.meta.env.MODE;


console.log(`Running in ${import.meta.env.MODE} mode`);
// console.log(`API URL: ${API_URL}`);

const envVariables = {
  API_URL:Mode==="prod"?'https://www.nikkoerp.com':API_URL,
  NODEMAILER_FROM_EMAIL,
  NODEMAILER_PASSWORD,
  MODE: import.meta.env.MODE,
};

export default envVariables;
