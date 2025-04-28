import React, { useEffect, useState } from "react";
import { Status, StatusFormInputs } from "../../consts";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { SubmitHandler, useForm } from "react-hook-form";
import { ConfigProvider, List } from "antd";
import { useDeleteStatusMutation } from "../../fetch/delete-status";
import { useUpdateStatusMutation } from "../../fetch/update-status";

export const EventStatus: React.FC<{
  status: Status;
  isAnyModalOpen: boolean;
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({ status, isAnyModalOpen, setIsAnyModalOpen }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleteFailed, setIsDeleteFailed] = useState(false);
  const [isEditFailed, setIsEditFailed] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<StatusFormInputs>();

  useEffect(() => {
    if (status) {
      reset({
        name: status.name,
      });
    }
  }, [status, reset]);

  const { mutateAsync: updateStatus } = useUpdateStatusMutation(
    Number(status.id),
    setIsEditModalOpen,
    setIsAnyModalOpen,
    reset,
    setIsEditFailed
  );

  const { mutateAsync: deleteStatus } = useDeleteStatusMutation(
    Number(status.id),
    setIsDeleteConfirmOpen,
    setIsAnyModalOpen,
    setIsDeleteFailed
  );

  const onSubmit: SubmitHandler<StatusFormInputs> = async (data) => {
    updateStatus({
      name: data.name,
      displayOrder: status.displayOrder,
    });
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: status.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        className="stage"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        key={`${status.id}`}
      >
        <div className="stage-header">
          <p>
            <b>{status.name}</b>
          </p>
          <div className="stage-buttons">
            <img
              src="/../../img/edit-icon.svg"
              width="18"
              height="18"
              title="Редактировать"
              onClick={() => {
                if (!isAnyModalOpen) {
                  setIsEditModalOpen(true);
                  setIsAnyModalOpen(true);
                }
              }}
            ></img>
            <img
              src="/../../img/delete-icon.svg"
              width="18"
              height="18"
              title="Удалить"
              onClick={() => {
                if (!isAnyModalOpen) {
                  setIsDeleteConfirmOpen(true);
                  setIsAnyModalOpen(true);
                }
              }}
            ></img>
          </div>
        </div>
        
      </div>

      {isEditModalOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="stage-modal add-stage-modal"
        >
          <h2>Редактирование этапа</h2>
          <input
            type="text"
            className="stage-title"
            placeholder="Название"
            {...register("name", {
              required: true,
              maxLength: 50,
              validate: (name) =>
                name.trim().length > 0 ||
                "Название должно содержать символы кроме пробела.",
            })}
          ></input>
          {errors.name?.type === "required" && (
            <span className="warning">Обязательное поле!</span>
          )}
          {errors.name?.type === "maxLength" && (
            <span className="warning">Максимальная длина 50 символов.</span>
          )}
          {errors.name && (
            <span className="warning">{errors.name.message}</span>
          )}
          <div className="stage-modal-buttons">
            <button className="edit-button" disabled={isSubmitting || !isDirty}>
              Редактировать
            </button>
            <button
              className="cancel-button"
              disabled={isSubmitting}
              onClick={(evt) => {
                evt.preventDefault();
                setIsEditModalOpen(false);
                setIsAnyModalOpen(false);
                reset();
              }}
            >
              Отмена
            </button>
          </div>
          {isEditFailed && (
            <p className="save-error">Не удалось сохранить изменения</p>
          )}
        </form>
      )}

      {isDeleteConfirmOpen && (
        <div
          className="stage-modal delete-stage-modal"
          style={{ filter: "none", zIndex: "10" }}
        >
          <h2>Вы уверены, что хотите удалить этот этап?</h2>
          <div className="stage-modal-buttons">
            <button
              className="delete-button"
              disabled={isSubmitting}
              onClick={async () => deleteStatus()}
            >
              Удалить
            </button>
            <button
              className="cancel-button"
              disabled={isSubmitting}
              onClick={() => {
                setIsDeleteConfirmOpen(false);
                setIsAnyModalOpen(false);
              }}
            >
              Отмена
            </button>
          </div>
          {isDeleteFailed && (
            <p className="save-error">Не удалось удалить статус</p>
          )}
        </div>
      )}
    </>
  );
});
