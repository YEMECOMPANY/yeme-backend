import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  DB_PORT: Joi.number().port().default(5432),
  DB_HOST: Joi.string().required(),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_DATABASE: Joi.string(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('1d'),
  JWT_AUDIENCE: Joi.string().default('yeme-api'),
  JWT_ISSUER: Joi.string().default('yeme'),
});
