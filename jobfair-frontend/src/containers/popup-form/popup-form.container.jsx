import React from 'react'
import PopupFormComponent from '../../components/popup-form/popup-form.component'
import {
  confirmForm,
  editForm,
  hideForm,
  rejectForm,
  selectPopupFormData,
  selectPopupFormEditable,
  selectPopupFormVisibility
} from '../../redux/state-slices/popupFormSlice'
import {useDispatch, useSelector} from 'react-redux'
import {getForm} from '../../redux/state-slices/formSlice'
import {Form, notification} from 'antd'

const PopupFormCheck = () => {
  const formVisibility = useSelector(selectPopupFormVisibility)
  const editable = useSelector(selectPopupFormEditable)
  const popupFormData = useSelector(selectPopupFormData)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const handleCancel = () => {
    dispatch(hideForm())
  }

  const handleAgree = async () => {
    const result = await dispatch(confirmForm(popupFormData.id))
    notification[result.type](result.options)
    setTimeout(() => {
      dispatch(getForm())
    }, 500)
  }

  const handleReject = async () => {
    const result = await dispatch(rejectForm(popupFormData.id))
    notification[result.type](result.options)
    setTimeout(() => {
      dispatch(getForm())
    }, 500)
  }

  const handleConfirm = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields()
        dispatch(editForm(popupFormData.id, values))
        setTimeout(() => {
          dispatch(getForm())
        }, 500)
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  return (
    <PopupFormComponent
      visible={formVisibility}
      onCancel={handleCancel}
      onReject={editable ? handleCancel : handleReject}
      onAgree={editable ? handleConfirm : handleAgree}
      formOptions={{
        popupFormData,
        editable
      }}
      form={form}
    />
  )
}

export default PopupFormCheck
