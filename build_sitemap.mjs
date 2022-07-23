import fs from 'fs'

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\t<url><loc>https://www.qori.dev/</loc></url>
${fs.readdirSync('./content/post').map(p => `\t<url><loc>https://www.qori.dev/posts/${p.split(".")[0]}</loc></url>\n`).join("")}</urlset>`

fs.writeFileSync("./public/sitemap.xml", sitemap)

