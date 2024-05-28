import { Header } from 'antd/es/layout/layout';
import './header.css';

const MyHeader = () => {
  return (
    <Header className='header-wrapper'>
      <div className='container' >
        <div className='logo' />
        <div className='configuration'>
          Logout
        </div>
      </div>
    </Header>
  )
}

export default MyHeader