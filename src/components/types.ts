import { ColumnBodyOptions } from 'primereact/column';
import { Product } from 'service/ProductService';

export interface ICustomInputProps {
  data: Product;
  options: ColumnBodyOptions;
  handleChange: (id: string, value: TextChangeValue) => void;
  placeholder: string;
}

export type TextChangeValue = {
  [k: string]: string | number;
};
