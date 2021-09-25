import { FC } from 'react';
import { AppointmentTypes, AppointmentStatuses } from 'constants/Appointment';
import AppointmentModel from 'models/AppointmentModel';
import TextAvatar from 'components/common/TextAvatar';
import { formatDate } from 'utils';
import styles from './AppointmentItem.module.scss';

export interface Props extends AppointmentModel {
}

const AppointmentItem: FC<Props> = ({
  status,
  apptType,
  patientName,
  signeeName,
  supervisorName,
  serviceStart,
  serviceEnd,
}) => {
  let typeClassName = '';
  if (apptType === AppointmentTypes.TYPE_A) {
    typeClassName = styles.typeA;
  } else if (apptType === AppointmentTypes.TYPE_B) {
    typeClassName = styles.typeB;
  } else if (apptType === AppointmentTypes.TYPE_C) {
    typeClassName = styles.typeC;
  }

  return (
    <div className={styles.container}>
      <div className={styles.row1}>
        <span className={styles.patientName}>
          {patientName}
        </span>
        <span className={`${styles.apptType} ${typeClassName}`}>
          {apptType}
        </span>
      </div>
      {(status === AppointmentStatuses.PENDING || status === AppointmentStatuses.COMPLETED) && (
        <div className={styles.signeeRow}>
          <div className={styles.signeeWrapper}>
            <div>
              <div className={styles.label}>
                signed by
              </div>
              <TextAvatar
                text={signeeName[0]}
              />
              <span className={styles.signeeName}>
                {signeeName}
              </span>
            </div>
            {status === AppointmentStatuses.COMPLETED && (
              <div>
                <div className={styles.label}>
                  attested by
                </div>
                <TextAvatar
                  text={supervisorName[0]}
                />
                <span className={styles.signeeName}>
                  {supervisorName}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      <div className={styles.serviceDateRow}>
        <div className={styles.label}>
          service date
        </div>
        <div className={styles.serviceDate}>
          {formatDate(serviceStart)} - {formatDate(serviceEnd)}
        </div>
      </div>
    </div>
  );
}

export default AppointmentItem;
