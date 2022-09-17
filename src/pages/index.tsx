import Head from 'next/head'
import Image from 'next/image' //Tag propria para imagem do nextjs
import styles from '../../styles/home.module.scss'

import logoImg from '../../public/Logo.svg'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export default function Home() {
  return (
    //Tag sem nome sem nada
    <>    
    <Head>
      {/* Titulo que fica em cima da aba */}  
      <title>Edu Pizza - Faça seu login</title>
    </Head>
    <div className={styles.containerCenter}>
      {/** Tag propria do nextjs para imagens 
       * alt = Texto alternativo
      */}
      <Image src={logoImg} alt="Logo Edu Pizzaria" />

      {/** Div para o formulario de login */}
      <div className={styles.login}>
        <form>
          <Input 
            placeholder="Digite seu email"
            type="text"
          />
          <Input 
            placeholder="Digite sua senha"
            type="password"
          />
          <Button
            type="submit"
            loading={false}
          >Acessar</Button>
        </form>

        <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
      </div>
    </div>
    </>
  )
}
