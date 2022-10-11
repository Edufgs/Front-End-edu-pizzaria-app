import { useState, ChangeEvent } from 'react'
import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header'

import { canSSRAuth } from '../../utils/canSSRAuth'

import { FiUpload } from 'react-icons/fi'

import { setupAPIClient } from '../../services/api'

//Criado um tipo para fazer tipagem
type ItemProps = {
  id: string;
  name: string
}

//Cria o objeto que tem a lista de categoria
interface CategoryProps{
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps){

  const [avatarUrl, setAvatarUrl] = useState(''); //Armazena uma url só para mostrar que foi enviada
  const [imageAvatar, setImageAvatar] = useState(null); //Armazena a foto em si
  const [categories, setCategories] = useState(categoryList || []); //Inicia com o array de categorias ou um array vazio se não vir nada
  const [categorySelected, setCategorySelected] = useState(0); //Diz qual categoria está selecionada

  //Tratamento do envio da imagem
  function handleFile(e: ChangeEvent<HTMLInputElement>){
    //Verifica se a imagem foi enviada
    if(!e.target.files){
      return;
    }

    //Recupera a primeira imagem
    const image = e.target.files[0];

    //Verifica se tem imagem pega
    if(!image){
      return;
    }

    //Verifica se foi enviado o tipo certo de imagem
    if(image.type === 'image/jpeg' || image.type === 'image/png'){
      //Seta a imagem
      setImageAvatar(image);
      //Seta a url do avatar
      //O javascript tem uma forma de gerar url então é feita isso
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))

    }
  }

  //Quando é selecionado uma nova categoria na lista
  //Essa função recebe o evento do click
  function handleChangeCategory(event){
    setCategorySelected(event.target.value)
  }

  return(
    <>
    
    <Head>
      <title>Novo produto - Edu Pizzaria</title>
    </Head>

    <div>
      <Header/>

      <main className={styles.container}>
        <h1>Novo produto</h1>

        <form className={styles.form}>

          {/*Para input de arquivo foi feito uma mascara em volta do input para ficar mais bonito */}
          <label className={styles.labelAvatar}>
            <span>
              <FiUpload size={30} color="#FFF"/>
            </span>
            
            {/*Input que só aceita images do tipo png e jpeg */}
            {/*handleFile: é a função que chama quando envia uma imagem*/}
            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

            {/*Se tiver url então vai ser mostrado*/}
            {avatarUrl &&(
              /*Imagem para aparecer quando for enviada */
              <img
                className={styles.preview}
                src={avatarUrl}
                alt="Foto do produto" /*Texto alternativo*/
                width={250}
                height={250}
              />
            )}
          </label>
          {/*O valor vai começa na categoria selecionada*/}
          <select value={categorySelected} onChange={handleChangeCategory}>
              {/*Distribui todas as categorias com o map*/}
              {categories.map( (item, index) => {
                return(
                  //Diz que a chave é o id do item e o valor dele vai ser o index
                  <option key={item.id} value={index}>
                    {item.name} {/*Vai ser mostrado o nome da categoria*/}
                  </option>
                )
              })}
          </select>

          <input
            type="text"
            placeholder="Digite o nome do produto"
            className={styles.input}
          />

          <input
            type="text"
            placeholder="Preço do produto"
            className={styles.input}
          />

          <textarea
            placeholder="Descreva seu produto..."
            className={styles.input}
          />

          <button className={styles.buttonAdd} type="submit">
            Cadastrar
          </button>

        </form>
      </main>

    </div>

    </>
  )
}

//Coloca autorização para só para pessoas logadas
//Lebrando que esse server side é carregado antes do componente ser montado
export const getServerSideProps = canSSRAuth(async (ctx) => {

  //Inicia a apiClient passando o contexto
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/category');

  //console.log(response.data);

  return{
    props: {
      //Envia uma propriedade que são os dados da categoria
      //Como essa parte é executada do lado do servidor então é preciso enviar essa propriedade para o cliente
      categoryList: response.data
    }
  }
})