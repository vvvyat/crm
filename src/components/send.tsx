import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useFormQuery } from "../fetch/form";
import { GetFieldTitle } from "../utils";
import { ConfigProvider, Select, message } from "antd";
import { useSendRequestMutation } from "../fetch/send";
import { TG_BOT_URL } from "../consts";

export const SendStudentData: React.FC = React.memo(() => {
  const params = useParams();
  const navigate = useNavigate();

  const [isSendFailed, setIsSendFailed] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutateAsync: sendRequest } = useSendRequestMutation(
    setIsSendFailed,
    setIsSuccessModalOpen,
    reset
  );

  const { data: form, isLoading, isError } = useFormQuery(Number(params.id));

  const onSubmit = async (data: { [x: string]: string | number }) => {
    if (form) {
      const systemFields = form.systemFields.reduce(
        (a, v) => ({ ...a, [v.name]: data[v.name] }),
        {}
      );
      const customFields = form.customFields.reduce(
        (a, v) => ({ ...a, [v.name]: data[v.name] }),
        {}
      );
      sendRequest({
        eventId: Number(params.id),
        formData: { ...systemFields, ...customFields },
      });
    }
  };

  if (isLoading) {
    return <p className="fetch-warnings">Загрузка...</p>;
  } else if (isError) {
    return <p className="fetch-warnings">При загрузке произошла ошибка</p>;
  } else if (form) {
    return (
      <div className="send-container">
        <div>
          <h2>Заполни анкету</h2>
          <div className="send-form-container">
            <form className="event-form send-form">
              {form.systemFields
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((fieldData) => {
                  switch (fieldData.type) {
                    case "text":
                      return (
                        <>
                          <input
                            key={fieldData.id}
                            placeholder={GetFieldTitle(fieldData.name)}
                            type={fieldData.type}
                            disabled={isSubmitting}
                            {...register(fieldData.name, {
                              required: fieldData.isRequired,
                              maxLength: 100,
                              validate: (input) =>
                                !fieldData.isRequired ||
                                input.trim().length > 0,
                            })}
                          />

                          {errors[fieldData.name]?.type === "required" && (
                            <span className="warning">Обязательное поле!</span>
                          )}
                          {errors[fieldData.name]?.type === "maxLength" && (
                            <span className="warning">
                              Максимальная длина 100 символов.
                            </span>
                          )}
                          {errors[fieldData.name]?.type === "validate" && (
                            <span className="warning">
                              Строка должна содержать символы кроме пробела.
                            </span>
                          )}
                        </>
                      );
                    case "url":
                      return (
                        <>
                          <input
                            key={fieldData.id}
                            placeholder={GetFieldTitle(fieldData.name)}
                            type="text"
                            disabled={isSubmitting}
                            {...register(fieldData.name, {
                              required: fieldData.isRequired,
                              pattern: {
                                value:
                                  /^https?:\/\/(www\.)?[-\w@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
                                message: "Некорректная ссылка",
                              },
                            })}
                          />

                          {errors[fieldData.name]?.type === "required" && (
                            <span className="warning">Обязательное поле!</span>
                          )}
                          {errors[fieldData.name]?.type === "pattern" && (
                            <span className="warning">
                              Некорректная ссылка.
                            </span>
                          )}
                        </>
                      );
                    case "email":
                      return (
                        <>
                          <input
                            key={fieldData.id}
                            placeholder={GetFieldTitle(fieldData.name)}
                            type={fieldData.type}
                            disabled={isSubmitting}
                            {...register(fieldData.name, {
                              required: fieldData.isRequired,
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message:
                                  "Email должен иметь вид: user@example.com",
                              },
                            })}
                          />

                          {errors[fieldData.name]?.type === "required" && (
                            <span className="warning">Обязательное поле!</span>
                          )}
                          {errors[fieldData.name]?.type === "pattern" && (
                            <span className="warning">
                              Email должен иметь вид: user@example.com
                            </span>
                          )}
                        </>
                      );
                  }
                })}
              {form.customFields
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((fieldData) => {
                  switch (fieldData.type) {
                    case "text":
                      return (
                        <>
                          <input
                            key={fieldData.id}
                            placeholder={fieldData.name}
                            type={fieldData.type}
                            disabled={isSubmitting}
                            {...register(fieldData.name, {
                              required: fieldData.isRequired,
                              maxLength: 300,
                              validate: (input) =>
                                !fieldData.isRequired ||
                                input.trim().length > 0,
                            })}
                          />

                          {errors[fieldData.name]?.type === "required" && (
                            <span className="warning">Обязательное поле!</span>
                          )}
                          {errors[fieldData.name]?.type === "maxLength" && (
                            <span className="warning">
                              Максимальная длина 300 символов.
                            </span>
                          )}
                          {errors[fieldData.name]?.type === "validate" && (
                            <span className="warning">
                              Строка должна содержать символы кроме пробела.
                            </span>
                          )}
                        </>
                      );
                    case "url":
                      return (
                        <>
                          <input
                            key={fieldData.id}
                            placeholder={fieldData.name}
                            type="text"
                            disabled={isSubmitting}
                            {...register(fieldData.name, {
                              required: fieldData.isRequired,
                              pattern: {
                                value:
                                  /^https?:\/\/(www\.)?[-\w@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
                                message: "Некорректная ссылка",
                              },
                            })}
                          />

                          {errors[fieldData.name]?.type === "required" && (
                            <span className="warning">Обязательное поле!</span>
                          )}
                          {errors[fieldData.name]?.type === "pattern" && (
                            <span className="warning">
                              Некорректная ссылка.
                            </span>
                          )}
                        </>
                      );
                    case "number":
                      return (
                        <>
                          <input
                            key={fieldData.id}
                            placeholder={fieldData.name}
                            type={fieldData.type}
                            disabled={isSubmitting}
                            {...register(fieldData.name, {
                              required: fieldData.isRequired,
                              min: 1,
                              max: 6,
                              validate: (year) => year % 1 === 0,
                            })}
                          />

                          {errors[fieldData.name]?.type === "required" && (
                            <span className="warning">Обязательное поле!</span>
                          )}
                          {errors[fieldData.name]?.type === "min" && (
                            <span className="warning">
                              Минимальное значение 1.
                            </span>
                          )}
                          {errors[fieldData.name]?.type === "max" && (
                            <span className="warning">
                              Максимальное значение 6.
                            </span>
                          )}
                          {errors[fieldData.name]?.type === "validate" && (
                            <span className="warning">
                              Число должно быть целым.
                            </span>
                          )}
                        </>
                      );
                    case "textarea":
                      return (
                        <>
                          <div className="textarea-wrapper">
                            <textarea
                              key={fieldData.id}
                              placeholder={fieldData.name}
                              disabled={isSubmitting}
                              {...register(fieldData.name, {
                                required: fieldData.isRequired,
                                maxLength: 2000,
                                validate: (descriptionText) =>
                                  !fieldData.isRequired ||
                                  descriptionText.trim().length > 0,
                              })}
                            ></textarea>
                          </div>

                          {errors[fieldData.name]?.type === "required" && (
                            <span className="warning">Обязательное поле!</span>
                          )}
                          {errors[fieldData.name]?.type === "maxLength" && (
                            <span className="warning">
                              Максимальная длина 2000 символов.
                            </span>
                          )}
                          {errors[fieldData.name]?.type === "validate" && (
                            <span className="warning">
                              Строка должна содержать символы кроме пробела.
                            </span>
                          )}
                        </>
                      );
                    case "select":
                      return (
                        <>
                          <Controller
                            control={control}
                            name={fieldData.name}
                            rules={{ required: true }}
                            render={({ field }) => (
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
                                      colorTextPlaceholder: "#757575",
                                    },
                                  },
                                }}
                              >
                                <Select
                                  {...field}
                                  key={fieldData.id}
                                  disabled={isSubmitting}
                                  placeholder={fieldData.name}
                                  className="manager select"
                                  popupClassName="manager-popup"
                                  notFoundContent="Не найдено"
                                  style={{ width: "50%" }}
                                  options={fieldData.options.map((option) => {
                                    return { value: option, label: option };
                                  })}
                                />
                              </ConfigProvider>
                            )}
                          />

                          {errors[fieldData.name]?.type === "required" && (
                            <span className="warning">Обязательное поле!</span>
                          )}
                        </>
                      );
                  }
                })}

              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="save-button"
              >
                Отправить заявку
              </button>
              {isSendFailed && (
                <p className="save-error">
                  Не удалось отправить заявку на мероприятие.
                </p>
              )}
              <NavLink
                className="nav-link-go-back-button"
                to={`/event/${params.id}`}
              >
                <button disabled={isSubmitting} className="go-back-button">
                  Вернуться к мероприятию
                </button>
              </NavLink>
            </form>
          </div>
        </div>
        <img src="../../../img/form.png" height="341" width="405" />

        {isSuccessModalOpen && (
          <div className="modal-container">
            <div className="modal">
              <h2>Ваша заявка на участие в мероприятии отправлена.</h2>
              <p className="modal-text">
                Чтобы получать уведомления о дальнейших дествиях, начните
                общаться с Telegram-ботом.
              </p>
              <ConfigProvider
                theme={{
                  token: {
                    fontFamily: "Philosopher",
                    fontSize: 16,
                  },
                  components: {
                    Message: {
                      contentBg: "#eaeae9",
                    },
                  },
                }}
              >
                {contextHolder}
              </ConfigProvider>
              <div className="copy-link-container">
                {TG_BOT_URL.length > 100 ? (
                  <p className="link">{TG_BOT_URL.slice(0, 100)}...</p>
                ) : (
                  <p className="link">{TG_BOT_URL}</p>
                )}
                <img
                  src="../../img/copy.svg"
                  width="26"
                  height="25"
                  title="Скопировать"
                  onClick={() => {
                    navigator.clipboard.writeText(TG_BOT_URL).then(() => {
                      messageApi.open({
                        content: "Скопировано",
                      });
                    });
                  }}
                ></img>
              </div>
              <button
                className="close-modal-button"
                onClick={() => navigate("/")}
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
});