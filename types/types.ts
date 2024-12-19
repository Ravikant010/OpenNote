// export interface User {
//     displayName: string | null;
//     email: string | null;
//     phoneNumber: string | null; // Assuming phone number can be nullable
//     password?: string,
//     photoURL: string | null ;
//     providerId: string | null;
//     uid: string | null ;
//     emailVerified: boolean | null ; // Added as requested
//   }



// export type GoogleUser = {
//   providerId: 'google.com';
//   email: string | null;
//   displayName: string | null;
//   photoURL: string | null;
//   emailVerified: boolean | null
// };

// export type EmailPasswordUser = {
//   providerId: 'open-note';
//   email: string;
//   password: string;
// };

// // Create a union type
// export type User = GoogleUser | EmailPasswordUser;


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