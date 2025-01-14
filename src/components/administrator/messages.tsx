import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useMessagesQuery } from "../../fetch/messages";
import { useParams } from "react-router-dom";
import { useUpdateMessageMutation } from "../../fetch/update-message";
import { MessagesInputs } from "../../consts";

export const CreateMessages: React.FC = React.memo(() => {
    const params = useParams()
    const [isFailed, setIsFailed] = useState(false)
    const {data: messages, isLoading, isError} = useMessagesQuery(Number(params.id))


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<MessagesInputs>()

    useEffect(() => {
        if (messages) {
            reset({
                approvalMessage: messages.find((message) => message.messageStatus === "ACCEPTED")?.text,
                rejectionMessage: messages.find((message) => message.messageStatus === "DECLINED")?.text,
            });
        }
    }, [messages, reset]);

    const {mutateAsync: updateMessage} = useUpdateMessageMutation(setIsFailed, reset)

    const onSubmit: SubmitHandler<MessagesInputs> = (data) => {
        if (messages ) {
            const approvalMessageId = messages.find((message) => message.messageStatus === "ACCEPTED")?.id
            const rejectionMessageId = messages.find((message) => message.messageStatus === "DECLINED")?.id
            if (approvalMessageId) {
                updateMessage({
                    messageId: approvalMessageId,
                    text: data.approvalMessage
                })
            }  
            if (rejectionMessageId) {
                updateMessage({
                    messageId: rejectionMessageId,
                    text: data.rejectionMessage
                })
            }
        }
    }
    
    if (isLoading) {
        return <p className="fetch-warnings">Загрузка...</p>
    } else if (isError) {
        return <p className="fetch-warnings">При загрузке произошла ошибка</p>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="message-form">
            <label className="message-form-lable">Если зачислен на мероприятие:</label>
            <textarea className="approval" {...register("approvalMessage", { required: true })}></textarea>
            {errors.approvalMessage && <span className="messages-warning">Обязательное поле!</span>}

            <label className="message-form-lable">Если пришел отказ:</label>
            <textarea className="rejection" {...register("rejectionMessage", { required: true })}></textarea>
            {errors.rejectionMessage && <span className="messages-warning">Обязательное поле!</span>}
            
            <button disabled={isSubmitting || !isDirty} className="save-button messages-save-button">Сохранить</button>
            {isFailed && <p className="save-error">Не удалось сохранить изменения</p>}
        </form>
    )
})