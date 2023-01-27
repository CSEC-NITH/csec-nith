import path from 'path';
import { readdirSync, readFileSync } from 'fs';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

const root = process.cwd();

type Frontmatter = {
  title: string;
  description: string;
  date: string;
};

type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};

type PostInfo = Frontmatter & {
  slug: string;
};

/**
 * Get a list of all posts with their frontmatter
 * @param type type of the posts (sub directory in `/data`)
 * @returns {PostInfo[]} list of all posts of type `type`
 */
export async function getPostList(type: string): Promise<PostInfo[]> {
  const files = readdirSync(path.join(root, 'data', type));

  return Promise.all(
    files.map(async (postSlug: string) => {
      const fileContent = readFileSync(
        path.join(root, 'data', type, postSlug),
        'utf-8'
      );

      const serialized = await serialize(fileContent, {
        parseFrontmatter: true,
      });

      const frontmatter = serialized.frontmatter as Frontmatter;

      return {
        title: frontmatter.title,
        description: frontmatter.description,
        date: frontmatter.date,
        slug: postSlug.replace('.mdx', ''),
      };
    })
  );
}

/**
 * Get a single post with its frontmatter and content
 * @param type type of the posts (sub directory in `/data`)
 * @param slug slug of the post
 * @returns {Post<Frontmatter>} single post
 */
export async function getPost(
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
