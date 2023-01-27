import { getPostList, getPost } from '../../../lib/mdx';
import { MdxContent } from '../../../components/mdx-container';

export async function generateStaticParams() {
  const blogs = await getPostList('blogs');

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPost({ params }: any) {
  const { frontmatter, serialized } = await getPost('blogs', params.slug);

  return (
    <>
      {frontmatter.date}
      <MdxContent source={serialized} />
    </>
  );
}
