import dotenv from "dotenv"
import { get } from 'env-var';
dotenv.config()

export const envs = {
    PORT: get("PORT").required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
    POSTGRES_URL: get('POSTGRES_URL').default('public').asString(),
}