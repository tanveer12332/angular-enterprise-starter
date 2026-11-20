export interface User { id: string; name: string; email: string; roles: string[]; }
export interface Credentials { email: string; password: string; }
export interface AuthResponse { user: User; accessToken: string; refreshToken: string; }
