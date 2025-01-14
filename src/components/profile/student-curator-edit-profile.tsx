import React, { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useUserInfoQuery } from "../../fetch/user-info";
import { useUpdateUserInfoMutation } from "../../fetch/update-user-info";
import { EditProfile as EditProfileInputs } from "../../consts";

export const EditProfile: React.FC = React.memo(() => {
    const [isFailed, setIsFailed] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<EditProfileInputs>()

    const {data: userInfo, isLoading, isError} = useUserInfoQuery()
    const {mutateAsync: editProfile} = useUpdateUserInfoMutation(setIsFailed, reset)

    useEffect(() => {
        if (userInfo) {
            reset({
                lastName: userInfo?.lastName,
                firstName: userInfo?.firstName,
                surname: userInfo?.surname,
                competencies: userInfo?.competencies,
                telegramUrl: userInfo?.telegramUrl,
                vkUrl: userInfo?.vkUrl
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
            competencies: data.competencies
        })
    }

    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (isError) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    } 

    return (
        <div className="edit-profile-container">
            <p>Редактировать профиль</p>
            <form onSubmit={handleSubmit(onSubmit)} className="edit-profile-form student-curator-profile-form profile-form">
                <div className="name-container">
                    <div className="name-field-container">
                        <label className="last-name-lable">Фамилия</label>
                        <input type="text" autoComplete="off" {...register("lastName", { required: true})} />
                        {errors.lastName?.type === "required" && <span className="warning">Обязательное поле!</span>}
                    </div>

                    <div className="name-field-container">
                        <label className="name-lable">Имя</label>
                        <input type="text" autoComplete="off" {...register("firstName", { required: true})} />
                        {errors.firstName?.type === "required" && <span className="warning">Обязательное поле!</span>}
                    </div>

                    <div className="name-field-container">
                        <label className="surname-lable">Отчество</label>
                        <input type="text" autoComplete="off" {...register("surname")} />
                    </div>
                </div>

                <label className="competencies-lable">Компетенции</label>
                <textarea autoComplete="off" {...register("competencies", { required: true })}></textarea>
                {errors.competencies && <span className="warning">Обязательное поле!</span>}

                <label className="telegram-url-lable">Telegram</label>
                <input type="text" autoComplete="off" {...register("telegramUrl", { required: true})} />
                {errors.telegramUrl?.type === "required" && <span className="warning">Обязательное поле!</span>}

                <label className="vk-url-lable">ВКонтакте</label>
                <input type="text" autoComplete="off" {...register("vkUrl", { required: true})} />
                {errors.vkUrl?.type === "required" && <span className="warning">Обязательное поле!</span>}

                <button disabled={isSubmitting || !isDirty} className="save-button">Сохранить изменения</button>
                {isFailed && <p className="edit-profile-error">Не удалось сохранить изменения.</p>}
            </form>
        </div>
    )
})