import axios, { AxiosError } from "axios";
import { parseCookies } from 'nookies' //parseCookies é para pegar os cookies
import { AuthTokenError } from './errors/AuthTokenError'

import { signOut } from '../contexts/AuthContext'

/**
 * Configuração então não é .tsx.
 * Essa é a configuração de acesso a API, não precisa decorar.
 */

//Essa função recebe o contexto, se não receber então fica undefined
export function setupAPIClient(ctx = undefined){
  //Pega os cookies atravez do contexto
  let cookies = parseCookies(ctx);

  //Chama o axios paa configurar as requisições
  const api = axios.create({
    baseURL: 'http://localhost:3333', //Configura a nossa url padrão onde ela nunca vai mudar
    //Se tiver token então ja fornece em todas as rotas
    //Cria uma autorização Bearer com o token dentro do cookie com o nome de @edupizza.token
    headers: {
      Authorization: `Bearer ${cookies['@edupizza.token']}`
    }
  })

  //Middleware
  //Onde recebe o 'response' como callback
  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    //Tratamento de erros
    if(error.response.status === 401){
      //Qualquer erro 401 (não autorizado) devemos deslogar o usuario

      //Se o tipo do window for diferente de undefined então vai ser dslogado o usuario
      if(typeof window !== undefined){
        //Chama a função para deslogar o usuario
        signOut(); //Chama o metodo do context para deslogar o usuario
      }else{
        //Se não retorna um erro de rejeitado com a frase de erro
        return Promise.reject(new AuthTokenError())
      }
    }

    //Se for outro tipo de erro então é rejeitado passando o erro
    return Promise.reject(error);
  })

  return api;
}