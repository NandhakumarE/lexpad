import { useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import IconButton from "./IconButton";
import useOutsideClick from "../hooks/useOutsideClick";

export interface DropdownOption {
  label: string;
  value: string;
  icon?: ReactNode;
}

export type Position = "left" | "right";

// Visual layout type for rendering options
export type DropdownDisplayType = "icon-only" | "value-only";

// Layout direction of the dropdown
export type DropdownOrientation = "horizontal" | "vertical";

export interface DropdownProps {
  type: DropdownDisplayType;
  orientation: DropdownOrientation;
  position?: Position;
  selectedValue: string;
  options: DropdownOption[];
  baseIcon?: ReactNode;
  className?: string;
  onSelect: (value: string) => void;
}

const getPositionClass = (position: Position) => {
  const base = "top-[100%]";
  return position === "right" ? `${base} right-0` : `${base} left-0`;
};

const Dropdown = ({
    type,
    orientation,
    position = 'left',
    selectedValue,
    options,
    baseIcon,
    className,
    onSelect,
  }: DropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const optionListRef = useRef<HTMLUListElement>(null);

  useOutsideClick(optionListRef as RefObject<HTMLUListElement>, () => setIsMenuOpen(false));

  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value === selectedValue) ?? options[0];
  }, [options, selectedValue]);

  const handleOptionSelect = (value: string) => {
    onSelect(value);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative inline-block">
      <IconButton
        label={selectedOption?.label}
        className={`flex items-center gap-1 ${className}`}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {baseIcon ? baseIcon : selectedOption.icon}
        {isMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
      </IconButton>
      {isMenuOpen && (
        <ul
        ref={optionListRef}
        role="listbox"
          className={`absolute z-10 mt-1 p-1 border-black border-1 rounded-md shadow-lg  bg-white list-none overflow-y-auto w-max min-w-full  flex ${ orientation==="vertical" ? 'flex-col' : 'flex-row'}  ${getPositionClass(position)}`}
        >
          {options.map((option) => {
            return (
              <li key={option.value} role="option" className="w-full">
                <IconButton
                  id={option.value}
                  label={option.label}
                  active={selectedValue === option.value}
                  className={`flex items-center gap-4 text-xs w-full`}
                  onClick={() => handleOptionSelect(option.value)}
                >
                    {type === 'icon-only' && option.icon}
                    {type === "value-only" && <span className="">{option.label}</span>}
                </IconButton>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
