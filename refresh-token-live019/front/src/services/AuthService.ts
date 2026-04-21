import { httpClient } from './HttpClient';

interface ISignUpDTO {
  name: string;
  email: string;
  password: string;
}

interface ISignInDTO {
  email: string;
  password: string;
}

interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  static async signUp({ name, email, password }: ISignUpDTO) {
    const { data } = await httpClient.post('/signup', {
      name,
      email,
      password
    });

    return data;
  }

  static async signIn({ email, password }: ISignInDTO): Promise<ISignInResponse> {
    const { data } = await httpClient.post<ISignInResponse>('/signin', {
      email,
      password
    });

    return data;
  }

  static async refreshToken(refreshToken: string): Promise<ISignInResponse> {
    const { data } = await httpClient.post<ISignInResponse>('/refresh-token', {
      refreshToken,
    });

    return data;
  }
}
