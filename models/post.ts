export interface Post {
    metadata: PostMetadata
    content: string
}

export interface PostMetadata{
    title: string
    date: string
    description: string
    cover: string
    slug: string
}