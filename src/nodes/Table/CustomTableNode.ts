import { TableNode } from "@lexical/table";
import {
  type DOMConversionMap,
  type DOMExportOutput,
  type NodeKey,
  type SerializedElementNode,
  type Spread,
} from "lexical";
import { DEFAULT_BORDER_COLOR } from "./Table.utils";

export type SerializedCustomTableNode = Spread<
  {
    type: "custom-table";
    version: 1;
    borderColor: string;
    rowStriping?: boolean;
    freezeFirstColumn?: boolean;
    freezeFirstRow?: boolean;
  },
  SerializedElementNode
>;

const CustomTableDataAttributes = {
  TABLE_TYPE: "data-lexical-table-type",
  BORDER_COLOR: "data-border-color",
  ROW_STRIPING: "data-row-striping",
  FREEZE_FIRST_COLUMN: "data-freeze-first-column",
  FREEZE_FIRST_ROW: "data-freeze-first-row",
} as const;

export class CustomTableNode extends TableNode {
  __borderColor: string;
  __rowStriping: boolean;
  __freezeFirstColumn: boolean;
  __freezeFirstRow: boolean;

  constructor(
    borderColor: string,
    rowStriping?: boolean,
    freezeFirstColumn?: boolean,
    freezeFirstRow?: boolean,
    key?: NodeKey
  ) {
    super(key);
    this.__borderColor = borderColor;
    this.__freezeFirstColumn = freezeFirstColumn || false;
    this.__freezeFirstRow = freezeFirstRow || false;
    this.__rowStriping = rowStriping || false;
  }

  static getType(): string {
    return "custom-table";
  }

  static clone(node: CustomTableNode): CustomTableNode {
    return new CustomTableNode(
      node.__borderColor,
      node.__rowStriping,
      node.__freezeFirstColumn,
      node.__freezeFirstRow,
      node.__key
    );
  }

  createDOM(): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.setAttribute(
      "style",
      `max-width: 100%; width: fit-content; border-radius:4px; border:.5px solid ${this.__borderColor}; overflow:hidden; overflow-x: auto; margin: 0; padding: 0;`
    );

    const table = document.createElement("table");
    table.setAttribute(CustomTableDataAttributes.TABLE_TYPE, "custom-table");
    table.setAttribute(
      CustomTableDataAttributes.BORDER_COLOR,
      this.__borderColor
    );
    table.style.setProperty("--border-color", this.__borderColor);

    if (this.__rowStriping) {
      table.classList.add("row-striping");
      table.setAttribute(CustomTableDataAttributes.ROW_STRIPING, "true");
    }

    if (this.__freezeFirstColumn) {
      table.classList.add("freeze-first-column");
      table.setAttribute(CustomTableDataAttributes.FREEZE_FIRST_COLUMN, "true");
    }

    if (this.__freezeFirstRow) {
      table.classList.add("freeze-first-row");
      table.setAttribute(CustomTableDataAttributes.FREEZE_FIRST_ROW, "true");
    }

    table.style.borderCollapse = "collapse";

    wrapper.appendChild(table);
    return wrapper;
  }

  updateDOM(prevNode: this, dom: HTMLElement): boolean {
    if (!(prevNode instanceof CustomTableNode)) return false;

    const previousProps = {
      borderColor: prevNode.getBorderColor(),
      rowStriping: prevNode.getRowStriping(),
      freezeFirstColumn: prevNode.getFreezeFirstColumn(),
      freezeFirstRow: prevNode.getFreezeFirstRow(),
    };
    const currentProps = {
      borderColor: this.getBorderColor(),
      rowStriping: this.getRowStriping(),
      freezeFirstColumn: this.getFreezeFirstColumn(),
      freezeFirstRow: this.getFreezeFirstRow(),
    };

    let didUpdate = false;

    if (previousProps.borderColor !== currentProps.borderColor) {
      dom.setAttribute(
        CustomTableDataAttributes.BORDER_COLOR,
        currentProps.borderColor
      );
      dom.style.setProperty("--border-color", currentProps.borderColor);
      dom.style.border = `.5px solid ${currentProps.borderColor}`;
      didUpdate = true;
    }

    if (previousProps.rowStriping !== currentProps.rowStriping) {
      dom.classList.toggle("row-striping", currentProps.rowStriping);
      dom.setAttribute(
        CustomTableDataAttributes.ROW_STRIPING,
        currentProps.rowStriping.toString()
      );
      didUpdate = true;
    }

    if (previousProps.freezeFirstColumn !== currentProps.freezeFirstColumn) {
      dom.classList.toggle(
        "freeze-first-column",
        currentProps.freezeFirstColumn
      );
      dom.setAttribute(
        CustomTableDataAttributes.FREEZE_FIRST_COLUMN,
        currentProps.freezeFirstColumn.toString()
      );
      didUpdate = true;
    }

    if (previousProps.freezeFirstRow !== currentProps.freezeFirstRow) {
      dom.classList.toggle("freeze-first-row", currentProps.freezeFirstRow);
      dom.setAttribute(
        CustomTableDataAttributes.FREEZE_FIRST_ROW,
        currentProps.freezeFirstRow.toString()
      );
      didUpdate = true;
    }

    return didUpdate;
  }

  static importDOM(): DOMConversionMap {
    return {
      div: (domNode: HTMLElement) => {
        const table = domNode.querySelector(
          'table[data-lexical-table-type="custom-table"]'
        );
        // If this div wraps a custom table, let the table tag handle it.
        if (table instanceof HTMLElement) {
          return {
            // Prevents double-wrapping or nested conversion
            conversion: () => ({ node: null }),
            priority: 1,
          };
        }
        return null;
      },
      table: (domNode: HTMLElement) => {
        if (
          domNode.getAttribute(CustomTableDataAttributes.TABLE_TYPE) ===
          "custom-table"
        ) {
          const borderColor =
            domNode.getAttribute(CustomTableDataAttributes.BORDER_COLOR) ||
            DEFAULT_BORDER_COLOR;
          const rowStriping =
            domNode.getAttribute(CustomTableDataAttributes.ROW_STRIPING) ===
            "true";
          const freezeFirstColumn =
            domNode.getAttribute(
              CustomTableDataAttributes.FREEZE_FIRST_COLUMN
            ) === "true";
          const freezeFirstRow =
            domNode.getAttribute(CustomTableDataAttributes.FREEZE_FIRST_ROW) ===
            "true";
          return {
            conversion: () => ({
              node: new CustomTableNode(
                borderColor,
                rowStriping,
                freezeFirstColumn,
                freezeFirstRow
              ),
            }),
            priority: 1,
          };
        }
        return null;
      },
    };
  }

  exportDOM(): DOMExportOutput {
    const wrapper = document.createElement("div");
    wrapper.setAttribute(
      "style",
      "width: 100%; overflow-x: auto; margin: 0; padding: 0;"
    );

    const table = document.createElement("table");
    table.setAttribute(
      CustomTableDataAttributes.TABLE_TYPE,
      CustomTableNode.getType()
    );
    table.setAttribute(
      CustomTableDataAttributes.BORDER_COLOR,
      this.__borderColor
    );
    table.setAttribute(
      CustomTableDataAttributes.ROW_STRIPING,
      this.__rowStriping.toString()
    );
    table.setAttribute(
      CustomTableDataAttributes.FREEZE_FIRST_COLUMN,
      this.__freezeFirstColumn.toString()
    );
    table.setAttribute(
      CustomTableDataAttributes.FREEZE_FIRST_ROW,
      this.__freezeFirstRow.toString()
    );
    table.style.setProperty("--border-color", this.__borderColor);
    table.style.borderCollapse = "collapse";

    wrapper.appendChild(table);

    return {
      element: wrapper,
      after: (generatedElement) => {
        if (generatedElement instanceof HTMLElement) {
          const childNodes = Array.from(generatedElement.childNodes);
          for (const child of childNodes) {
            if (child.nodeName === "TR") {
              table.appendChild(child);
            }
          }
        }
        return wrapper;
      },
    };
  }

  static importJSON(
    serializedNode: SerializedCustomTableNode
  ): CustomTableNode {
    const { borderColor, rowStriping, freezeFirstColumn, freezeFirstRow } =
      serializedNode;
    return new CustomTableNode(
      borderColor,
      rowStriping,
      freezeFirstColumn,
      freezeFirstRow
    );
  }

  exportJSON(): SerializedCustomTableNode {
    return {
      ...super.exportJSON(),
      type: "custom-table",
      version: 1,
      borderColor: this.__borderColor,
      rowStriping: this.__rowStriping,
      freezeFirstColumn: this.__freezeFirstColumn,
      freezeFirstRow: this.__freezeFirstRow,
    };
  }

  getBorderColor(): string {
    return this.__borderColor;
  }
  setBorderColor(color: string): this {
    const writable = this.getWritable();
    writable.__borderColor = color;
    return this;
  }
  getRowStriping(): boolean {
    return this.__rowStriping;
  }
  setRowStriping(isRowStriping: boolean): this {
    console.trace("Creating CustomTableNode DOM", isRowStriping);
    const writable = this.getWritable();
    writable.__rowStriping = isRowStriping;
    return this;
  }
  getFreezeFirstColumn(): boolean {
    return this.__freezeFirstColumn;
  }
  setFreezeFirstColumn(freezeFirstColumn: boolean): this {
    const writable = this.getWritable();
    writable.__freezeFirstColumn = freezeFirstColumn;
    return this;
  }
  getFreezeFirstRow(): boolean {
    return this.__freezeFirstRow;
  }
  setFreezeFirstRow(freezeFirstRow: boolean): this {
    const writable = this.getWritable();
    writable.__freezeFirstRow = freezeFirstRow;
    return this;
  }
}
