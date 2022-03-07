import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typing'

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  console.log(posts)
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>CSE Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex items-center justify-between border-2 border-sky-700 bg-sky-400 py-10 lg:py-5 ">
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              CSE Blog
            </span>{' '}
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
          src="/static/cse.png"
        />
      </div>
      {/* Post */}
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div
              className="group cursor-pointer overflow-hidden rounded-lg border"
              title={post.description}
            >
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={urlFor(post.mainImage).toString()}
                alt={`${post.title}`}
              />
              <div className="flex justify-between bg-white p-5">
                <div>
                  <p>{post.title}</p>
                  <p className="line-clamp-5">{post.description}</p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).toString()}
                  alt={`${post.title}`}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
  _id,
  title,
  slug,
  author->{
  name,
  image
},
mainImage,
description
}`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
