import { getAllPosts, getPostBySlug } from '@/lib/keystatic';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MarkdocRenderer } from '@/components/MarkdocRenderer';

// SSG with hourly revalidation. Pre-renders all known posts at build (so Google
// can find static HTML via sitemap), and falls back to on-demand SSR for any
// new slug. Force-dynamic was forcing every crawl to re-render and was
// preventing Googlebot from discovering posts via standard sitemap fetches.
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

const SITE = 'https://www.topvolk.org';

function readableTitle(slug: string, displayTitle?: string): string {
  return (
    displayTitle ||
    slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
}

function isoDate(d: unknown): string | undefined {
  if (!d) return undefined;
  const date = d instanceof Date ? d : new Date(String(d));
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

// Before 2026-10-30 posts inherited the root layout canonical (the homepage) and used
// the slug as the title, so Google folded them into the homepage. Each post now
// declares its own canonical and a readable title (layout template adds the brand).
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const url = `${SITE}/blog/${slug}`;
  const title = readableTitle(slug, post.displayTitle);
  const description = post.description || `${title}: a TopVolk Construction guide.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      publishedTime: isoDate(post.publishedDate),
      modifiedTime: isoDate(post.updatedDate) || isoDate(post.publishedDate),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { displayTitle, description, publishedDate, updatedDate, author, image, content } = post;

  const articleTitle = readableTitle(slug, displayTitle);
  const url = `${SITE}/blog/${slug}`;
  const related = (await getAllPosts()).filter((p) => p.slug !== slug);
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleTitle,
    description: description || undefined,
    datePublished: isoDate(publishedDate),
    dateModified: isoDate(updatedDate) || isoDate(publishedDate),
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'TopVolk Construction', url: SITE },
    publisher: { '@type': 'Organization', name: 'TopVolk Construction', url: SITE },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: articleTitle, item: url },
    ],
  };

  // Get Markdoc node from content
  const { node } = await content();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleLd, breadcrumbLd]) }}
      />
      {/* Back Button */}
      <section className="py-6 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-700 font-semibold transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <article className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {image && (
              <div className="relative w-full h-64 md:h-96 bg-gray-100 rounded-lg overflow-hidden mb-8">
                <Image
                  src={image}
                  alt={articleTitle}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {articleTitle}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              {publishedDate && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gold-500" />
                  {new Date(publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
              {author && (
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gold-500" />
                  {author}
                </span>
              )}
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg prose-gray max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-gold-500 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-700 prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-gold-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                prose-img:rounded-lg prose-img:shadow-md"
            >
              <MarkdocRenderer node={node} />
            </div>
          </div>
        </div>
      </article>

      {/* More guides: internal links between posts */}
      {related.length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">More Remodeling Guides</h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="block bg-white p-5 rounded-lg border border-gray-200 hover:shadow-md transition font-semibold text-gray-900"
                    >
                      {readableTitle(p.slug, p.entry.displayTitle)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gold-500 to-gold-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Renovation?
            </h2>
            <p className="text-xl text-gold-100 mb-8">
              Our experienced team is ready to bring your vision to life. Free estimates for Seattle area projects.
            </p>
            <a
              href="tel:+12065911096"
              className="inline-block px-8 py-4 rounded-lg font-semibold text-lg shadow-xl transition cursor-pointer"
              style={{ backgroundColor: '#334e64' }}
            >
              Call (206) 591-1096
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
