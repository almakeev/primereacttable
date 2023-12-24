import CustomInput from 'components/CustomInput';
import React, { useEffect, useState } from 'react';

import {
  DataTable,
  DataTableCellSelection,
  DataTableSelectionSingleChangeEvent,
} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Product, ProductService } from 'service/ProductService';

const CustomTable = () => {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<DataTableCellSelection<Product[]>>();

  useEffect(() => {
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
          sortable
          style={{ width: '5%' }}
        ></Column>
        <Column
          key={'code'}
          field={'code'}
          header={'code'}
          style={{ width: '5%' }}
          sortable
          body={(data, options) => (
            <CustomInput
              data={data}
              options={options}
              handleChange={handleChangeCode}
            />
          )}
        ></Column>
        <Column
          key={'name'}
          field={'name'}
          header={'name'}
          style={{ width: '15%' }}
          sortable
          body={(data, options) => (
            <CustomInput
              options={options}
              data={data}
              handleChange={handleChangeName}
            />
          )}
        ></Column>
      </DataTable>
    </div>
  );
};

export default CustomTable;
