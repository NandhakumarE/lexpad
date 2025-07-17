import { TbTableDashed } from "react-icons/tb";
import { $createParagraphNode, $insertNodes } from "lexical";
import IconButton from "../components/IconButton";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createCustomTable } from "../nodes/Table";
import { useState, type ChangeEvent } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";

interface TableModalProps {
  onClose: () => void;
  onSave: (rows: number, columns: number) => void;
}

const TableModal = (props: TableModalProps) => {
  const { onSave, onClose } = props;
  const [dimension, setDimension] = useState({ row: 4, column: 4 });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDimension((prev) => ({ ...prev, [id]: parseInt(value, 10)}));
  };

  const footer = (
    <div className="flex items-center justify-between py-3 text-[12px]">
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={() => onSave(dimension.row, dimension.column)}
        disabled={dimension.row < 1 || dimension.column < 1}
      >
        Save
      </Button>
    </div>
  );

  return (
    <Modal
      header="Table Configuration"
      footer={footer}
      onClose={onClose}
      modalSize="small"
    >
      <form className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="row" className="mb-1 text-[13px]">
            Rows
          </label>
          <input
            className="border-1 rounded-md h-8 px-2"
            type="number"
            name="row"
            id="row"
            min="1"
            max="100"
            placeholder="Enter rows..."
            value={dimension.row}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="column" className="mb-1 text-[13px]">
            Columns
          </label>
          <input
            className="border-1 rounded-md h-8 px-2"
            type="number"
            name="column"
            id="column"
            min="1"
            max="100"
            placeholder="Enter columns..."
            value={dimension.column}
            onChange={handleChange}
          />
        </div>
      </form>
    </Modal>
  );
};

const Table = () => {
  const [editor] = useLexicalComposerContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTableModal = () => {
    if (!isModalOpen) {
      return null;
    }

    const handleClose = () => {
      setIsModalOpen(false);
    };

    const handleSave = (rows: number, columns: number) => {
      editor.update(() => {
        const table = $createCustomTable(rows, columns);
        $insertNodes([table, $createParagraphNode()]);
      });
      handleClose();
    };

    return (
      <TableModal onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    );
  };

  return (
    <>
      {getTableModal()}
      <IconButton id="table" label="Table" onClick={() => setIsModalOpen(true)}>
        <TbTableDashed />
      </IconButton>
    </>
  );
};

export default Table;
