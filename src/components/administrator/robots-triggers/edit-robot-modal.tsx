import React, { useEffect, useState } from "react";
import { Robot, RobotInputs, RobotType, RobotWithLinkInputs } from "../../../consts";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEditRobotMutation } from "../../../fetch/edit-robot";

export const EditRobotModal: React.FC<{
  statusId: number;
  robot: Robot | undefined,
  setIsEditRobotModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({ statusId, robot, setIsEditRobotModalOpen, setIsAnyModalOpen }) => {
  const [isFailed, setIsFailed] = useState(false);

  const {mutateAsync: editRobot} = useEditRobotMutation(statusId, robot?.id || 0, setIsFailed, setIsEditRobotModalOpen, setIsAnyModalOpen)

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<RobotInputs>();

  const {
    reset: resetWithLink,
    handleSubmit: handleSubmitWithLink,
    register: registerWithLink,
    formState: { errors: errorsWithLink, isSubmitting: isSubmittingWithLink, isDirty: isDirtyWithLink },
  } = useForm<RobotWithLinkInputs>();

  useEffect(() => {
    if (robot?.type === RobotType.Message) {
        reset({
            name: robot.name,
            message: robot.parameters["message"],
        })
    } else {
        resetWithLink({
            name: robot?.name,
            message: robot?.parameters["message"],
            link: robot?.parameters["link"],
        })
    }
  }, [robot, reset, resetWithLink])

  const onMessageSubmit: SubmitHandler<RobotInputs> = async (data) => {
    editRobot({
      name: data.name,
      message: data.message,
    })
  };

  const onMessageWithLinkSubmit: SubmitHandler<RobotWithLinkInputs> = async (
    data
  ) => {
     editRobot({
      name: data.name,
      message: data.message,
      link: data.link,
    })
  };

  return (
    <>
      <div className="stage-modal-container">
        {robot?.type === RobotType.Message && (
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
                disabled={isSubmitting || !isDirty}
              >
                Редактировать
              </button>
              <button
                className="cancel-button"
                disabled={isSubmitting}
                onClick={(evt) => {
                  evt.preventDefault();
                  setIsEditRobotModalOpen(false);
                  setIsAnyModalOpen(false)
                  reset()
                  setIsFailed(false)
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

        {(robot?.type === RobotType.MessageWithLink ||
            robot?.type === RobotType.MessageWithTest) && (
            <form className="stage-modal add-robot-modal">
              <h2>
                {robot.type === RobotType.MessageWithLink
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
                    robot.type === RobotType.MessageWithLink
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
                  disabled={isSubmittingWithLink || ! isDirtyWithLink}
                >
                  Редактировать
                </button>
                <button
                  className="cancel-button"
                  disabled={isSubmittingWithLink}
                  onClick={(evt) => {
                    evt.preventDefault();
                    setIsEditRobotModalOpen(false);
                    setIsAnyModalOpen(false)
                    resetWithLink()
                    setIsFailed(false)
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
});