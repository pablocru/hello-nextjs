import { describe, expect, it } from 'vitest';
import { encrypt, decrypt } from '@/app/lib/jwt';

describe('JWT', () => {
  it('should encrypt and decrypt a payload', async () => {
    const payload = { user: 'Pablo' };

    const encryptedPayload = await encrypt(payload);

    const decryptedPayload = await decrypt(encryptedPayload);

    expect(payload.user === decryptedPayload.user).toBeTruthy();
  });
});
