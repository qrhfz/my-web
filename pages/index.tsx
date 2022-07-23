import type { GetStaticPropsContext, NextPage } from 'next'
import { getRecentPosts, readPosts } from '../data/read_md'
import MainLayout from '../components/main_layout'
import Image from 'next/image';
import Link from 'next/link';
import { Post, PostHighlight } from '../models/post';

interface HomeProps {
  posts: Post[]
  recentPosts: PostHighlight[]
}


export async function getStaticProps(context: GetStaticPropsContext) {
  const posts = readPosts()
  const recentPosts = getRecentPosts()
  return {
    props: {
      posts,
      recentPosts
    }
  }
}


const Home: NextPage<HomeProps> = ({ posts, recentPosts }) => {
  return (<MainLayout
    title='Qori El-Hafizh'
    recentPosts={recentPosts}>

    <div className='max-w-[640px] mx-auto'>
      {
        posts.map((post, index) => {
          return (
            <Link href={`/posts/${post.metadata.slug}`} key={index} >
              <a>
                <section className="pb-8">
                  <div className='pb-4 w-full h-64 relative'>
                    {post.metadata.cover &&
                      <Image src={post.metadata.cover}
                        layout="fill"
                        objectFit="cover"
                        alt={post.metadata.title} />}
                  </div>
                  <div className='pt-4'>
                    <h2 className='text-lg font-bold'>
                      {post.metadata.title}

                    </h2>
                    <p className='text-gray-400'>
                      {post.metadata.description}
                    </p>
                  </div>

                </section>
              </a>
            </Link>
          )
        })
      }
    </div>

  </MainLayout>
  )
}

export default Home
