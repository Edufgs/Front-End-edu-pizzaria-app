import Head from 'next/head'
import Image from 'next/image' //Tag propria para imagem do nextjs
import styles from '../../../styles/home.module.scss'

import logoImg from '../../../public/Logo.svg'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

//Com o link do next é possivel trabalhar com navegação
import Link from 'next/link' 

export default function SignUp() {
  return (
    //Tag sem nome sem nada
    <>    
    <Head>
      {/* Titulo que fica em cima da aba */}  
      <title>Faça seu cadastro agora!</title>
    </Head>
    <div className={styles.containerCenter}>
      {/** Tag propria do nextjs para imagens 
       * alt = Texto alternativo
      */}
      <Image src={logoImg} alt="Logo Edu Pizzaria" />

      {/** Div para o formulario de login */}
      <div className={styles.login}>
        <h1>Criando sua conta</h1>
        <form>
          <Input
            placeholder="Digite seu nome"          
          />
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
          >Cadastrar</Button>
        </form>
        {/* Esse link leva para qualquer endereço */}
        <Link href="/">
          <a className={styles.text}>Já possui uma conta? Faça login!</a>
        </Link>
      </div>
    </div>
    </>
  )
}
