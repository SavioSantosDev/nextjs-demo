import '../styles/global.css';

/**
 * Este será um arquivo que conterá todos os estilos globais;
 * Não se pode importar estilos globais em nenhum outro lugar;
 * Isso porque estilos globais são utilizados em todas páginas;
 */

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}