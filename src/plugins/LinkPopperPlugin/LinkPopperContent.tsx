import { useState, type ChangeEvent } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import IconButton from "../../components/IconButton";
import { $getNodeByKey } from "lexical";
import { $isLinkNode } from "@lexical/link";
interface LinkPopperContentProps {
  nodeKey: string;
  url: string;
  onClose: () => void;
}
const LinkPopperContent = (props: LinkPopperContentProps) => {
  const { nodeKey, url, onClose } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableLink, setEditableLink] = useState("");

  const [editor] = useLexicalComposerContext();

  const onEditClick = () => {
    setIsEditing(true);
    setEditableLink(url);
  };

  const onDeleteClick = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isLinkNode(node)) {
        const children = node.getChildren();
        children.forEach((child) => {
          node.insertBefore(child);
        });
        node.remove();
      }
    });
    onClose();
  };

  const onLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEditableLink(value);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
  };

  const onSaveLink = () => {
    const regex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w- ./?%&=]*)?$/;
    if (regex.test(editableLink)) {
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if ($isLinkNode(node)) {
          node.setURL(editableLink);
        }
      });
      setIsEditing(false);
      onClose();
    } else {
      onCancelEdit();
    }
  };

  if (isEditing) {
    return (
      <>
        <input
          type="text"
          placeholder="Enter the link"
          value={editableLink}
          onChange={onLinkChange}
          className="w-[calc(100%-52px)] px-2 py-1 bg-[#eee] rounded-lg text-[12px]"
        />
        <IconButton label="Save" onClick={onSaveLink}>
          <IoIosCheckmarkCircle size={16} />
        </IconButton>
        <IconButton label="Cancel" onClick={onCancelEdit}>
          <IoIosCloseCircle size={16} />
        </IconButton>
      </>
    );
  }

  return (
    <>
      <a className="w-[calc(100%-52px)] text-[12px] min-w-[150px]" href={url} target="_blank">
        {url}
      </a>
      <IconButton label="Edit" onClick={onEditClick}>
        <FiEdit2  size={14}/>
      </IconButton>
      <IconButton label="Delete" onClick={onDeleteClick}>
        <MdDeleteOutline size={16} />
      </IconButton>
    </>
  );
};

export default LinkPopperContent;
