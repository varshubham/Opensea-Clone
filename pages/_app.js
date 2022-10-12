import '../styles/globals.css'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { ThemeProvider } from 'next-themes'


function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Goerli}
      chainRpc={{
        [ChainId.Goerli]: 'https://goerli.infura.io/v3/3f80ff6dcfaf461ba6938c6793301735'
      }}
    >
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>

    </ThirdwebProvider>

  )
}

export default MyApp
