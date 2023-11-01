import * as jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
}

export const generateToken = (id: string, email: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: id,
        email: email,
      },
      'midel_secret_key',
      {
        expiresIn: 60 * 60 * 8, // 8 hourse expiry
      },
      (error: Error, encoded: string | undefined) => {
        if (error) {
          return reject(error);
        }

        if (!encoded) {
          return reject(new Error('Could not encode a token'));
        }

        return resolve(encoded);
      },
    );
  });
};
export const decodeToken = async (token: string): Promise<TokenPayload> => {
  const decoded: TokenPayload = await new Promise((resolve, reject) => {
    jwt.verify(
      token,
      'midel_secret_key',
      (error: Error, decoded: TokenPayload) => {
        if (error) {
          return reject(error);
        }

        if (!decoded) {
          return reject(new Error('Could not decode the token'));
        }

        return resolve(decoded);
      },
    );
  });

  if (!decoded || !decoded.id || !decoded.email) {
    throw new Error('Could not verify the token');
  }

  return decoded;
};
