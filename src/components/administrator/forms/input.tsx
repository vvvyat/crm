import React, { useState } from "react";
import { FormsStandardField } from "../../../consts";
import { ConfigProvider, Switch } from "antd";

export const MyInput: React.FC<{
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
      <input placeholder={fieldName} type={field.type} />
      <div className="field-config-line">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "black",
            },
            components: {
              Switch: {
                handleBg: "#c7bf9e",
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
            console.log(field.name)
            setAddedFields(
              addedFields.filter((addedField) => addedField.id !== field.id)
            );
          }}
        ></img>
      </div>
    </div>
  );
});