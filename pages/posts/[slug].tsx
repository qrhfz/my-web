import { GetStaticPropsContext, NextPage } from "next/types";
import MainLayout from "../../components/main_layout";
import { getPostFiles, readPosts, readSinglePost } from "../../data/read_md";
import Image from 'next/image'
import siteConfig from '../../site_config'
import { Post } from "../../models/post";

interface PostDetailProps {
    post: Post
    recentPosts: Post[]
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
    const recentPosts = readPosts()
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
            <article className=" bg-gray-800 mb-8 rounded-lg max-w-[70ch]">
                <div className='pb-4 w-full h-64 relative'>
                    {cover &&
                        <Image src={cover}
                            layout="fill"
                            objectFit="cover"
                            className='rounded-t-lg'
                            alt={title} />}
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-bold'>
                        {title}
                    </h2>
                    <p className='text-gray-400'>
                        {date.toLocaleDateString('id-ID', { dateStyle: "full" })} <br />
                    </p>

                    <div className="h-8"></div>
                    <div
                        dangerouslySetInnerHTML={{ __html: content }}
                        className="prose prose-invert">
                    </div>
                    <div className="h-16"></div>
                </div>

            </article>
        </MainLayout>
    )
}

export default PostDetail