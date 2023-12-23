import { ColumnEditorOptions } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import React from 'react';

const PriceEditor = (options: ColumnEditorOptions) => {
  return (
    <InputNumber
      value={options.value}
      onValueChange={(e) => options.editorCallback?.(e.value)}
      mode="currency"
      currency="USD"
      locale="en-US"
      min={0}
    />
  );
};

export default PriceEditor;
