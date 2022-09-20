import { useState, FormEvent, useContext } from 'react' //useContext é para consumir o contexto

import Head from 'next/head'
import Image from 'next/image' //Tag propria para imagem do nextjs
import styles from '../../../styles/home.module.scss'

import logoImg from '../../../public/Logo.svg'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import {AuthContext} from '../../contexts/AuthContext'

//Com o link do next é possivel trabalhar com navegação
import Link from 'next/link' 
import { toast } from 'react-toastify'

export default function SignUp() {
  //Pega a função de cadastro do signUp
  const { signUp } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){      
      //Emite uma notificação do Toastify
      toast.error("Preencha os campos")
      return; //Para a execução do codigo
    }
    
    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    //Cadastra o Usuario enviando ao contexto
    await signUp(data)

    setLoading(false)
  }

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
        <form onSubmit={handleSignUp}>
          <Input
            placeholder="Digite seu nome"
            value={name}
            onChange={ (e) => setName(e.target.value) }
          />
          <Input 
            placeholder="Digite seu email"
            type="text"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />
          <Input 
            placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />
          <Button
            type="submit"
            loading={loading}
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
