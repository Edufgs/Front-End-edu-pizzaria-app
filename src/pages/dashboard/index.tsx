import { useState } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head'
import styles from './styles.module.scss'

import { Header } from '../../components/Header'
import { FiRefreshCcw } from 'react-icons/fi'

import { setupAPIClient } from '../../services/api'

/**
 * Pagina de ultimos pedidos
 */

//Tipagem do objeto Order:
type OrderProps = {
  id: string;
  table: string | number; //A table pode ser string ou number
  status: boolean;
  draft: boolean;
  name: string | null; //O nome da pessoa da mesa pode ser passada ou não
}

//Tipagem
interface HomeProps{
  orders: OrderProps[]; //lista de Orders
}

//Recebe a orders que vem do servidor, feito la nas ultimas linhas
export default function Dashboard({ orders }: HomeProps){

  //Cria um state que por padrão recebe as orders ou um array vazio se não receber nada
  const [orderList, setOrderList] = useState(orders || []);

  function handleOpenModalView(id: string){
    alert("Teste: "+ id)
  }

  return(
    <>
      <Head>
        <title>Painel - Edu Pizzaria</title>
      </Head>
      <div>
        <Header/>
        
        <main className={styles.container}>

          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color="#3fffa3"/>
            </button>
          </div>

          <article className={styles.listOrders}>
            
            {/*Usa o .map para percorrer o vetor */}
            {orderList.map(item => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={ () => handleOpenModalView(item.id) }>
                  <div className={styles.tag}></div>
                    <span>Mesa {item.table}</span>                
                </button>
              </section>
            ))}

          </article>

        </main>

      </div>
    </>
  )
}

//Chama a função do server side para ver se está logado pois para acessar esse endereço é preciso estar logado
//É preciso passar o context
//Lembrando que tudo isso é feito no lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {
  //Antes de carregar a a pagina, o servidor recupera as orders
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/orders');

  //console.log(response.data);

  return{
    props:{
      //Depois de recuperar envia como propriedade para o cliente
      orders: response.data
    }
  }
})