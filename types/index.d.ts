import * as React from 'react'
import { IconProps } from '@material-ui/core/Icon'
import SvgIcon from '@material-ui/core/SvgIcon'

type SvgIconComponent = typeof SvgIcon

export interface MaterialTableProps<RowData extends Record<string, unknown>> {
  actions?: (Action<RowData> | ((rowData: RowData) => Action<RowData>))[]
  cellEditable?: {
    cellStyle?: React.CSSProperties
    onCellEditApproved: (
      newValue: any,
      oldValue: any,
      rowData: RowData,
      columnDef: Column<RowData>
    ) => Promise<void>
  }
  columns: Column<RowData>[]
  components?: Components
  data: RowData[] | ((query: Query<RowData>) => Promise<QueryResult<RowData>>)
  detailPanel?:
    | ((rowData: RowData) => React.ReactNode)
    | (DetailPanel<RowData> | ((rowData: RowData) => DetailPanel<RowData>))[]
  editable?: {
    isEditable?: (rowData: RowData) => boolean
    isDeletable?: (rowData: RowData) => boolean
    onBulkUpdate?: (
      changes: Record<number, { oldData: RowData; newData: RowData }>
    ) => Promise<any>
    onRowAdd?: (newData: RowData) => Promise<any>
    onRowUpdate?: (newData: RowData, oldData?: RowData) => Promise<any>
    onRowDelete?: (oldData: RowData) => Promise<any>
    editTooltip?: (rowData: RowData) => string
    deleteTooltip?: (rowData: RowData) => string
    onRowAddCancelled?: (rowData: RowData) => void
    onRowUpdateCancelled?: (rowData: RowData) => void
    isEditHidden?: (rowData: RowData) => boolean
    isDeleteHidden?: (rowData: RowData) => boolean
  }
  icons?: Icons
  initialFormData?: Record<string, unknown>
  isLoading?: boolean
  title?: string | React.ReactElement<any>
  options?: Options<RowData>
  parentChildData?: (row: RowData, rows: RowData[]) => RowData | undefined
  localization?: Localization
  onChangeRowsPerPage?: (pageSize: number) => void
  onChangePage?: (page: number, pageSize: number) => void
  onChangeColumnHidden?: (column: Column<RowData>, hidden: boolean) => void
  onColumnDragged?: (sourceIndex: number, destinationIndex: number) => void
  onOrderChange?: (orderBy: number, orderDirection: 'asc' | 'desc') => void
  onGroupRemoved?: (column: Column<RowData>, index: boolean) => void
  onRowClick?: (
    event?: React.MouseEvent,
    rowData?: RowData,
    toggleDetailPanel?: (panelIndex?: number) => void
  ) => void
  onRowSelected?: (rowData: RowData) => void
  onSearchChange?: (searchText: string) => void
  /** An event fired when the table has finished filtering data
   * @param {Filter<RowData>[]} filters All the filters that are applied to the table
   */
  onFilterChange?: (filters: Filter<RowData>[]) => void
  onSelectionChange?: (data: RowData[], rowData?: RowData) => void
  onTreeExpandChange?: (data: any, isExpanded: boolean) => void
  onQueryChange?: (query: Query<RowData>) => void
  style?: React.CSSProperties
  tableRef?: any
  page?: number
  totalCount?: number
}

export interface Filter<RowData extends Record<string, unknown>> {
  column: Column<RowData>
  operator: '='
  value: any
}
export interface ErrorState {
  message: string
  errorCause: 'query' | 'add' | 'update' | 'delete'
}

export interface Query<RowData extends Record<string, unknown>> {
  filters: Filter<RowData>[]
  page: number
  pageSize: number
  totalCount: number
  search: string
  orderBy: Column<RowData>
  orderDirection: 'asc' | 'desc'
  error?: ErrorState
}

export interface QueryResult<RowData extends Record<string, unknown>> {
  data: RowData[]
  page: number
  totalCount: number
}

export interface DetailPanel<RowData extends Record<string, unknown>> {
  disabled?: boolean
  icon?: string | React.ComponentType<any>
  openIcon?: string | React.ComponentType<any>
  tooltip?: string
  render: (rowData: RowData) => string | React.ReactNode
}

export interface Action<RowData extends Record<string, unknown>> {
  disabled?: boolean
  icon: string | (() => React.ReactElement<any>) | SvgIconComponent
  isFreeAction?: boolean
  position?: 'auto' | 'toolbar' | 'toolbarOnSelect' | 'row'
  tooltip?: string
  onClick: (event: any, data: RowData | RowData[]) => void
  iconProps?: IconProps
  hidden?: boolean
}

export interface Options<RowData extends Record<string, unknown>> {
  actionsCellStyle?: React.CSSProperties
  detailPanelColumnStyle?: React.CSSProperties
  editCellStyle?: React.CSSProperties
  actionsColumnIndex?: number
  addRowPosition?: 'first' | 'last'
  columnsButton?: boolean
  defaultExpanded?: boolean | ((rowData: any) => boolean)
  debounceInterval?: number
  detailPanelType?: 'single' | 'multiple'
  doubleHorizontalScroll?: boolean
  draggable?: boolean
  emptyRowsWhenPaging?: boolean
  exportAllData?: boolean
  exportButton?: boolean
  exportDelimiter?: string
  exportFileName?:
    | string
    | ((columns: Column<RowData>, data: string[][]) => string)
  exportCsv?: (columns: any[], renderData: any[]) => void
  filtering?: boolean
  filterCellStyle?: React.CSSProperties
  filterRowStyle?: React.CSSProperties
  fixedColumns?: { left?: number; right?: number }
  groupRowSeparator?: string
  header?: boolean
  headerSelectionProps?: Record<string, unknown>
  headerStyle?: React.CSSProperties
  hideFilterIcons?: boolean
  initialPage?: number
  loadingType?: 'overlay' | 'linear'
  maxBodyHeight?: number | string
  minBodyHeight?: number | string
  padding?: 'default' | 'dense'
  paging?: boolean
  grouping?: boolean
  groupTitle?: (groupData: any) => any
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'initial' | 'inherit'
  pageSize?: number
  pageSizeOptions?: number[]
  paginationType?: 'normal' | 'stepped'
  paginationPosition?: 'bottom' | 'top' | 'both'
  rowStyle?:
    | React.CSSProperties
    | ((data: any, index: number, level: number) => React.CSSProperties)
  showEmptyDataSourceMessage?: boolean
  showFirstLastPageButtons?: boolean
  showSelectAllCheckbox?: boolean
  showTitle?: boolean
  showTextRowsSelected?: boolean
  search?: boolean
  searchText?: string
  searchFieldAlignment?: 'left' | 'right'
  searchFieldStyle?: React.CSSProperties
  searchFieldVariant?: 'standard' | 'filled' | 'outlined'
  searchAutoFocus?: boolean
  selection?: boolean
  selectionProps?: any | ((data: any) => any)
  sorting?: boolean
  tableLayout?: 'auto' | 'fixed'
  thirdSortClick?: boolean
  toolbar?: boolean
  toolbarButtonAlignment?: 'left' | 'right'
  detailPanelColumnAlignment?: 'left' | 'right'
  cspNonce?: string
}

export interface Localization {
  error?: React.ReactNode
  body?: {
    dateTimePickerLocalization?: Record<string, unknown> // The date-fns locale object applied to the datepickers
    emptyDataSourceMessage?: React.ReactNode
    filterRow?: {
      filterTooltip?: React.ReactNode
    }
    editRow?: {
      saveTooltip?: React.ReactNode
      cancelTooltip?: React.ReactNode
      deleteText?: React.ReactNode
    }
    addTooltip?: React.ReactNode
    deleteTooltip?: React.ReactNode
    editTooltip?: React.ReactNode
  }
  header?: {
    actions?: React.ReactNode
  }
  grouping?: {
    groupedBy?: React.ReactNode
    placeholder?: React.ReactNode
  }
  pagination?: {
    firstTooltip?: React.ReactNode
    firstAriaLabel?: string
    previousTooltip?: React.ReactNode
    previousAriaLabel?: string
    nextTooltip?: React.ReactNode
    nextAriaLabel?: string
    labelDisplayedRows?: React.ReactNode
    labelRowsPerPage?: React.ReactNode
    lastTooltip?: React.ReactNode
    lastAriaLabel?: string
    labelRowsSelect?: React.ReactNode
  }
  toolbar?: {
    addRemoveColumns?: React.ReactNode
    nRowsSelected?: React.ReactNode | ((rowCount: number) => React.ReactNode)
    showColumnsTitle?: React.ReactNode
    showColumnsAriaLabel?: string
    exportTitle?: React.ReactNode
    exportAriaLabel?: string
    exportName?: React.ReactNode
    searchTooltip?: React.ReactNode
    searchPlaceholder?: React.ReactNode
  }
}

export default class MaterialTable<
  RowData extends Record<string, unknown>
> extends React.Component<MaterialTableProps<RowData>> {}
