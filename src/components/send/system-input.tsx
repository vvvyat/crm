import React from "react";
import { GetFieldTitle } from "../../utils";
import { FormsSystemField } from "../../consts";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export const SystemInput: React.FC<{
  fieldData: FormsSystemField;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  isSubmitting: boolean;
}> = React.memo(({ fieldData, register, errors, isSubmitting }) => {
  return (
    <>
      <input
        key={fieldData.id}
        placeholder={GetFieldTitle(fieldData.name)}
        type={fieldData.type}
        disabled={isSubmitting}
        {...register(fieldData.name, {
          required: fieldData.isRequired,
          maxLength: 100,
          validate: (input) =>
            input.trim().length > 0,
        })}
      />
      {errors[fieldData.name]?.type === "required" && (
        <span className="warning">Обязательное поле!</span>
      )}
      {errors[fieldData.name]?.type === "maxLength" && (
          <span className="warning">Максимальная длина 100 символов.</span>
        )}
      {errors[fieldData.name]?.type === "validate" && <span className="warning">Строка должна содержать символы кроме пробела.</span>}
    </>
  );
});
