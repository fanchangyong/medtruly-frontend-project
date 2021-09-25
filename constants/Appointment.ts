
export enum AppointmentStatuses {
  PENDING = 'PENDING',
  NEED_REVIEW = 'NEED_REVIEW',
  COMPLETED = 'COMPLETED',
};

export const AppointmentStatusToTitles = {
  [AppointmentStatuses.PENDING]: 'Task',
  [AppointmentStatuses.NEED_REVIEW]: 'Review',
  [AppointmentStatuses.COMPLETED]: 'Done',
};

export enum AppointmentTypes {
  TYPE_A = 'TYPE_A',
  TYPE_B = 'TYPE_B',
  TYPE_C = 'TYPE_C',
};

export const AppointmentTypeToLabels = {
  [AppointmentTypes.TYPE_A]: 'Type A',
  [AppointmentTypes.TYPE_B]: 'Type B',
  [AppointmentTypes.TYPE_C]: 'Type C',
};
