export type GoogleUser = {
  providerId: 'google.com';
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
};

export type EmailPasswordUser = {
  providerId: 'open-note';
  email: string;
  password: string;
};

export type User = GoogleUser | EmailPasswordUser;