import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function Calendar({ date }) {
  moment.locale('ru', {
    months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
    monthsShort: 'Января_Февраля_Марта_Апреля_Мая_Июня_Июля_Августа_Сентября_Октября_Ноября_Декабря'.split('_'),
    weekdays: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота_Воскресенье'.split('_'),
  });

  let startDay = moment(date).startOf('month');
  if (startDay.day() !== 1) {
    startDay = startDay.subtract((1 - startDay.day()) * -1, 'days');
  }

  let endDay = moment(date).endOf('month');
  if (endDay.day() !== 0) {
    endDay = endDay.add(7 - endDay.day(), 'days');
  }
  const daysCount = endDay.diff(startDay, 'days');

  const datesArr = [+startDay.format('x')];
  for (let i = 0; i < daysCount; i += 1) {
    datesArr.push(+startDay.add(1, 'days').format('x'));
  }

  const weeksArr = [];
  for (let i = 0; i < datesArr.length; i += 7) {
    weeksArr.push(datesArr.slice(i, i + 7));
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{moment(date).format('dddd')}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{moment(date).format('D')}</div>
          <div className="ui-datepicker-material-month">{moment(date).format('MMM')}</div>
          <div className="ui-datepicker-material-year">{moment(date).format('YYYY')}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{moment(date).format('MMMM')}</span>
          <span className="ui-datepicker-year">{moment(date).format('YYYY')}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          {weeksArr.map((weeks) => (
            <tr key={moment(weeks[0]).week()}>
              {weeks.map((day) => {
                let dayMark;
                if (moment(date).month() !== moment(day).month()) {
                  dayMark = 'ui-datepicker-other-month';
                } else {
                  dayMark = moment(date).date() === moment(day).date() ? 'ui-datepicker-today' : null;
                }
                return (
                  <td className={dayMark} key={day}>
                    {moment(day).format('D')}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default Calendar;
