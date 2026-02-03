# 🚀 Deployment Guide - Max Appliance Service Website

## Предварительные требования

1. **Аккаунт Vercel**: Зарегистрируйтесь на [vercel.com](https://vercel.com)
2. **Google reCAPTCHA v3**: Получите ключи на [google.com/recaptcha](https://www.google.com/recaptcha)
3. **n8n Webhook**: URL уже настроен (`https://webhook-processor-production-ae2b.up.railway.app`)

## 📋 Шаг 1: Настройка reCAPTCHA v3

1. Перейдите на https://www.google.com/recaptcha/admin
2. Создайте новый сайт:
   - **Label**: Max Appliance Service
   - **reCAPTCHA type**: v3
   - **Domains**: 
     - `maxapplianceservice.com`
     - `localhost` (для тестирования)
3. Сохраните:
   - **Site Key** (публичный ключ)
   - **Secret Key** (секретный ключ)

## 📋 Шаг 2: Деплой на Vercel

### Вариант A: Через Vercel Dashboard (рекомендуется)

1. **Загрузите проект на GitHub**:
   ```bash
   cd "C:\Cursor\My-Digital-Brain\Clients\Max Appliance\max-appliance-site"
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Подключите к Vercel**:
   - Перейдите на [vercel.com/new](https://vercel.com/new)
   - Выберите репозиторий
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Нажмите **Deploy**

### Вариант B: Через Vercel CLI

1. **Установите Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Логин**:
   ```bash
   vercel login
   ```

3. **Деплой**:
   ```bash
   cd "C:\Cursor\My-Digital-Brain\Clients\Max Appliance\max-appliance-site"
   vercel
   ```

4. **Production деплой**:
   ```bash
   vercel --prod
   ```

## 📋 Шаг 3: Настройка Environment Variables в Vercel

В Vercel Dashboard → Settings → Environment Variables добавьте:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Ваш Site Key из шага 1 | Production, Preview, Development |
| `RECAPTCHA_SECRET_KEY` | Ваш Secret Key из шага 1 | Production, Preview, Development |
| `N8N_WEBHOOK_URL` | `https://webhook-processor-production-ae2b.up.railway.app` | Production, Preview, Development |

**Важно**: После добавления переменных сделайте **Redeploy** проекта.

## 📋 Шаг 4: Настройка домена

1. В Vercel Dashboard → Settings → Domains
2. Добавьте домен: `maxapplianceservice.com`
3. Настройте DNS записи у регистратора:
   - **A Record**: `76.76.21.21` (Vercel IP)
   - **CNAME**: `cname.vercel-dns.com`
4. Дождитесь проверки (обычно 5-10 минут)

## 📋 Шаг 5: Тестирование

### Проверьте основные страницы:

- ✅ Homepage: `https://maxapplianceservice.com`
- ✅ Appliance page: `https://maxapplianceservice.com/refrigerator-repair`
- ✅ City page: `https://maxapplianceservice.com/hackensack/appliance-repair`
- ✅ City + Appliance: `https://maxapplianceservice.com/hackensack/refrigerator-repair`
- ✅ Brand page: `https://maxapplianceservice.com/refrigerator-repair/lg`

### Проверьте лид-форму:

1. Откройте любую страницу
2. Заполните форму
3. Отправьте
4. Проверьте:
   - ✅ Успешная отправка (зеленое сообщение)
   - ✅ Лид пришел в n8n webhook
   - ✅ Telegram уведомление (если настроено)

### Проверьте mobile:

1. Откройте сайт на телефоне
2. Проверьте:
   - ✅ Sticky панель внизу (Call + Book)
   - ✅ Кнопки работают
   - ✅ Форма открывается по клику на "Book"

## 📋 Шаг 6: SEO проверка

### Sitemap:
- Откройте: `https://maxapplianceservice.com/sitemap.xml`
- Убедитесь, что все страницы присутствуют

### Google Search Console:
1. Перейдите на [search.google.com/search-console](https://search.google.com/search-console)
2. Добавьте сайт
3. Отправьте sitemap: `https://maxapplianceservice.com/sitemap.xml`

### Lighthouse Audit:
1. Откройте Chrome DevTools (F12)
2. Вкладка **Lighthouse**
3. Запустите аудит
4. Цель: **90+ баллов** по всем метрикам

## 📋 Шаг 7: Google Ads интеграция

### Конверсия для лид-формы:

1. В Google Ads → Tools → Conversions
2. Создайте новую конверсию:
   - **Category**: Lead
   - **Value**: Use the same value for each conversion
   - **Count**: One
3. Получите **Conversion ID** и **Conversion Label**

### Добавьте GTM (Google Tag Manager):

1. Создайте контейнер в [tagmanager.google.com](https://tagmanager.google.com)
2. Добавьте код GTM в `app/layout.tsx` (в `<head>` и `<body>`)
3. Настройте тег Google Ads Conversion в GTM:
   - Trigger: Custom Event `lead_submitted`
   - Conversion ID и Label из шага выше

### Обновите API Route:

В `app/api/submit-lead/route.ts` добавьте отправку события в GTM:

```typescript
// После успешной отправки в n8n
if (typeof window !== 'undefined' && window.dataLayer) {
  window.dataLayer.push({
    event: 'lead_submitted',
    lead_data: {
      name: data.name,
      phone: data.phone,
      email: data.email,
    }
  });
}
```

## 🔧 Troubleshooting

### Проблема: reCAPTCHA не работает

**Решение**:
1. Проверьте, что Site Key правильный в Vercel Environment Variables
2. Проверьте, что домен добавлен в reCAPTCHA Admin Console
3. Проверьте консоль браузера на ошибки

### Проблема: Лиды не приходят в n8n

**Решение**:
1. Проверьте `N8N_WEBHOOK_URL` в Vercel Environment Variables
2. Проверьте, что webhook активен в n8n
3. Проверьте логи в Vercel: Functions → Logs

### Проблема: Страницы не генерируются

**Решение**:
1. Убедитесь, что `generateStaticParams` работает
2. Проверьте логи билда в Vercel
3. Попробуйте локально: `npm run build`

## 📊 Мониторинг

### Vercel Analytics:
- Включите в Vercel Dashboard → Analytics
- Отслеживайте Core Web Vitals

### Google Analytics (опционально):
1. Создайте GA4 property
2. Добавьте Measurement ID в GTM
3. Настройте события для лид-формы

## ✅ Финальный чеклист

- [ ] Сайт задеплоен на Vercel
- [ ] Домен настроен и работает
- [ ] Environment Variables добавлены
- [ ] reCAPTCHA работает
- [ ] Лид-форма отправляет данные
- [ ] n8n получает лиды
- [ ] Sticky mobile bar работает
- [ ] Все динамические страницы доступны
- [ ] Sitemap.xml генерируется
- [ ] Google Search Console настроен
- [ ] Lighthouse Score 90+
- [ ] Google Ads конверсии настроены (если нужно)

## 📞 Поддержка

Если возникли проблемы при деплое, свяжитесь с разработчиком.

---

**Дата создания**: 2 января 2026  
**Версия**: 1.0  
**Технология**: Next.js 14+ (App Router), Vercel






