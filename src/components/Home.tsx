import Head from 'next/head'
import Layout from './Layout'
import Footer from './homepage/Footer'
import Header from './homepage/Header'
import Main from './homepage/Main'

export default function Home() {
  return (
    <>
      <Head>
        <title>DimensionLab</title>
        <meta name="description" content="Landing page for Dimension Lab" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Header />
        <Main />
        <Footer />
      </Layout>
    </>
  )
}