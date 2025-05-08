import React, { useEffect, useState } from "react";
import { Status, StatusFormInputs } from "../../consts";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { SubmitHandler, useForm } from "react-hook-form";
import { ConfigProvider, List } from "antd";
import { useDeleteStatusMutation } from "../../fetch/delete-status";
import { useUpdateStatusMutation } from "../../fetch/update-status";
import { useParams } from "react-router-dom";

const participants = [
  {
    id: 1,
    name: "Иванов Иван Иванович",
  },
  {
    id: 2,
    name: "Петров Петр Петрович",
  },
  {
    id: 3,
    name: "Сидорова Анна Сергеевна",
  },
  {
    id: 4,
    name: "Смирнов Алексей Викторович",
  },
  {
    id: 5,
    name: "Кузнецова Екатерина Андреевна",
  },
  {
    id: 6,
    name: "Николаев Николай Степанович",
  },
  {
    id: 7,
    name: "Васильева Мария Павловна",
  },
  {
    id: 8,
    name: "Орлов Сергей Валерьевич",
  },
  {
    id: 9,
    name: "Федотова Ольга Дмитриевна",
  },
  {
    id: 10,
    name: "Зайцева Светлана Игоревна",
  },
];

export const EventStatus: React.FC<{
  status: Status;
  isAnyModalOpen: boolean;
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({ status, isAnyModalOpen, setIsAnyModalOpen }) => {
  const params = useParams();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isStudentInfoModalOpen, setIsStudentInfoModalOpen] = useState(false);
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
    Number(params.id),
    Number(status.id),
    setIsEditModalOpen,
    setIsAnyModalOpen,
    reset,
    setIsEditFailed
  );

  const { mutateAsync: deleteStatus } = useDeleteStatusMutation(
    Number(params.id),
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

  const studentFakeData = {
    eventId: 1,
    formData: {
      "Фамилия": "Иванов",
      "Имя": "Иван",
      "Отчество": "Иванович",
      "Email": "ivan@example.com",
      "Telegram": "https://t.me/ivanov",
      "ВКонтакте": "https://vk.com/ivanov",
      "Курс обучения": "3",
      "Навыки и компетенции": "Figma",
      }
  }

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
        <ConfigProvider
          theme={{
            token: {
              colorPrimaryHover: "black",
              colorPrimary: "black",
              fontSize: 16,
              fontFamily: "Philosopher",
              colorText: "black",
            },
            components: {
              Pagination: {
                itemInputBg: "#d9d9d9",
              },
            },
          }}
        >
          <List
            className="participants-list"
            itemLayout="vertical"
            pagination={{
              align: "center",
              hideOnSinglePage: true,
              showLessItems: true,
              simple: true,
              pageSize: 4,
            }}
            dataSource={participants}
            renderItem={(item) => (
              <List.Item className="participant" key={item.id} onClick={() => {
                if (!isAnyModalOpen) {
                  setIsStudentInfoModalOpen(true)
                  setIsAnyModalOpen(true);
                }
              }}>
                <p>{item.name}</p>
              </List.Item>
            )}
          />
        </ConfigProvider>
      </div>

      {isEditModalOpen && (
        <div className="stage-modal-container">
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
              <button
                className="edit-button"
                disabled={isSubmitting || !isDirty}
              >
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
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="stage-modal-container">
          <div className="stage-modal delete-stage-modal">
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
        </div>
      )}

      {isStudentInfoModalOpen && (
        <div className="stage-modal-container">
          <div className="stage-modal stage-student-info-modal">
            {Object.keys(studentFakeData.formData).map((key, index) => {
              return <p className="student-info-field"><b>{key}</b>: {Object.values(studentFakeData.formData)[index]}</p>
            })}
            <div className="test-result">
              <img src="/../../img/star.svg"
              width="30"
              height="30"/>
              <p><b>Результаты тестирования:</b> 87/100</p>
            </div>
            <div className="stage-modal-buttons">
              <button
                className="cancel-button"
                disabled={isSubmitting}
                onClick={() => {
                  setIsStudentInfoModalOpen(false);
                  setIsAnyModalOpen(false);
                }}
              >
                Закрыть
              </button>
              </div>
          </div>
        </div>
      )}
    </>
  );
});
