import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getNearestNodeFromDOMNode,
  CLICK_COMMAND,
  type NodeKey,
} from "lexical";
import { useEffect, useState } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { createPortal } from "react-dom";
import { $isLinkNode } from "@lexical/link";
import FloatingLinkEditor from "./LinkPopperContent";

const FloatingLinkEditorPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [linkKey, setLinkKey] = useState<NodeKey | null>(null);
  const [linkUrl, setLinkUrl] = useState<string>("");

  const { x, y, strategy, refs } = useFloating({
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  const handleClose = () => {
    setAnchorEl(null);
    setLinkKey(null);
    setLinkUrl("");
  };

  // Register click listener to detect link node
  useEffect(() => {
    return editor.registerCommand(
      CLICK_COMMAND,
      (event) => {
        const targetAnchor = (event.target as HTMLElement)?.closest("a");
        if (!targetAnchor) {
          handleClose();
          return false;
        }

        event.preventDefault(); // Prevent browser navigation

        const node = $getNearestNodeFromDOMNode(targetAnchor);
        if (node && $isLinkNode(node)) {
          console.log("Link node found:", node, node.getURL());
          setAnchorEl(targetAnchor);
          setLinkKey(node.getKey());
          setLinkUrl(node.getURL() || "");
          refs.setReference(targetAnchor);
        }

        return true;
      },
      0
    );
  }, [editor, refs]);

  // Cleanup on outside click or node change

  if (!anchorEl || !linkKey || !linkUrl) return null;

  const portalTarget =
    document.getElementById("link-popper-root") ?? document.body;

  return createPortal(
    <div
      ref={refs.setFloating}
      className="z-[999] bg-white px-2 border-1 gap-1 rounded-sm py-1 flex items-center shadow-2xl max-w-[300px]"
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
      }}
    >
      <FloatingLinkEditor
        nodeKey={linkKey}
        url={linkUrl}
        onClose={handleClose}
      />
    </div>,
    portalTarget
  );
};

export default FloatingLinkEditorPlugin;
