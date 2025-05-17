import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEditFormMutation } from "../../../fetch/edit-form";
import { CreateFormInputs, FormsStandardField } from "../../../consts";
import { SystemInput } from "./system-input";
import { Textarea } from "./textarea";
import { MySelect } from "./select";
import { MyInput } from "./input";
import { AddFieldSelect } from "./add-field-select";
import { useFormQuery } from "../../../fetch/form";
import { useFormsStandardFieldsQuery } from "../../../fetch/forms-standard-fields";

export const EditForm: React.FC = React.memo(() => {
  const params = useParams();
  const [isFailed, setIsFailed] = useState(false);
  const [addedFields, setAddedFields] = useState<
    FormsStandardField[] | undefined
  >();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateFormInputs>();

  const { data: form, isLoading, isError } = useFormQuery(Number(params.id));
  const { data: formStandardFields } = useFormsStandardFieldsQuery();

  const { mutateAsync: createForm } = useEditFormMutation(setIsFailed, reset);

  useEffect(() => {
    if (form) {
      reset({
        title: form.title,
      });
      setAddedFields(
        form.customFields.map((field) => {
          return {
            ...field,
            id: formStandardFields?.find((f) => f.name === field.name)?.id,
          };
        })
      );
    }
  }, [form, reset, formStandardFields]);

  const onSubmit: SubmitHandler<CreateFormInputs> = async (data) => {
    createForm({
      eventId: Number(params.id),
      title: data.title,
      isTemplate: true,
      customFields: addedFields
        ? addedFields.reduce(
            (a, field) => ({
              ...a,
              [field.id || 0]: {
                isRequired: field.isRequired,
                displayOrder: field.displayOrder,
              },
            }),
            {}
          )
        : {},
      systemFields: form
        ? form.systemFields.reduce(
            (a, field) => ({ ...a, [field.id]: field.displayOrder }),
            {}
          )
        : {},
    });
  };

  if (isLoading) {
    return <p className="fetch-warnings">Загрузка...</p>;
  } else if (isError) {
    return <p className="fetch-warnings">При загрузке произошла ошибка</p>;
  } else if (form) {
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

          {form.systemFields
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((field) => (
              <SystemInput key={field.id} field={field} />
            ))}

          {addedFields
            ?.sort((a, b) => a.displayOrder - b.displayOrder)
            .map((field) => {
              if (field.type === "textarea") {
                return (
                  <Textarea
                    key={field.id}
                    field={field}
                    addedFields={addedFields}
                    setAddedFields={setAddedFields}
                  />
                );
              } else if (field.type === "select") {
                return (
                  <MySelect
                    key={field.id}
                    field={field}
                    addedFields={addedFields}
                    setAddedFields={setAddedFields}
                  />
                );
              }
              return (
                <MyInput
                  key={field.id}
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
              Сoxранить изменения
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