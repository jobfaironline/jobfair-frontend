export const UPDATE_COMPANY_DEFAULT_MODEL = {
  address: '',
  benefits: [
    {
      description: '',
      id: 0
    }
  ],
  email: '',
  employeeMaxNum: 0,
  id: '',
  mediaUrls: ['string'],
  name: '',
  phone: '',
  sizeId: 0,
  status: '',
  subCategoriesIds: [0, 1, 2],
  taxId: '',
  url: ''
}

export const GET_COMPANY_BY_ID_DEFAULT_MODEL = {
  id: '',
  taxId: '',
  name: '',
  address: '',
  phone: '',
  email: '',
  employeeMaxNum: 5,
  websiteUrl: '',
  status: '',
  sizeId: 0,
  subCategoryDTOs: [
    {
      id: 0,
      name: '',
      category: {
        id: 0,
        name: ''
      }
    }
  ],
  companyBenefitDTOS: [
    {
      id: 0,
      description: '',
      benefitDTO: {
        id: 0,
        name: '',
        description: ''
      },
      companyDTO: null
    }
  ],
  mediaDTOS: []
}
