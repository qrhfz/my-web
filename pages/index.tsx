import type { GetStaticPropsContext, NextPage } from 'next'
import { readPosts } from '../data/read_md'
import MainLayout from '../components/main_layout'
import Image from 'next/image';
import Link from 'next/link';

interface HomeProps {
  posts: {
    metadata: any;
    content: string;
  }[];
}


export async function getStaticProps(context: GetStaticPropsContext) {
  const posts = readPosts()
  return {
    props: {
      posts
    }, // will be passed to the page component as props
  }
}


const Home: NextPage<HomeProps> = ({ posts }) => {
  return (<MainLayout title='Qori El-Hafizh'>
    {
      posts.map((post, index) => {
        return (
          <Link href={`/posts/${post.metadata.slug}`} key={index} >
            <a>
              <article className=" bg-gray-700 mb-8 rounded-lg">
                <div className='pb-4 w-full h-64 relative'>
                  {post.metadata.cover &&
                    <Image src={post.metadata.cover}
                      layout="fill"
                      objectFit="cover"
                      className='rounded-t-lg' />}


                </div>
                <div className='p-4'>
                  <h2 className='text-lg font-bold'>
                    {post.metadata.title}

                  </h2>
                  <p className='text-gray-400'>
                    {post.metadata.description}
                  </p>
                </div>

              </article>
            </a>
          </Link>
        )
      })
    }

  </MainLayout>
  )
}

export default Home
