export const mapCompanyProfileFromAPIResponse = (data) => ({
  ...data,
  benefits: data.companyBenefitDTOS.map((item) => ({
    ...item,
    id: item.benefitDTO.id,
    description: item.benefitDTO.description
  })),
  mediaUrls: data.mediaDTOS,
  subCategoriesIds: data.subCategoryDTOs.map((item) => item.id),
  url: data.websiteUrl
});
