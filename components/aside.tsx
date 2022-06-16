import Image from "next/image";
import Link from "next/link";

export default function Aside() {
    return <aside className=" p-4 md:grow mx-auto md:mx-0 w-full md:w-max ">
        <div className="bg-gray-800 p-4 flex flex-row justify-evenly md:flex-col gap-4">
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
            
        </div>
        </div>
        

    </aside>
}