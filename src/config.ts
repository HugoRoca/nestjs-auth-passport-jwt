import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    JWT_SECRET: process.env.JWT_SECRET,
    TITLE: process.env.TITLE,
    MONGO: {
      URI: process.env.MONGO_URI,
      dbName: process.env.MONGO_DB,
    },
  };
});
