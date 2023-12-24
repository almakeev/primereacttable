import CustomInput from 'components/CustomInput';
import React, { useEffect, useState } from 'react';

import {
  DataTable,
  DataTableCellSelection,
  DataTableSelectionSingleChangeEvent,
} from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { Product, ProductService } from 'service/ProductService';

const CustomTable = () => {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<DataTableCellSelection<Product[]>>();

  const textEditor = (
    data: Product,
    options: ColumnBodyOptions,
    handleChange: (id: string, value: string) => void
  ) => {
    return (
      <CustomInput options={options} data={data} handleChange={handleChange} />
    );
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ProductService.getProducts().then((data) => setProducts(data));
    // ProductService.getProductsMini().then((data) => setProducts(data));
  }, []);

  const handleChangeCode = (id: string, code: string) => {
    setProducts((prevState) => {
      if (prevState) {
        return prevState.map((item) => {
          if (item.id === id) {
            return { ...item, code };
          }
          return item;
        });
      }
    });
  };

  const handleChangeName = (id: string, name: string) => {
    setProducts((prevState) => {
      if (prevState) {
        return prevState.map((item) => {
          if (item.id === id) {
            return { ...item, name };
          }
          return item;
        });
      }
    });
  };

  return (
    <div className={'card p-fluid shadow-md rounded-lg'}>
      <DataTable
        stripedRows
        value={products}
        tableStyle={{ minWidth: '50rem' }}
        resizableColumns
        reorderableColumns
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 15, 20]}
        selectionMode={'single'}
        selection={selectedProduct}
        onSelectionChange={(e: DataTableSelectionSingleChangeEvent<never>) =>
          setSelectedProduct(e.value)
        }
      >
        <Column
          key={'id'}
          field={'id'}
          header={'id'}
          style={{ width: '25%' }}
        ></Column>
        <Column
          key={'code'}
          field={'code'}
          header={'code'}
          style={{ width: '25%' }}
          body={(data, options) => textEditor(data, options, handleChangeCode)}
        ></Column>
        <Column
          key={'name'}
          field={'name'}
          header={'name'}
          style={{ width: '25%' }}
          body={(data, options) => textEditor(data, options, handleChangeName)}
        ></Column>
      </DataTable>
    </div>
  );
};

export default CustomTable;
