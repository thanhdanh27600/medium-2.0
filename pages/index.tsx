import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex items-center justify-between border-black bg-yellow-400 py-10 lg:py-5 ">
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Medium{' '}
            </span>
            is a place to write, read and connect
          </h1>
          <h2>
            Stop using console.log Stop using console.log for everything 🙄. I
            have seen and continue to see many developers regularly use the
            console object’s log method in a way that I think is incorrect.
            Using console.log for debugging Many developers still use the log
            method to debug their application. For example, to make sure that
            the code goes…
          </h2>
        </div>
        <img
          alt=""
          className="m-16 hidden w-32 md:inline-flex lg:h-full lg:w-64"
          src="https://cdn.worldvectorlogo.com/logos/medium-1.svg"
        />
      </div>
    </div>
  )
}

export default Home
