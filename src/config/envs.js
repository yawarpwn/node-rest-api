import 'dotenv/config'
import env from 'env-var'

export const envs = {
  DATABASE_URL: env.get('DATABASE_URL').required().asString(),
}
