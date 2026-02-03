# 🎯 Keystatic CMS Setup Guide для Next.js блога

> **Рабочий коммит:** `98d9353`  
> **Проект:** Max Appliance Service (max-repair)  
> **Дата:** Январь 2026

---

## 📋 Оглавление
1. [Почему Keystatic](#почему-keystatic)
2. [Установка](#установка)
3. [Конфигурация (Hybrid Approach)](#конфигурация-hybrid-approach)
4. [Интеграция с Next.js](#интеграция-с-nextjs)
5. [Кастомный Markdoc Renderer](#кастомный-markdoc-renderer)
6. [Структура файлов](#структура-файлов)
7. [Деплой на Vercel](#деплой-на-vercel)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Почему Keystatic

### ❌ Не подошло:
- **Contentful** - админка не на домене (ugly UX)
- **TinaCMS** - не запустилась
- **Keystatic GitHub mode** - проблемы с OAuth и env vars на Vercel

### ✅ Итоговое решение: Keystatic Hybrid Mode
- **Админка**: Keystatic Cloud (на домене `/keystatic`)
- **Чтение контента**: Local mode (из Git файлов)
- **Автокоммит**: Keystatic Cloud автоматически коммитит изменения в Git
- **Деплой**: Vercel автоматически деплоит при коммите

---

## 📦 Установка

```bash
npm install @keystatic/core @keystatic/next
```

**package.json dependencies:**
```json
{
  "@keystatic/core": "^0.5.45",
  "@keystatic/next": "^7.0.0"
}
```

---

## ⚙️ Конфигурация (Hybrid Approach)

### 🔑 КРИТИЧНО: Два отдельных конфига!

#### 1️⃣ `keystatic.config.tsx` - для АДМИНКИ (Cloud mode)

```tsx
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud', // АДМИНКА в Cloud mode
  },
  cloud: {
    project: 'your-org/your-project', // Ваш проект на Keystatic Cloud
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Slug' } }),
        displayTitle: fields.text({
          label: 'Article Title (Display)',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Meta Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        publishedDate: fields.date({
          label: 'Published Date',
          defaultValue: { kind: 'today' },
        }),
        author: fields.text({
          label: 'Author',
          defaultValue: 'Your Company Name',
        }),
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog/',
            },
          },
        }),
      },
    }),
  },
});
```

#### 2️⃣ `keystatic.reader.config.tsx` - для ЧТЕНИЯ (Local mode)

```tsx
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local', // ЧТЕНИЕ из Git файлов
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        // ⚠️ ТОЧНО ТАКАЯ ЖЕ СХЕМА как в keystatic.config.tsx!
        title: fields.slug({ name: { label: 'Slug' } }),
        displayTitle: fields.text({
          label: 'Article Title (Display)',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Meta Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        publishedDate: fields.date({
          label: 'Published Date',
          defaultValue: { kind: 'today' },
        }),
        author: fields.text({
          label: 'Author',
          defaultValue: 'Your Company Name',
        }),
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog/',
            },
          },
        }),
      },
    }),
  },
});
```

### 🔑 Почему два конфига?
- **`keystatic.config.tsx`** → Используется админкой (`/keystatic`)
- **`keystatic.reader.config.tsx`** → Используется для чтения контента на сайте
- Админка пишет в Cloud → Cloud коммитит в Git → Reader читает из Git

---

## 🔧 Интеграция с Next.js

### 1️⃣ API Route: `app/api/keystatic/[...params]/route.ts`

```ts
import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '../../../../keystatic.config';

export const { POST, GET } = makeRouteHandler({
  config: keystaticConfig, // Используем Cloud config
});
```

### 2️⃣ Admin UI: `app/keystatic/[[...params]]/page.tsx`

```tsx
import KeystaticApp from './keystatic';

export default function KeystaticAdminPage() {
  return <KeystaticApp />;
}
```

### 3️⃣ Admin Client Component: `app/keystatic/[[...params]]/keystatic.tsx`

```tsx
'use client';

import { makePage } from '@keystatic/next/ui/app';
import keystaticConfig from '../../../keystatic.config';

export default makePage(keystaticConfig); // Cloud config
```

### 4️⃣ Reader Utility: `lib/keystatic.ts`

```ts
import { createReader } from '@keystatic/core/reader';
import readerConfig from '../keystatic.reader.config'; // LOCAL config!

// Reader использует LOCAL mode для чтения из Git
export const reader = createReader(process.cwd(), readerConfig);

// Get all blog posts
export async function getAllPosts() {
  try {
    const posts = await reader.collections.posts.all();
    // Sort by date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.entry.publishedDate || 0);
      const dateB = new Date(b.entry.publishedDate || 0);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('[getAllPosts] Error reading posts:', error);
    return [];
  }
}

// Get single post by slug
export async function getPostBySlug(slug: string) {
  try {
    const post = await reader.collections.posts.read(slug);
    return post;
  } catch (error) {
    console.error(`[getPostBySlug] Error reading post "${slug}":`, error);
    return null;
  }
}
```

### 5️⃣ Blog Listing: `app/blog/page.tsx`

```tsx
import { getAllPosts } from '@/lib/keystatic';
import { FileText, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Blog | Your Site',
  description: 'Expert tips and guides',
};

// Force dynamic rendering (disable caching)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper to convert slug to readable title (fallback)
const slugToTitle = (slug: string) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <FileText className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
            <p className="text-xl md:text-2xl text-green-100">
              Expert advice and industry insights
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No blog posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {posts.map((post) => {
                const { slug } = post;
                const { displayTitle, description, publishedDate, author, image } = post.entry;
                const articleTitle = displayTitle || slugToTitle(slug);

                return (
                  <Link
                    key={slug}
                    href={`/blog/${slug}`}
                    prefetch={false}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden border border-gray-200 flex flex-col"
                  >
                    {image && (
                      <div className="relative w-full h-48 bg-gray-100">
                        <Image
                          src={image}
                          alt={articleTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition">
                        {articleTitle}
                      </h2>
                      {description && (
                        <p className="text-gray-600 mb-4 flex-1">
                          {description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-200">
                        {publishedDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(publishedDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
                        {author && (
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {author}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
```

### 6️⃣ Single Post: `app/blog/[slug]/page.tsx`

```tsx
import { getPostBySlug } from '@/lib/keystatic';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MarkdocRenderer } from '@/components/MarkdocRenderer';
import { unstable_noStore as noStore } from 'next/cache';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper to convert slug to title
const slugToTitle = (slug: string) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  noStore();
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const articleTitle = post.displayTitle || slugToTitle(params.slug);

  return {
    title: `${articleTitle} | Your Site`,
    description: post.description || `Read about ${articleTitle}`,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  noStore();
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { displayTitle, description, publishedDate, author, image, content } = post;
  const articleTitle = displayTitle || slugToTitle(slug);

  // Get Markdoc node from content
  const { node } = await content();

  return (
    <>
      {/* Back Button */}
      <section className="py-6 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition"
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
                  <Calendar className="w-5 h-5 text-green-600" />
                  {new Date(publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
              {author && (
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5 text-green-600" />
                  {author}
                </span>
              )}
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-gray max-w-none">
              <MarkdocRenderer node={node} />
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Help?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Contact us today!
            </p>
            <a
              href="tel:+1234567890"
              className="inline-block px-8 py-4 bg-white text-green-600 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
```

---

## 🎨 Кастомный Markdoc Renderer

### ⚠️ КРИТИЧНО: Не используй стандартный `DocumentRenderer`!

**Проблема:** `DocumentRenderer` из `@keystatic/core/renderer` НЕ РАБОТАЕТ правильно - текст отображается plain text без форматирования.

**Решение:** Кастомный Server Component рендерер.

### `components/MarkdocRenderer.tsx`

```tsx
import React from 'react';

// Types for Markdoc node structure
interface MarkdocNode {
  type: string;
  attributes?: Record<string, any>;
  children?: MarkdocNode[];
  $$mdtype?: string;
  inline?: boolean;
}

// Recursive renderer for Markdoc nodes
export function MarkdocRenderer({ node }: { node: MarkdocNode }) {
  if (!node || !node.children) {
    return null;
  }

  return (
    <>
      {node.children.map((child, index) => {
        // ⚠️ ВАЖНО: Skip first H1 heading (we show title in page header)
        if (index === 0 && child.type === 'heading' && child.attributes?.level === 1) {
          return null;
        }
        return <RenderNode key={index} node={child} />;
      })}
    </>
  );
}

function RenderNode({ node }: { node: MarkdocNode }) {
  if (!node) return null;

  const { type, attributes = {}, children = [] } = node;

  switch (type) {
    case 'heading':
      const level = attributes.level || 1;
      const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      
      // Add explicit Tailwind classes
      const headingStyles: Record<number, string> = {
        1: 'text-4xl font-bold text-gray-900 mt-8 mb-6',
        2: 'text-3xl font-bold text-gray-900 mt-12 mb-6',
        3: 'text-2xl font-bold text-gray-900 mt-8 mb-4',
        4: 'text-xl font-bold text-gray-900 mt-6 mb-3',
        5: 'text-lg font-bold text-gray-900 mt-6 mb-3',
        6: 'text-base font-bold text-gray-900 mt-6 mb-3',
      };
      
      return React.createElement(
        HeadingTag,
        { className: headingStyles[level] || '' },
        children.map((child, i) => <RenderNode key={i} node={child} />)
      );

    case 'paragraph':
      return (
        <p className="text-gray-700 leading-relaxed mb-6">
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </p>
      );

    case 'list':
      const ListTag = attributes.ordered ? 'ol' : 'ul';
      const listClass = attributes.ordered 
        ? 'my-6 list-decimal pl-6'
        : 'my-6 list-disc pl-6';
      
      return React.createElement(
        ListTag,
        { className: listClass },
        children.map((child, i) => <RenderNode key={i} node={child} />)
      );

    case 'item':
      return (
        <li className="text-gray-700 mb-2">
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </li>
      );

    case 'strong':
      return (
        <strong className="text-gray-900 font-semibold">
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </strong>
      );

    case 'em':
      return (
        <em>
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </em>
      );

    case 'link':
      return (
        <a 
          href={attributes.href} 
          target={attributes.target} 
          rel={attributes.rel}
          className="text-green-600 hover:underline"
        >
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </a>
      );

    case 'code':
      return (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </code>
      );

    case 'inline':
      return (
        <>
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </>
      );

    case 'text':
      return <>{attributes.content || ''}</>;

    case 'hardbreak':
      return <br />;

    case 'hr':
      return <hr className="my-8 border-gray-300" />;

    case 'blockquote':
      return (
        <blockquote className="border-l-4 border-green-600 pl-6 italic text-gray-600 my-6">
          {children.map((child, i) => (
            <RenderNode key={i} node={child} />
          ))}
        </blockquote>
      );

    case 'image':
      return (
        <img
          src={attributes.src}
          alt={attributes.alt || ''}
          title={attributes.title}
          className="rounded-lg shadow-md my-6"
        />
      );

    default:
      console.warn(`Unknown Markdoc node type: ${type}`);
      if (children.length > 0) {
        return (
          <>
            {children.map((child, i) => (
              <RenderNode key={i} node={child} />
            ))}
          </>
        );
      }
      return null;
  }
}
```

### 🎯 Ключевые особенности:

1. ✅ **Server Component** (БЕЗ `'use client'`)
2. ✅ **Явные Tailwind классы** для каждого элемента
3. ✅ **Пропуск первого H1** (чтобы не дублировать заголовок)
4. ✅ **Поддержка всех Markdoc элементов** (heading, paragraph, list, strong, em, link, code, blockquote, image, hr)

---

## 📁 Структура файлов

```
your-project/
├── app/
│   ├── api/
│   │   └── keystatic/
│   │       └── [...params]/
│   │           └── route.ts         # API handler для Keystatic
│   ├── blog/
│   │   ├── page.tsx                 # Список статей
│   │   └── [slug]/
│   │       └── page.tsx             # Отдельная статья
│   └── keystatic/
│       └── [[...params]]/
│           ├── page.tsx             # Admin page wrapper
│           └── keystatic.tsx        # Admin UI (Client Component)
├── components/
│   └── MarkdocRenderer.tsx          # Кастомный рендерер
├── lib/
│   └── keystatic.ts                 # Reader utility
├── content/
│   └── posts/                       # Git-committed статьи
│       └── your-slug/
│           ├── index.yaml           # Metadata
│           └── content.mdoc         # Markdoc content
├── public/
│   └── images/
│       └── blog/                    # Изображения статей
├── keystatic.config.tsx             # Cloud config (admin)
├── keystatic.reader.config.tsx      # Local config (reader)
└── package.json
```

---

## 🚀 Деплой на Vercel

### 1️⃣ Настройка Keystatic Cloud

1. Зайди на https://keystatic.cloud
2. Создай проект (или подключи существующий Git репо)
3. Получи название проекта: `your-org/your-project`
4. Укажи его в `keystatic.config.tsx` → `cloud.project`

### 2️⃣ Environment Variables (НЕ НУЖНЫ!)

**ВАЖНО:** Для Keystatic Cloud mode НЕ НУЖНЫ environment variables!
- ❌ Не нужен `KEYSTATIC_GITHUB_CLIENT_ID`
- ❌ Не нужен `KEYSTATIC_GITHUB_CLIENT_SECRET`
- ❌ Не нужен `KEYSTATIC_SECRET`

Keystatic Cloud сам управляет авторизацией через свой OAuth.

### 3️⃣ Git Push → Auto Deploy

```bash
git add .
git commit -m "Add Keystatic CMS"
git push
```

Vercel автоматически:
1. Установит зависимости
2. Соберёт Next.js приложение
3. Задеплоит на продакшн

### 4️⃣ Проверка

- **Админка:** `https://your-site.vercel.app/keystatic`
- **Блог:** `https://your-site.vercel.app/blog`
- **Статья:** `https://your-site.vercel.app/blog/your-slug`

---

## 🔧 Troubleshooting

### Проблема: Статьи не появляются в списке

**Причина:** Next.js кеширует статическую генерацию.

**Решение:**
```tsx
// app/blog/page.tsx и app/blog/[slug]/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// В функции:
import { unstable_noStore as noStore } from 'next/cache';

export default async function Page() {
  noStore(); // Форсировать динамический рендеринг
  // ...
}
```

### Проблема: Текст без форматирования (plain text)

**Причина:** Стандартный `DocumentRenderer` не работает правильно.

**Решение:** Используй кастомный `MarkdocRenderer` (см. выше).

### Проблема: "Only plain objects can be passed to Client Components"

**Причина:** `MarkdocRenderer` был Client Component (`'use client'`).

**Решение:** Убери `'use client'` из `MarkdocRenderer.tsx` - это Server Component.

### Проблема: Дублируется заголовок H1

**Причина:** Markdoc контент содержит H1, и мы тоже показываем заголовок в page header.

**Решение:** В `MarkdocRenderer` пропускаем первый H1:
```tsx
{node.children.map((child, index) => {
  if (index === 0 && child.type === 'heading' && child.attributes?.level === 1) {
    return null; // Пропускаем первый H1
  }
  return <RenderNode key={index} node={child} />;
})}
```

### Проблема: Заголовки показывают slug вместо текста

**Причина:** Поле `title` в Keystatic - это slug, а не display title.

**Решение:** Добавь отдельное поле `displayTitle`:
```tsx
displayTitle: fields.text({
  label: 'Article Title (Display)',
  validation: { isRequired: true },
})
```

И используй fallback:
```tsx
const articleTitle = displayTitle || slugToTitle(slug);
```

---

## ✅ Финальный чеклист

- [ ] Установлены `@keystatic/core` и `@keystatic/next`
- [ ] Созданы **ДВА** конфига (`keystatic.config.tsx` и `keystatic.reader.config.tsx`)
- [ ] Cloud config использует `storage: { kind: 'cloud' }`
- [ ] Reader config использует `storage: { kind: 'local' }`
- [ ] Создан `app/api/keystatic/[...params]/route.ts`
- [ ] Создан `app/keystatic/[[...params]]/page.tsx` и `keystatic.tsx`
- [ ] Создан `lib/keystatic.ts` с `createReader()`
- [ ] Создан `components/MarkdocRenderer.tsx` (Server Component!)
- [ ] Создан `app/blog/page.tsx` с `dynamic = 'force-dynamic'`
- [ ] Создан `app/blog/[slug]/page.tsx` с `noStore()`
- [ ] Добавлено поле `displayTitle` в схему
- [ ] Keystatic Cloud настроен (`cloud.project`)
- [ ] Git репо подключён к Keystatic Cloud
- [ ] Vercel деплой работает

---

## 🎉 Результат

✅ **Админка на домене:** `your-site.com/keystatic`  
✅ **SEO специалист** может создавать статьи через UI  
✅ **Автокоммит:** Изменения автоматически попадают в Git  
✅ **Автодеплой:** Vercel автоматически деплоит при коммите  
✅ **Красивое форматирование:** Заголовки, списки, жирный текст  
✅ **Без дублирования:** Один заголовок, правильная структура  

---

**Рабочий коммит:** `98d9353`  
**Дата создания:** Январь 2026  
**Автор:** AI Assistant + Alex Pshenichnikov  

🚀 **READY FOR PRODUCTION!**
