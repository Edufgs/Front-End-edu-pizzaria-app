import { createContext, ReactNode, useState } from 'react'

/**
 * Contexto de autorização global.
 * Ele vai ficar em volta das paginas.
 * Então dentro dele vai ter as paginas.
 */

//Tipagem
type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode //São os componentes React
}

/**
 * Esse Context segue essa tipagem colocata a cima (as AuthContextData).
 * Isso é mais para saber oq tem para usar.
 * export = está exportando essa variavel para que outros arquivo consiga acessar
 */
export const AuthContext = createContext({} as AuthContextData)

//Componente react
export function AuthProvider({ children }: AuthProviderProps){
  /**
   * Coloca os estados.
   * Onde o nome é user e a função para setar é o setUser.
   * Onde ele vai ser do tipo UserProps (useState<UserProps>)
   */
  const [user, setUser] = useState<UserProps>()
  //!! = converte para boolean, diz que se ele estiver vazio então é false e se tiver algo então é true.
  const isAuthenticated = !!user;

  async function signIn(){
    alert("Clicou no Login!!!")
  }

  return(
    //value={} = Faz com que os valores que estiverem dentro, qualquer componente pode acessar
    <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
      {/* Esse children é as paginas */}
      {children}
    </AuthContext.Provider>
  )
}