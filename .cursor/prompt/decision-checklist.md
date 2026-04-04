# Checklist de Decisão Rápida

Quando o usuário pedir para criar algo, use este checklist:

1. **Componente UI reutilizável?** → `components/ui/`
   - Tem variantes? → Use `cva`
2. **Específico de markdown?** → `components/markdown/` ou `lib/markdown/`
3. **Função utilitária pura?** → `lib/utils/`
4. **Hook customizado?** → `lib/hooks/`
5. **Type compartilhado?** → `lib/types/`
6. **Estado global?** → Context API ou Zustand
7. **Nova página?** → `app/[rota]/page.tsx`
8. **Layout diferente?** → Route Groups `(nome)/`

Siga este fluxo sempre.

