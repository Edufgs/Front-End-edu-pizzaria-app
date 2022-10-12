import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"; //Importações para ter as tipagens do TypeScript
import { parseCookies } from 'nookies'

/**
 * Controla as rotas para usuarios não logados acessar
 * canSSRGuest = can server side randle guest ("pode usuarios vizitantes acessar"  ou "pode o lado do servidor randular o convidado")
 */

//Função para paginas que só podem ser acessadas por vizitantes
//<P> = é o generico do TypeScript só para ele enteder oq tem ali
export function canSSRGuest<P>(fn: GetServerSideProps<P>){
  //ctx = context
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    //Pega o cookies
    const cookies = parseCookies(ctx);
    
    //Se o cara tentar acessar a pagina porem tendo já um login salvo então redirecionamos
    //Se tiver um cookie então entra aqui dentro
    if(cookies['@edupizza.token']){
      //Se tiver o cookie então o usuario é redirecionado
      return{
        redirect:{
          destination: '/dashboard', //Redireciona para o dashboard
          permanent: false, //Diz que não é para sempre qie vai acontecer
        }
      }      
    }

    //Retorna o contexto que o proprio next pede para fazer
    return await fn(ctx);
  }
}