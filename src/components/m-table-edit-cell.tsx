import React, { useState } from 'react'
import TableCell from '@material-ui/core/TableCell'
import CircularProgress from '@material-ui/core/CircularProgress'
import withTheme from '@material-ui/core/styles/withTheme'
import { MTableEditCell } from '../typings'

const MTableEditCell = ({
  rowData,
  columnDef,
  editable,
  icons,
  localization,
  components
}: MTableEditCell) => {
  const [value, setValue] = useState<any>(rowData[columnDef.field])
  const [isLoading, setIsLoading] = useState(false)

  const getStyle = () => {
    let cellStyle = {
      boxShadow: '2px 0px 15px rgba(125,147,178,.25)',
      color: 'inherit',
      width: columnDef.width,
      boxSizing: 'border-box',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      padding: '0 16px'
    } as React.CSSProperties

    if (typeof columnDef.cellStyle === 'function') {
      cellStyle = {
        ...cellStyle,
        ...columnDef.cellStyle(value, rowData, columnDef)
      }
    } else {
      cellStyle = { ...cellStyle, ...columnDef.cellStyle }
    }

    if (typeof editable.cellStyle === 'function') {
      cellStyle = {
        ...cellStyle,
        ...editable.cellStyle(value, rowData, columnDef)
      }
    } else {
      cellStyle = { ...cellStyle, ...editable.cellStyle }
    }

    return cellStyle
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      onApprove()
    } else if (e.keyCode === 27) {
      onCancel()
    }
  }

  const onApprove = async () => {
    setIsLoading(true)
    try {
      await editable.onCellEditApproved(
        value, // newValue
        rowData[columnDef.field], // oldValue
        rowData, // rowData with old value
        columnDef // columnDef
      )
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
    editable.onCellEditFinished(rowData, columnDef)
  }

  const onCancel = () => {
    editable.onCellEditFinished(rowData, columnDef)
  }

  const renderActions = () => {
    if (isLoading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', width: 60 }}>
          <CircularProgress size={20} />
        </div>
      )
    }

    const actions = [
      {
        icon: icons.Check,
        tooltip: localization.saveTooltip,
        onClick: onApprove,
        disabled: isLoading
      },
      {
        icon: icons.Clear,
        tooltip: localization.cancelTooltip,
        onClick: onCancel,
        disabled: isLoading
      }
    ]

    return (
      <components.Actions
        actions={actions}
        components={components}
        size="small"
      />
    )
  }

  return (
    <TableCell style={getStyle()} padding="none">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1, marginRight: 4 }}>
          <components.EditField
            columnDef={columnDef}
            value={value}
            onChange={() => setValue(value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            autoFocus
          />
        </div>
        {renderActions()}
      </div>
    </TableCell>
  )
}

export default withTheme(MTableEditCell)
