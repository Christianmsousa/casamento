/**
 * Paleta de cores do tema do casamento
 * 
 * Para alterar as cores do site, modifique apenas este arquivo.
 * As cores serão aplicadas automaticamente em todos os componentes.
 */

export const colors = {
  // Terracota (cores principais)
  terracota: {
    primary: '#D15F42',      // Cor principal da landing page
    secondary: '#95380E',     // Cor de apoio
    light: '#E88872',         // Terracota claro
  },
  
  // Verde (folhas e ramos)
  green: {
    primary: '#7C9A5B',       // Verde principal (folhas e ramos)
    secondary: '#8FA86A',    // Verde secundário (folhas sobrepostas)
  },
  
  // Amarelo (centro das flores)
  yellow: {
    primary: '#FFE2A9',       // Amarelo principal (centro externo)
    secondary: '#FFDA88',      // Amarelo secundário (centro interno)
  },
} as const

// Exporta as cores individuais para facilitar o uso
export const {
  terracota,
  green,
  yellow,
} = colors

