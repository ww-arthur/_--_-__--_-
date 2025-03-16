// 🔹 Mapeia chaves de um objeto para strings, garantindo flexibilidade.
interface KeyMap {
  [key: string]: string;
}

// 🔹 Modelo base para objetos genéricos.
interface ObjectModel {
  [key: string]: any;
}

// 🔹 Estrutura para colunas de exibição (tabelas, layouts responsivos, grids).
interface ColumnConfig {
  title: string;
  key: string;
  justify?: string;
  align?: string;
  customClass?: string;
  cols?: number | string;
  lg?: number | string;
}

// 🔹 Extensão de HTML2PDF para exportação de documentos.
declare module 'html2pdf.js';

// 🔹 Definição de papéis no sistema.
type UserRoles = 'client' | 'clientadmin' | 'admin' | 'superadmin' | '';

// 🔹 Definição de classes de tensão elétrica.
type VoltageCategory = 'High Voltage' | 'Low Voltage' | '' | undefined;

// 🔹 Base para diferentes tipos de visualizações dentro do sistema.
interface BaseView {
  type: 'ext' | 'svg' | 'any' | 'finalize';
}

// 🔹 Visualizações que incluem identificadores (imagens e URLs).
interface IdView extends BaseView {
  type: 'imgs' | 'url';
  id: string;
}

// 🔹 Tipo unificado para qualquer tipo de visualização.
type ViewType = BaseView | IdView;

// 🔹 Modelo atualizado para guias interativos (antes TourItem).
interface GuideStep {
  id: string;
  type: 'modal' | 'drawer' | 'form' | '';
  view: ViewType;
  title: string;
  progressTitle: string;
  description: string;
  nextText: string;
  image?: string;
  role?: UserRoles;
  optionIds?: string[];
  selectedOptionId?: string;
  finalizeFields?: string[];
  skipped: boolean;
  order: number;
}

// 🔹 Estrutura para um novo passo no guia (opcional, permitindo valores indefinidos).
interface NewGuideStep extends GuideStep {
  id?: string;
  skipped?: boolean;
  order?: number;
}
type Roles = 'client' | 'clientadmin' | 'admin' | 'superadmin' | 'designerAdmin' | ''

// 🔹 Estrutura de um grupo de opções com base nas opções brutas.
interface OptionGroup extends RawOptionGroup {
  options: Option[];
}

// 🔹 Estrutura de uma opção dentro de um grupo.
interface Option extends RawOption {
  options?: Option[];
  mutex?: string[];
  optionIds?: string;
  childOptionIds?: string[];
  hide?: string[];
  show?: string[];
  replace?: string[];
  select?: string[];
  group?: {
    id: string;
    optionIds: string[];
  };
  parentCheckmark?: boolean;
  typeCode?: string;
  loose?: boolean;
  warning?: string;
}

// 🔹 Estrutura para listagem de itens (hierarquia de opções e configurações).
interface ItemHierarchy {
  [key: string]: any;
  displayName?: string;
  id?: string;
  type?: string;
  tag?: string;
  optionIds?: string;
  childOptionIds?: string;
  items?: ItemHierarchy[];
  mutex?: string[];
}

// 🔹 Estrutura para manipulação de itens dentro da hierarquia.
interface HierarchyItem {
  displayName?: string;
  id?: string;
  type?: string;
  tag: string;
  optionIds?: string;
  childOptionIds?: string;
  items: Array<ItemHierarchy>;
}
