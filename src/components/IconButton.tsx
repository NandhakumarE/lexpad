import {
  type ReactNode,
  type MouseEventHandler,
  isValidElement,
  cloneElement,
  type ReactElement,
} from "react";

interface IconButtonProps {
  id ?: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const IconButton = (props: IconButtonProps) => {
  const { id, label, active, disabled, className, onClick, children } = props;

  const bgColor = active ? "bg-black" : "bg-white";
  const textColor = active ? "text-white" : "text-black";

  const styledChild: ReactNode =
    isValidElement(children) && typeof children.type !== "string"
      ? cloneElement(children as ReactElement<{ className?: string }>, {
          className: `${
            (children as ReactElement<{ className?: string }>).props
              ?.className || ""
          } ${textColor}`.trim(),
        })
      : children;

  return (
    <button
      id={id}
      data-testid={id}
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      role="option"
      aria-selected={active}
      className={`p-2 rounded-md cursor-pointer  focus:outline-nonedisabled:opacity-35 disabled:cursor-default ${active ? "":"hover:bg-gray-200" } ${bgColor} ${textColor} ${className}`}
    >
      {styledChild}
    </button>
  );
};

export default IconButton;
