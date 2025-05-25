import React, { useState } from "react";
import { Robot, Status, Trigger } from "../../../consts";
import { ConfigProvider, List } from "antd";
import { useRobotsQuery } from "../../../fetch/status-robots";
import { useTriggersQuery } from "../../../fetch/status-triggers";
import { AddRobotModal } from "./add-robot-modal";
import { EditRobotModal } from "./edit-robot-modal";
import { DeleteRobotModal } from "./delete-robot-modal";
import { AddTriggerModal } from "./add-trigger-modal";
import { DeleteTriggerModal } from "./delete-trigger-modal";
import { EditTriggerModal } from "./edit-trigger-modal";

export const EventStatus: React.FC<{
  status: Status;
}> = React.memo(({ status }) => {
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);

  const [isAddRobotModalOpen, setIsAddRobotModalOpen] = useState(false);
  const [isEditRobotModalOpen, setIsEditRobotModalOpen] = useState(false);
  const [isDeleteRobotConfirmOpen, setIsDeleteRobotConfirmOpen] =
    useState(false);
  const [robot, setRobot] = useState<Robot | undefined>();

  const [isAddTriggerModalOpen, setIsAddTriggerModalOpen] = useState(false);
  const [isEditTriggerModalOpen, setIsEditTriggerModalOpen] = useState(false);
  const [isDeleteTriggerConfirmOpen, setIsDeleteTriggerConfirmOpen] =
    useState(false);
  const [trigger, setTrigger] = useState<Trigger | undefined>();

  const { data: triggers, isError: triggersError } = useTriggersQuery(
    status.id
  );
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
              onClick={() => {
                setIsAddTriggerModalOpen(true);
                setIsAnyModalOpen(true);
              }}
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
              }}
            >
              <List
                className="participants-list"
                itemLayout="vertical"
                dataSource={triggers}
                renderItem={(item) => (
                  <List.Item
                    className="participant robot-trigger trigger"
                    key={item.id}
                  >
                    <p>
                      {item.name.length > 27
                        ? `${item.name.slice(0, 27)}...`
                        : item.name}
                    </p>
                    <div className="robot-trigger-buttons">
                      <img
                        src="/../../img/edit-icon.svg"
                        width="18"
                        height="18"
                        title="Редактировать"
                        onClick={() => {
                          if (!isAnyModalOpen) {
                            setTrigger(item);
                            setIsEditTriggerModalOpen(true);
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
                            setTrigger(item);
                            setIsDeleteTriggerConfirmOpen(true);
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
                setIsAddRobotModalOpen(true);
                setIsAnyModalOpen(true);
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
                    itemInputBg: "#eaeae9",
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
                    <p>
                      {item.name.length > 24
                        ? `${item.name.slice(0, 24)}...`
                        : item.name}
                    </p>
                    <div className="robot-trigger-buttons">
                      <img
                        src="/../../img/edit-icon.svg"
                        width="18"
                        height="18"
                        title="Редактировать"
                        onClick={() => {
                          if (!isAnyModalOpen) {
                            setRobot(item);
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
                            setRobot(item);
                            setIsDeleteRobotConfirmOpen(true);
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

      {isAddTriggerModalOpen && (
        <AddTriggerModal
          statusId={Number(status.id)}
          setIsAddTriggerModalOpen={setIsAddTriggerModalOpen}
          setIsAnyModalOpen={setIsAnyModalOpen}
        />
      )}

      {isEditTriggerModalOpen && (
        <EditTriggerModal
          statusId={Number(status.id)}
          trigger={trigger}
          setIsEditTriggerModalOpen={setIsEditTriggerModalOpen}
          setIsAnyModalOpen={setIsAnyModalOpen}
        />
      )}

      {isDeleteTriggerConfirmOpen && (
        <DeleteTriggerModal
          statusId={Number(status.id)}
          trigger={trigger}
          setIsDeleteConfirmOpen={setIsDeleteTriggerConfirmOpen}
          setIsAnyModalOpen={setIsAnyModalOpen}
        />
      )}

      {isAddRobotModalOpen && (
        <AddRobotModal
          statusId={Number(status.id)}
          setIsAddRobotModalOpen={setIsAddRobotModalOpen}
          setIsAnyModalOpen={setIsAnyModalOpen}
        />
      )}

      {isEditRobotModalOpen && (
        <EditRobotModal
          statusId={Number(status.id)}
          robot={robot}
          setIsEditRobotModalOpen={setIsEditRobotModalOpen}
          setIsAnyModalOpen={setIsAnyModalOpen}
        />
      )}

      {isDeleteRobotConfirmOpen && (
        <DeleteRobotModal
          statusId={Number(status.id)}
          robot={robot}
          setIsDeleteConfirmOpen={setIsDeleteRobotConfirmOpen}
          setIsAnyModalOpen={setIsAnyModalOpen}
        />
      )}
    </>
  );
});