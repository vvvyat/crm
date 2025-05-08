import React, { useState } from "react";
import { FormsStandardField } from "../../../consts";
import { ConfigProvider, Select } from "antd";
import { useFormsStandardFieldsQuery } from "../../../fetch/forms-standard-fields";

export const AddFieldSelect: React.FC<{
  addedFields: FormsStandardField[];
  setAddedFields: React.Dispatch<React.SetStateAction<FormsStandardField[]>>;
}> = React.memo(({ addedFields, setAddedFields }) => {
  const { data: formStandardFields } = useFormsStandardFieldsQuery();

  const [selectedField, setSelectedField] = useState(null);

  const handleChange = (value: number) => {
    if (formStandardFields) {
      const selectedField = formStandardFields.find(
        (field) => field.id === value
      );
      if (
        selectedField &&
        !addedFields.find((field) => field.id === selectedField.id)
      ) {
        selectedField.isRequired = true;
        selectedField.displayOrder = addedFields.length + 1;
        setAddedFields([...addedFields, selectedField]);
      }
    }
    setSelectedField(null);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
          fontFamily: "Philosopher",
          paddingSM: 13,
          borderRadius: 32,
          colorText: "#000000",
          controlHeight: 54,
          lineWidth: 5,
          controlOutlineWidth: 0,
        },
        components: {
          Select: {
            colorTextPlaceholder: "black",
            activeOutlineColor: "#d9d9d9",
            hoverBorderColor: "#d9d9d9",
            activeBorderColor: "#d9d9d9",
            optionActiveBg: "#dedab4",
            optionFontSize: 16,
            optionSelectedBg: "#dedab4",
            optionSelectedColor: "#000000",
            selectorBg: "#c7bf9e",
          },
        },
      }}
    >
      <Select
        placeholder="Добавить поле..."
        value={selectedField}
        allowClear
        className="manager select"
        popupClassName="manager-popup"
        notFoundContent="Не найдено"
        style={{ fontWeight: 700, width: "52%" }}
        onChange={handleChange}
        options={
          formStandardFields
            ? formStandardFields.map((field) => {
                return { value: field.id, label: field.name };
              })
            : []
        }
      />
    </ConfigProvider>
  );
});