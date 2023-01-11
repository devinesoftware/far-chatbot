import Head from 'next/head'
import FARForm from '../components/farform';

export default function Home() {

  
  return (
    <>
      <Head>
        <title>FAR Legal Assistant</title>
        <meta name="description" content="Your legal assistant for all things Federal Acquisition Restriction" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full">
        <FARForm></FARForm>
      </main>
    </>
  )
}
