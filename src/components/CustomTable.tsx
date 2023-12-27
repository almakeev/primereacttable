import CustomInput from 'components/CustomInput';
import { TextChangeValue } from 'components/types';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import React, { useEffect, useState } from 'react';

import {
  DataTable,
  DataTableCellSelection,
  DataTableFilterMeta,
  DataTableSelectionSingleChangeEvent,
} from 'primereact/datatable';
import {
  Column,
  ColumnBodyOptions,
  ColumnFilterElementTemplateOptions,
} from 'primereact/column';
import { Product, ProductService } from 'service/ProductService';

const CustomTable = () => {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<DataTableCellSelection<Product[]>>();
  const [isLoading, setIsLoading] = useState(true);

  const [statuses] = useState(['INSTOCK', 'OUTOFSTOCK', 'LOWSTOCK']);

  useEffect(() => {
    ProductService.getProducts().then((data) => {
      setIsLoading(false);
      setProducts(data);
    });
    initFilters();
  }, []);

  const [filters, setFilters] = useState<DataTableFilterMeta | undefined>(
    undefined
  );
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const clearFilter = () => {
    initFilters();
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      code: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },

      inventoryStatus: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    });
    setGlobalFilterValue('');
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const getSeverity = (status: string) => {
    switch (status) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };

  const statusBodyTemplate = (product: Product) => {
    return (
      <Tag
        value={product.inventoryStatus}
        severity={getSeverity(product.inventoryStatus)}
      ></Tag>
    );
  };

  const statusItemTemplate = (option: string) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const statusFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex gap-4 justify-content-between justify-items-center">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          className={'w-32 border border-slate-300 rounded-md'}
          onClick={clearFilter}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            className={'max-w-sm border border-slate-500'}
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
        globalFilterFields={['code', 'name', 'status']}
        header={header}
        emptyMessage="No customers found."
        loading={isLoading}
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
          filterMenuStyle={{ width: '14rem' }}
          sortable
          filter
          filterElement={statusFilterTemplate}
          body={statusBodyTemplate}
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
