import { GetStaticProps } from 'next'
import React from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typing'
import { PortableText } from '@portabletext/react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const components = {
  types: {
    code: ({ value }: any) => {
      return (
        <SyntaxHighlighter language={value.language} style={atomOneDark}>
          {value.code}
        </SyntaxHighlighter>
      )
    },
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="ml-4 list-disc">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="ml-4 list-decimal">{children}</li>
    ),
  },
  block: {
    h1: (props: any) => <h1 className="my-5 text-2xl font-bold" {...props} />,
    h2: (props: any) => <h1 className="my-5 text-xl font-bold" {...props} />,
  },
  marks: {
    link: ({ href, children }: any) => (
      <a href={href} className="text-blue-500 hover:underline">
        {children}
      </a>
    ),
  },
}
interface Props {
  post: Post
}

export default function PostPage({ post }: Props) {
  console.log(post)
  return (
    <main>
      <Header />

      <img
        className="h-48 w-full object-cover"
        src={urlFor(post.mainImage).toString()}
        alt={post.description}
      />

      <article className="mx-auto max-w-3xl">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).toString()}
            alt={post.description}
          />
          <p className="text-sm font-extralight">
            Post by <span className="text-sky-500">{post.author.name}</span> -
            Published at {new Date(post.publishedAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          {/* <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            components={{
              types: {
                code: CodeComponent,
                // Any other custom types you have in your content
                // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
              },
            }}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="my-5 text-xl font-bold" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
              code: ({ language, code }: any) => (
                <SyntaxHighlighter language={language}>
                  {code}
                </SyntaxHighlighter>
              ),
            }}
          /> */}

          <PortableText value={post.body} components={components} />
        </div>
      </article>
    </main>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
  _id,
  slug{
    current
  },
  }`

  const posts: [Post] = await sanityClient.fetch(query)

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=="post" && slug.current==$slug][0]{
  _id,
  title,
  slug,
  author->{
  name,
  image
},
mainImage,
description,
body,
publishedAt
}`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // after 60seconds, it'll update the old cached version
  }
}
