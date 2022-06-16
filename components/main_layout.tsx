import Head from "next/head"
import Aside from "./aside";
import Nav from "./nav";


interface MainLayoutProps {
    title: string
    children: any
    url?: string
    image?:string
    description?:string
}

const MainLayout = ({ children, title, url, image, description }: MainLayoutProps) => {
    return (<div className="w-full">
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url?url:"https://www.qori.dev"} />
            <meta property="og:image" content={image?image:"https://www.qori.dev/pp.JPG"} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:locale" content="id-ID" />

        </Head>
        <Nav />
        <div className="flex flex-col-reverse md:flex-row gap-4 items-start md:items-stretch pt-24 max-w-[960px] mx-auto">
            <Aside />
            <main className="p-4 max-w-[70ch]">
                {children}
            </main>
        </div>

    </div>)
}

export default MainLayout