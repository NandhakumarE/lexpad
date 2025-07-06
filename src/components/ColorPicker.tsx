import { useRef, useState, type ReactNode, type RefObject } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { SketchPicker, type ColorResult } from 'react-color';
import useOutsideClick from '../hooks/useOutsideClick';
import IconButton from '../components/IconButton';

interface ColorPickerProps {
  label: string,
  baseIcon: ReactNode,
  color: string,
  onChange: (color: ColorResult) => void
}

const ColorPicker = (props: ColorPickerProps) => {
  const { label, baseIcon, color, onChange } = props;
  const [ isMenuOpen, setIsMenuOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(pickerRef as RefObject<HTMLDivElement>, () => {setIsMenuOpen(false)})

  return (
  <div className='relative'>
      <IconButton
        label={label}
        className="flex items-center gap-1"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {baseIcon}
        {isMenuOpen ? <FiChevronUp /> : <FiChevronDown />}
      </IconButton>
      {isMenuOpen && (
        <div ref={pickerRef} className='absolute top-[100%] left-0 z-1'>
          <SketchPicker color={color} onChange={onChange}/>
        </div>
      )}
  </div>
  )
}

export default ColorPicker;