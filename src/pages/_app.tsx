import '../../styles/globals.scss'
//Fazer tipagem
import {AppProps} from 'next/app';

//Toastify
import { ToastContainer } from 'react-toastify' //Biblioteca do Toastify
import 'react-toastify/dist/ReactToastify.css'; //css para personalizar as notificações (Toastify)

import { AuthProvider } from '../contexts/AuthContext'

/**
 * Esse é o componente global que é executado
 * 
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    //AuthProvider = é o contexto de autenticalção que fica em volta.
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000}/> {/* Coloca o personalizador de notificação passando o tempo que ele demora para fechar (em milissegundos) */}
    </AuthProvider>
  )
}

export default MyApp