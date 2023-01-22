import { getFilesList, mdxToHtml } from '../../../lib/mdx';
import { MdxContent } from '../../../components/mdx-container';

export async function generateStaticParams() {
  const blogs = await getFilesList('blogs');

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPost({ params }: any) {
  const { frontmatter, serialized } = await mdxToHtml('blogs', params.slug);

  console.log(serialized);
  return (
    <>
      {frontmatter.date}
      <MdxContent source={serialized} />
    </>
  );
}
