import Head from 'next/head'
import Layout from './Layout'

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
        <h1>Header</h1>
        <h1>Section 1</h1>
        <h1>Section2</h1>
        <h1>Section 3</h1>
        <h1>Footer</h1>
      </Layout>
    </>
  )
}