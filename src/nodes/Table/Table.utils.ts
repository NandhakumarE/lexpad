import { $isTableRowNode, TableCellNode, TableRowNode } from "@lexical/table";
import { $createParagraphNode, $getNearestNodeFromDOMNode } from "lexical";
import { CustomTableNode } from "./CustomTableNode";
import { CustomTableCellNode } from "./CustomTableCellNode";

export const DEFAULT_BACKGROUND_COLOR = "#ffffff";
export const DEFAULT_BORDER_COLOR = "black";
const DEFAULT_TABLE_HEADER_BACKGROUND_COLOR = "#cfe0f3";

export function $createCustomTableCellNode(
  backgroundColor: string = "white",
  headerState?: number
): CustomTableCellNode {
  return new CustomTableCellNode(backgroundColor, headerState);
}

export function $isCustomTableCellNode(
  node: unknown
): node is CustomTableCellNode {
  return node instanceof CustomTableCellNode;
}

export function $createCell(enableHeader?: boolean): TableCellNode {
  const cellNode = $createCustomTableCellNode(
    enableHeader
      ? DEFAULT_TABLE_HEADER_BACKGROUND_COLOR
      : DEFAULT_BACKGROUND_COLOR,
    enableHeader ? 1 : 0
  );
  cellNode.append($createParagraphNode());
  return cellNode;
}
type CellVariant = "none" | "first-cell-header" | "all-cell-header";

export function $createRow(
  columnCount = 0,
  variant: CellVariant = "first-cell-header"
): TableRowNode {
  const row = new TableRowNode();
  for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
    const isHeader =
      variant === "all-cell-header"
        ? true
        : variant === "first-cell-header"
        ? columnIndex === 0
        : false;
    row.append($createCell(isHeader));
  }
  return row;
}

export function $createCustomTable(
  rows: number,
  columns: number,
  borderColor = DEFAULT_BORDER_COLOR
): CustomTableNode {
  const tableNode = new CustomTableNode(borderColor, false, false, false);
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    tableNode.append($createRow(columns, rowIndex === 0 ? "all-cell-header" : "first-cell-header"));
  }

  return tableNode;
}

export function $getActiveCustomTableCell(
  domNode: Node
): CustomTableCellNode | null {
  const node = $getNearestNodeFromDOMNode(domNode);
  return $isCustomTableCellNode(node) ? node : null;
}

export function $getActiveTableRow(domNode: HTMLElement): TableRowNode | null {
  // This function retrieves the row node from a DOM node that is expected to be a table
  const cellNode = $getActiveCustomTableCell(domNode);
  if (cellNode) {
    const row = cellNode.getParent();
    if (row != null && $isTableRowNode(row)) {
      return row;
    }
  }
  return null;
}

export function $getActiveTable(domNode: HTMLElement): CustomTableNode | null {
  // This function retrieves the table node from a DOM node that is expected to be a table
  const rowNode = $getActiveTableRow(domNode);
  if (rowNode) {
    const table = rowNode.getParent();
    if (table && table.getType() === "custom-table") {
      return table as CustomTableNode;
    }
  }
  return null;
}
