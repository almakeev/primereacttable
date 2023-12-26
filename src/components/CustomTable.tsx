import CustomInput from 'components/CustomInput';
import { TextChangeValue } from 'components/types';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
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
  }, []);

  const [filters, setFilters] = useState({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
    code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const handleChangeValue = (id: string, value: TextChangeValue) => {
    setProducts((prevState) => {
      if (prevState) {
        return prevState.map((item) => {
          return item.id === id ? { ...item, ...value } : item;
        });
      }
    });
  };

  const header = renderHeader();

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
        filters={filters}
        rowsPerPageOptions={[5, 10, 15, 20]}
        selectionMode={'single'}
        selection={selectedProduct}
        onSelectionChange={(e: DataTableSelectionSingleChangeEvent<never>) =>
          setSelectedProduct(e.value)
        }
        globalFilterFields={['code', 'name']}
        header={header}
        emptyMessage="No customers found."
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
          filter
          filterPlaceholder="Search by code"
          body={(data, options) => (
            <CustomInput
              data={data}
              options={options}
              handleChange={handleChangeValue}
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
              handleChange={handleChangeValue}
            />
          )}
        ></Column>
      </DataTable>
    </div>
  );
};

export default CustomTable;
