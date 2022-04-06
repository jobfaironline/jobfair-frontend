export const CompanyInformation = props => {
  const { data } = props
  return (
    <>
      <p>{data.companyDescription}</p>
    </>
  )
}
