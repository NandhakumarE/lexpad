import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
  modalSize: "small" | "medium" | "large";
  onClose: () => void;
}

const getModalSizeClasses = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return "max-w-[80%] sm:max-w-[50%] md:max-w-[40%]";
    case "medium":
      return "max-w-[90%] sm:max-w-[75%] md:max-w-[50%]";
    case "large":
      return "max-w-[95%] sm:max-w-[85%] md:max-w-[80%]";
    default:
      return "max-w-[90%] sm:max-w-[75%] md:max-w-[50%]";
  }
};

const Modal = (props: ModalProps) => {
  const { header, footer, onClose, children, modalSize } = props;
  const onCloseModal = () => {
    onClose();
  };

  const getHeader = () => {
    return (
      <div className="relative p-4 border-b-gray-300 bg-gray-100 h-[3.5rem]">
        {header}
        <button
          className="absolute top-3 right-3 z-1 cursor-pointer"
          onClick={onCloseModal}
        >
          <RxCross2 />
        </button>
      </div>
    );
  };

  const getContent = () => {
    return (
      <div className="p-4 bg-white h-fit overflow-hidden overflow-y-auto">
        {children}
      </div>
    );
  };

  const getFooter = () => {
    return (
      <div className="px-4 border-t-1 border-gray-300 bg-white h-[4rem]">
        {footer}
      </div>
    );
  };

  const modal = (
    <div className="fixed inset-0 z-1  w-full bg-[rgba(0,0,0,.5)] flex items-center justify-center">
      <div
        className={`${getModalSizeClasses(
          modalSize
        )} w-full  overflow-hidden bg-white rounded-2xl`}
      >
        {getHeader()}
        {getContent()}
        {getFooter()}
      </div>
    </div>
  );

  return createPortal(
    modal,
    document.getElementById("modal-container") as HTMLElement
  );
};

export default Modal;
