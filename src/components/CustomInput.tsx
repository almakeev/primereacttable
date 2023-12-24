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
  const myButton = useRef<HTMLButtonElement | null>(null);

  const handleDoubleClick = () => {
    setIsOpen(true);
  };

  const outsideClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      myInput.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('mousedown', outsideClick, true);

    return () => {
      window.removeEventListener('mousedown', outsideClick);
    };
  }, [isOpen]);

  if (!isOpen)
    return (
      <button
        className={'p-2 w-full flex'}
        ref={myButton}
        onDoubleClick={handleDoubleClick}
        onClick={(event) => event.preventDefault()}
      >
        {data[options.field]}
      </button>
    );

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <InputText
        ref={myInput}
        type="text"
        value={data[options.field]}
        onChange={(event) => handleChange(data.id, event.target.value)}
      />
    </div>
  );
};

export default CustomInput;
