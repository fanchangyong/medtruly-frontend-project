import { AppointmentStatuses, AppointmentTypes } from 'constants/Appointment';

export default interface AppointmentModel {
  id: number;
  status: AppointmentStatuses;
  apptType: AppointmentTypes;
  patientName: string;
  signeeName: string;
  supervisorName: string;
  serviceStart: string;
  serviceEnd: string;
  description: string;
}
