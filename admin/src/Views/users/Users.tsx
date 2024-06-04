import { ExclamationCircleFilled } from '@ant-design/icons'
import { Button, Modal, Space, Table } from "antd"
import Column from "antd/es/table/Column"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Bounce, toast } from 'react-toastify'
import userService from "../../service/user.service"
import { IUser } from "../../types/user.type"
import './users.css'

const { confirm } = Modal;


const Users = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  const location = useLocation();

  const errorNotification = () => {
    toast.error('Ocurrio un problema', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
    })
  }

  const successNotification = () => {
    toast.success('El usuario fue borrado con exito', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
    });

  }

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

  const deleteUser = async (id: number) => {
    try {
      await userService.delete((id).toString())
      await bringUsers()
    } catch (e) {
      console.error(e)
      errorNotification()
    } finally {
      successNotification()
    }
  }

  const deleteModal = (id: number) => {
    confirm({
      title: 'Esta seguro que desea borrar este usuario?',
      icon: <ExclamationCircleFilled />,
      content: '',
      onOk() { deleteUser(id) },
      onCancel() { },
      centered: true,
      cancelText: 'Cancelar',
      okText: 'Eliminar',
      okType: 'danger'
    });
  };

  useEffect(() => {
    bringUsers()
  }, [location])

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
              <a onClick={() => deleteModal(record._id)}>Delete</a>
            </Space>
          )}
        />
      </Table>
    </div>
  )
}

export default Users