import { ColumnEditorOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import React from 'react';

const TextEditor = (options: ColumnEditorOptions) => {
  return (
    <InputText
      type="text"
      value={options.value}
      onChange={(e) => {
        if (options.field) {
          options.editorCallback?.(e.target.value);
        }
      }}
    />
  );
};

export default TextEditor;
