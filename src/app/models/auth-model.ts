export interface AuthModel {
    uid: string;
    displayName: string;
    email: string;
    refreshToken: string;
    isAnonymous: boolean;
    emailVerified: boolean;
}
