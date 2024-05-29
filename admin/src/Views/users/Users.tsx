import { Button, Form, Input, InputNumber, Modal, Space, Table } from "antd"
import Column from "antd/es/table/Column"
import { useEffect, useState } from "react"
import userService from "../../service/user.service"
import { IUser } from "../../types/user.type"
import './users.css'

const Users = () => {
  const [users, setUsers] = useState([])
  const [createUserModal, setCreateUserModal] = useState(false)

  const bringUsers = async () => {
    const res = await userService.getAll()
    console.log(res.data)
    setUsers(res.data)
  }

  const createUser = async (data) => {
    console.log(data)
  }

  useEffect(() => {
    bringUsers()
  }, [])

  return (
    <div style={{ backgroundColor: 'green', width: '100%', height: '100%', padding: 10 }}>
      <Modal
        title="Crear Usuario"
        centered
        open={createUserModal}
        footer=""
        onCancel={() => setCreateUserModal(false)}
      >
        <Form
          name="add_user"
          layout="vertical"
          onFinish={createUser}
          autoComplete="off"
          style={{ maxWidth: 400, margin: 'auto' }}
        >
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'Por favor ingresa tu nombre!' }]}
          >
            <Input placeholder="Ingresa el nombre completo" />
          </Form.Item>
          <Form.Item
            label="Nombre de Usuario"
            name="username"
            rules={[{ required: true, message: 'Por favor ingresa un nombre de usuario!' }]}
          >
            <Input placeholder="Ingresa un nombre de usuario" />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Por favor ingresa una contraseña!' }]}
          >
            <Input.Password placeholder="Ingresa una contraseña" />
          </Form.Item>
          <Form.Item
            label="ID de Cuenta"
            name="accountId"
            rules={[{ required: true, message: 'Por favor ingresa el ID de cuenta!' }]}
          >
            <InputNumber className="hide-input-number-spinners" style={{ width: '100%' }} placeholder="Ingresa el ID de cuenta" />
          </Form.Item>
          <Form.Item
            label="Telefono"
            name="telefono"
            rules={[{ required: true, message: 'Por favor ingresa el telefono!' }]}
          >
            <InputNumber className="hide-input-number-spinners" style={{ width: '100%' }} placeholder="Ingresa el telefono" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Por favor ingresa el Email!', type: 'email' }]}
          >
            <Input placeholder="Ingresa el email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Agregar Usuario
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Space className="addButtonContainer">
        <Button type="primary" onClick={() => setCreateUserModal(true)}>
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
              <a onClick={() => console.log(record.id)}>Update</a>
              <a onClick={() => console.log(record.id)}>Delete</a>
            </Space>
          )}
        />
      </Table>
    </div>
  )
}

export default Users