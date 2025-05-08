import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ConfigProvider, List, Radio } from "antd";
import { useFormsQuery } from "../../../fetch/forms";
import { useDeleteFormMutation } from "../../../fetch/delete-form";

export const StudentDataForms: React.FC = React.memo(() => {
  const { data: forms, isLoading, isError } = useFormsQuery();

  const params = useParams();

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleteFailed, setIsDeleteFailed] = useState(false);

  const { mutateAsync: deleteForm } = useDeleteFormMutation(
    Number(params.id),
    setIsDeleteConfirmOpen,
    setIsDeleteFailed
  );

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
            <NavLink
              to={`/admin/event/${params.id}/student-data-forms/create-form`}
            >
              <button>Создать новую форму</button>
            </NavLink>
          </div>
          {forms?.length === 0 ? (
            <p className="fetch-warnings">Список форм пуст</p>
          ) : (
            <div className="form-list-container">
              <ConfigProvider
                theme={{
                  components: {
                    Radio: {
                      radioSize: 25,
                      dotSize: 10,
                    },
                    List: {
                      itemPadding: "10px 30px",
                    },
                  },
                  token: {
                    colorPrimary: 'black',
                    colorText: "black",
                    fontFamily: "Philosopher",
                    fontSize: 16,
                  }
                }}
              >
                <Radio.Group className="form-radio-group" value={forms.find((form) => form.eventId === Number(params.id))?.formId} onChange={() => {}}>
                  <List
                    dataSource={forms.filter((form) => form.isTemplate === true)}
                    renderItem={(form) => (
                      <List.Item className="forms-list-item" key={form.formId}>
                        <Radio value={form.formId}>
                          <b>{form.title}</b>
                        </Radio>
                        <br />
                        <div className="forms-list-item-buttons">
                          <NavLink
                            to={`/admin/event/${params.id}/student-data-forms/${form.formId}`}
                          >
                            <img
                              src="/../../img/edit-form-icon.svg"
                              width="25"
                              height="25"
                              title="Редактировать"
                            ></img>
                          </NavLink>
                          <img
                            src="/../../img/delete-form-icon.svg"
                            width="25"
                            height="25"
                            title="Удалить"
                            onClick={() => {
                              setIsDeleteConfirmOpen(true);
                            }}
                          ></img>
                        </div>
                      </List.Item>
                    )}
                  />
                </Radio.Group>
              </ConfigProvider>
            </div>
          )}
        </div>

        {isDeleteConfirmOpen && (
          <div className="modal-container">
            <div className="delete-confirm-modal">
              <h2>Вы уверены, что хотите удалить эту форму?</h2>
              <div className="modal-buttons">
                <button onClick={async () => deleteForm()}>Удалить</button>
                <button
                  className="cancel-button"
                  onClick={() => {
                    setIsDeleteConfirmOpen(false);
                  }}
                >
                  Отмена
                </button>
              </div>
              {isDeleteFailed && (
                <p className="save-error">Не удалось удалить форму</p>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
});
