import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserInfoQuery } from "../../fetch/user-info";
import { useUpdateUserInfoMutation } from "../../fetch/update-user-info";
import { EditProfile as EditProfileInputs } from "../../consts";

export const EditProfile: React.FC = React.memo(() => {
  const [isFailed, setIsFailed] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EditProfileInputs>();

  const { data: userInfo, isLoading, isError } = useUserInfoQuery();
  const { mutateAsync: editProfile } = useUpdateUserInfoMutation(
    setIsFailed,
    reset
  );

  useEffect(() => {
    if (userInfo) {
      reset({
        lastName: userInfo?.lastName,
        firstName: userInfo?.firstName,
        surname: userInfo?.surname,
        telegramUrl: userInfo?.telegramUrl,
        vkUrl: userInfo?.vkUrl,
        competencies: "",
      });
    }
  }, [userInfo, reset]);

  const onSubmit: SubmitHandler<EditProfileInputs> = (data) => {
    editProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      surname: data.surname,
      telegramUrl: data.telegramUrl,
      vkUrl: data.vkUrl,
      competencies: "",
    });
  };

  if (isLoading) {
    return <p className="fetch-warnings">Загрузка...</p>;
  } else if (isError) {
    return <p className="fetch-warnings">При загрузке произошла ошибка</p>;
  }

  return (
    <div className="edit-profile-container">
      <p>Редактировать профиль</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="edit-profile-form profile-form"
      >
        <input
          className="name-field"
          type="text"
          placeholder="Фамилия"
          autoComplete="off"
          {...register("lastName", { required: true })}
        />
        {errors.lastName?.type === "required" && (
          <span className="warning">Обязательное поле!</span>
        )}

        <input
          className="name-field"
          type="text"
          placeholder="Имя"
          autoComplete="off"
          {...register("firstName", { required: true })}
        />
        {errors.firstName?.type === "required" && (
          <span className="warning">Обязательное поле!</span>
        )}

        <input
          className="name-field"
          type="text"
          placeholder="Отчество"
          autoComplete="off"
          {...register("surname")}
        />

        <input
          type="text"
          placeholder="Telegram"
          autoComplete="off"
          {...register("telegramUrl", {
            required: true,
            pattern: {
              value:
                /^https?:\/\/(www\.)?[-\w@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
              message: "Некорректная ссылка",
            },
          })}
        />
        {errors.telegramUrl?.type === "required" && (
          <span className="warning">Обязательное поле!</span>
        )}
        {errors.telegramUrl?.type === "pattern" && (
          <span className="warning">Некорректная ссылка.</span>
        )}

        <input
          type="text"
          placeholder="ВКонтакте"
          autoComplete="off"
          {...register("vkUrl", {
            required: true,
            pattern: {
              value:
                /^https?:\/\/(www\.)?[-\w@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
              message: "Некорректная ссылка",
            },
          })}
        />
        {errors.vkUrl?.type === "required" && (
          <span className="warning">Обязательное поле!</span>
        )}
        {errors.vkUrl?.type === "pattern" && (
          <span className="warning">Некорректная ссылка.</span>
        )}

        <button disabled={isSubmitting || !isDirty} className="save-button">
          Сохранить изменения
        </button>
        {isFailed && (
          <p className="edit-profile-error">Не удалось сохранить изменения.</p>
        )}
      </form>
    </div>
  );
});