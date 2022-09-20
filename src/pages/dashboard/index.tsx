import { canSSRAuth } from '../../utils/canSSRAuth'

/**
 * Pagina de ultimos pedidos
 */
export default function Dashboard(){
  return(
    <div>
      <h1>Bem vindo ao painel</h1>
    </div>
  )
}

//Chama a função do server side para ver se está logado pois para acessar esse endereço é preciso estar logado
//É preciso passar o context
export const getServerSideProps = canSSRAuth(async (ctx) => {

  return{
    props:{}
  }
})