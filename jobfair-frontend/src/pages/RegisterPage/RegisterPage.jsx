import React from 'react'
import './RegisterPage.styles.scss'
import RegisterComponent from '../../components/Register/Register.component'

const RegisterPage = () => {
  return (
    <div className="page register-page">
      <div style={{ display: 'flex' }}>
        <div className="leftside-container">
          <div className="login-container animate__fadeInDown">
            <RegisterComponent />
          </div>
        </div>
        <div className="rightside-container">
          <img src="https://images.unsplash.com/photo-1559437380-d5af8338577f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"></img>
        </div>
      </div>
    </div>
  )
}
// const RegisterPage = () => {
//   const { TabPane } = Tabs
//   const [errorRes, setErrorRes] = useState()
//   const handleOnSubmitAttendant = (values, actions) => {
//     registerAttendantAPI({
//       email: values.email,
//       lastname: values.attendantName,
//       password: values.password
//     })
//       .then(data => {})
//       .catch(err => {})
//   }
//   const handleOnSubmitCompany = (values, actions) => {
//     registerCompanyAPI({
//       email: values.email,
//       lastname: values.attendantName,
//       password: values.password
//     })
//       .then(data => {})
//       .catch(err => {})
//   }
//   return (
//     <Tabs defaultActiveKey="1">
//       <TabPane tab="ATTENDANT" key="1">
//         <Form onSubmit={handleOnSubmitAttendant} schema={attendantSchema}>
//           <TextInput name="attendantName" label="Attendant's Name" />
//           <TextInput name="email" label="Email" />
//           <TextInput name="password" type="password" label="Password" />
//           <TextInput name="confirmPassword" type="password" label="Re-Password" />
//           <br></br>
//           <button>Submit</button>
//         </Form>
//       </TabPane>
//       <TabPane tab="COMPANY" key="2">
//         <Form onSubmit={handleOnSubmitCompany} schema={companySchema}>
//           <TextInput name="companyName" label="Company Name" />
//           <TextInput name="email" label="Email" />
//           <TextInput name="password" type="password" label="Password" />
//           <TextInput name="confirmPassword" type="password" label="Re-Password" />
//           <br></br>
//           <button>Submit</button>
//         </Form>
//       </TabPane>
//     </Tabs>
//   )
// }

export default RegisterPage
