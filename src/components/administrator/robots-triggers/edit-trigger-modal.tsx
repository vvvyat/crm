import React, { useEffect, useState } from "react";
import {
  Trigger,
  TriggerLinkInputs,
  TriggerTestInputs,
  TriggerType,
} from "../../../consts";
import { ConfigProvider, Select } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEditTriggerMutation } from "../../../fetch/edit-trigger";

export const EditTriggerModal: React.FC<{
  statusId: number;
  trigger: Trigger | undefined;
  setIsEditTriggerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(
  ({ statusId, trigger, setIsEditTriggerModalOpen, setIsAnyModalOpen }) => {
    const [isFailed, setIsFailed] = useState(false);

    const { mutateAsync: editTrigger } = useEditTriggerMutation(
      statusId,
      trigger?.id || 0,
      setIsFailed,
      setIsEditTriggerModalOpen,
      setIsAnyModalOpen
    );

    const {
      control,
      reset: resetTest,
      handleSubmit: handleSubmitTest,
      register: registerTest,
      formState: {
        errors: errorsTest,
        isSubmitting: isSubmittingTest,
        isDirty: isDirtyTest,
      },
    } = useForm<TriggerTestInputs>();

    const {
      reset: resetLink,
      handleSubmit: handleSubmitLink,
      register: registerLink,
      formState: {
        errors: errorsLink,
        isSubmitting: isSubmittingLink,
        isDirty: isDirtyLink,
      },
    } = useForm<TriggerLinkInputs>();

    const onTestResultSubmit: SubmitHandler<TriggerTestInputs> = async (
      data
    ) => {
      editTrigger({
        value: Number(data.value),
        condition: data.condition,
      });
    };

    const onLinkClickSubmit: SubmitHandler<TriggerLinkInputs> = async (
      data
    ) => {
      editTrigger({
        link: data.link,
      });
    };

    useEffect(() => {
      if (trigger?.type === TriggerType.LinkClick) {
        resetLink({
          link: `${trigger.parameters["link"]}`,
        });
      } else {
        resetTest({
          value: trigger?.parameters["value"]
            ? Number(trigger?.parameters["value"])
            : 0,
          condition: `${trigger?.parameters["condition"]}`,
        });
      }
    }, [trigger, resetLink, resetTest]);

    return (
      <>
        <div className="stage-modal-container">
          {trigger?.type === TriggerType.LinkClick && (
            <form className="stage-modal add-trigger-modal">
              <h2>Отследить переход по ссылке из сообщения</h2>
              <div className="modal-fields">
                <input
                  type="text"
                  placeholder="Ссылка"
                  disabled={isSubmittingLink}
                  {...registerLink("link", {
                    required: true,
                    pattern: {
                      value:
                        /^https?:\/\/(www\.)?[-\w@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
                      message: "Некорректная ссылка",
                    },
                  })}
                />

                {errorsLink.link?.type === "required" && (
                  <span className="warning">Обязательное поле!</span>
                )}
                {errorsLink.link && (
                  <span className="warning">{errorsLink.link.message}</span>
                )}
              </div>

              <div className="stage-modal-buttons">
                <button
                  className="edit-button"
                  onClick={handleSubmitLink(onLinkClickSubmit)}
                  disabled={isSubmittingLink || !isDirtyLink}
                >
                  Редактировать
                </button>
                <button
                  className="cancel-button"
                  disabled={isSubmittingLink}
                  onClick={(evt) => {
                    evt.preventDefault();
                    setIsEditTriggerModalOpen(false);
                    setIsAnyModalOpen(false);
                    setIsFailed(false);
                  }}
                >
                  Отмена
                </button>
              </div>
              {isFailed && (
                <p className="save-error">Не удалось сохранить изменения.</p>
              )}
            </form>
          )}

          {trigger?.type === TriggerType.TestResult && (
            <form className="stage-modal add-trigger-modal">
              <h2>Отследить результаты тестирования</h2>
              <div className="modal-fields">
                <Controller
                  control={control}
                  name={"condition"}
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
                            colorBorder: "#c7bf9e",
                            activeOutlineColor: "#c7bf9e",
                            hoverBorderColor: "#c7bf9e",
                            activeBorderColor: "#c7bf9e",
                            optionActiveBg: "#c7bf9e",
                            optionFontSize: 16,
                            optionSelectedBg: "#c7bf9e",
                            optionSelectedColor: "#000000",
                            selectorBg: "#dedab4",
                            colorTextPlaceholder: "#757575",
                          },
                        },
                      }}
                    >
                      <Select
                        {...field}
                        disabled={isSubmittingTest}
                        placeholder="Операция сравнения"
                        className="manager select"
                        popupClassName="select-popup"
                        notFoundContent="Не найдено"
                        style={{ width: "100%" }}
                        options={[
                          { value: "Больше", label: "Больше" },
                          { value: "Меньше", label: "Меньше" },
                          {
                            value: "Больше или равно",
                            label: "Больше или равно",
                          },
                          {
                            value: "Меньше или равно",
                            label: "Меньше или равно",
                          },
                        ]}
                      />
                    </ConfigProvider>
                  )}
                />
                {errorsTest.condition?.type === "required" && (
                  <span className="warning">Обязательное поле!</span>
                )}

                <input
                  type="number"
                  placeholder="Результат"
                  disabled={isSubmittingTest}
                  style={{ width: "45%" }}
                  {...registerTest("value", {
                    required: true,
                    min: 0,
                  })}
                ></input>
                {errorsTest.value?.type === "required" && (
                  <span className="warning">Обязательное поле!</span>
                )}
                {errorsTest.value?.type === "min" && (
                  <span className="warning">
                    Число должно быть положительным.
                  </span>
                )}
              </div>

              <div className="stage-modal-buttons">
                <button
                  className="edit-button"
                  onClick={handleSubmitTest(onTestResultSubmit)}
                  disabled={isSubmittingTest || !isDirtyTest}
                >
                  Редактировать
                </button>
                <button
                  className="cancel-button"
                  disabled={isSubmittingTest}
                  onClick={(evt) => {
                    evt.preventDefault();
                    setIsEditTriggerModalOpen(false);
                    setIsAnyModalOpen(false);
                    setIsFailed(false);
                  }}
                >
                  Отмена
                </button>
              </div>
              {isFailed && (
                <p className="save-error">Не удалось сохранить изменения.</p>
              )}
            </form>
          )}
        </div>
      </>
    );
  }
);