import crypto from 'crypto';

export const generateJwtSecretKey = (length: number): string => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

export const jwtSecretKey = generateJwtSecretKey(32);

process.env.JWT_SECRET = jwtSecretKey;

console.log('JWT Secret Key:', jwtSecretKey);
