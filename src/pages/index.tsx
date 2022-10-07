import { useContext, FormEvent, useState } from 'react' //useContext = Importa os context criados
import Head from 'next/head'
import Image from 'next/image' //Tag propria para imagem do nextjs
import styles from '../../styles/home.module.scss'

import logoImg from '../../public/Logo.svg'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { toast } from 'react-toastify'

import { AuthContext } from '../contexts/AuthContext'

//Com o link do next é possivel trabalhar com navegação
import Link from 'next/link' 

//Importa o metodo criado do server-side
import { canSSRGuest } from '../utils/canSSRGuest'

export default function Home() {
  //acessa o useContext e passa com contexto eu quero consumir (AuthContext)
  const { signIn } = useContext(AuthContext)

  const[email, setEmail] = useState('') //'' = faz começar com uma string vazia
  const[password, setPassword] = useState('') //'' = faz começar com uma string vazia

  const [loading, setLoading] = useState(false)// false = começa com false

  //FormEvent é para acessar as configurações do formulario
  async function handleLogin(event: FormEvent) {
    event.preventDefault(); //Faz com que a pagina não recarrega mais quando faz o submit no formulario

    if(email === '' || password === ''){
      //Emite uma notificação do Toastify
      toast.error("Preencha todos os campos")
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    //Espera a resposta
    await signIn(data);

    setLoading(false);
  }

  return (
    //Tag sem nome sem nada
    <>    
    <Head>
      {/* Titulo que fica em cima da aba */}  
      <title>Edu Pizzaria - Faça seu login</title>
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
            value={email} //Vai estar atrelado ao email
            /**
             * Toda vez que digita algo então ele faz executa.
             * e = é o evento e ele da um set acessando o valor desse evento
             */
            onChange={ (e) => setEmail(e.target.value) }
          />
          <Input 
            placeholder="Digite sua senha"
            type="password"
            value={password} //Vai estar atrelado ao email
            /**
             * Toda vez que digita algo então ele faz executa.
             * e = é o evento e ele da um set acessando o valor desse evento
             */
            onChange={ (e) => setPassword(e.target.value) }
          />
          <Button
            type="submit"
            loading={loading}
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

//Chama a função do server side para ver se está logado
//É preciso passar o context
export const getServerSideProps = canSSRGuest(async (ctx) => {
  
  //Retorna as propriedades que vai estar vazia
  return{
    props:{}
  }
})