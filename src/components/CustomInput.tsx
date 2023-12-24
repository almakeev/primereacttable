import { ColumnBodyOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { Product } from 'service/ProductService';

interface ICustomInputProps {
  data: Product;
  options: ColumnBodyOptions;
  handleChange: (id: string, value: string) => void;
}

const CustomInput = ({ data, options, handleChange }: ICustomInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const myInput = useRef<HTMLInputElement | null>(null);
  const myButton = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(data[options.field]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log('enter');
      handleChange(data.id, value);
    }

    if (event.key === 'Escape' || event.key === 'Esc') {
      setValue(data[options.field]);
      setIsOpen(false);
    }
  };

  const handleDoubleClick = () => {
    setIsOpen(true);
  };

  const outsideClick = (event: MouseEvent) => {
    if (myInput.current && !myInput.current.contains(event.target as Node)) {
      setIsOpen(false);
      setValue(data[options.field]);
    }
  };

 

  useEffect(() => {
      isOpen && myInput.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (myInput.current) {
      window.addEventListener('mousedown', outsideClick, true);

      return () => {
        window.removeEventListener('mousedown', outsideClick);
      };
    }
  }, [isOpen]);

  if (!isOpen)
    return (
      <div
        className={'p-2 w-full flex'}
        ref={myButton}
        onDoubleClick={handleDoubleClick}
      >
        {data[options.field]}
      </div>
    );

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <InputText
        onKeyDown={onKeyDown}
        ref={myInput}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

export default CustomInput;
