import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ConfigProvider, List, Radio, RadioChangeEvent } from "antd";
import { useFormsQuery } from "../../../fetch/forms";
import { useReuseFormMutation } from "../../../fetch/reuse-form";
import { FormsSystemField, FormsStandardField, Form } from "../../../consts";
import { useFormsStandardFieldsQuery } from "../../../fetch/forms-standard-fields";

export const StudentDataForms: React.FC = React.memo(() => {
  const params = useParams();
  const [value, setValue] = useState<Form | undefined>();

  const { data: forms, isLoading, isError } = useFormsQuery();
  const { data: formStandardFields } = useFormsStandardFieldsQuery();
  const { mutateAsync: copyForm } = useReuseFormMutation();

  useEffect(() => {
    setValue(forms?.find((form) => form.eventId === Number(params.id)));
  }, [forms, params.id]);

  if (isLoading) {
    return <p className="fetch-warnings">Загрузка...</p>;
  } else if (isError) {
    return <p className="fetch-warnings">При загрузке произошла ошибка</p>;
  } else if (forms) {
    return (
      <>
        <div className="form-list">
          <div className="form-list-buttons">
            <NavLink to={`/admin/event/${params.id}/crm`}>
              <button className="go-back">
                <img
                  src="/../../img/arrow-icon.svg"
                  style={{ transform: "scaleX(-1)" }}
                  width="20"
                  height="26"
                ></img>
              </button>
            </NavLink>
          </div>
          <div className="form-list-container">
            <ConfigProvider
              theme={{
                components: {
                  Radio: {
                    radioSize: 25,
                    dotSize: 10,
                  },
                  List: {
                    itemPadding: "0 30px",
                  },
                },
                token: {
                  colorPrimary: "black",
                  colorText: "black",
                  fontFamily: "Philosopher",
                  fontSize: 16,
                },
              }}
            >
              <Radio.Group
                className="form-radio-group"
                value={value}
                onChange={(e: RadioChangeEvent) => {
                  copyForm({
                    eventId: Number(params.id),
                    title: e.target.value.title,
                    isTemplate: false,
                    customFields: e.target.value.customFields.reduce(
                      (
                        a: {
                          [x: number]: {
                            isRequired: boolean;
                            displayOrder: number;
                          };
                        },
                        field: FormsStandardField
                      ) => ({
                        ...a,
                        [formStandardFields?.find((f) => f.name === field.name)
                          ?.id || 0]: {
                          isRequired: field.isRequired,
                          displayOrder: field.displayOrder,
                        },
                      }),
                      {}
                    ),
                    systemFields: e.target.value.systemFields.reduce(
                      (
                        a: { [x: number]: number },
                        field: FormsSystemField
                      ) => ({ ...a, [field.id]: field.displayOrder }),
                      {}
                    ),
                  });
                }}
              >
                <List
                  dataSource={forms.filter(
                    (form) =>
                      form.isTemplate === true ||
                      form.eventId === Number(params.id)
                  )}
                  renderItem={(form) => (
                    <List.Item className="forms-list-item" key={form.formId}>
                      <Radio value={form}>
                        <b>{form.title}</b>
                      </Radio>
                      <br />
                      {form.eventId === Number(params.id) && (
                        <div className="forms-list-item-buttons">
                          <NavLink
                            to={`/admin/event/${params.id}/student-data-forms/edit-form/${form.formId}`}
                          >
                            <img
                              src="/../../img/edit-form-icon.svg"
                              width="25"
                              height="25"
                              title="Редактировать"
                            ></img>
                          </NavLink>
                        </div>
                      )}
                    </List.Item>
                  )}
                />
              </Radio.Group>
            </ConfigProvider>
          </div>
        </div>
      </>
    );
  }
});