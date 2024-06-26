import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Modal } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Bounce, toast } from 'react-toastify';
import * as yup from 'yup';
import { useAuth } from '../../Context/auth';
import userService from '../../service/user.service';
import SettingsIcon from '../icons/settingIcon';
import './header.css';

const schema = yup.object({
  pass: yup
    .string()
    .required('El campo de contraseña es obligatorio.')
    .min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  confirmPass: yup
    .string()
    .required('La confirmación de contraseña es obligatoria.')
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
}).required();

const MyHeader = () => {
  const [open, setOpen] = useState(false)
  const [pModal, setPModal] = useState(false)
  const { logout } = useAuth()

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
    toast.success('La contraseña fue cambiada con exito', {
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

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      pass: '',
      confirmPass: ''
    }
  });

  const initateChangePassword = () => {
    setPModal(true)
    setOpen(false)
  }

  const changePassword = async (data: any) => {
    await userService.ChangePassword({ currentPass: data.pass, newPass: data.confirmPass })
  }

  const onSubmit = async (data: any) => {
    try {
      await changePassword(data)
      successNotification()
    } catch (e) {
      errorNotification()
    } finally {
      setPModal(false)
    }
  }

  return (
    <>
      <Modal
        footer={''}
        centered
        open={pModal}
        onOk={() => setPModal(false)}
        onCancel={() => setPModal(false)}
        className='modal'
      >
        <div className='modalContentWrapper'>

          <Form
            layout="vertical"
            autoComplete="off"
            onFinish={handleSubmit(onSubmit)}
          >

            <Form.Item
              label="Contraseña"
              name="pass"
              help={errors.pass?.message}
              validateStatus={errors.pass ? "error" : ""}>
              <Controller
                name="pass"
                control={control}
                render={({ field }) => <Input.Password {...field} className="creation-input" placeholder="Ingresa una contraseña" />}
              />
            </Form.Item>

            <Form.Item
              label="Confirmar contraseña"
              name="confirmPass"
              help={errors.confirmPass?.message}
              validateStatus={errors.confirmPass ? "error" : ""}>
              <Controller
                name="confirmPass"
                control={control}
                render={({ field }) => <Input.Password {...field} className="creation-input" placeholder="Ingrese nuevamente" />}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="addButton">
              Confirmar
            </Button>
          </Form>
        </div>
      </Modal>
      <Modal
        footer={''}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        className='modal'
      >
        <div className='modalContentWrapper'>

          <p onClick={() => initateChangePassword()}>Cambiar contra</p>
          <p onClick={logout}>Cerrar sesion</p>
        </div>
      </Modal>
      <Header className='header-wrapper'>
        <div className='container' >
          <div className='logo' />
          <div onClick={() => setOpen(true)} className='configuration'>
            <SettingsIcon />
          </div>
        </div>
      </Header>
    </>
  )
}

export default MyHeader