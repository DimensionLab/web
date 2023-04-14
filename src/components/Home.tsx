import Head from 'next/head'
import styled from 'styled-components'
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

      <Layout children={undefined}></Layout>
    </>
  )
}