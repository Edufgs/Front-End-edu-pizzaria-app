import { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'
//Icone para mostrar o spinner quando estiver carregando algo
import {FaSpinner} from 'react-icons/fa'

//É a interface para dizer que o é do tipo HTMLButtonElement
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //? é pq é opcional
  loading?: boolean,
  //children é texto dentro da tag (<button>Texto</button>)
  children: ReactNode,
}

/**
 * Componente button para ser implementado em varios lugares do projeto
 * loading = é para desativar quando estiver carregando a pagina
 * children = é o texto dentro da tag (<button>Texto</button>)
 * ...rest = são as propriedades restante enviadas.
 */
export function Button({ loading, children, ...rest }: ButtonProps){
  return(
    <button 
      className={styles.button}
      disabled={loading} //disabilita o botão se for true
      {...rest}
    >
      {/* Se o loading for true então fica o simbolo de carregamento */}
      { loading ? (
        <FaSpinner color="#FFF" size={16} />
      ): (
        //Se for false então as outras coisas
        <a className={styles.buttonText}>
          {children}
        </a>        
      )}
    </button>
  )
}