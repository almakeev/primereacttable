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

  const handleClick = () => {
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
    window.addEventListener('click', outsideClick);

    return () => window.removeEventListener('click', outsideClick);
  }, []);

  if (!isOpen)
    return (
      <button className={'p-2 w-full flex'} onDoubleClick={handleClick}>
        {data[options.field]}
      </button>
    );

  return (
    <InputText
      onClick={(event) => event.stopPropagation()}
      ref={myInput}
      type="text"
      value={data[options.field]}
      onChange={(event) => handleChange(data.id, event.target.value)}
    />
  );
};

export default CustomInput;
