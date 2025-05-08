import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useFormsSystemFieldsQuery } from "../../../fetch/forms-system-fields";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateEditFormMutation } from "../../../fetch/create-edit-form";
import {
  CreateFormInputs,
  FormsStandardField,
  FormsSystemField,
} from "../../../consts";
import { SystemInput } from "./system-input";
import { Textarea } from "./textarea";
import { MySelect } from "./select";
import { MyInput } from "./input";
import { AddFieldSelect } from "./add-field-select";

export const CreateForm: React.FC = React.memo(() => {
  const params = useParams();

  const [isFailed, setIsFailed] = useState(false);

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateFormInputs>();

  const {
    data: formSystemFields,
    isLoading: systemFieldsLoading,
    isError: systemFieldsError,
  } = useFormsSystemFieldsQuery();

  const { mutateAsync: createForm } = useCreateEditFormMutation(
    setIsFailed,
    reset
  );

  const [addedFields, setAddedFields] = useState<FormsStandardField[]>([]);
  const [systemFields] = useState<FormsSystemField[]>(
    formSystemFields ? formSystemFields : []
  );

  const onSubmit: SubmitHandler<CreateFormInputs> = async (data) => {
    createForm({
      eventId: Number(params.id),
      title: data.title,
      isTemplate: true,
      customFields: addedFields.reduce(
        (a, field) => ({
          ...a,
          [field.id]: {
            isRequired: field.isRequired,
            displayOrder: field.displayOrder,
          },
        }),
        {}
      ),
      systemFields: systemFields.reduce(
        (a, field) => ({ ...a, [field.id]: field.displayOrder }),
        {}
      ),
    });
  };

  if (systemFieldsLoading) {
    return <p className="fetch-warnings">Загрузка...</p>;
  } else if (systemFieldsError) {
    return <p className="fetch-warnings">При загрузке произошла ошибка</p>;
  } else if (formSystemFields) {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
          <input
            placeholder="Введите название формы"
            type="text"
            className="form-name"
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

          {systemFields
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((field) => (
              <SystemInput field={field} />
            ))}

          {addedFields
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((field) => {
              if (field.type === "textarea") {
                return (
                  <Textarea
                    field={field}
                    addedFields={addedFields}
                    setAddedFields={setAddedFields}
                  />
                );
              } else if (field.type === "select") {
                return (
                  <MySelect
                    field={field}
                    addedFields={addedFields}
                    setAddedFields={setAddedFields}
                  />
                );
              }
              return (
                <MyInput
                  field={field}
                  addedFields={addedFields}
                  setAddedFields={setAddedFields}
                />
              );
            })}

          <AddFieldSelect
            addedFields={addedFields}
            setAddedFields={setAddedFields}
          />

          <div className="create-form-buttons">
            <button disabled={isSubmitting} className="create-button">
              Создать
            </button>
            <NavLink to={`/admin/event/${params.id}/student-data-forms`}>
              <button disabled={isSubmitting} className="go-back-button">
                Отмена
              </button>
            </NavLink>
          </div>
          {isFailed && <p className="save-error">Не удалось создать форму</p>}
        </form>
      </>
    );
  }
});