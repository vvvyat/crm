import React, { useState } from "react";
import { Trigger } from "../../../consts";
import { useDeleteTriggerMutation } from "../../../fetch/delete-trigger";

export const DeleteTriggerModal: React.FC<{
  statusId: number;
  trigger: Trigger | undefined;
  setIsDeleteConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(
  ({ statusId, trigger, setIsDeleteConfirmOpen, setIsAnyModalOpen }) => {
    const [isFailed, setIsFailed] = useState(false);

    const { mutateAsync: deleteTrigger } = useDeleteTriggerMutation(
      statusId,
      trigger?.id || 0,
      setIsDeleteConfirmOpen,
      setIsAnyModalOpen,
      setIsFailed
    );

    return (
      <>
        <div className="stage-modal-container">
          <div className="stage-modal delete-robot-modal">
            <h2>
              Вы уверены, что хотите
              <br />
              удалить триггер?
            </h2>

            <div className="stage-modal-buttons">
              <button
                className="delete-button"
                onClick={async () => deleteTrigger()}
              >
                Удалить
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setIsAnyModalOpen(false);
                  setIsFailed(false);
                }}
              >
                Отмена
              </button>
            </div>
            {isFailed && (
              <p className="save-error">Не удалось удалить триггер.</p>
            )}
          </div>
        </div>
      </>
    );
  }
);