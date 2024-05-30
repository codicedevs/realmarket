import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import './users.css';


const UserManager = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const goBack = () => {
    navigate("/user")
  }

  console.log(id)

  return (
    <div className="form-container">
      <div className="title-container">
        <ArrowLeftOutlined className="back-icon" onClick={() => goBack()} />
        <text className="title">
          {id ?
            'Edición de usuario' : 'Creación de usuario'
          }
        </text>
      </div>
      <Form
        name="add_user"
        layout="vertical"
        autoComplete="off"
        className="form"
      // style={{ paddingLeft: 40 }}
      >
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: 'Por favor ingresa tu nombre!' }]}
        >
          <Input className="creation-input" placeholder="Ingresa el nombre completo" />
        </Form.Item>
        <Form.Item
          label="Nombre de Usuario"
          name="username"
          rules={[{ required: true, message: 'Por favor ingresa un nombre de usuario!' }]}
        >
          <Input className="creation-input" placeholder="Ingresa un nombre de usuario" />
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Por favor ingresa una contraseña!' }]}
        >
          <Input.Password className="creation-input" placeholder="Ingresa una contraseña" />
        </Form.Item>
        <Form.Item
          label="ID de Cuenta"
          name="accountId"
          rules={[{ required: true, message: 'Por favor ingresa el ID de cuenta!' }]}
        >
          <InputNumber className="creation-input" placeholder="Ingresa el ID de cuenta" />
        </Form.Item>
        <Form.Item
          label="Teléfono"
          name="telefono"
          rules={[{ required: true, message: 'Por favor ingresa el teléfono!' }]}
        >
          <InputNumber className="creation-input" placeholder="Ingresa el teléfono" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Por favor ingresa el Email!', type: 'email' }]}
        >
          <Input className="creation-input" placeholder="Ingresa el email" />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="addButton">
          Agregar Usuario
        </Button>
      </Form>
    </div>
  )
}

export default UserManager