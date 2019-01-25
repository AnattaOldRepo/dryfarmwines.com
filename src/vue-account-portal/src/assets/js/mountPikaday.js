import Pikaday from 'pikaday'
import moment from 'moment'

export const mountPikaday = (reference, id, handleSelect) => {
  const maxDate = moment()
    .add(120, 'days')
    .toDate()
  reference.dateOutsideRestriction =
    moment(reference.date, 'YYYY-MM-DD').diff(maxDate) > 0

  const picker = new Pikaday({
    field: document.getElementById(id),
    format: 'YYYY-MM-DD',
    bound: false,
    onSelect: () => {
      reference.date = picker.toString()
      reference.handleDateChange()
    },
    minDate: moment()
      .add(1, 'days')
      .toDate(),
    maxDate: moment()
      .add(120, 'days')
      .toDate(),

    showDaysInNextAndPreviousMonths: true,
    enableSelectionDaysInNextAndPreviousMonths: false,

    i18n: {
      previousMonth: 'Previous Month',
      nextMonth: 'Next Month',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      weekdays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      weekdaysShort: ['S', 'M', 'T', 'W', 'Th', 'F', 'S']
    }
  })
}
