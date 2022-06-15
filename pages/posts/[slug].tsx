import { GetStaticPropsContext, NextPage } from "next/types";
import MainLayout from "../../components/main_layout";
import { getPostFiles, readSinglePost } from "../../data/read_md";
import Image from 'next/image'
import 'github-markdown-css/github-markdown-dark.css'

interface PostDetailProps {
    post: {
        metadata: any;
        content: string;
    };
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
    return {
        props: {
            post
        },
    }
}


const PostDetail: NextPage<PostDetailProps> = ({ post }) => {
    return <MainLayout title={post.metadata.title}>
        <article className=" bg-gray-800 mb-8 rounded-lg">
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
                <div className="h-8"></div>
                <div
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="markdown-body"
                    style={{ backgroundColor: "transparent" }}>
                </div>
            </div>

        </article>
    </MainLayout>
}

export default PostDetail