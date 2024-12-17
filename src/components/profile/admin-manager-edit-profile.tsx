import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"

type ProfileInputs = {
    surname: string;
    firstName: string;
    lastName: string;
    telegramUrl: string;
    vkUrl: string;
}

export const EditProfile: React.FC = React.memo(() => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<ProfileInputs>({
        defaultValues: {
            surname: 'Вяткина',
            firstName: 'Софья',
            lastName: 'Романовна',
            telegramUrl: '@tg123',
            vkUrl: 'vk.com'
        }
    })

    const onSubmit: SubmitHandler<ProfileInputs> = (data) => {
        console.log(data)
        reset()
    }

    return (
        <div className="edit-profile-container">
            <p>Редактировать профиль</p>
            <form onSubmit={handleSubmit(onSubmit)} className="edit-profile-form profile-form">
                <label className="surname-lable">Фамилия</label>
                <input className='name-field' type="text" autoComplete="off" {...register("surname", { required: true})} />
                {errors.surname?.type === "required" && <span className="warning">Обязательное поле!</span>}

                <label className="name-lable">Имя</label>
                <input className='name-field' type="text" autoComplete="off" {...register("firstName", { required: true})} />
                {errors.firstName?.type === "required" && <span className="warning">Обязательное поле!</span>}

                <label className="last-name-lable">Отчество</label>
                <input className='name-field' type="text" autoComplete="off" {...register("lastName")} />

                <label className="telegram-url-lable">Telegram</label>
                <input type="text" autoComplete="off" {...register("telegramUrl", { required: true})} />
                {errors.telegramUrl?.type === "required" && <span className="warning">Обязательное поле!</span>}

                <label className="vk-url-lable">ВКонтакте</label>
                <input type="text" autoComplete="off" {...register("vkUrl", { required: true})} />
                {errors.vkUrl?.type === "required" && <span className="warning">Обязательное поле!</span>}

                <button disabled={isSubmitting || !isDirty} className="save-button">Сохранить изменения</button>
            </form>
        </div>
    )
})