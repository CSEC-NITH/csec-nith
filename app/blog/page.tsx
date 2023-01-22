import Link from 'next/link';
import { getFilesList } from '../../lib/mdx';

export default async function Blogs() {
  const blogs = await getFilesList('blogs');

  return (
    <>
      <h1>Blog</h1>
      {blogs.map((blog) => (
        <Link key={blog.slug} href={`/blog/${blog.slug}`}>
          <h2>{blog.title}</h2>
        </Link>
      ))}
    </>
  );
}
