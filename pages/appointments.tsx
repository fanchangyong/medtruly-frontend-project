import type { NextPage } from 'next';
import React, { useState, useMemo, useEffect } from 'react';

import Input from 'components/common/Input';
import Select, { Option } from 'components/common/Select';

import Column from 'components/modules/appointments/Column';
import AppointmentItem from 'components/modules/appointments/AppointmentItem';
import AppointmentModel from 'models/AppointmentModel';
import { getFullName, getMonthString } from 'utils';

import {
  AppointmentStatuses,
  AppointmentStatusToTitles,
  AppointmentTypeToLabels,
  AppointmentTypes,
} from 'constants/Appointment';

import styles from 'styles/Appointments.module.scss';

const json = require('data/appointments.json');

const allAppointments: AppointmentModel[] = json.data.allNotes.edges.map((appt: any) => {
  return {
    id: appt.id,
    status: appt.status,
    apptType: appt.type,
    patientName: getFullName(appt.patient.account?.firstName, appt.patient.account?.lastName),
    signeeName: getFullName(appt.signee?.account?.firstName, appt.signee?.account?.lastName),
    supervisorName: getFullName(appt.supervisor?.account?.firstName, appt.supervisor?.account?.lastName),
    serviceStart: appt.serviceStart,
    serviceEnd: appt.serviceEnd,
    description: appt.description,
  };
});

const AppointmentsPage: NextPage = () => {
  const [availableTypes, setAvailableTypes] = useState<Set<AppointmentTypes>>(new Set());
  const [availableMonths, setAvailableMonths] = useState<Set<string>>(new Set());

  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentModel[]>(allAppointments);

  const [search, setSearch] = useState<string>('');
  const [periodFilter, setPeriodFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  useEffect(() => {
    const filtered = allAppointments.filter((appt) => {
      if (search && !appt.patientName.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (typeFilter !== 'All' && appt.apptType !== typeFilter) {
        return false;
      }
      if (periodFilter !== 'All' && getMonthString(appt.serviceStart) !== periodFilter) {
        return false;
      }
      return true;
    });
    setFilteredAppointments(filtered);
  }, [search, typeFilter, periodFilter]);

  const handleChangeSearch = (value: string) => {
    setSearch(value);
  };

  const handleChangePeriodFilter = (value: string) => {
    setPeriodFilter(value);
  }

  const handleChangeTypeFilter = (value: string) => {
    setTypeFilter(value);
  }

  const appointmentsByStatus = useMemo(() => {
    return filteredAppointments.reduce((acc, appt) => {
      const {
        status,
      } = appt;

      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(appt);

      return acc;
    }, {} as Record<AppointmentStatuses, AppointmentModel[]>);
  }, [filteredAppointments]);

  useEffect(() => {
    const typeSet = new Set<AppointmentTypes>();
    const monthSet = new Set<string>();
    allAppointments.forEach((appt) => {
      const {
        apptType,
        serviceStart,
      } = appt;
      if (!typeSet.has(apptType)) {
        typeSet.add(apptType);
      }
      const monthString = getMonthString(serviceStart);
      if (!monthSet.has(monthString)) {
        monthSet.add(monthString);
      }
    });
    setAvailableTypes(typeSet);
    setAvailableMonths(monthSet);
  }, []);

  const periodOptions: Option[] = [];
  for (let monthString of Array.from(availableMonths).sort()) {
    periodOptions.push({
      label: monthString,
      value: monthString,
    });
  }

  const typeOptions: Option[] = [];
  for (let type of Array.from(availableTypes)) {
    typeOptions.push({
      label: AppointmentTypeToLabels[type],
      value: type,
    });
  }

  const columnStatuses = [AppointmentStatuses.PENDING, AppointmentStatuses.NEED_REVIEW, AppointmentStatuses.COMPLETED];

  return (
    <div className={styles.container}>
      <div className={styles.sideNav}>
        <div className={styles.navItemContainer}>
          <Input
            placeholder="Search..."
            style={{ width: '100%' }}
            handleChange={handleChangeSearch}
          />
        </div>
        <div className={styles.navItemContainer}>
          <div className={styles.filterItemLabel}>
            period
          </div>
          <Select
            value={periodFilter}
            style={{ width: '100%' }}
            options={periodOptions}
            handleChange={handleChangePeriodFilter}
          />
        </div>
        <div className={styles.navItemContainer}>
          <div className={styles.filterItemLabel}>
            type of appointment
          </div>
          <Select
            value={typeFilter}
            style={{ width: '100%' }}
            options={typeOptions}
            handleChange={handleChangeTypeFilter}
          />
        </div>
      </div>

      <div className={styles.columns}>
        {columnStatuses.map((status) => {
          const appointments = appointmentsByStatus[status] || [];
          return (
            <Column
              key={status}
              title={AppointmentStatusToTitles[status]}
            >
              {appointments.map((appt) => {
                return (
                  <AppointmentItem
                    key={appt.id}
                    {...appt}
                  />
                );
              })}
            </Column>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentsPage;
