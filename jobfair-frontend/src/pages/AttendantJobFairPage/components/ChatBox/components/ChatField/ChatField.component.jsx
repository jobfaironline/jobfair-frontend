import styles from './ChatField.module.scss'
import MessageReceived from './components/MessageReceived/MessageReceived.component'
import MessageSent from './components/MessageSent/MessageSent.component'

const ChatField = () => {
  const data = [
    {
      id: '1',
      name: 'Vladimir Putin',
      message: 'hello everyone',
      avatar:
        'https://baoquocte.vn/stores/news_dataimages/hoangha/092021/14/16/amp_img/tong-thong-nga-vladimir-putin-phai-tu-cach-ly.jpg'
    },
    {
      id: '2',
      name: 'Donal Trump',
      message: 'Hi, Nice to meet you sir',
      avatar: 'https://vcdn-vnexpress.vnecdn.net/2022/01/13/5563187172178500a-Trump-7439-1642036246.jpg'
    },
    {
      id: '3',
      name: 'Donal Trump',
      message: 'Hi, Nice to meet you sir',
      avatar: 'https://vcdn-vnexpress.vnecdn.net/2022/01/13/5563187172178500a-Trump-7439-1642036246.jpg'
    },
    {
      id: '4',
      name: 'Donal Trump',
      message: 'Hi, Nice to meet you sir',
      avatar: 'https://vcdn-vnexpress.vnecdn.net/2022/01/13/5563187172178500a-Trump-7439-1642036246.jpg'
    }
  ]
  return (
    <div className={styles.container}>
      {data.map(item => (
        <MessageReceived name={item.name} message={item.message} avatar={item.avatar} />
      ))}
      {data.map(item => (
        <MessageSent name={item.name} message={item.message} avatar={item.avatar} />
      ))}
    </div>
  )
}
export default ChatField
