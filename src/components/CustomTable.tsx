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
    <div className={"overflow-x-auto shadow-md rounded-lg"}>
      <DataTable
        stripedRows
        value={products}
        tableStyle={{ minWidth: "50rem" }}
        resizableColumns
        showGridlines
        reorderableColumns
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 15, 20]}
      >
        <Column sortable field="code" header="Code"></Column>
        <Column sortable field="name" header="Name"></Column>
        <Column sortable field="category" header="Category"></Column>
        <Column sortable field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  );
};

export default CustomTable;
