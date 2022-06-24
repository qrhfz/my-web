export interface Post {
    metadata: PostMetadata
    content: string
}

export interface PostMetadata {
    title: string
    date: string
    description: string
    cover: string
    slug: string
}

export interface PostHighlight {
    title: string;
    slug: string;
    date: string;
}