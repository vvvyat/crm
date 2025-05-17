import React, { useState } from "react";
import { Robot, Status } from "../../../consts";
import { ConfigProvider, List } from "antd";
//import { useParams } from "react-router-dom";
import { useRobotsQuery } from "../../../fetch/status-robots";
import { useTriggersQuery } from "../../../fetch/status-triggers";
import { AddRobotModal } from "./add-robot-modal";
import { EditRobotModal } from "./edit-robot-modal";

export const EventStatus: React.FC<{
  status: Status;
}> = React.memo(({ status }) => {
  //const params = useParams();

  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);

  const [isAddRobotModalOpen, setIsAddRobotModalOpen] = useState(false);
  const [isEditRobotModalOpen, setIsEditRobotModalOpen] = useState(false)
  const [robot, setRobot] = useState<Robot | undefined>()

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const { data: triggers, isError: triggersError } = useTriggersQuery(status.id);
  const { data: robots, isError: robotsError } = useRobotsQuery(status.id);

  return (
    <>
      <div className="stage" key={`${status.id}`}>
        <div className="stage-header">
          <p>
            <b>{status.name}</b>
          </p>
        </div>

        <div className="triggers">
          <div className="triggers-robots-header">
            <p>Триггеры</p>
            <img
              src="/../../img/add-icon.svg"
              width="20"
              height="20"
              title="Добавить"
              onClick={() => {}}
            />
          </div>
          {triggersError && (
            <p className="list-message">При загрузке произошла ошибка.</p>
          )}
          {!triggersError && triggers && triggers.length > 0 && (
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
                  pageSize: 2,
                }}
                dataSource={triggers}
                renderItem={(item) => (
                  <List.Item
                    className="participant robot-trigger"
                    key={item.id}
                    onClick={() => {
                      if (!isAnyModalOpen) {
                        setIsAnyModalOpen(true);
                      }
                    }}
                  >
                    <p>{item.name}</p>
                    <div className="robot-trigger-buttons">
                      <img
                        src="/../../img/edit-icon.svg"
                        width="18"
                        height="18"
                        title="Редактировать"
                        onClick={() => {
                          if (!isAnyModalOpen) {
                            setIsEditRobotModalOpen(true);
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
                  </List.Item>
                )}
              />
            </ConfigProvider>
          )}
          {!triggersError && triggers?.length === 0 && (
            <p className="list-message">Нет триггеров.</p>
          )}
        </div>

        <div className="robots">
          <div className="triggers-robots-header">
            <p>Роботы</p>
            <img
              src="/../../img/add-icon.svg"
              width="20"
              height="20"
              title="Добавить"
              onClick={() => {
                setIsAddRobotModalOpen(true)
                setIsAnyModalOpen(true)
              }}
            />
          </div>
          {robotsError && (
            <p className="list-message">При загрузке произошла ошибка.</p>
          )}
          {!robotsError && robots && robots.length > 0 && (
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
                  pageSize: 2,
                }}
                dataSource={robots}
                renderItem={(item) => (
                  <List.Item
                    className="participant robot-trigger"
                    key={item.id}
                  >
                    <p>{item.name}</p>
                    <div className="robot-trigger-buttons">
                      <img
                        src="/../../img/edit-icon.svg"
                        width="18"
                        height="18"
                        title="Редактировать"
                        onClick={() => {
                          if (!isAnyModalOpen) {
                            setRobot(item)
                            setIsEditRobotModalOpen(true);
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
                  </List.Item>
                )}
              />
            </ConfigProvider>
          )}
          {!robotsError && robots?.length === 0 && (
            <p className="list-message">Нет роботов.</p>
          )}
        </div>
      </div>

      {isAddRobotModalOpen && <AddRobotModal statusId={Number(status.id)} setIsAddRobotModalOpen={setIsAddRobotModalOpen} setIsAnyModalOpen={setIsAnyModalOpen}/>}

      {isEditRobotModalOpen && <EditRobotModal statusId={Number(status.id)} robot={robot} setIsEditRobotModalOpen={setIsEditRobotModalOpen} setIsAnyModalOpen={setIsAnyModalOpen}/>}

      {isDeleteConfirmOpen && <></>}     
    </>
  );
});

/*
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
*/