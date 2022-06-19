import fs from 'fs'
import parseMD from 'parse-md'
import path from 'path'
import { marked } from 'marked'
import { Post, PostMetadata } from "../models/post";

const POST_PATH = './content/post'


export function readPosts(): Post[] {
    const files = getPostFiles()
    const posts = files.map(file => {
        const fileContents = fs.readFileSync(path.join(POST_PATH, file), 'utf8')

        const post = parsePost(fileContents)
        post.metadata.slug = file.split('.').slice(0, -1).join();
        return post
    })

    sortPostByDate(posts)

    return posts
}

function sortPostByDate(posts:Post[]) {
    posts.sort((a,b)=>new Date(b.metadata.date).getTime()-new Date(a.metadata.date).getTime())
}

export function readSinglePost(file: string): Post {
    const fileContents = fs.readFileSync(path.join(POST_PATH, file), 'utf8')
    const post = parsePost(fileContents)
    post.metadata.slug = file.split('.').slice(0, -1).join();
    return post
}

export function getPostFiles(): string[] {
    const files = fs.readdirSync(POST_PATH)
    return files.filter(file => path.extname(file) === ".md")
}

function parsePost(fileContents: string): Post {
    const post = parseMD(fileContents)
    post.content = marked.parse(post.content)
    return post as Post
}
