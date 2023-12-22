import React, { useEffect, useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "service/ProductService";

const CustomTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // @ts-ignore
    ProductService.getProducts().then((data) => setProducts(data));
    // ProductService.getProductsMini().then((data) => setProducts(data));
  }, []);
  return (
    <div className="card">
      <DataTable
        stripedRows
        value={products}
        tableStyle={{ minWidth: "50rem" }}
        resizableColumns
        showGridlines
      >
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  );
};

export default CustomTable;
