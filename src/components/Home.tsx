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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <meta name="format-detection" content="telephone=no" />
      </Head>

      <Layout>
        <Header />
        <Main />
        <Footer />
      </Layout>
    </>
  )
}