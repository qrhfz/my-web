import { GetStaticPropsContext, NextPage } from "next/types";
import MainLayout from "../../components/main_layout";
import { getPostFiles, getRecentPosts, readPosts, readSinglePost } from "../../data/read_md";
import Image from 'next/image'
import siteConfig from '../../site_config'
import { Post } from "../../models/post";

interface PostDetailProps {
    post: Post
    recentPosts: {
        title: string;
        slug: string;
        date: string;
    }[]
}

export async function getStaticPaths() {
    const files = getPostFiles()
    const paths = files.map(file => {
        const fileWithExt = file.split('.')
        fileWithExt.pop()
        const filename = fileWithExt.join()
        return ({ params: { slug: filename } })
    })
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const post = readSinglePost(context.params!.slug! as string + '.md')
    const recentPosts = getRecentPosts()
    return {
        props: {
            post,
            recentPosts
        },
    }
}


const PostDetail: NextPage<PostDetailProps> = ({ post, recentPosts }) => {
    const { metadata, content } = post
    const date = new Date(metadata.date)
    const { title, cover, description, slug } = metadata
    return (
        <MainLayout
            title={title}
            image={new URL(cover, siteConfig.base).toString()}
            url={new URL(`posts/${slug}`, siteConfig.base).toString()}
            description={description}
            recentPosts={recentPosts}
        >
            <article className="mb-8">
                <div className="max-w-[65ch]  mx-auto">

                    <div className='text-gray-400 py-2'>
                        {date.toLocaleDateString('id-ID', { dateStyle: "full" })} <br />
                    </div>
                    <h2 className='text-2xl font-bold'>
                        {title}
                    </h2>
                </div>
                <div className="h-4"></div>
                <div className="">
                    {cover &&
                        <Image src={cover}
                            layout="responsive"
                            objectFit="cover"
                            className='rounded-lg'
                            width={160}
                            height={100}
                            alt={title} />
                    }
                </div>
                <div className="h-8"></div>

                <div
                    dangerouslySetInnerHTML={{ __html: content }}
                    className="prose prose-invert mx-auto">
                </div>
                <div className="h-16"></div>


            </article>
        </MainLayout>
    )
}

export default PostDetail