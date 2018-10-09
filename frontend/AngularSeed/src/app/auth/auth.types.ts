export interface AuthProvider {
    currentUser(callback: (err?: Error, user?: AuthUser) => void): void;
    updateUserInfo(userInfo: AuthUser, callback: (error: Error, statusCode: string) => void): void;
    register(userInfo: AuthUser, password: string, callback?: (err: Error, statusCode: string) => void): void;
    authenticate(username: string, password: string, callback?: (Error, string) => void): void;
    confirmRegistration(username: string, confirmationCode: string, callback: AuthProviderCallback): void;
    confirmNewPassword(username: string, newPassword: string, newAttributes: AuthUser, callback?: AuthProviderCallback): void;
    confirmMFA(username: string, confirmationCode: string, callback?: (err: Error, statusCode: string) => void): void;
    forgotPassword(username: string, callback: (error: Error, statusCode: string) => void): void;
    confirmPassword(username: string, verficationCode: string, newPassword: string, callback: (error: Error, statusCode: string) => void): void;
    signout(): void;
    isLogged(): boolean;
}

export type AuthProviderCallback = (err: Error, statusCode: string, details?: any) => void;

// https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
export interface AuthUser {
    username: string;
    email?: string;
    name?: string;                // End-User's full name in displayable form including all name parts, possibly including titles and suffixes.
    nickname?: string;
    given_name?: string;
    middle_name?: string;
    family_name?: string;
    birthdate?: string;           // Birthday, represented as an ISO 8601:2004 [ISO8601‑2004] YYYY-MM-DD format
    gender?: string;              // End-User's gender. Values defined by this specification are female and male.
    locale?: string;              // End-User's locale, represented as a BCP47 [RFC5646] language tag. For example, en-US or fr-CA.
    phone_number?: string;        // Must start with a plus (+) sign, followed immediately by the country code. Can only contain + and digits.
    address?: string;
    picture?: string;             // URL of the End-User's profile picture. This URL MUST refer to an image file (for example, a PNG, JPEG, or GIF image file).
    preferred_username?: string;  // Shorthand name by which the End-User wishes to be referred to at the RP, such as janedoe or j.doe.
    profile?: string;
    timezone?: string;
    updated_at?: string;
    website?: string;
    custom?: {};
}
