import React, { useState } from "react";
import { Robot } from "../../../consts";
import { useDeleteRobotMutation } from "../../../fetch/delete-robot";

export const DeleteRobotModal: React.FC<{
  statusId: number;
  robot: Robot | undefined;
  setIsDeleteConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({ statusId, robot, setIsDeleteConfirmOpen, setIsAnyModalOpen }) => {
  const [isFailed, setIsFailed] = useState(false);

  const {mutateAsync: deleteRobot} = useDeleteRobotMutation(statusId, robot?.id || 0, setIsDeleteConfirmOpen, setIsAnyModalOpen, setIsFailed)

  return (
    <>
      <div className="stage-modal-container">
        <div className="stage-modal delete-robot-modal">
          <h2>Вы уверены, что хотите<br/>удалить робота?</h2>

          <div className="stage-modal-buttons">
              <button
                className="delete-button"
                onClick={async () => deleteRobot()}
              >
                Удалить
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setIsAnyModalOpen(false);
                  setIsFailed(false)
                }}
              >
                Отмена
              </button>
            </div>
            {isFailed && (
              <p className="save-error">Не удалось удалить робота.</p>
            )}
        </div>
      </div>
    </>
  );
});