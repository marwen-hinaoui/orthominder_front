import dayjs from 'dayjs'
import isBetweenPlugin from 'dayjs/plugin/isBetween'
import { styled } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'

dayjs.extend(isBetweenPlugin)

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'isInRange' && prop !== 'isToday' && prop !== 'isFirst' && prop !== 'isLast',
})(({ theme, isInRange, isToday, isFirst, isLast }) => ({
  borderRadius: 0,
  ...(isInRange && {
    backgroundColor: '#1677ff',
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isToday && {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    '&:hover, &:focus': {
      backgroundColor: '#000',
      border: 'none',
    },
  }),
}))

const Day = (props) => {
  const { day, treatmentStart, treatmentEnd, ...other } = props
  const dateStr = day.format('YYYY-MM-DD')
  const isInRange = day.isBetween(treatmentStart, treatmentEnd, null, '[]')
  const isFirst = dateStr === treatmentStart.format('YYYY-MM-DD')
  const isLast = dateStr === treatmentEnd.format('YYYY-MM-DD')
  const isToday = day.isSame(dayjs(), 'day')

  return (
    <CustomPickersDay
      {...other}
      day={day}
      disableMargin
      isInRange={isInRange}
      isFirst={isFirst}
      isLast={isLast}
      selected={false}
      isToday={isToday}
    />
  )
}

const TreatmentCalendar = ({ startDate, duration, selected, onChange }) => {
  const treatmentStart = dayjs(startDate)
  const treatmentEnd = dayjs(startDate).add(duration - 1, 'day')

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selected}
        onChange={onChange}
        showDaysOutsideCurrentMonth
        
        slots={{ day: Day }}
        slotProps={{
          day: () => ({
            treatmentStart,
            treatmentEnd,
          }),
        }}
      />
    </LocalizationProvider>
  )
}

export default TreatmentCalendar
