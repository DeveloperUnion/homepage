import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  } | null;
  category: {
    id: string;
    name: string;
  } | null;
  html?: string;
};

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

function parseMarkdownFile(fileName: string): Blog {
  const id = fileName.replace(/\.md$/, '');
  const filePath = path.join(BLOG_DIR, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const stat = fs.statSync(filePath);

  return {
    id,
    title: data.title || '',
    content,
    publishedAt: data.publishedAt || stat.birthtime.toISOString(),
    createdAt: data.publishedAt || stat.birthtime.toISOString(),
    updatedAt: data.updatedAt || stat.mtime.toISOString(),
    revisedAt: data.updatedAt || stat.mtime.toISOString(),
    eyecatch: data.eyecatch
      ? {
          url: data.eyecatch,
          width: data.eyecatchWidth || 1200,
          height: data.eyecatchHeight || 630,
        }
      : null,
    category: data.category
      ? {
          id: data.category.toLowerCase().replace(/\s+/g, '-'),
          name: data.category,
        }
      : null,
  };
}

export async function getAllBlogs(): Promise<Blog[]> {
  ensureBlogDir();

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));

  const blogs = files.map(parseMarkdownFile);

  // publishedAt の降順でソート
  blogs.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return blogs;
}

export async function getBlogById(id: string): Promise<Blog | null> {
  ensureBlogDir();

  const filePath = path.join(BLOG_DIR, `${id}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const blog = parseMarkdownFile(`${id}.md`);

  // Markdown を HTML に変換
  const result = await remark().use(html).process(blog.content);
  blog.html = result.toString();

  return blog;
}

export async function getAllBlogIds(): Promise<string[]> {
  ensureBlogDir();

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}
