export interface AuthUser {
  email: string,
  role: 'ADMIN' | 'BOUTIQUE' | 'CLIENT' | 'VISITOR'
}

export interface AuthResponse {
  token: string
  user: AuthUser
}
