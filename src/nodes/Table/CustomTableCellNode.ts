import { TableCellNode, type SerializedTableCellNode } from "@lexical/table";
import {
  type DOMConversionMap,
  type DOMExportOutput,
  type EditorConfig,
  type LexicalEditor,
  type NodeKey,
  type Spread,
} from "lexical";
import { $createCustomTableCellNode, DEFAULT_BACKGROUND_COLOR } from "./Table.utils";

export type SerializedCustomTableCellNode = Spread<
  {
    type: 'custom-table-cell';
    version: 1;
    backgroundColor: string;
  },
  SerializedTableCellNode
>;

export class CustomTableCellNode extends TableCellNode {
  __backgroundColor: string;

  constructor(
    backgroundColor: string = "white",
    headerState?: number,
    colSpan?: number,
    rowSpan?: number,
    key?: NodeKey
  ) {
    super(headerState, colSpan, rowSpan, key);
    this.__backgroundColor = backgroundColor;
  }

  static getType(): string {
    return "custom-table-cell";
  }

  static clone(node: CustomTableCellNode): CustomTableCellNode {
    return new CustomTableCellNode(
      node.__backgroundColor,
      node.__headerState,
      node.__colSpan,
      node.__rowSpan,
      node.__key
    );
  }

  createDOM(config: EditorConfig): HTMLTableCellElement {
    const cell = super.createDOM(config);
    cell.style.width = "fit-content";
    cell.style.minWidth = "8rem";
    cell.style.borderColor = "var(--border-color)";
    cell.style.padding = ".5rem";
    cell.style.verticalAlign = "top";
    cell.style.textAlign = "start";
    cell.style.background = this.__backgroundColor;
    return cell;
  }

  override updateDOM(prevNode: this): boolean {
    let didUpdate = super.updateDOM(prevNode);

    if (!(prevNode instanceof CustomTableCellNode)) return false;

    if (prevNode.__backgroundColor !== this.__backgroundColor) {
      didUpdate = true;
    }

    return didUpdate;
  }

  setBackgroundColor(newBackgroundColor: string): this {
    const writable = this.getWritable();
    writable.__backgroundColor = newBackgroundColor;
    return this;
  }

  static importDOM(): DOMConversionMap {
    return {
      td: (domNode: HTMLElement) => {
        const backgroundColor =
          domNode.style.getPropertyValue("background") || DEFAULT_BACKGROUND_COLOR;
        return {
          conversion: () => ({
            node: $createCustomTableCellNode(backgroundColor),
          }),
          priority: 1,
        };
      },
      th: (domNode: HTMLElement) => {
        const backgroundColor =
          domNode.style.getPropertyValue("background");
        return {
          conversion: () => ({
            node: $createCustomTableCellNode(backgroundColor, 1),
          }),
          priority: 1,
        };
      },
    };
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const cell = super.exportDOM(editor).element as HTMLTableCellElement;
    cell.style.width = "fit-content";
    cell.style.minWidth = "8rem";
    cell.style.border = "1px solid var(--border-color)";
    cell.style.padding = ".5rem";
    cell.style.verticalAlign = "top";
    cell.style.textAlign = "start";
    cell.style.background = this.__backgroundColor;

    return {
      element: cell,
    };
  }

  exportJSON(): SerializedCustomTableCellNode {
    return {
      ...super.exportJSON(),
      type: "custom-table-cell",
      version: 1,
      backgroundColor: this.__backgroundColor,
    };
  }

  static importJSON(
    serializedNode: SerializedCustomTableCellNode
  ): CustomTableCellNode {
    return new CustomTableCellNode(
      serializedNode.backgroundColor,
      serializedNode.headerState,
      serializedNode.colSpan,
      serializedNode.rowSpan
    );
  }
}
