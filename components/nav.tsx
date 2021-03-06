import Link from "next/link";

export default function Nav() {
    return <nav className="p-4 fixed bg-black w-full z-50 shadow-lg">
        <div className="flex flex-row gap-4 justify-between">
            <Link href={'/'}>
                <a>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-white inline"><path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path></svg> */}
                    <strong>Qori El-Hafizh</strong>
                </a>
            </Link>
            <div className="inline-flex gap-2">
                <Link href="https://www.linkedin.com/in/qori-el-hafizh-3838b4228/">
                    <a >Linkedin</a>
                </Link>
                <Link href="https://twitter.com/qrhfz"><a >Twitter</a></Link>

                <Link href="https://github.com/qrhfz"><a >Github</a></Link>

                <Link href="mailto://contact@qori.dev"><a>Email</a></Link>
            </div>

        </div>
    </nav>
}