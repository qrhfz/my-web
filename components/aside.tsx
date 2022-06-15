import Image from "next/image";
import Link from "next/link";

export default function Aside() {
    return <aside className="bg-gray-800 p-4 md:grow mx-auto md:mx-0">
        <div className="text-center pb-4">
            <Image
                src={"/pp.JPG"}
                width={128}
                height={128}
                className="block rounded-full" />
            <p>
                <strong>Qori El-Hafizh</strong>
            </p>
            <p>
                Suka membuat aplikasi<br />
                Flutter | NodeJS | Python
            </p>

        </div>
        <div className="p-4">
            <p >
                <strong>Contact me</strong>
                <ul className="list-[square]">
                    <li>
                        <Link href="https://twitter.com/qrhfz"><a >Twitter</a></Link>
                    </li>
                    <li>
                        <Link href="https://www.linkedin.com/in/qori-el-hafizh-3838b4228/">
                            <a >Linkedin</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://github.com/qrhfz"><a >Github</a></Link>
                    </li>
                    <li>
                        <Link href="mailto://contact@qori.dev"><a>Email</a></Link>
                    </li>
                </ul>
            </p>
        </div>

    </aside>
}