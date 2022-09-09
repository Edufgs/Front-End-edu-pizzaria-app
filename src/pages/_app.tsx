import '../../styles/globals.scss'
//Fazer tipagem
import {AppProps} from 'next/app';

/**
 * Esse é o componente global que é executado
 * 
 */

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp