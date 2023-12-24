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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ProductService.getProducts().then((data) => setProducts(data));
    // ProductService.getProductsMini().then((data) => setProducts(data));
  }, []);

  const handleChangeCode = (id: string, code: string) => {
    setProducts((prevState) => {
      return prevState?.map((item) => (item.id === id ? { ...item, code } : item));
    });
  };

  const handleChangeName = (id: string, name: string) => {
    setProducts((prevState) => {
      return prevState?.map((item) => (item.id === id ? { ...item, name } : item));
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
          body={(data, options) => <CustomInput options={options} data={data} handleChange={handleChangeCode} />}
        ></Column>
        <Column
          key={'name'}
          field={'name'}
          header={'name'}
          style={{ width: '25%' }}
          body={(data, options) =><CustomInput options={options} data={data} handleChange={handleChangeName} />} />
      </DataTable>
    </div>
  );
};

export default CustomTable;
