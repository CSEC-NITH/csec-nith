import { getFilesList } from '../../../lib/mdx';

export async function generateStaticParams() {
  const blogs = await getFilesList('blogs');

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPost({ params }: any) {
  return (
    <>
      <h1>Blog</h1>
      <div>This is a blog</div>
    </>
  );
}
