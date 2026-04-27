import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Markdoc from '@markdoc/markdoc';

// Posts live as content/posts/<slug>/index.mdoc with YAML frontmatter
// fenced by --- and a Markdoc body. We read these directly with fs because
// Keystatic's createReader does not see content files reliably on Vercel
// serverless (even with outputFileTracingIncludes set).

const POSTS_DIR = 'content/posts';

interface PostFrontmatter {
  title?: string;
  displayTitle?: string;
  description?: string;
  publishedDate?: string;
  author?: string;
  image?: string;
}

interface PostEntry extends PostFrontmatter {
  content: () => Promise<{ node: any }>;
}

interface PostListItem {
  slug: string;
  entry: PostEntry;
}

const FRONTMATTER_RE = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;

function parseMdoc(raw: string): { frontmatter: PostFrontmatter; body: string } {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) {
    return { frontmatter: {}, body: raw };
  }
  const frontmatter = (yaml.load(match[1]) as PostFrontmatter) || {};
  return { frontmatter, body: match[2] };
}

function buildContentFn(body: string): () => Promise<{ node: any }> {
  return async () => {
    const ast = Markdoc.parse(body);
    const node = Markdoc.transform(ast);
    return { node };
  };
}

function readPost(slug: string): PostEntry | null {
  const filePath = path.join(process.cwd(), POSTS_DIR, slug, 'index.mdoc');
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, body } = parseMdoc(raw);
  return {
    ...frontmatter,
    content: buildContentFn(body),
  };
}

export async function getAllPosts(): Promise<PostListItem[]> {
  const dir = path.join(process.cwd(), POSTS_DIR);
  if (!fs.existsSync(dir)) {
    return [];
  }
  const slugs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const posts: PostListItem[] = [];
  for (const slug of slugs) {
    const entry = readPost(slug);
    if (entry) {
      posts.push({ slug, entry });
    }
  }

  posts.sort((a, b) => {
    const dateA = new Date(a.entry.publishedDate || 0).getTime();
    const dateB = new Date(b.entry.publishedDate || 0).getTime();
    return dateB - dateA;
  });

  return posts;
}

export async function getPostBySlug(slug: string): Promise<PostEntry | null> {
  return readPost(slug);
}
