import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
    approvalMessage: string;
    rejectionMessage: string;
}

export const CreateMessages: React.FC = React.memo(() => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="message-form">
            <label className="message-form-lable">Если зачислен на мероприятие:</label>
            <textarea className="approval" {...register("approvalMessage", { required: true })}></textarea>
            {errors.approvalMessage && <span className="messages-warning">Обязательное поле!</span>}

            <label className="message-form-lable">Если пришел отказ:</label>
            <textarea className="rejection" {...register("rejectionMessage", { required: true })}></textarea>
            {errors.rejectionMessage && <span className="messages-warning">Обязательное поле!</span>}
            
            <button disabled={isSubmitting} className="save-button messages-save-button">Сохранить</button>
        </form>
    )
})