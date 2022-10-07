//FormEvent é a tipagem
import { useState, FormEvent } from 'react'
import Head from "next/head"
import { Header } from '../../components/Header'
import styles from './styles.module.scss'

import { setupAPIClient } from '../../services/api'
import { toast } from 'react-toastify'

export default function Category(){
  const [name, setName] = useState('')

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if(name === ''){
      return;
    }

    const apiClient = setupAPIClient();

    //Passa o name para rota da api /category
    await apiClient.post('/category', {
      name: name
    })

    //Mensagem de sucesso
    toast.success('Categoria cadastrada com sucesso!')

    //Limpa o campo categoria
    setName('');

  }

  return(
    <>
    <Head>
      <title>Nova categoria - Edu Pizzaria</title>
    </Head>

    <Header/>

    <main className={styles.container}>
      <h1>Cadastrar categorias</h1>

      <form className={styles.form} onSubmit={handleRegister}>
        <input 
        type="text"
        placeholder="Digite o nome da categoria"
        className={styles.input}
        value={name}
        onChange={ (e)=> setName(e.target.value) } //toda vez que pressionar um botão então grava na variavel
        />

        <button className={styles.buttonAdd} type="submit">
          Cadastrar
        </button>
      </form>
    </main>
    </>
  )
}