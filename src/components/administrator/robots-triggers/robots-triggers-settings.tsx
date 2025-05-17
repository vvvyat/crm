import React from "react";
import { useParams } from "react-router-dom";
import { useEventStatusesQuery } from "../../../fetch/event-statuses";
import { EventStatus } from "./status-robots-triggers";

export const RobotsTriggersSettings: React.FC = React.memo(() => {
  const params = useParams();
  const { data: statuses, isLoading, isError } = useEventStatusesQuery(Number(params.id));

  if (isLoading) {
    return <p className="fetch-warnings">Загрузка...</p>;
  } else if (isError) {
    return <p className="fetch-warnings">При загрузке произошла ошибка</p>;
  } else if (statuses) {
    return (
      <>
        <div className="crm-module">
              <div className="stages-container stages-container-robots-triggers">
                {statuses
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((status) => (
                    <EventStatus
                      key={status.id}
                      status={status}
                    />
                  ))}
              </div>
        </div>
      </>
    );
  }
});