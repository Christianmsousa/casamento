import { IconName } from '../icons'

export interface SideBarHeaderProps {
  storeName: string
  storeIcon?: IconName
  /** Quando definido, mostra esta imagem no cabeçalho em vez do ícone em caixa terracota. */
  logoSrc?: string
}

export interface SideBarSubOption {
  name: string
  route: string
}

export interface SideBarItemProps {
  icon: IconName
  text: string
  route?: string
  options?: SideBarSubOption[][]
  onClick?: () => void
}

export interface SideBarProps {
  header: SideBarHeaderProps
  content: SideBarItemProps[]
  bottom: SideBarItemProps[]
}

export interface SideBarSubItemsProps {
  text: string
  route: string
}
