import { useState } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head'
import styles from './styles.module.scss'

import { Header } from '../../components/Header'
import { FiRefreshCcw } from 'react-icons/fi'

import { setupAPIClient } from '../../services/api'

import { ModalOrder } from '../../components/ModalOrder'

import Modal from 'react-modal';

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

//Tipagem para OrderProps
interface HomeProps{
  orders: OrderProps[]; //lista de Orders
}

//Tipagem do objeto OrderItemProps
//export: exporta para usar no modal depois
export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id:string;
  product:{
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order:{
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}

//Recebe a orders que vem do servidor, feito la nas ultimas linhas
export default function Dashboard({ orders }: HomeProps){

  //Cria um state que por padrão recebe as orders ou um array vazio se não receber nada
  const [orderList, setOrderList] = useState(orders || []);

  //Dados do item para ser mostrado no modal
  //<OrderItemProps[]> = Diz que esse useState é um array do tipo OrderItemProps
  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  //UseState do modal para saber se ele está fechado ou não, vai começar como "false"
  const [modalVisible, setModalVisible] = useState(false);

  //Função que faz o modal fechar
  function handleCloseModal(){
    setModalVisible(false);
  }

  //Função que faz o modal abrir com os dados
  async function handleOpenModalView(id: string){
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/order/detail',{
      //Envia um query params
      params:{
        order_id: id,
      }
    });

    setModalItem(response.data);
    setModalVisible(true);
  }

  //handle = é uma convenção que geralmente usado quando for clicar
  async function handleFinishModal(id: string){
    const apiClient = setupAPIClient();

    await apiClient.put('/order/finish',{
      order_id: id,
    })

    //Finaliza a order e atualiza a lista
    const response = await apiClient.get('/orders');
    
    setOrderList(response.data)
    setModalVisible(false);
  }

  async function handleRefreshOrders() {
    const apiClient = setupAPIClient();

    const response = await apiClient.get('/orders');
    setOrderList(response.data)

  }

  //Configuração do Modal
  /**
   * Dentro de Set AppElement tem que passar o id da div principal onde está tudo.
   * Para saber qual é, é só inspecionar a pagina e ver qual é o id.
   * Na frente do id tem que ter o "#"
  */
  Modal.setAppElement('#__next');

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
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color="#3fffa3"/>
            </button>
          </div>

          <article className={styles.listOrders}>

            {/* Verifica se tem item na lista
              * && = é se não tiver nada
              */}
            {orderList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum pedido aberto foi encontrado...
              </span>
            )}
            
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

        {/*Quando o modal estiver verdadeiro então faz ele aparecer*/}
        {modalVisible && (
          //Coloca o modal passando as configurações dele
          <ModalOrder 
            isOpen={modalVisible} //Passa o valor para ver se está aberto ou não
            onRequestClose={handleCloseModal} //Passa a função para fechar
            order={modalItem} //Passa os dados a ser mostrado
            handleFinishOrder={handleFinishModal} //Função para finalizar a order
          />
        )}

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