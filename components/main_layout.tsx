import Head from "next/head"
import Aside from "./aside";
import Nav from "./nav";


interface MainLayoutProps {
    title: string;
    children: any;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
    return (<div className='max-w-[960px] mx-auto'>
        <Head>
            <title>{title}</title>
        </Head>
        <Nav />
        <div className="flex flex-row gap-4 items-start">
            <Aside />
            <main className=" w-[70ch]">
                {children}
            </main>
        </div>

    </div>)
}

export default MainLayout