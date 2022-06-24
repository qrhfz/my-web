import Image from "next/image";
import Link from "next/link";
import { Post, PostHighlight } from "../models/post";
import { SideWidget } from "./SideWidget"

const Aside = ({ recentPosts }: { recentPosts: PostHighlight[] }) => {
    return <div className="flex flex-col gap-4">
        <SideWidget>
            <div className="text-center pb-4">
                <Image
                    src={"/pp.JPG"}
                    width={128}
                    height={128}
                    className="block rounded-full"
                    alt="Foto profil" />
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
            <div className="pb-2">
                <strong>Recent Posts</strong>
            </div>

            {recentPosts.map((post, i) => (
                <Link href={`/posts/${post.slug}`} key={i}>
                    <a><div className="pb-2">
                        <div>
                            {post.title}
                        </div>
                        <div className="text-gray-600">
                            {new Date(post.date).toLocaleDateString("id-ID", { month: "short", day: "numeric" })}
                        </div>
                    </div>
                    </a>
                </Link>
            ))}

        </SideWidget>

    </div>
}

export default Aside