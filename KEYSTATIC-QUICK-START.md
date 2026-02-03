# ⚡ Keystatic CMS - Quick Start (Шпаргалка)

> **Рабочий коммит:** `98d9353` (Max Appliance Service)

---

## 📦 1. Установка

```bash
npm install @keystatic/core @keystatic/next
```

---

## 📁 2. Создай файлы (копируй из max-appliance-site)

```
✅ keystatic.config.tsx              # Cloud mode (admin)
✅ keystatic.reader.config.tsx       # Local mode (reader)
✅ app/api/keystatic/[...params]/route.ts
✅ app/keystatic/[[...params]]/page.tsx
✅ app/keystatic/[[...params]]/keystatic.tsx
✅ lib/keystatic.ts
✅ components/MarkdocRenderer.tsx
✅ app/blog/page.tsx
✅ app/blog/[slug]/page.tsx
```

---

## ⚙️ 3. Настрой Keystatic Cloud

1. Зайди на https://keystatic.cloud
2. Создай проект или подключи Git репо
3. Получи название: `your-org/your-project`
4. Укажи в `keystatic.config.tsx`:

```tsx
cloud: {
  project: 'your-org/your-project', // ⬅️ МЕНЯЙ ЭТО!
}
```

---

## 🔑 4. Ключевые моменты (КРИТИЧНО!)

### ✅ ДВА отдельных конфига!
- `keystatic.config.tsx` → `kind: 'cloud'` (админка)
- `keystatic.reader.config.tsx` → `kind: 'local'` (чтение)

### ✅ Поле `displayTitle` для заголовков!
```tsx
displayTitle: fields.text({
  label: 'Article Title (Display)',
  validation: { isRequired: true },
})
```

### ✅ Кастомный `MarkdocRenderer` (НЕ `DocumentRenderer`!)
- Server Component (БЕЗ `'use client'`)
- Явные Tailwind классы
- Пропускает первый H1

### ✅ Force Dynamic в Next.js
```tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { unstable_noStore as noStore } from 'next/cache';
noStore(); // В начале функции
```

---

## 🚀 5. Деплой

```bash
git add .
git commit -m "Add Keystatic CMS"
git push
```

Vercel автоматически задеплоит!

---

## 🎯 6. Проверь

- ✅ `/keystatic` - админка работает
- ✅ `/blog` - список статей
- ✅ `/blog/your-slug` - статья открывается
- ✅ Форматирование текста (заголовки, списки, bold)
- ✅ Один заголовок (не два)

---

## 🔧 7. Troubleshooting

| Проблема | Решение |
|----------|---------|
| Статьи не появляются | Добавь `dynamic = 'force-dynamic'` и `noStore()` |
| Текст plain text | Используй кастомный `MarkdocRenderer` |
| Два заголовка | Пропускай первый H1 в `MarkdocRenderer` |
| Slug вместо заголовка | Добавь поле `displayTitle` + fallback `slugToTitle` |
| "Only plain objects..." | Убери `'use client'` из `MarkdocRenderer` |

---

## 📚 Полная документация

См. `KEYSTATIC-SETUP-GUIDE.md` для подробностей.

---

**✅ READY TO GO!** 🚀
