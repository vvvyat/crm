import React, { useState } from "react";
import {
  TriggerLinkInputs,
  TriggerTestInputs,
  TriggerTypeId,
} from "../../../consts";
import { ConfigProvider, Radio, RadioChangeEvent, Select } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAddTriggerMutation } from "../../../fetch/add-trigger";

export const AddTriggerModal: React.FC<{
  statusId: number;
  setIsAddTriggerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({ statusId, setIsAddTriggerModalOpen, setIsAnyModalOpen }) => {
  const [value, setValue] = useState(TriggerTypeId.LinkClick);
  const [isFailed, setIsFailed] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const { mutateAsync: addTrigger } = useAddTriggerMutation(
    statusId,
    setIsFailed,
    setIsAddTriggerModalOpen,
    setIsAnyModalOpen
  );

  const {
    control,
    handleSubmit: handleSubmitTest,
    register: registerTest,
    formState: { errors: errorsTest, isSubmitting: isSubmittingTest },
  } = useForm<TriggerTestInputs>();

  const {
    handleSubmit: handleSubmitLink,
    register: registerLink,
    formState: { errors: errorsLink, isSubmitting: isSubmittingLink },
  } = useForm<TriggerLinkInputs>();

  const onTestResultSubmit: SubmitHandler<TriggerTestInputs> = async (data) => {
    addTrigger({
      triggerId: value,
      parameters: {
        value: Number(data.value),
        condition: data.condition,
      },
    });
  };

  const onLinkClickSubmit: SubmitHandler<TriggerLinkInputs> = async (data) => {
    addTrigger({
      triggerId: value,
      parameters: {
        link: data.link,
      },
    });
  };

  return (
    <>
      <div className="stage-modal-container">
        <div
          className="stage-modal add-trigger-modal"
          style={isSettingsModalOpen ? { display: "none" } : {}}
        >
          <h2>Добавление триггера</h2>
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
              className="trigger-type-radio-group"
              value={value}
              onChange={(evt: RadioChangeEvent) => {
                setValue(evt.target.value);
              }}
              options={[
                {
                  value: TriggerTypeId.LinkClick,
                  label: "Отследить переход по ссылке из сообщения",
                },
                {
                  value: TriggerTypeId.TestResult,
                  label: "Отследить результаты тестирования",
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
                setIsAddTriggerModalOpen(false);
                setIsAnyModalOpen(false);
              }}
            >
              Отмена
            </button>
          </div>
        </div>

        {isSettingsModalOpen && value === TriggerTypeId.LinkClick && (
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
                disabled={isSubmittingLink}
              >
                Добавить
              </button>
              <button
                className="cancel-button"
                disabled={isSubmittingLink}
                onClick={(evt) => {
                  evt.preventDefault();
                  setIsAddTriggerModalOpen(false);
                  setIsAnyModalOpen(false);
                  setIsFailed(false);
                }}
              >
                Отмена
              </button>
            </div>
            {isFailed && (
              <p className="save-error">Не удалось создать триггер.</p>
            )}
          </form>
        )}

        {isSettingsModalOpen && value === TriggerTypeId.TestResult && (
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
                          colorBorder: "#fbc164",
                          activeOutlineColor: "#fbc164",
                          hoverBorderColor: "#fbc164",
                          activeBorderColor: "#fbc164",
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
                      {...field}
                      disabled={isSubmittingTest}
                      placeholder="Операция сравнения"
                      className="manager select"
                      popupClassName="select-popup"
                      notFoundContent="Не найдено"
                      style={{ width: "100%" }}
                      options={[
                        { value: "greater_than", label: "Больше" },
                        { value: "less_than", label: "Меньше" },
                        {
                          value: "equals",
                          label: "Pавно",
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
                disabled={isSubmittingTest}
              >
                Добавить
              </button>
              <button
                className="cancel-button"
                disabled={isSubmittingTest}
                onClick={(evt) => {
                  evt.preventDefault();
                  setIsAddTriggerModalOpen(false);
                  setIsAnyModalOpen(false);
                  setIsFailed(false);
                }}
              >
                Отмена
              </button>
            </div>
            {isFailed && (
              <p className="save-error">Не удалось создать триггер.</p>
            )}
          </form>
        )}
      </div>
    </>
  );
});