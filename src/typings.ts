import { TableCellProps } from '@material-ui/core'

type RowData = Record<string, unknown>
type GenericIcon = React.ForwardRefExoticComponent<
  React.RefAttributes<SVGSVGElement>
>
type CellStyle =
  | React.CSSProperties
  | ((data: RowData[], rowData: RowData) => React.CSSProperties)
  | ((
      data: RowData[],
      rowData: RowData,
      columnDef: IColumn
    ) => React.CSSProperties)

interface EditCellColumnDef {
  field: string
  title: string
  tableData: {
    filterValue: unknown
    groupOrder: unknown
    groupSort: string
    id: number
  }
}

interface EditComponentProps {
  rowData: RowData
  value: unknown
  onChange: (newValue: unknown) => void
  onRowDataChange: (newValue: RowData) => void
  columnDef: EditCellColumnDef
  error: boolean
}

export interface Icons {
  Add?: GenericIcon
  Check?: GenericIcon
  Clear?: GenericIcon
  Delete?: GenericIcon
  DetailPanel?: GenericIcon
  Edit?: GenericIcon
  Export?: GenericIcon
  Filter?: GenericIcon
  FirstPage?: GenericIcon
  SortArrow?: GenericIcon
  LastPage?: GenericIcon
  NextPage?: GenericIcon
  PreviousPage?: GenericIcon
  ResetSearch?: GenericIcon
  Search?: GenericIcon
  ThirdStateCheck?: GenericIcon
  ViewColumn?: GenericIcon
  Retry?: GenericIcon
}

export interface ICell extends TableCellProps {
  columnDef: IColumn // object required
  value?: unknown // any
  rowData?: RowData // object
  // errorState?: unknown // object | bool
  icons?: Icons
  editable?: {
    cellStyle?: CellStyle
    onCellEditStarted: (rowData: RowData, columnDef: IColumn) => Promise<void>
    onCellEditApproved: (
      newValue: unknown,
      oldValue: unknown,
      rowData: RowData,
      columnDef: IColumn
    ) => Promise<void>
    onCellEditFinished: (rowData: RowData, columnDef: IColumn) => Promise<void>
  }
}

export interface MTableEditCell extends ICell {
  components: any // object required
  errorState?: any // object | bool
  localization: any // object required
}

export interface IColumn {
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right'
  cellStyle?: CellStyle
  currencySetting?: {
    locale?: string
    currencyCode?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  }
  dateSetting?: { locale?: string; format?: string }
  customFilterAndSearch?: (
    filter: unknown,
    rowData: RowData,
    columnDef: IColumn
  ) => boolean
  customSort?: (data1: RowData, data2: RowData, type: 'row' | 'group') => number
  defaultFilter?: unknown
  defaultGroupOrder?: number
  defaultGroupSort?: 'asc' | 'desc'
  defaultSort?: 'asc' | 'desc'
  disableClick?: boolean
  editComponent?: (props: EditComponentProps) => React.ReactElement<unknown>
  emptyValue?:
    | string
    | React.ReactElement<unknown>
    | ((data: unknown) => React.ReactElement<unknown> | string)
  export?: boolean
  field?: keyof RowData | string
  filtering?: boolean
  filterComponent?: (props: {
    columnDef: IColumn
    onFilterChanged: (rowId: string, value: unknown) => void
  }) => React.ReactElement<unknown>
  filterPlaceholder?: string
  filterCellStyle?: CellStyle
  grouping?: boolean
  groupTitle?: string | ((groupData: unknown) => unknown) | React.ReactNode
  headerStyle?: React.CSSProperties
  hidden?: boolean
  hiddenByColumnsButton?: boolean
  hideFilterIcon?: boolean
  initialEditValue?: unknown
  lookup?: Record<string, unknown>
  editPlaceholder?: string
  editable?:
    | 'always'
    | 'onUpdate'
    | 'onAdd'
    | 'never'
    | ((columnDef: IColumn, rowData: RowData) => boolean)
  removable?: boolean
  validate?: (
    rowData: RowData
  ) => { isValid: boolean; helperText?: string } | string | boolean
  render?: (data: RowData, type: 'row' | 'group') => unknown
  searchable?: boolean
  sorting?: boolean
  title?: string | React.ReactElement<unknown>
  tooltip?: string
  type?:
    | 'string'
    | 'boolean'
    | 'numeric'
    | 'date'
    | 'datetime'
    | 'time'
    | 'currency'
  width?: string | number
}
