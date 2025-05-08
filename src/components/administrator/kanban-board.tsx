import React, { useState } from "react";
import { StatusFormInputs } from "../../consts";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  Over,
  Active,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { NavLink, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEventStatusesQuery } from "../../fetch/event-statuses";
import { EventStatus } from "./event-status";
import { useCreateStatusMutation } from "../../fetch/create-status";
import { useUpdateStatusOrderMutation } from "../../fetch/update-status-order";

export const KanbanBoard: React.FC = React.memo(() => {
  const params = useParams();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  const [isCreateFailed, setIsCreateFailed] = useState(false);

  const { data: statuses, isLoading, isError } = useEventStatusesQuery(Number(params.id));

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StatusFormInputs>();

  const { mutateAsync: createStatus } = useCreateStatusMutation(
    Number(params.id),
    setIsCreateFailed,
    setIsAddModalOpen,
    setIsAnyModalOpen,
    reset
  );

  const { mutateAsync: updateStatusOrder } = useUpdateStatusOrderMutation(Number(params.id));

  const onSubmit: SubmitHandler<StatusFormInputs> = async (data) => {
    createStatus({
      name: data.name,
      displayOrder: statuses ? statuses.length + 1 : 1,
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = ({
    active,
    over,
  }: {
    active: Active;
    over: Over | null;
  }) => {
    if (!statuses || !active || !over || active.id === over.id) return;

    const oldIndex = statuses.findIndex((item) => item.id === active.id);
    const newIndex = statuses.findIndex((item) => item.id === over.id);
    const newStatusesOrder = arrayMove(statuses, oldIndex, newIndex);

    if (oldIndex >= 0 && newIndex >= 0) {
      newStatusesOrder.forEach((status, index) => {
        status.displayOrder = index + 1;
        updateStatusOrder({
          statusId: status.id,
          payload: {
            name: status.name,
            displayOrder: status.displayOrder,
          },
        });
      });
    }
  };

  if (isLoading) {
    return <p className="fetch-warnings">Загрузка...</p>;
  } else if (isError) {
    return <p className="fetch-warnings">При загрузке произошла ошибка</p>;
  } else if (statuses) {
    return (
      <>
        <div className="crm-module">
          <div className="crm-buttons">
            <button
              className="button-with-img"
              onClick={() => {
                setIsAddModalOpen(true);
                setIsAnyModalOpen(true);
              }}
              disabled={isAnyModalOpen}
            >
              <p>Добавить этап</p>
              <img src="/../../img/add-icon.svg" width="20" height="44"></img>
            </button>
            <NavLink to={`/admin/event/${params.id}/student-data-forms`}>
              <button className="nav-button-with-img" disabled={isAnyModalOpen}>
                <p>К формам</p>
                <img
                  src="/../../img/arrow-icon.svg"
                  width="20"
                  height="26"
                ></img>
              </button>
            </NavLink>
            <NavLink to={`/admin/event/${params.id}/setting-up-robots-and-triggers`}>
              <button className="nav-button-with-img" disabled={isAnyModalOpen}>
                <p>Настройка роботов и триггеров</p>
                <img
                  src="/../../img/setting-icon.svg"
                  width="26"
                  height="26"
                ></img>
              </button>
            </NavLink>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={statuses}
              strategy={horizontalListSortingStrategy}
              disabled={isAnyModalOpen}
            >
              <div className="stages-container">
                {statuses
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((status) => (
                    <EventStatus
                      key={status.id}
                      status={status}
                      isAnyModalOpen={isAnyModalOpen}
                      setIsAnyModalOpen={setIsAnyModalOpen}
                    />
                  ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {isAddModalOpen && (
          <div className="stage-modal-container">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="stage-modal add-stage-modal"
            >
              <h2>Добавление этапа</h2>
              <input
                placeholder="Название"
                type="text"
                className="stage-title"
                {...register("name", {
                  required: true,
                  maxLength: 50,
                  validate: (title) =>
                    title.trim().length > 0 ||
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
                <button className="add-button" disabled={isSubmitting}>
                  Сохранить
                </button>
                <button
                  className="cancel-button"
                  disabled={isSubmitting}
                  onClick={(evt) => {
                    evt.preventDefault();
                    setIsAddModalOpen(false);
                    setIsAnyModalOpen(false);
                    reset();
                  }}
                >
                  Отмена
                </button>
              </div>
              {isCreateFailed && (
                <p className="save-error">Не удалось сохранить статус</p>
              )}
            </form>
          </div>
        )}
      </>
    );
  }
});