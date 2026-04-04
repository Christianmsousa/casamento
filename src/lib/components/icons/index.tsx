import React from 'react'

// Ícones do projeto casamento
import { ChevronDownIcon } from './ChevronDownIcon'
import { LocationIcon } from './LocationIcon'
import { QuestionMarkIcon } from './QuestionMarkIcon'
import { RingIcon } from './RingIcon'
import { PlusIcon } from './plus-icon'
import { HeartIcon } from './HeartIcon'
import { CheckCircleIcon } from './CheckCircleIcon'
import { DashboardIcon } from './DashboardIcon'
import { PlanningIcon } from './PlanningIcon'
import { UsersIcon } from './UsersIcon'
import { ChecklistIcon } from './ChecklistIcon'
import { SettingsIcon } from './SettingsIcon'
import { HeartOutlineIcon } from './HeartOutlineIcon'
import { ArrowRightIcon } from './ArrowRightIcon'
import { CoupleFrameIcon } from './CoupleFrameIcon'
import { GiftIcon } from './GiftIcon'
import { NavHomeIcon } from './NavHomeIcon'

// Ícones adicionais do outro projeto
import AnalytiqueIcon from './AnalytiqueIcon'
import ArrowLeftIcon from './ArrowLeftIcon'
import BoxIcon from './BoxIcon'
import CheckboxOffIcon from './CheckboxOff'
import CheckboxOnIcon from './CheckboxOn'
import { DocumentIcon } from './DocumentIcon'
import EmailIcon from './EmailIcon'
import GroupIcon from './GroupIcon'
import HelpIcon from './HelpIcon'
import HouseIcon from './HouseIcon'
import InfoIcon from './InfoIcon'
import LockIcon from './LockIcon'
import LogoutIcon from './LogoutIcon'
import MoneyIcon from './MoneyIcon'
import StepCheckSelectedIcon from './StepCheckSelectedIcon'
import StepCheckSuccessIcon from './StepCheckSuccessIcon'
import StoreIcon from './StoreIcon'
import UserSquaredIcon from './UserSquareIcon'
import WalletIcon from './WalletIcon'
import ShopIcon from './ShopIcon'
import MallIcon from './MallIcon'
import BoutiqueIcon from './BoutiqueIcon'
import WarehouseIcon from './WarehouseIcon'
import MarketIcon from './MarketIcon'
import HandshakeIcon from './HandshakeIcon'
import AddCircleIcon from './AddCircleIcon'
import { AscIcon } from './asc-icon'
import { DescIcon } from './desc-icon'
import { NoResultsIcon } from './no-results-icon'
import { ActionIcon } from './action-icon'
import { SearchIcon } from './search-icon'
import { CustomizeIcon } from './customize-icon'
import { CalendarIcon } from './calendar-icon'
import { CloseIcon } from './close-icon'
import { DragHandleIcon } from './drag-handle-icon'
import { ChevronRightIcon } from './chevron-right-icon'
import PhoneIcon from './PhoneIcon'
import { DragIcon } from './drag-icon'
import { EditIcon } from './EditIcon'
import { RoleIcon } from './RoleIcon'
import { TrashIcon } from './TrashIcon'
import { UploadIcon } from './UploadIcon'
import { DownloadIcon } from './DownloadIcon'
import ClockIcon from './ClockIcon'
import { MenuIcon } from './MenuIcon'
import CopyIcon from './CopyIcon'
import FilterIcon from './FilterIcon'
import ShieldIcon from './ShieldIcon'
import PackageBoxIcon from './PackageBoxIcon'
import MeasurementIcon from './MeasurementIcon'
import { BrandIcon } from './BrandIcon'
import { CategoryIcon } from './CategoryIcon'
import { ExternalLinkIcon } from './ExternalLinkIcon'
import CatalogIcon from './CatalogIcon'
import AddressIcon from './AddressIcon'
import CartIcon from './CartIcon'
import ShareIcon from './ShareIcon'
import StockMovementIcon from './StockMovementIcon'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  height?: string
  width?: string
  className?: string
  strokeColor?: string
  fillColor?: string
}

export type IconName =
  | 'chevron-down'
  | 'location'
  | 'question-mark'
  | 'ring'
  | 'plus'
  | 'heart'
  | 'check-circle'
  | 'dashboard'
  | 'planning'
  | 'users'
  | 'checklist'
  | 'settings'
  | 'heart-outline'
  | 'arrow-right'
  | 'couple-frame'
  | 'gift'
  | 'nav-home'
  | 'box'
  | 'house'
  | 'money'
  | 'analytique'
  | 'wallet'
  | 'help'
  | 'logout'
  | 'arrow-left'
  | 'group'
  | 'phone'
  | 'lock'
  | 'user-square'
  | 'store'
  | 'shop'
  | 'mall'
  | 'boutique'
  | 'warehouse'
  | 'market'
  | 'info'
  | 'step-check-selected'
  | 'step-check-success'
  | 'email'
  | 'asc'
  | 'desc'
  | 'no-results'
  | 'action'
  | 'close'
  | 'drag'
  | 'chevron-right'
  | 'edit'
  | 'role'
  | 'trash'
  | 'upload'
  | 'download'
  | 'clock'
  | 'copy'
  | 'filter'
  | 'package-box'
  | 'measurement'
  | 'brand'
  | 'category'
  | 'external-link'
  | 'catalog'
  | 'document'
  | 'address'
  | 'cart'
  | 'calendar'
  | 'share'
  | 'handshake'
  | 'stock-movement'
  | 'checkbox-off'
  | 'checkbox-on'
  | 'drag-handle'
  | 'customize'
  | 'search'
  | 'add-circle'
  | 'shield'
  | 'menu'

export const Icon = {
  // Ícones do projeto casamento
  ChevronDown: ChevronDownIcon,
  Location: LocationIcon,
  QuestionMark: QuestionMarkIcon,
  Ring: RingIcon,
  Plus: PlusIcon,
  Heart: HeartIcon,
  CheckCircle: CheckCircleIcon,
  Dashboard: DashboardIcon,
  Planning: PlanningIcon,
  Users: UsersIcon,
  Checklist: ChecklistIcon,
  Settings: SettingsIcon,
  HeartOutline: HeartOutlineIcon,
  ArrowRight: ArrowRightIcon,
  CoupleFrame: CoupleFrameIcon,
  Gift: GiftIcon,
  NavHome: NavHomeIcon,
  // Ícones adicionais
  Store: StoreIcon,
  Shop: ShopIcon,
  Mall: MallIcon,
  Boutique: BoutiqueIcon,
  Warehouse: WarehouseIcon,
  Market: MarketIcon,
  CheckboxOff: CheckboxOffIcon,
  CheckboxOn: CheckboxOnIcon,
  ArrowLeft: ArrowLeftIcon,
  Info: InfoIcon,
  Action: ActionIcon,
  Email: EmailIcon,
  Box: BoxIcon,
  House: HouseIcon,
  Money: MoneyIcon,
  Analytique: AnalytiqueIcon,
  Wallet: WalletIcon,
  Help: HelpIcon,
  Logout: LogoutIcon,
  Group: GroupIcon,
  Lock: LockIcon,
  UserSquare: UserSquaredIcon,
  Asc: AscIcon,
  Desc: DescIcon,
  Search: SearchIcon,
  StepCheckSelected: StepCheckSelectedIcon,
  StepCheckSuccess: StepCheckSuccessIcon,
  Calendar: CalendarIcon,
  Close: CloseIcon,
  DragHandle: DragHandleIcon,
  Customize: CustomizeIcon,
  NoResults: NoResultsIcon,
  ChevronRight: ChevronRightIcon,
  Phone: PhoneIcon,
  AddCircle: AddCircleIcon,
  Drag: DragIcon,
  Edit: EditIcon,
  Role: RoleIcon,
  Trash: TrashIcon,
  Upload: UploadIcon,
  Download: DownloadIcon,
  Clock: ClockIcon,
  Copy: CopyIcon,
  Filter: FilterIcon,
  Shield: ShieldIcon,
  Menu: MenuIcon,
  PackageBox: PackageBoxIcon,
  Measurement: MeasurementIcon,
  Brand: BrandIcon,
  Category: CategoryIcon,
  ExternalLink: ExternalLinkIcon,
  Catalog: CatalogIcon,
  Document: DocumentIcon,
  Address: AddressIcon,
  Cart: CartIcon,
  Share: ShareIcon,
  Handshake: HandshakeIcon,
  Representative: HandshakeIcon,
  StockMovement: StockMovementIcon,
}

// Função utilitária para renderizar ícones dinamicamente (centralizada)
export const renderIcon = (
  iconName: IconName | undefined,
  props: { width: string; height: string; className: string },
  fallback: keyof typeof Icon = 'Info',
) => {
  if (!iconName) {
    const FallbackComponent = Icon[fallback]
    return <FallbackComponent {...props} />
  }

  // Mapeia os nomes dos ícones para as chaves corretas do objeto Icon
  const iconMap: Record<string, keyof typeof Icon> = {
    'chevron-down': 'ChevronDown',
    location: 'Location',
    'question-mark': 'QuestionMark',
    ring: 'Ring',
    plus: 'Plus',
    heart: 'Heart',
    'check-circle': 'CheckCircle',
    dashboard: 'Dashboard',
    planning: 'Planning',
    users: 'Users',
    checklist: 'Checklist',
    settings: 'Settings',
    'heart-outline': 'HeartOutline',
    'arrow-right': 'ArrowRight',
    'couple-frame': 'CoupleFrame',
    gift: 'Gift',
    'nav-home': 'NavHome',
    info: 'Info',
    help: 'Help',
    store: 'Store',
    shop: 'Shop',
    cart: 'Cart',
    mall: 'Mall',
    boutique: 'Boutique',
    warehouse: 'Warehouse',
    market: 'Market',
    house: 'House',
    box: 'Box',
    wallet: 'Wallet',
    money: 'Money',
    analytique: 'Analytique',
    logout: 'Logout',
    group: 'Group',
    lock: 'Lock',
    'user-square': 'UserSquare',
    'arrow-left': 'ArrowLeft',
    email: 'Email',
    phone: 'Phone',
    catalog: 'Catalog',
    'checkbox-off': 'CheckboxOff',
    'checkbox-on': 'CheckboxOn',
    asc: 'Asc',
    desc: 'Desc',
    'no-results': 'NoResults',
    action: 'Action',
    close: 'Close',
    drag: 'Drag',
    'chevron-right': 'ChevronRight',
    edit: 'Edit',
    role: 'Role',
    trash: 'Trash',
    upload: 'Upload',
    download: 'Download',
    clock: 'Clock',
    copy: 'Copy',
    filter: 'Filter',
    'package-box': 'PackageBox',
    measurement: 'Measurement',
    brand: 'Brand',
    category: 'Category',
    'external-link': 'ExternalLink',
    document: 'Document',
    address: 'Address',
    'step-check-selected': 'StepCheckSelected',
    'step-check-success': 'StepCheckSuccess',
    calendar: 'Calendar',
    'drag-handle': 'DragHandle',
    customize: 'Customize',
    search: 'Search',
    'add-circle': 'AddCircle',
    shield: 'Shield',
    menu: 'Menu',
    handshake: 'Handshake',
    'stock-movement': 'StockMovement',
  }

  const iconKey = iconMap[iconName] || fallback
  const IconComponent = Icon[iconKey]

  return <IconComponent {...props} />
}
