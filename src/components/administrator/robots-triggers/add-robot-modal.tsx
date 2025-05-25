import React, { useState } from "react";
import { RobotInputs, RobotType, RobotWithLinkInputs } from "../../../consts";
import { ConfigProvider, Radio, RadioChangeEvent } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddRobotMutation } from "../../../fetch/add-robot";

export const AddRobotModal: React.FC<{
  statusId: number;
  setIsAddRobotModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({ statusId, setIsAddRobotModalOpen, setIsAnyModalOpen }) => {
  const [value, setValue] = useState(RobotType.Message);
  const [isFailed, setIsFailed] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const {mutateAsync: addRobot} = useAddRobotMutation(statusId, setIsFailed, setIsAddRobotModalOpen, setIsAnyModalOpen)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RobotInputs>();

  const {
    handleSubmit: handleSubmitWithLink,
    register: registerWithLink,
    formState: { errors: errorsWithLink, isSubmitting: isSubmittingWithLink },
  } = useForm<RobotWithLinkInputs>();

  const onMessageSubmit: SubmitHandler<RobotInputs> = async (data) => {
    addRobot({
      name: data.name,
      type: value,
      message: data.message,
    })
  };

  const onMessageWithLinkSubmit: SubmitHandler<RobotWithLinkInputs> = async (
    data
  ) => {
     addRobot({
      name: data.name,
      type: value,
      message: data.message,
      link: data.link,
    })
  };

  return (
    <>
      <div className="stage-modal-container">
        <div className="stage-modal add-robot-modal" style={isSettingsModalOpen ? {display: "none"} : {}}>
          <h2>Добавление робота</h2>
          <ConfigProvider
            theme={{
              components: {
                Radio: {
                  radioSize: 16,
                  dotSize: 8,
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
              className="robot-type-radio-group"
              value={value}
              onChange={(evt: RadioChangeEvent) => {
                setValue(evt.target.value);
              }}
              options={[
                { value: RobotType.Message, label: "Отправить сообщение" },
                {
                  value: RobotType.MessageWithLink,
                  label: "Отправить сообщение со ссылкой",
                },
                {
                  value: RobotType.MessageWithTest,
                  label: "Отправить сообщение с тестом",
                },
              ]}
            />
          </ConfigProvider>
          <div className="stage-modal-buttons">
            <button
              className="edit-button"
              onClick={() => {
                setIsSettingsModalOpen(true);
              }}
            >
              Продолжить
            </button>
            <button
              className="cancel-button"
              onClick={() => {
                setIsAddRobotModalOpen(false);
                setIsAnyModalOpen(false)
              }}
            >
              Отмена
            </button>
          </div>
        </div>

        {isSettingsModalOpen && value === RobotType.Message && (
          <form className="stage-modal add-robot-modal">
            <h2>Отправить сообщение</h2>
            <div className="modal-fields">
              <input
                type="text"
                placeholder="Название"
                disabled={isSubmitting}
                {...register("name", {
                  required: true,
                  maxLength: 50,
                  validate: (name) =>
                    name.trim().length > 0 ||
                    "Название должно содержать символы кроме пробела.",
                })}
              ></input>
              {errors.name?.type === "required" && (
                <span className="warning">Обязательное поле!</span>
              )}
              {errors.name?.type === "maxLength" && (
                <span className="warning">Максимальная длина 50 символов.</span>
              )}
              {errors.name && (
                <span className="warning">{errors.name.message}</span>
              )}

              <div className="textarea-wrapper">
                <textarea
                  placeholder="Сообщение"
                  disabled={isSubmitting}
                  {...register("message", {
                    required: true,
                    maxLength: 500,
                    validate: (name) =>
                      name.trim().length > 0 ||
                      "Сообщение должно содержать символы кроме пробела.",
                  })}
                ></textarea>
              </div>
              {errors.message?.type === "required" && (
                <span className="warning">Обязательное поле!</span>
              )}
              {errors.message?.type === "maxLength" && (
                <span className="warning">
                  Максимальная длина 500 символов.
                </span>
              )}
              {errors.message && (
                <span className="warning">{errors.message.message}</span>
              )}
            </div>

            <div className="stage-modal-buttons">
              <button
                className="edit-button"
                onClick={handleSubmit(onMessageSubmit)}
                disabled={isSubmitting}
              >
                Добавить
              </button>
              <button
                className="cancel-button"
                disabled={isSubmitting}
                onClick={(evt) => {
                  evt.preventDefault();
                  setIsAddRobotModalOpen(false);
                  setIsAnyModalOpen(false)
                  setIsFailed(false)
                }}
              >
                Отмена
              </button>
            </div>
            {isFailed && (
              <p className="save-error">Не удалось создать робота.</p>
            )}
          </form>
        )}

        {isSettingsModalOpen &&
          (value === RobotType.MessageWithLink ||
            value === RobotType.MessageWithTest) && (
            <form className="stage-modal add-robot-modal">
              <h2>
                {value === RobotType.MessageWithLink
                  ? "Отправить сообщение со ссылкой"
                  : "Отправить сообщение с тестом"}
              </h2>
              <div className="modal-fields">
                <input
                  type="text"
                  placeholder="Название"
                  disabled={isSubmittingWithLink}
                  {...registerWithLink("name", {
                    required: true,
                    maxLength: 50,
                    validate: (name) =>
                      name.trim().length > 0 ||
                      "Название должно содержать символы кроме пробела.",
                  })}
                ></input>
                {errorsWithLink.name?.type === "required" && (
                  <span className="warning">Обязательное поле!</span>
                )}
                {errorsWithLink.name?.type === "maxLength" && (
                  <span className="warning">
                    Максимальная длина 50 символов.
                  </span>
                )}
                {errorsWithLink.name && (
                  <span className="warning">{errorsWithLink.name.message}</span>
                )}

                <div className="textarea-wrapper">
                  <textarea
                    placeholder="Сообщение"
                    disabled={isSubmittingWithLink}
                    {...registerWithLink("message", {
                      required: true,
                      maxLength: 500,
                      validate: (name) =>
                        name.trim().length > 0 ||
                        "Сообщение должно содержать символы кроме пробела.",
                    })}
                  ></textarea>
                </div>
                {errorsWithLink.message?.type === "required" && (
                  <span className="warning">Обязательное поле!</span>
                )}
                {errorsWithLink.message?.type === "maxLength" && (
                  <span className="warning">
                    Максимальная длина 500 символов.
                  </span>
                )}
                {errorsWithLink.message && (
                  <span className="warning">
                    {errorsWithLink.message.message}
                  </span>
                )}

                <input
                  type="text"
                  placeholder={
                    value === RobotType.MessageWithLink
                      ? "Ссылка"
                      : "Ссылка на тест"
                  }
                  disabled={isSubmittingWithLink}
                  {...registerWithLink("link", {
                    required: true,
                    pattern: {
                      value:
                        /^https?:\/\/(www\.)?[-\w@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
                      message: "Некорректная ссылка",
                    },
                  })}
                />

                {errorsWithLink.link?.type === "required" && (
                  <span className="warning">Обязательное поле!</span>
                )}
                {errorsWithLink.link && (
                  <span className="warning">{errorsWithLink.link.message}</span>
                )}
              </div>

              <div className="stage-modal-buttons">
                <button
                  className="edit-button"
                  onClick={handleSubmitWithLink(onMessageWithLinkSubmit)}
                  disabled={isSubmittingWithLink}
                >
                  Добавить
                </button>
                <button
                  className="cancel-button"
                  disabled={isSubmittingWithLink}
                  onClick={(evt) => {
                    evt.preventDefault();
                    setIsAddRobotModalOpen(false);
                    setIsAnyModalOpen(false)
                    setIsFailed(false)
                  }}
                >
                  Отмена
                </button>
              </div>
              {isFailed && (
              <p className="save-error">Не удалось создать робота.</p>
            )}
            </form>
          )}
      </div>
    </>
  );
});