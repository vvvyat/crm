import React from "react";
import { FormsStandardField } from "../../../consts";
import { ConfigProvider, Switch } from "antd";

export const Textarea: React.FC<{
  field: FormsStandardField;
  addedFields: FormsStandardField[];
  setAddedFields: React.Dispatch<React.SetStateAction<FormsStandardField[]>>;
}> = React.memo(({ field, addedFields, setAddedFields }) => {
  return (
    <div
      className="field-container"
      key={field.id}
    >
      <textarea placeholder={field.name} />
      <div className="field-config">
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
              onChange={(isChecked) => (field.isRequired = isChecked)}
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
              addedFields.filter((deleteField) => field.id !== deleteField.id)
            );
          }}
        ></img>
      </div>
    </div>
  );
});