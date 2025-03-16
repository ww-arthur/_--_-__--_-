interface FsPlan {
  id?: string
  active: Boolean
  displayName: string
  builderId: string
  communityId: string
  tag: string
  planSvg?: string
  version: string
  // approved | in-production | pending-approval| under-revision | revision-pending-approval | archived
  status: '' | 'approved' | 'in-production' | 'pending-approval' | 'under-revision' | 'revision-pending-approval' | 'archived'
  garageSide: string
  squareFootage: number
  scale: {
    component: string
    furniture: string
  }
  print: {
    scale: number
    rotation: number
  }
  pricing: {
    visible: boolean
    basePrice: number
    groupByRoom: boolean | null
  }
  admin: {
    exportOrder: boolean
    id: string
  }
  tourSteps?: FsTourItem[]
  rooms: KeyMap
  views?: FsPlanView[]
  notes: FsNoteCommon[]
  logic: FsPlanLogic[]
  src?: string
}
type FsPlanViewType = 'gallery' | 'floor-plan' | 'iframe' | 'design' | ''
interface FsPlanView {
  id?: string
  floor?: number
  displayName: string
  type: FsPlanViewType
  url?: string
  categories?: string[]
  diagrams?: string[]
  file?: File | null
  options: FsPlanOption[]
  pointsOfInterest?: FsPlanOptionPoi[]
  order: number
}
interface FsNoteCommon {
  id?: string
  userId: string
  date: string
  title: string
  description: string
}
type FsOptionTypes = 'svg' | 'group' | 'img' | 'poi'

interface FsPlanOptionCommon {
  id: number
  displayName: string
  type: FsOptionTypes
  settings: {
    visible: boolean
    locked: boolean
    default: boolean
    export: boolean
  }
  warning?: string
  depth?: number
}
interface PlanOptionCommon extends FsPlanOptionCommon {
  logic: {
    hide?: number[]
    show?: number[]
    replace?: number[]
    group?: {
      id: number
      optionIds: number[]
    }
    unselect?: number[]
  }

  viewId: string
}
interface FsPlanOptionSvg extends FsPlanOptionCommon {
  type: 'svg'
  svgId: string
  roomId: string
  linkedToProduct: boolean
  warning?: string
  hint?: string
  squareFootage?: number
  price: {
    total: number
    hv: number
    lv: number
  }
  admin?: {
    panelUpgradeAmps: number
    loadAmps: number
    voltageClass: VoltageClasses
    productId: string
    pairedProductName?: string
    renderingId?: string
    price: number
    ncCount: number
    builderPartNumber?: string
    description?: string
    kitComponents?: KitComponent[]
  }
}
interface FsPlanOptionGroup extends FsPlanOptionCommon {
  type: 'group'
  displayName: string
  options: FsPlanOption[]
  checkmark?: boolean
}

interface FsPlanOptionImg extends FsPlanOptionCommon {
  type: 'img'
  src: string
  optionId: number | null
  color?: string
  image?: File
  variants?: FsPlanOptionImg[]
  variantId?: number | null
}
interface FsPlanOptionPoi extends FsPlanOptionCommon {
  type: 'poi'
  svgId: string
  poiType: 'link' | 'img' | 'iframe'
  icon: FsPlanOptionPoiIcon
  src?: string
  image?: File | null
}

type FsPlanOptionPoiIcon = 'camera' | 'rotate3d' | 'info' | 'matterport' | 'video'
type PlanOptionSvg = PlanOptionCommon & FsPlanOptionSvg

interface PlanOptionGroup extends FsPlanOptionGroup, PlanOptionCommon {
  options: PlanOption[]
}
type PlanOptionImg = PlanOptionCommon & FsPlanOptionImg
type PlanOptionPoi = PlanOptionCommon & FsPlanOptionPoi

type FsPlanOption = FsPlanOptionSvg | FsPlanOptionGroup | FsPlanOptionImg | FsPlanOptionPoi

type PlanOption = PlanOptionSvg | PlanOptionGroup | PlanOptionImg | PlanOptionPoi

type FsLogicTypes = 'mutual-exclusion' | 'group-selection' | 'hide' | 'show' | 'replace'
type TriggerTypes = 'all' | 'any'
interface FsPlanLogicCommon {
  id: number
  type: FsLogicTypes
  triggerOptionIds: number[]
  triggerType: TriggerTypes
}
interface FsPlanLogicMutualExclusion extends FsPlanLogicCommon {
  type: 'mutual-exclusion'
}
interface FsPlanLogicGroupSelection extends FsPlanLogicCommon {
  type: 'group-selection'
}
interface FsPlanLogicHide extends FsPlanLogicCommon {
  type: 'hide'
  targetOptionIds: number[]
}
interface FsPlanLogicShow extends FsPlanLogicCommon {
  type: 'show'
  targetOptionIds: number[]
}
interface FsPlanLogicReplace extends FsPlanLogicCommon {
  type: 'replace'
  replaceOptionIds: number[]
}

type FsPlanLogic = FsPlanLogicMutualExclusion | FsPlanLogicGroupSelection | FsPlanLogicHide | FsPlanLogicShow | FsPlanLogicReplace

interface FinalizeData {
  id?: string;
  Source?: string;
  email: string;
  firstName: string;
  lastName: string;
  secondaryOwner?: boolean;
  secondaryFirstName: string;
  secondaryLastName: string;
  planName: string;
  planFlippedH: number;
  planFlippedV: number;
  planOptions: RawPlanOption[];
  planDrops: any[];
  planURLBasePath: string;
  lotNumber: string;
  adminPlanId: string;
  garageOrientation: 'left' | 'right';
  designerId: string;
  elevationId: string;
  streetAddress: string;
  state: string;
  city: string;
  zipCode: string;
  phone: string;
  alternatePhone: string;
  alternateEmail: string;
  builderSalesName: string;
  builderEmail: string;
  planSVGs?: ObjectModel;
  planLegendFile?: string;
  newCircuit?: ParsedComponentOption | null
}
