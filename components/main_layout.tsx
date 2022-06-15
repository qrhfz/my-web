import Head from "next/head"
import Aside from "./aside";
import Nav from "./nav";


interface MainLayoutProps {
    title: string;
    children: any;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
    return (<div>
        <Head>
            <title>{title}</title>
        </Head>
        <Nav />
        <div className="flex flex-col-reverse md:flex-row gap-4 items-stretch md:items-start pt-24 max-w-[960px] mx-auto">
            <Aside />
            <main className=" w-[70ch]">
                {children}
            </main>
        </div>

    </div>)
}

export default MainLayout