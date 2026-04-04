# Quando Usar CSS Media Queries

Use CSS Media Queries apenas quando Tailwind breakpoints não cobrirem casos complexos.

## Aplicação:

```css
/* components/ComplexLayout.module.css */
@media (min-width: 768px) and (max-width: 1024px) {
  .container {
    /* Lógica complexa que Tailwind não cobre */
  }
}
```

Use apenas quando realmente necessário.



