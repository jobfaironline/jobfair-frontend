export const JobPositionValidation = {
  title: [
    {
      required: true,
      message: 'This field is required'
    },
    {
      max: 100,
      message: 'This field has max length is 100 characters'
    }
  ],
  jobLevel: [
    {
      required: true,
      message: 'This field is required'
    },
  ],
  jobType: [
    {
      required: true,
      message: 'This field is required'
    },
  ],
  language: [
    {
      required: true,
      message: 'This field is required'
    },
  ],
  skillTags: [
    {
      required: true,
      message: 'This field is required'
    },
  ],
  jobCategory: [
    {
      required: true,
      message: 'This field is required'
    },
  ],
  description: [
    {
      required: true,
      message: 'This field is required'
    },
    {
      max: 3000,
      message: 'This field has max length is 3000 characters'
    }
  ],
  requirements: [
    {
      required: true,
      message: 'This field is required'
    },
    {
      max: 3000,
      message: 'This field has max length is 3000 characters'
    }
  ],
  contactPerson: [
    {
      required: true,
      message: 'This field is required'
    },
    {
      max: 300,
      message: 'This field has max length is 300 characters'
    }
  ],
  email: [
    {
      required: true,
      message: 'This field is required'
    },
    {
      max: 322,
      message: 'This field has max length is 322 characters'
    },
    {
      type: 'email',
      message: 'The input is not valid E-mail!'
    },
  ]
}
