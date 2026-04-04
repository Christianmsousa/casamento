# Como Usar Dynamic Routes

Quando o usuário pedir páginas dinâmicas baseadas em parâmetros, use Dynamic Routes `[slug]`.

## Aplicação:

1. **Crie pasta com colchetes** `[slug]` ou `[id]`
2. **Acesse o parâmetro** via `params` prop
3. **Use para páginas dinâmicas** (blog posts, produtos, etc.)

## Exemplo de aplicação:

```tsx
// app/content/[slug]/page.tsx
interface PageProps {
  params: { slug: string }
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = params
  
  // Buscar conteúdo baseado no slug
  const content = await getContentBySlug(slug)
  
  if (!content) {
    notFound()
  }
  
  return (
    <article>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
    </article>
  )
}
```

```tsx
// app/posts/[id]/page.tsx
interface PostProps {
  params: { id: string }
}

export default async function PostPage({ params }: PostProps) {
  const { id } = params
  const post = await getPost(id)
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
```

## Quando usar:

- Páginas dinâmicas baseadas em parâmetro
- Blog posts, produtos, conteúdo dinâmico
- Qualquer rota que precisa de um identificador

## Importante:

- Parâmetros são sempre strings
- Use `await params` no Next.js 15+
- Use `notFound()` para páginas não encontradas



