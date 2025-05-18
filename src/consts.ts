export type EventData = {
  id: number;
  status: EventStatus;
  description: string;
  title: string;
  adminId: number;
  eventStartDate: string;
  eventEndDate: string;
  enrollmentStartDate: string;
  enrollmentEndDate: string;
  numberSeatsStudent: number;
  createdAt: string;
  updatedAt: string;
};

export type Student = {
  eventId: number;
  studentId: number;
  statusRequest: string;
  firstName: string;
  lastName: string;
  surname: string;
  competencies: string;
  telegramUrl: string;
  vkUrl: string;
  curatorFirstName: string;
  curatorLastName: string;
  curatorSurname: string;
};

export type Inputs = {
  title: string;
  descriptionText: string;
  eventStartDate: string;
  eventEndDate: string;
  enrollmentStartDate: string;
  enrollmentEndDate: string;
  numberSeatsStudent: number;
};

export type CreateUpdateEvent = {
  title: string;
  description: string;
  adminId: number;
  eventStartDate: string;
  eventEndDate: string;
  enrollmentStartDate: string;
  enrollmentEndDate: string;
  numberSeatsStudent: number;
  hasTest: boolean;
  testUrl: string | null;
};

export enum EventStatus {
  Preparation = "PREPARATION",
  RegistrationIsOpen = "REGISTRATION_OPEN",
  NoPlacesLeft = "NO_SEATS",
  RegistrationIsClosed = "REGISTRATION_CLOSED",
  InProgress = "IN_PROGRESS",
  Completed = "FINISHED",
  Hidden = "HIDDEN",
  Deleted = "DELETED",
}

export const SERVER_URL = "https://localhost/api";

export type AuthorizationInputs = {
  email: string;
  password: string;
};

export enum Roles {
  Administrator = "ADMIN",
}

export type RegistrationInputs = {
  lastName: string;
  firstName: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  competencies: string;
  role: Roles;
  telegramUrl: string;
  vkUrl: string;
};

export type ManagerRegistrationInputs = {
  lastName: string;
  firstName: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  telegramUrl: string;
  vkUrl: string;
};

export type RegistrationPayload = {
  firstName: string;
  lastName: string;
  surname: string;
  email: string;
  sign: string;
  telegramUrl: string;
  vkUrl: string;
  role: Roles;
  competencies: string;
};

export type ManagerRegistrationPayload = {
  firstName: string;
  lastName: string;
  surname: string;
  email: string;
  sign: string;
  telegramUrl: string;
  vkUrl: string;
};

export type UserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  surname: string;
  telegramUrl: string;
  vkUrl: string;
  role_enum: Roles;
  competencies: string;
};

export type EditProfile = {
  firstName: string;
  lastName: string;
  surname: string;
  telegramUrl: string;
  vkUrl: string;
  competencies: string;
};

export type EmailInputs = {
  oldEmail: string;
  newEmail: string;
};

export type PasswordInputs = {
  oldPassword: string;
  newPassword: string;
};

export type Message = {
  id: number;
  eventId: number;
  text: string;
  messageStatus: string;
  editDate: string;
};

export type UpdateMessage = {
  messageId: number;
  text: string;
};

export type Status = {
  id: number;
  name: string;
  isSystem: boolean;
  displayOrder: number;
  updatedAt: string;
};

export type CreateUpdateStatus = {
  name: string;
  displayOrder: number;
};

export type StatusFormInputs = {
  name: string;
};

export type UpdateStatusOrder = {
  statusId: number;
  payload: CreateUpdateStatus;
};

export type FormsStandardField = {
  id: number | undefined;
  name: string;
  type: string;
  isRequired: boolean;
  displayOrder: number;
  options: string[];
};

export type FormsSystemField = {
  id: number;
  name: string;
  type: string;
  isRequired: boolean;
  displayOrder: number;
};

export type Form = {
  formId: number;
  eventId: number;
  title: string;
  isTemplate: boolean;
  systemFields: FormsSystemField[];
  customFields: FormsStandardField[];
};

type CustomField = {
  isRequired: boolean;
  displayOrder: number;
};

type CustomFields = {
  [key: number]: CustomField;
};

type SystemFields = {
  [key: number]: number;
};

export type CreateUpdateForm = {
  eventId: number;
  title: string;
  isTemplate: boolean;
  customFields: CustomFields;
  systemFields: SystemFields;
};

export type CreateFormInputs = {
  title: string;
};

export type Props = {
  [key: string]: string | number;
};

export type StudentRequest = {
  id: number;
  eventId: number;
  statusId: number;
  formData: Props;
  createdAt: string;
  updatedAt: string;
};

export type RequestData = {
  eventId: number;
  formData: { [key: string]: string | number };
};

export enum RobotType {
  Message = "SEND_MESSAGE",
  MessageWithLink = "SEND_MESSAGE_WITH_LINK",
  MessageWithTest = "SEND_TEST",
}

export type Robot = {
  id: number;
  statusId: number;
  name: string;
  type: RobotType;
  parameters: Props;
  position: number;
};

export type AddRobotWithLink = {
  name: string;
  type: RobotType;
  message: string;
  link: string;
};

export type AddRobot = {
  name: string;
  type: RobotType;
  message: string;
};

export type EditRobotWithLink = {
  name: string;
  message: string;
  link: string;
};

export type EditRobot = {
  name: string;
  message: string;
};

export type RobotWithLinkInputs = {
  name: string;
  type: RobotType;
  message: string;
  link: string;
};

export type RobotInputs = {
  name: string;
  type: RobotType;
  message: string;
};

export type Trigger = {
  id: number;
  name: string;
  type: string;
  parameters: Props;
  createdAt: string;
};

export type AddTrigger = {
  triggerId: number;
  parameters: Props;
};

export enum TriggerType {
  LinkClick = "LINK_CLICK",
  TestResult = "TEST_RESULT",
}

export enum TriggerTypeId {
  LinkClick = 1,
  TestResult = 2,
}

export type TriggerLinkInputs = {
  link: string;
}

export type TriggerTestInputs = {
  value: number;
  condition: string;
}