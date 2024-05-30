import { Button, Space, Table } from "antd"
import Column from "antd/es/table/Column"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import userService from "../../service/user.service"
import { IUser } from "../../types/user.type"
import './users.css'

const Users = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate();

  const sendToCreation = () => {
    navigate("/user/creation")
  }

  const sendToEdition = (id: number) => {
    navigate(`/user/edition/${id}`)
  }

  const bringUsers = async () => {
    const res = await userService.getAll()
    console.log(res.data)
    setUsers(res.data)
  }

  useEffect(() => {
    bringUsers()
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', padding: 10 }}>
      <Space className="addButtonContainer">
        <Button type="primary" onClick={sendToCreation}>
          +
        </Button>
      </Space>
      <Table dataSource={users}>
        <Column title='Nombre de usuario' dataIndex='username' />
        <Column title='Nombre' dataIndex='nombre' />
        <Column title='Email' dataIndex='email' />
        <Column title='Telefono' dataIndex='telefono' />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: IUser) => (
            <Space size="small" style={{ display: 'flex', flexDirection: 'column' }}>
              <a onClick={() => sendToEdition(record._id)}>Update</a>
              <a onClick={() => console.log(record._id)}>Delete</a>
            </Space>
          )}
        />
      </Table>
    </div>
  )
}

export default Users