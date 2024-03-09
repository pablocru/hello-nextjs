import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { JWT_KEY, JWT_ALGORITHM } from '@/app/constants';

export async function encrypt (payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(JWT_KEY);
}

export async function decrypt (input: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(input, JWT_KEY, {
    algorithms: [JWT_ALGORITHM]
  });
  return payload;
}
