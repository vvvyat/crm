import React from "react";
import { FormsStandardField } from "../../../consts";
import { ConfigProvider, Select, Switch } from "antd";

export const MySelect: React.FC<{
  field: FormsStandardField;
  addedFields: FormsStandardField[];
  setAddedFields: React.Dispatch<React.SetStateAction<FormsStandardField[]>>;
}> = React.memo(({ field, addedFields, setAddedFields }) => {
  return (
    <div
      className="field-container"
      key={field.id}
    >
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
          placeholder={field.name}
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