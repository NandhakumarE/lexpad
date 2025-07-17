import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $setSelection,
  ElementNode,
} from "lexical";
import { TableRowNode } from "@lexical/table";
import { useEffect, useState } from "react";
import { TABLE_COMMANDS } from "../constants";
import {
  $createCell,
  $createRow,
  $getActiveCustomTableCell,
  $getActiveTableRow,
  $getActiveTable,
  CustomTableCellNode,
} from "../nodes/Table";

type TableCommand = (typeof TABLE_COMMANDS)[keyof typeof TABLE_COMMANDS];
type ColorKey = Extract<TableCommand, "border-color" | "background-color">;
interface ColorState {
  selectedKey: "" | ColorKey;
  borderColor: string;
  backgroundColor: string;
  isPickerOpen: boolean;
}

export const getColorKeyById = (
  id: string
): "borderColor" | "backgroundColor" | "" => {
  switch (id) {
    case TABLE_COMMANDS.BORDER_COLOR:
      return "borderColor";
    case TABLE_COMMANDS.BACKGROUND_COLOR:
      return "backgroundColor";
    default:
      return "";
  }
};

export const getColorLabelById = (
  id: string
): string => {
  switch (id) {
    case TABLE_COMMANDS.BORDER_COLOR:
      return "Border Color";
    case TABLE_COMMANDS.BACKGROUND_COLOR:
      return "Background Color";
    default:
      return "";
  }
};

const $isFirstRowHeader = (currentRow: TableRowNode) => {
   const firstCell = (currentRow.getChildren()?.[0]) as CustomTableCellNode;
   if (!firstCell) return false;
   return firstCell.__headerState === 1;
}

const useTableCellFloatingOption = () => {
  const [activeCell, setActiveCell] = useState<HTMLTableCellElement | null>(
    null
  );
  const [colorState, setColorState] = useState<ColorState>({
    selectedKey: "",
    borderColor: "#000",
    backgroundColor: "#fff",
    isPickerOpen: false,
  });
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        let cellElement = null;
        if ($isRangeSelection(selection)) {
          const select = window.getSelection();
          if (select && select.rangeCount > 0) {
            const range = select.getRangeAt(0);

            const element =
              range.startContainer.parentElement?.closest("td, th");
            // Type guard to ensure it's an HTMLTableCellElement
            if (element instanceof HTMLTableCellElement) {
              cellElement = element;
            }
          }
        }
        setActiveCell(cellElement);
      });
    });
  }, [editor]);

  const onColorSelect = () => {
    if (!activeCell) return;

    const key = getColorKeyById(colorState.selectedKey);
    if (!key) return;

    const value = colorState[key];
    if (!value) return;

    editor.update(() => {
      if (colorState.selectedKey === TABLE_COMMANDS.BACKGROUND_COLOR) {
        const activeCellNode = $getActiveCustomTableCell(activeCell);
        if (!activeCellNode) return;

        activeCellNode.setBackgroundColor(value);
        setColorState((prev) => ({ ...prev, backgroundColor: value }));
      } else if (colorState.selectedKey === TABLE_COMMANDS.BORDER_COLOR) {
        const activeTableNode = $getActiveTable(activeCell);
        if (!activeTableNode) return;

        activeTableNode.setBorderColor(value);
        setColorState((prev) => ({ ...prev, borderColor: value }));
      }
    });

    setColorState((prev) => ({ ...prev, isPickerOpen: false }));
  };

  const onToggleRowStriping = () => {
     editor.update(() => {
      const table = $getActiveTable(activeCell as HTMLElement);
      if (table) {
        const isRowStriped = table.getRowStriping();
        table.setRowStriping(!isRowStriped);
      }
    });
  };

  const onToggleFirstRowFreeze = () => {
     editor.update(() => {
      const table = $getActiveTable(activeCell as HTMLElement);
      if (table) {
        const isFirstRowFreeze = table.getFreezeFirstRow();
        table.setFreezeFirstRow(!isFirstRowFreeze);
      }
    });
  };

  const onToggleFirstColumnFreeze = () => {
     editor.update(() => {
      const table = $getActiveTable(activeCell as HTMLElement);
      if (table) {
        const isFirstColumnFreeze = table.getFreezeFirstColumn();
        table.setFreezeFirstColumn(!isFirstColumnFreeze);
      }
    });
  };

  const onRowUpdate = (type: TableCommand) => {
    editor.update(() => {
      const currentRow = $getActiveTableRow(activeCell as HTMLElement);
      if (currentRow) {
        const cellCount = (currentRow.getChildren() || []).length;
        const isHeaderCell = $isFirstRowHeader(currentRow);
        const newRow = $createRow(cellCount, isHeaderCell ? "first-cell-header" : 'none');

        if (type === TABLE_COMMANDS.INSERT_ROW_ABOVE) {
          currentRow.insertBefore(newRow);
        } else if (type === TABLE_COMMANDS.INSERT_ROW_BELOW) {
          currentRow.insertAfter(newRow);
        }
      }
    });
  };

  const onColumnUpdate = (type: TableCommand) => {
    editor.update(() => {
      const currentCell = $getActiveCustomTableCell(activeCell as Node);
      const currentRow = $getActiveTableRow(activeCell as HTMLElement);
      if (currentRow && currentCell) {
        const index = currentRow
          .getChildren()
          .findIndex((eachCell) => eachCell.is(currentCell));
        const table = $getActiveTable(activeCell as HTMLElement);
        if (!table) return;

        if (index > -1 && table) {
          table.getChildren().forEach((eachRow) => {
            const referenceNode = (eachRow as ElementNode).getChildren()?.[
              index
            ] as CustomTableCellNode;
            const isHeaderCell = referenceNode.__headerState === 1
            if (!referenceNode) return;
            if (type === TABLE_COMMANDS.INSERT_COLUMN_LEFT) {
              referenceNode.insertBefore($createCell(isHeaderCell));
            } else if (type === TABLE_COMMANDS.DELETE_COLUMN) {
              referenceNode.remove();
            } else if (type === TABLE_COMMANDS.INSERT_COLUMN_RIGHT) {
              referenceNode.insertAfter($createCell(isHeaderCell));
            }
          });
        }
      }
    });
  };

  const onDeleteRow = () => {
    editor.update(() => {
      const currentRow = $getActiveTableRow(activeCell as HTMLElement);
      if (currentRow) {
        if (currentRow?.getParent()) {
          const table = currentRow.getParent();
          if (!table) return;

          $setSelection(null);
          currentRow.remove();
          setActiveCell(null);
          if (table.getChildrenSize() === 0) {
            table.remove();
          }
        }
      }
    });
  };

  const onDeleteTable = () => {
    editor.update(() => {
      const table = $getActiveTable(activeCell as HTMLElement);
      table?.remove();
    });
    setActiveCell(null);
  };

  const onOptionClick = (id: TableCommand) => {
    switch (id) {
      case TABLE_COMMANDS.BACKGROUND_COLOR:
      case TABLE_COMMANDS.BORDER_COLOR:
        setColorState((prev) => ({
          ...prev,
          selectedKey: id as ColorKey,
          isPickerOpen: true,
        }));
        break;
      case TABLE_COMMANDS.ROW_STRIPING:
        onToggleRowStriping();
        break;
      case TABLE_COMMANDS.FREEZE_FIRST_ROW:
        onToggleFirstRowFreeze();
        break;
      case TABLE_COMMANDS.FREEZE_FIRST_COLUMN:
        onToggleFirstColumnFreeze();
        break;
      case TABLE_COMMANDS.INSERT_ROW_ABOVE:
      case TABLE_COMMANDS.INSERT_ROW_BELOW:
        onRowUpdate(id);
        break;
      case TABLE_COMMANDS.DELETE_ROW:
        onDeleteRow();
        break;
      case TABLE_COMMANDS.INSERT_COLUMN_LEFT:
      case TABLE_COMMANDS.INSERT_COLUMN_RIGHT:
      case TABLE_COMMANDS.DELETE_COLUMN:
        onColumnUpdate(id);
        break;
      case TABLE_COMMANDS.DELETE_TABLE:
        onDeleteTable();
        break;
      default:
        break;
    }
  };

  return {
    activeCell,
    colorState,
    setColorState,
    onColorSelect,
    onOptionClick,
  };
};

export default useTableCellFloatingOption;
