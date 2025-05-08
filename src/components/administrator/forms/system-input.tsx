import React from "react";
import { GetFieldTitle } from "../../../utils";
import { FormsSystemField } from "../../../consts";

export const SystemInput: React.FC<{
  field: FormsSystemField;
}> = React.memo(({ field }) => {
  return (
    <input
      key={field.id}
      placeholder={GetFieldTitle(field.name)}
      type={field.type}
    />
  );
});