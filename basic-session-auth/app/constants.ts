export const JWT_KEY = new TextEncoder().encode(process.env.ENCODER_SECRET_KEY);
export const JWT_ALGORITHM = 'HS256';
