import type { GetStaticPropsContext, NextPage } from 'next'
import { getRecentPosts, readPosts } from '../data/read_md'
import MainLayout from '../components/main_layout'
import Image from 'next/image';
import Link from 'next/link';
import { Post, PostHighlight } from '../models/post';

interface HomeProps {
  posts: Post[]
  recentPosts: PostHighlight[],
  projects: Project[]
}

interface Project { name: string, pic: string, link: string }

export async function getStaticProps(context: GetStaticPropsContext) {
  const posts = readPosts()
  const recentPosts = getRecentPosts()
  const projects: Project[] = [{
    name: "Tale of dhaifuria",
    pic: "/projects/tale-of-dhaifuria.png",
    link: "https://qrhfz.github.io/TaleOfDhaifuria/",
  },
  {
    name: "HackerNews Client",
    pic: "/projects/hn_client.png",
    link: "https://github.com/qrhfz/hn_client",
  }
  ]

  return {
    props: {
      posts,
      recentPosts,
      projects
    }
  }
}


const Home: NextPage<HomeProps> = ({ posts, recentPosts, projects }) => {
  return (<MainLayout
    title='Qori El-Hafizh'
    recentPosts={recentPosts}>

    <div className=''>
      <div className='pb-8'>
        <h2 className='text-2xl font-bold'>Projects</h2>
        <div className="grid grid-cols-3 gap-1">
          {projects && projects.map((p, i) => (

            <Link href={p.link} key={i}>
              <a>
                <div className='aspect-square'>
                  <Image src={p.pic}
                    layout="responsive"
                    width={100}
                    height={100}
                    objectFit="cover"

                    alt={p.name} />
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>

      <h2 className='text-2xl font-bold pb-4'>Latest Blog Posts</h2>
      {
        posts.map((post, index) => {
          return (
            <Link href={`/posts/${post.metadata.slug}`} key={index} >
              <a>
                <article className="pb-4">
                  <div className="flex flex-row gap-4">
                    <div>

                      {post.metadata.cover &&
                        <Image src={post.metadata.cover}
                          layout="fixed"
                          width={100}
                          height={100}
                          objectFit="cover"

                          alt={post.metadata.title} />}
                    </div>

                    <div className=''>
                      <h2 className='text-lg font-bold'>
                        {post.metadata.title}

                      </h2>
                      <p className='text-gray-400'>
                        {post.metadata.description}
                      </p>
                    </div>
                  </div>


                </article>
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
