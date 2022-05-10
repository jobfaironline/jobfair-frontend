export const CompanyInformation = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <>
      <p>{data.companyDescription}</p>
    </>
  );
};
