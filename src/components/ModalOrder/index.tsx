import Modal from 'react-modal'
import styles from './styles.module.scss'

import { FiX } from 'react-icons/fi'

import { OrderItemProps } from '../../pages/dashboard';


/**
 * Componente Modal para receber e mostrar os detalhes das orders
 * Site: https://github.com/reactjs/react-modal
 */

//Tipagem dos parametros recebidos
interface ModalOrderProps{
  isOpen: boolean; //Verifica se está aberto ou não
  onRequestClose: () => void; //função para fechar o modal onde não recebe nada e devolve void
  order: OrderItemProps[];
  handleFinishOrder: (id: string) => void; //função para finalizar a order onde não recebe nada e devolve void
}

export function ModalOrder({ isOpen, onRequestClose, order, handleFinishOrder }:ModalOrderProps){
  //Esse é o estilo do modal (posição, etc..)
  const customStyles = {
    //É preciso passa um objeto content
    content:{
      //Ficar centralizado
      top:'50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      //Espaçamento interno
      padding: '30px',
      //Centraliza internamente
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1d1d2e'
    }
  }
  return(
    //Coloca o modal com os dados
    <Modal
      isOpen={isOpen} //Verifica se está aberto o fechado
      onRequestClose={onRequestClose} //Função para fechar o modal
      style={customStyles} //customização do estilo
    >
      {/*Botão para fechar*/}
      <button
        type='button'
        onClick={onRequestClose}
        //Diz para o react-modal que esse é o botão de fechar (a documentação pede)
        className="react-modal-close"
        style={{background: 'transparent', border: 0}} //Adiciona um style no botão de fechar
      >
        {/*Icone de "x* para fechar*/}
        <FiX size={45} color="#f34748" />
      </button>

      {/*Mostra detalhes do pedido*/}
      <div className={styles.container}>
        <h2>Detalhes do pedido</h2>
        <span className={styles.table}>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>
        {order.map( item => (
          <section key={item.id} className={styles.containerItem}>
            <span>{item.amount} - <strong>{item.product.name}</strong></span>
            <span className={styles.description}>{item.product.description}</span>
          </section>
        ))}

        {/*Botão para concluir*/}
        <button className={styles.buttonOrder} onClick={ () => handleFinishOrder(order[0].order_id)}>
          Concluir pedido
        </button>
      </div>

    </Modal>
  )
}