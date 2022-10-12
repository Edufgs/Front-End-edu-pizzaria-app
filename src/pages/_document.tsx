import { Html, Head, Main, NextScript } from 'next/document'

/**
 * Esse arquivo vai renderizar uma unica vez quando rodar a aplicação.
 * Mesmo se o usuario mudar de pagina então não vai renderizar novamente.
 */

export default function Document(){
    return(
      <Html>
        <Head>

        </Head>
        <body>
          {/* Está repassando o main que é a pagina nossa pagina */}
          <Main/>
          {/* O Next pede para colocar isso em baixo do main */}
          <NextScript/>
        </body>
      </Html>
    )
}