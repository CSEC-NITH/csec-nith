import path from 'path';
import matter from 'gray-matter';
import { readdirSync, readFileSync } from 'fs';

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
