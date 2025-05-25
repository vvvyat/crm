import React, { useState } from "react";
import { FormsStandardField } from "../../../consts";
import { ConfigProvider, Select } from "antd";
import { useFormsStandardFieldsQuery } from "../../../fetch/forms-standard-fields";

export const AddFieldSelect: React.FC<{
  addedFields: FormsStandardField[] | undefined;
  setAddedFields: React.Dispatch<
    React.SetStateAction<FormsStandardField[] | undefined>
  >;
}> = React.memo(({ addedFields, setAddedFields }) => {
  const { data: formStandardFields } = useFormsStandardFieldsQuery();

  const [selectedField, setSelectedField] = useState(null);

  const handleChange = (value: number) => {
    if (!addedFields) return;
    if (formStandardFields) {
      const selectedField = formStandardFields.find(
        (field) => field.id === value
      );
      if (
        selectedField &&
        !addedFields.find((field) => field.name === selectedField.name)
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
            activeOutlineColor: "#fbc164",
            hoverBorderColor: "#fbc164",
            activeBorderColor: "#fbc164",
            colorBorder: "#fbc164",
            optionActiveBg: "#eaeae9",
            optionFontSize: 16,
            optionSelectedBg: "#eaeae9",
            optionSelectedColor: "#000000",
            selectorBg: "#a2bfbb",
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