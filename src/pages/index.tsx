import { useContext, FormEvent } from 'react' //useContext = Importa os context criados
import Head from 'next/head'
import Image from 'next/image' //Tag propria para imagem do nextjs
import styles from '../../styles/home.module.scss'

import logoImg from '../../public/Logo.svg'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import { AuthContext } from '../contexts/AuthContext'

//Com o link do next é possivel trabalhar com navegação
import Link from 'next/link' 

export default function Home() {
  //acessa o useContext e passa com contexto eu quero consumir (AuthContext)
  const { signIn } = useContext(AuthContext)

  //FormEvent é para acessar as configurações do formulario
  async function handleLogin(event: FormEvent) {
    event.preventDefault(); //Faz com que a pagina não recarrega mais quando faz o submit no formulario

    let data = {
      email: "algum@teste.com",
      password: "123123"
    }

    //Espera a resposta
    await signIn(data)
  }

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
        {/*onSubmit={handleLogin} = quando clicar no botão submit então é executado a função handleLogin*/}
        <form onSubmit={handleLogin}>
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
        {/* Esse link leva para qualquer endereço */}
        <Link href="/signup">        
          <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
        </Link>
      </div>
    </div>
    </>
  )
}
