import { GetStaticPropsContext, NextPage } from "next/types";
import MainLayout from "../../components/main_layout";
import { getPostFiles, readPosts, readSinglePost } from "../../data/read_md";
import Image from 'next/image'
import 'github-markdown-css/github-markdown-dark.css'
import siteConfig from '../../site_config'
import { useEffect } from "react";
import hljs from 'highlight.js/lib/core';
import dart from 'highlight.js/lib/languages/dart'
import bash from 'highlight.js/lib/languages/bash'
import { Post } from "../../models/post";

interface PostDetailProps {
    post:Post
    recentPosts:Post[]
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

    useEffect(()=>{
        hljs.registerLanguage('dart', dart)
        hljs.registerLanguage('bash', bash)
        hljs.highlightAll()
    },[])
    return (
        <MainLayout
            title={title}
            image={new URL(cover, siteConfig.base).toString()}
            url={new URL(`posts/${slug}`, siteConfig.base).toString()}
            description={description}
            recentPosts={recentPosts}
            >
            <article className=" bg-gray-800 mb-8 rounded-lg">
                <div className='pb-4 w-full h-64 relative'>
                    {cover &&
                        <Image src={cover}
                            layout="fill"
                            objectFit="cover"
                            className='rounded-t-lg' />}
                </div>
                <div className='p-4'>
                    <h2 className='text-lg font-bold'>
                        {title}
                    </h2>
                    <p className='text-gray-400'>
                        {description} <br />
                    </p>

                    <div className="h-8"></div>
                    <div
                        dangerouslySetInnerHTML={{ __html: content }}
                        className="markdown-body"
                        style={{ backgroundColor: "transparent" }}>
                    </div>
                    <div className="h-16"></div>
                    <p className='text-gray-400 text-right'>
                        Ditulis {date.toLocaleDateString('id-ID', { dateStyle: "full" })}
                    </p>
                </div>

            </article>
        </MainLayout>
    )
}

export default PostDetail