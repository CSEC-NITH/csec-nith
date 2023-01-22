import path from 'path';
import matter from 'gray-matter';
import { readdirSync, readFileSync } from 'fs';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

const root = process.cwd();

export async function getFilesList(type: string) {
  const files = readdirSync(path.join(root, 'data', type));

  return files.reduce((allPosts: any, postSlug: string) => {
    const fileContent = readFileSync(
      path.join(root, 'data', type, postSlug),
      'utf-8'
    );
    const { content, data } = matter(fileContent);
    return [
      {
        content: content,
        title: data.title || 'Untitled Post',
        description: data.description || 'This post has no description',
        date: data.date || '--/--/----',
        slug: postSlug.replace('.mdx', ''),
        image: data.image || '',
        link: data.link || '',
      },
      ...allPosts,
    ];
  }, []);
}

type Frontmatter = {
  title: string;
  date: string;
};

type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};

export async function mdxToHtml(
  type: string,
  slug: string
): Promise<Post<Frontmatter>> {
  const source = path.join(root, 'data', type, `${slug}.mdx`);
  const fileContent = readFileSync(source, 'utf-8');

  const serialized = await serialize(fileContent, {
    parseFrontmatter: true,
  });

  const frontmatter = serialized.frontmatter as Frontmatter;

  return {
    frontmatter,
    serialized,
  };
}
