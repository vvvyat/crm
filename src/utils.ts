import { EventStatus, Student, UserInfo } from "./consts";

const FormatDate = (date: string) => {
  return new Date(date).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const GetEventStatus = (condition: string) => {
  let statusBGColor = "#d9d9d9";
  let statusMessage = "Подготовка";

  switch (condition) {
    case EventStatus.Preparation:
      statusBGColor = "#d9d9d9";
      statusMessage = "Подготовка";
      break;
    case EventStatus.RegistrationIsOpen:
      statusBGColor = "greenyellow";
      statusMessage = "Регистрация открыта";
      break;
    case EventStatus.NoPlacesLeft:
      statusBGColor = "yellow";
      statusMessage = "Мест нет";
      break;
    case EventStatus.RegistrationIsClosed:
      statusBGColor = "orange";
      statusMessage = "Регистрация закрыта";
      break;
    case EventStatus.InProgress:
      statusBGColor = "cornflowerblue";
      statusMessage = "В процессе проведения";
      break;
    case EventStatus.Completed:
      statusBGColor = "indianred";
      statusMessage = "Завершено";
      break;
    case EventStatus.Hidden:
      statusBGColor = "grey";
      statusMessage = "Скрыто";
      break;
  }

  return { statusBGColor, statusMessage };
};

const FormatName = (user: Student | UserInfo) => {
  return user.surname
    ? `${user.lastName} ${user.firstName} ${user.surname}`
    : `${user.lastName} ${user.firstName}`;
};

export { FormatDate, GetEventStatus, FormatName };