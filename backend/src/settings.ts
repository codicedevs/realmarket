import * as dotenv from 'dotenv';
dotenv.config();

export const smtpSettings = Object.freeze({
  HOST: process.env.SMTP_SERVER!,
  PORT: +process.env.SMTP_PORT,
  SECURE: false,
  AUTH_USER: process.env.SMTP_USERNAME,
  AUTH_PASS: process.env.SMTP_PASSWORD,
});

export const serverSettings = {
  SERVER_PORT: +(process.env.SERVER_PORT ?? 8002),
};

export const dbSettings = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: +process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_URL: process.env.DB_URL,
};

export const jwtSettings = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN ?? '3600s',
  JWT_REFRFES_EXPIRES_IN: process.env.JWT_REFRFES_EXPIRES_IN ?? '7d',
};

export const rosvalSettings = {
  ROSVAL_USER_ID: process.env.ROSVAL_USER_ID,
  ROSVAL_USER_NAME: process.env.ROSVAL_USER_NAME,
  ROSVAL_USER_PASS: process.env.ROSVAL_USER_PASS,
  ROSVAL_BASE_URL: process.env.ROSVAL_BASE_URL,
  ROSVAL_ACCESS_TOKEN: '',
};
