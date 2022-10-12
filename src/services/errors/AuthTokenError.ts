/**
 * Erro de autenticação.
 * Retorna uma fraze para erro de autenticação.
 */
export class AuthTokenError extends Error{
  constructor(){
    super('Error with authentication token.')
  }
}