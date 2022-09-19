import '../../styles/globals.scss'
//Fazer tipagem
import {AppProps} from 'next/app';

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
    </AuthProvider>
  )
}

export default MyApp