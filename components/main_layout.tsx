import { NextComponentType } from "next"
import Link from "next/link"


const MainLayout = ({ children }: any) => {
    return (<div className="h-screen  bg-gray-100 text-gray-900 w-full p-8 lg:p-16">

        <nav className="text-2xl">
            <div className="flex flex-row justify-end gap-4">
                <Link href={'/'}>
                    Home
                </Link>
                <Link href={'/projects'}>
                    Projects
                </Link>
                <Link href={'/contact'}>
                    Contact
                </Link>
                <a href={'https://blog.qori.dev'}>Blog</a>
            </div>
        </nav>

        {children}

    </div>)
}

export default MainLayout