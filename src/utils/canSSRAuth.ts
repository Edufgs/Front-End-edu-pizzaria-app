import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"; //Importações para ter as tipagens do TypeScript
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenError } from '../services/errors/AuthTokenError'

/**
 * Controla as rotas para só usuarios logados pode acessar
 * canSSRAuth = can server side randle auth ("pode usuarios logados acessar"  ou "pode auth randle do lado do servidor")
 */

//função apra paginas que só users logados podem ter acesso
//<P> = é o generico do TypeScript só para ele enteder oq tem ali
export function canSSRAuth<P>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const token = cookies['@edupizza.token'];

    if(!token){
      //Se não tiver cookies então redireciona para a pagina de login
      return{
        redirect:{
          destination: '/', //Redireciona para a pagina de login
          permanent: false, //Diz que não é para sempre qie vai acontecer
        }
      }
    }

    try{
      //Se estiver tudo certo então retorna para o usuario
      return await fn(ctx);
    }catch(err){
      //Se der erro então desloga o usuario
      //Se o erro for do tipo "AuthTokenError"
      if(err instanceof AuthTokenError){
        ////Vai destruir o cookie
        destroyCookie(ctx, '@edupizza.token')

        //E redireciona para a tela de login
        return{
          redirect:{
            destination: '/', //Redireciona para a pagina de login
            permanent: false //Diz que não é para sempre qie vai acontecer
          }
        }
      }
    }
  }
}