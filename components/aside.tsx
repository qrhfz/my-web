import Image from "next/image";
import Link from "next/link";
import { Post } from "../models/post";
import { SideWidget } from "./SideWidget"

const Aside = ({ recentPosts }: { recentPosts: Post[] }) => {
    return <aside className=" p-4 md:grow mx-auto md:mx-0 basis-full md:basis-1/4 flex flex-col gap-4 ">
        <SideWidget>
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
        </SideWidget>
        <SideWidget>
            <strong>Recent Posts</strong>
            <ul>
                {recentPosts.map(post => (
                    <li>
                        <div className="border-b-gray-600 border-b-[1px] p-2">
                            <p>
                                {post.metadata.title}

                            </p>
                            <p className="text-gray-600">
                                {new Date(post.metadata.date).toLocaleDateString("id-ID", {month:"short", year:"numeric", day:"numeric"})}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </SideWidget>

    </aside >
}

export default Aside