// Define your own mock data here:
export const standard = () => ({
  multiple: true,
  name: 'timeSlots',
  selectTimeSlots: [4],
  timeSlots: [
    {
      id: 1,
      start: '11AM',
      end: '5PM',
      last: 6,
    },
    {
      id: 2,
      start: '6PM',
      end: '12AM',
      last: 6,
    },
    {
      id: 3,
      start: '11AM',
      end: '8PM',
      last: 9,
    },
    {
      id: 4,
      start: '1PM',
      end: '6PM',
      last: 5,
    },
  ],
})
