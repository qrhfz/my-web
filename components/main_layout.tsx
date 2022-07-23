import Head from "next/head"
import { Post, PostHighlight } from "../models/post";
import Aside from "./aside";
import Nav from "./nav";


interface MainLayoutProps {
    title: string
    children: any
    url?: string
    image?: string
    description?: string,
    recentPosts: PostHighlight[]
}

const MainLayout = ({ children, title, url, image, description, recentPosts }: MainLayoutProps) => {
    return (<div className="w-full">
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url ? url : "https://www.qori.dev"} />
            <meta property="og:image" content={image ? image : "https://www.qori.dev/pp.JPG"} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:locale" content="id-ID" />

        </Head>
        <Nav />
        <div className="max-w-[800px] mx-auto pt-24">

            <main className="md:px-0">
                {children}
            </main>
        </div>

    </div>
    )
}

export default MainLayout