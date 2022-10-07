import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head'

import { Header } from '../../components/Header'

/**
 * Pagina de ultimos pedidos
 */
export default function Dashboard(){
  return(
    <>
      <Head>
        <title>Painel - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header/>
        <h1>Painel</h1>
      </div>
    </>
  )
}

//Chama a função do server side para ver se está logado pois para acessar esse endereço é preciso estar logado
//É preciso passar o context
export const getServerSideProps = canSSRAuth(async (ctx) => {

  return{
    props:{}
  }
})