import * as dotenv from 'dotenv';
dotenv.config();

const env = (process.env.ENV_NAME || 'DEV').toUpperCase();

const get = (key: string): string => {
    const value = process.env[`${env.toUpperCase()}_${key}`];
    if (!value) {
        throw new Error(`
        Enviroment variable ${env.toUpperCase()}_${key} is not defined   
            `)
    }
    return value;
}

export const ENV = {
    ENV_NAME: env,
    BASE_URL: get('BASE_URL'),
    USER_NAME: get('USER_NAME'),
    USER_PASSWORD: get('USER_PASSWORD'),
}