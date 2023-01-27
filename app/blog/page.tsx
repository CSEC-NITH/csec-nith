import Link from 'next/link';
import { getPostList } from '../../lib/mdx';

export default async function Blogs() {
  const blogs = await getPostList('blogs');

  return (
    <>
      <h1>Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.slug}>
            <Link href={`/blog/${blog.slug}`}>
              {blog.title} - {blog.date}
            </Link>
            <p>{blog.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
