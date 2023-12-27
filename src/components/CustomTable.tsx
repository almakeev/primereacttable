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
import { Column, ColumnBodyOptions } from 'primereact/column';
import { Product, ProductService } from 'service/ProductService';

const CustomTable = () => {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<DataTableCellSelection<Product[]>>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ProductService.getProducts().then((data) => {
      setIsLoading(false);
      setProducts(data);
    });
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

  const imageBodyTemplate = (product: Product) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
        alt={product.image}
        className="shadow-md h-24 min-w-32"
      />
    );
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const priceBodyTemplate = (data: Product, options: ColumnBodyOptions) => {
    const price = formatCurrency(data.price);

    return (
      <CustomInput
        data={data}
        options={options}
        handleChange={handleChangeValue}
        placeholder={price}
      />
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

  if (isLoading) return <div>Loading</div>;

  return (
    <div className={'p-fluid shadow-md rounded-lg'}>
      <DataTable
        stripedRows
        value={products}
        tableStyle={{ minWidth: '50rem' }}
        resizableColumns
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
        <Column key={'id'} field={'id'} header={'id'} sortable></Column>
        <Column
          key={'code'}
          field={'code'}
          header={'code'}
          sortable
          filter
          filterPlaceholder="Search by code"
          body={(data, options) => (
            <CustomInput
              placeholder={data[options.field]}
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
          sortable
          filter
          filterPlaceholder="Search by name"
          body={(data, options) => (
            <CustomInput
              placeholder={data[options.field]}
              options={options}
              data={data}
              handleChange={handleChangeValue}
            />
          )}
        ></Column>
        <Column
          key={'description'}
          field={'description'}
          header={'description'}
          sortable
          body={(data, options) => (
            <CustomInput
              placeholder={data[options.field]}
              options={options}
              data={data}
              handleChange={handleChangeValue}
            />
          )}
        ></Column>
        <Column header={'image'} body={imageBodyTemplate}></Column>
        <Column
          key={'price'}
          field={'price'}
          header={'price'}
          sortable
          body={priceBodyTemplate}
        ></Column>
        <Column
          key={'category'}
          field={'category'}
          header={'category'}
          sortable
          body={(data, options) => (
            <CustomInput
              placeholder={data[options.field]}
              options={options}
              data={data}
              handleChange={handleChangeValue}
            />
          )}
        ></Column>
        <Column
          key={'quantity'}
          field={'quantity'}
          header={'quantity'}
          sortable
          body={(data, options) => (
            <CustomInput
              placeholder={data[options.field]}
              options={options}
              data={data}
              handleChange={handleChangeValue}
            />
          )}
        ></Column>
        <Column
          key={'inventoryStatus'}
          field={'inventoryStatus'}
          header={'inventory status'}
          sortable
          body={(data, options) => (
            <CustomInput
              placeholder={data[options.field]}
              options={options}
              data={data}
              handleChange={handleChangeValue}
            />
          )}
        ></Column>
        <Column
          key={'rating'}
          field={'rating'}
          header={'rating'}
          sortable
          body={(data, options) => (
            <CustomInput
              placeholder={data[options.field]}
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
