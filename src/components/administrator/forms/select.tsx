import React, { useState } from "react";
import { FormsStandardField } from "../../../consts";
import { ConfigProvider, Select, Switch } from "antd";

export const MySelect: React.FC<{
  field: FormsStandardField;
  addedFields: FormsStandardField[];
  setAddedFields: React.Dispatch<
    React.SetStateAction<FormsStandardField[] | undefined>
  >;
}> = React.memo(({ field, addedFields, setAddedFields }) => {
  const [fieldName, setFieldName] = useState(
    `${field.name}${field.isRequired ? "*" : ""}`
  );

  return (
    <div className="field-container" key={field.id}>
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
              activeOutlineColor: "#fbc164",
              hoverBorderColor: "#fbc164",
              activeBorderColor: "#fbc164",
              colorBorder: "#fbc164",
              optionActiveBg: "#eaeae9",
              optionFontSize: 16,
              optionSelectedBg: "#eaeae9",
              optionSelectedColor: "#000000",
              selectorBg: "#a2bfbb",
              colorTextPlaceholder: "#757575",
            },
          },
        }}
      >
        <Select
          placeholder={fieldName}
          className="manager select"
          popupClassName="manager-popup"
          notFoundContent="Не найдено"
          style={{ width: "25%" }}
          options={field.options.map((option) => {
            return { value: option, label: option };
          })}
        />
      </ConfigProvider>
      <div className="field-config-line">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "black",
            },
            components: {
              Switch: {
                handleBg: "#a2bfbb",
              },
            },
          }}
        >
          <div className="toogle">
            <Switch
              size="small"
              defaultChecked
              onChange={(isChecked) => {
                field.isRequired = isChecked;
                setFieldName(`${field.name}${field.isRequired ? "*" : ""}`);
              }}
            />
            <p>Обязательное поле</p>
          </div>
        </ConfigProvider>
        <img
          src="/../../img/delete-icon.svg"
          width="18"
          height="18"
          title="Удалить"
          onClick={() => {
            setAddedFields(
              addedFields.filter((addedField) => addedField.id !== field.id)
            );
          }}
        ></img>
      </div>
    </div>
  );
});