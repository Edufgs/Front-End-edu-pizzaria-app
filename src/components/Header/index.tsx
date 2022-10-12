import { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

export function Header(){

  //paga o contexto do AuthContext
  const { signOut } = useContext(AuthContext)

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        {/* Link para fazer navegações dentro do nextjs */}
        <Link href="/dashboard">
          <img src="/Logo.svg" width={190} height={60} />
        </Link>

        <nav className={styles.menuNav}>
          <Link href="/category">
            <a>Categoria</a>
          </Link>

          <Link href="/product">
            <a>Cardapio</a>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color='#FFF' size={24}/>
          </button>
        </nav>

      </div>
    </header>
  )
}