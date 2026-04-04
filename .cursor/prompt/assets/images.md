# Como Usar next/image

Quando o usuário pedir para adicionar imagens, SEMPRE use `next/image` do Next.js.

## Aplicação:

1. **Coloque imagens em `public/images/`**
2. **Use `next/image`** ao invés de `<img>`
3. **Sempre defina `width` e `height`** ou use `fill`
4. **Use `alt`** para acessibilidade

## Exemplo de aplicação:

```tsx
import Image from 'next/image'

// Imagem com dimensões fixas
export const Photo = () => {
  return (
    <Image
      src="/images/casamento/foto.jpg"
      alt="Foto do casamento"
      width={800}
      height={600}
    />
  )
}
```

```tsx
// Imagem responsiva com fill
export const HeroImage = () => {
  return (
    <div className="relative w-full h-96">
      <Image
        src="/images/casamento/hero.jpg"
        alt="Hero image"
        fill
        className="object-cover"
      />
    </div>
  )
}
```

```tsx
// Imagem com otimização
export const OptimizedImage = () => {
  return (
    <Image
      src="/images/casamento/foto.jpg"
      alt="Foto"
      width={800}
      height={600}
      priority // Para imagens acima da dobra
      placeholder="blur" // Com blur data URL
    />
  )
}
```

## Quando usar:

- **TODAS** as imagens do projeto
- Imagens que precisam de otimização automática
- Imagens que precisam de lazy loading
- Imagens responsivas

## Importante:

- **NUNCA** use `<img>` tag
- **SEMPRE** use `next/image`
- **SEMPRE** defina `alt` para acessibilidade
- Coloque imagens em `public/images/`



