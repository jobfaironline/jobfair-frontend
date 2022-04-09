export const handleFilterStatus = (key) => {
  switch (key) {
    case 'HAPPENING':
      return [
        {
          text: 'Happening',
          value: 'HAPPENING'
        },
        {
          text: 'Attendant register',
          value: 'ATTENDANT_REGISTER'
        },
        {
          text: 'Company buy booth',
          value: 'COMPANY_BUY_BOOTH'
        },
        {
          text: 'Company register',
          value: 'COMPANY_REGISTER'
        },
        {
          text: 'Processing',
          value: 'PROCESSING'
        }
      ];
    case 'TAKEN_PLACE':
      return [
        {
          text: 'Unavailable',
          value: 'UNAVAILABLE'
        },
        {
          text: 'Closed',
          value: 'CLOSED'
        }
      ];
    default:
      return [
        {
          text: 'Not yet',
          value: 'NOT_YET'
        }
      ];
  }
};
