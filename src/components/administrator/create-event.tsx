import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useBlocker } from "react-router-dom";
import { Inputs } from "../../consts";
import { useNewEventMutation } from "../../fetch/create-event";
import { useUserInfoQuery } from "../../fetch/user-info";
import moment from "moment";

export const CreateEvent: React.FC = React.memo(() => {
  const [isCreateFailed, setIsCreateFailed] = useState(false);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const { mutateAsync: createNewEvent } = useNewEventMutation(
    setIsCreateFailed,
    reset
  );
  const { data: userInfo } = useUserInfoQuery();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    createNewEvent({
      title: data.title,
      description: data.descriptionText,
      adminId: userInfo ? userInfo.id : 0,
      eventStartDate: moment(data.eventStartDate).format(),
      eventEndDate: moment(data.eventEndDate).format(),
      enrollmentStartDate: moment(data.enrollmentStartDate).format(),
      enrollmentEndDate: moment(data.enrollmentEndDate).format(),
      numberSeatsStudent: data.numberSeatsStudent,
      hasTest: false,
      testUrl: null,
    });
  };

  const isFormEmpty = () => {
    const inputs = watch();
    for (const inputValue of Object.values(inputs))
      if (inputValue) return false;
    return true;
  };

  const blocker = useBlocker(() => !isFormEmpty());

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={blocker.state === "blocked" ? { filter: "blur(5px)" } : {}}
        className="add-new-event-form event-form"
      >
        <input
          placeholder="Название"
          type="text"
          autoComplete="off"
          disabled={blocker.state === "blocked"}
          {...register("title", {
            required: true,
            maxLength: 70,
            validate: (title) =>
              title.trim().length > 0 ||
              "Название должно содержать символы кроме пробела.",
          })}
        />
        {errors.title?.type === "required" && (
          <span className="warning">Обязательное поле!</span>
        )}
        {errors.title?.type === "maxLength" && (
          <span className="warning">Максимальная длина 70 символов.</span>
        )}
        {errors.title && (
          <span className="warning">{errors.title.message}</span>
        )}

        <div className="textarea-wrapper">
          <textarea
            placeholder="Описание"
            autoComplete="off"
            disabled={blocker.state === "blocked"}
            {...register("descriptionText", {
              required: true,
              validate: (descriptionText) =>
                descriptionText.trim().length > 0 ||
                "Описание должно содержать символы кроме пробела.",
            })}
          ></textarea>
        </div>
        {errors.descriptionText && (
          <span className="warning">Обязательное поле!</span>
        )}
        {errors.descriptionText && (
          <span className="warning">{errors.descriptionText.message}</span>
        )}

        <div>
          <label className="date-lable">Срок проведения</label>

          <input
            type="date"
            disabled={blocker.state === "blocked"}
            {...register("eventStartDate", {
              required: true,
              deps: ["eventEndDate", "enrollmentEndDate"],
            })}
          />
          {errors.eventStartDate?.type === "required" && (
            <span className="date-warning">Обязательное поле!</span>
          )}

          <span className="date-spliter">—</span>

          <input
            type="date"
            disabled={blocker.state === "blocked"}
            {...register("eventEndDate", {
              required: "Обязательное поле!",
              validate: (end) => {
                if (!watch("eventStartDate")) return;
                const startDate = moment(watch("eventStartDate"));
                const endDate = moment(end);
                if (moment().isAfter(startDate)) {
                  return "Нельзя создать событие, которое уже началось / завершилось.";
                }
                return (
                  endDate.isAfter(startDate) ||
                  "Начало события должно происходить раньше, чем конец."
                );
              },
            })}
          />
          {errors.eventEndDate && (
            <span className="date-warning">{errors.eventEndDate.message}</span>
          )}
        </div>

        <div>
          <label className="date-lable">Срок зачисления студентов</label>

          <input
            type="date"
            disabled={blocker.state === "blocked"}
            {...register("enrollmentStartDate", {
              required: true,
              deps: ["enrollmentEndDate"],
            })}
          />
          {errors.enrollmentStartDate?.type === "required" && (
            <span className="date-warning">Обязательное поле!</span>
          )}

          <span className="date-spliter">—</span>

          <input
            type="date"
            disabled={blocker.state === "blocked"}
            {...register("enrollmentEndDate", {
              required: "Обязательное поле!",
              validate: (enEnd) => {
                if (!watch("enrollmentStartDate") || !watch("eventStartDate"))
                  return;
                const enStartDate = moment(watch("enrollmentStartDate"));
                const enEndDate = moment(enEnd);
                const start = moment(watch("eventStartDate"));
                if (enStartDate.isSameOrAfter(enEndDate)) {
                  return "Начало набора должно происходить раньше, чем конец.";
                }
                if (enEndDate.isAfter(start)) {
                  return "Набор участников должен завершиться до начала события.";
                }
              },
            })}
          />
          {errors.enrollmentEndDate && (
            <span className="date-warning">
              {errors.enrollmentEndDate.message}
            </span>
          )}
        </div>

        <input
          placeholder="Количество мест"
          className="number-of-participants"
          type="number"
          disabled={blocker.state === "blocked"}
          {...register("numberSeatsStudent", {
            required: true,
            min: 1,
            max: 99999,
            validate: (seats) =>
              seats % 1 === 0 ||
              "Количество участников должно быть целым числом.",
          })}
        />
        {errors.numberSeatsStudent?.type === "required" && (
          <span className="warning">Обязательное поле!</span>
        )}
        {errors.numberSeatsStudent?.type === "min" && (
          <span className="warning">
            Количество участников не должно быть меньше 1.
          </span>
        )}
        {errors.numberSeatsStudent?.type === "max" && (
          <span className="warning">
            Количество участников не должно превышать 99999.
          </span>
        )}
        {errors.numberSeatsStudent && (
          <span className="warning">{errors.numberSeatsStudent.message}</span>
        )}

        <button
          disabled={isSubmitting || blocker.state === "blocked"}
          className="save-button"
        >
          Создать мероприятие
        </button>
        {isCreateFailed && (
          <p className="save-error">Не удалось создать мероприятие</p>
        )}
      </form>

      {blocker.state === "blocked" && (
        <div className="warning-modal create-warning-modal">
          <p className="warning-text">
            Изменения будут утеряны.
            <br />
            Вы уверены?
          </p>
          <div className="warning-buttons">
            <button
              className="create-event-warning-confirm"
              onClick={() => blocker.proceed()}
            >
              Да
            </button>
            <button
              className="create-event-warning-cancel"
              onClick={() => blocker.reset()}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </>
  );
});