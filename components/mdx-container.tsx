'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
};

const MdxComponents = {};

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} components={MdxComponents} />;
}
