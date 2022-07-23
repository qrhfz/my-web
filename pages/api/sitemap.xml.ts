// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { readPosts } from '../../data/read_md'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  res.setHeader("Content-Type", "text/xml")

  res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://www.qori.dev/</loc></url>
${readPosts().map(p => `\t<url><loc>https://www.qori.dev/posts/${p.metadata.slug}</loc></url>\n`).join("")}</urlset>`)


}
