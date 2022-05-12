import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    JWT_SECRET: process.env.JWT_SECRET,
    TITLE: process.env.TITLE,
  };
});
