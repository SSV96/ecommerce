import { ConfigValidationSchema } from './config.validation';

const config = (config: Record<string, unknown>) => {
  const ENVS = ConfigValidationSchema.parse(config);
  const APP_NAME = 'blipkart';
  const NODE_ENV = ENVS.NODE_ENV;
  const PORT = ENVS.PORT;

  return {
    app: {
      appName: APP_NAME,
      env: NODE_ENV,
      port: PORT,
    },
    db: {
      mongo: {
        uri: ENVS.MONGO_URI,
        dbName: ENVS.MONGO_DB_NAME,
      },
    },
    jwt: {
      secret: ENVS.JWT_SECRET,
      expires: ENVS.JWT_EXPIRES_IN,
    },
  } as const;
};

export type ConfigVariablesType = ReturnType<typeof config>;

export default config;
