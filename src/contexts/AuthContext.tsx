import { createContext, ReactNode, useState } from 'react'

import { api } from '../services/apiClient'

import { destroyCookie, setCookie, parseCookies } from 'nookies' //Função para destruir/limpar o cookies
import Router from 'next/router'

import { toast } from 'react-toastify' //Importa o personalizador de notificação

/**
 * Contexto de autorização global.
 * Ele vai ficar em volta das paginas.
 * Então dentro dele vai ter as paginas.
 */

//Tipagem
type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>; //Função para logar
  signOut: () => void; //Função para deslogar
  signUp: (credentials: SignUpProps) => Promise<void>; //Função para cadastrar usuarios
}

//Tipagem
type UserProps = {
  id: string;
  name: string;
  email: string;
}

//Tipagem
type SignInProps = {
  email: string;
  password: string;
}

//Tipagem
type AuthProviderProps = {
  children: ReactNode //São os componentes React
}

//Tipagem
type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

/**
 * Esse Context segue essa tipagem colocata a cima (as AuthContextData).
 * Isso é mais para saber oq tem para usar.
 * export = está exportando essa variavel para que outros arquivo consiga acessar
 */
export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try{
    //Tenta destruir o token (limpar o token)
    //Passa o contexto (que é undefined) e o nome do cookie
    destroyCookie(undefined, '@edupizza.token') //Limpa o cookie
    Router.push('/') //Manda para rota de login
  }catch{
    console.log('Erro ao deslogar')
  }
}

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

  async function signIn({ email, password }: SignInProps){
    try{
      //Manda uma requisição para a api onde usa a url base e passa o email e senha.
      const response = await api.post('/sessions', {
        email,
        password
      })
      
      const { id, name, token } = response.data; // desconstroi a resposta pegando os dados que não tenho

      //Primeiro parametro é o contexto
      setCookie(undefined, '@edupizza.token', token, {
        //Coloca o quanto tempo vai expirar
        maxAge: 60 * 60 * 24 * 30, //Calculo para colcoar 30 dias de expiração
        path: "/" //Quais caminhos teram acesso ao cookie (/ = significa todos os caminhos)
      })

      //Set os dados do usuario
      setUser({
        id,
        name,
        email,
      })

      //Passar para proximas requisições o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      //Emite uma notificação do Toastify
      toast.success("Logado com sucesso!")

      //Redirecionar o user para /dashboard
      Router.push('/dashboard')

    }catch(err){
      //Emite uma notificação do Toastify
      toast.error("Erro ao acessar!")
      console.log("ERRO AO ACESSAR ", err)
    }
  }

  async function signUp({name, email, password}: SignUpProps) {
    try{
      //Manda uma requisição para a api cadastrando o usuario
      const response = await api.post('/users', {
        name,
        email,
        password
      })

      //Emite uma notificação do Toastify
      toast.success("Conta criada com sucesso!")      

      //Manda para pagina de login
      Router.push('/')
    }catch(err){
      //Emite uma notificação do Toastify
      toast.success("Erro ao cadastrar!!")
      console.log("Erro ao Cadastrar: ", err)
    }
  }

  return(
    //value={} = Faz com que os valores que estiverem dentro, qualquer componente pode acessar
    <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
      {/* Esse children é as paginas */}
      {children}
    </AuthContext.Provider>
  )
}