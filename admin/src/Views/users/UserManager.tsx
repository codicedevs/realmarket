import { ArrowLeftOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import userService from "../../service/user.service";
import { IUser, user } from "../../types/user.type";
import './users.css';

const schema = yup.object({
  nombre: yup
    .string()
    .required('El campo de nombre es obligatorio.'),
  username: yup
    .string()
    .required('El campo de nombre de usuario es obligatorio.')
    .min(6, 'El nombre de usuario debe tener al menos 6 caracteres'),
  pass: yup
    .string()
    .required('El campo de contraseña es obligatorio.')
    .min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  accountId: yup
    .number()
    .typeError('El ID de cuenta debe ser un número.')
    .required('El campo ID de cuenta es obligatorio.')
    .positive('El ID de cuenta debe ser un número positivo.')
    .integer('El ID de cuenta debe ser un número entero.'),
  telefono: yup
    .number()
    .typeError('El teléfono debe ser un número.')
    .required('El campo de teléfono es obligatorio.')
    .positive('El número de teléfono debe ser positivo.')
    .integer('El número de teléfono debe ser un número entero.'),
  documento: yup
    .number()
    .typeError('El documento debe ser un numero.')
    .required('El campo de documento es obligatorio.')
    .positive('El número de documento debe ser positivo.')
    .integer('El número de documento debe ser un número entero.'),
  email: yup
    .string()
    .email('Ingrese un correo electrónico válido.')
    .required('El campo de correo electrónico es obligatorio.')
}).required();

const UserManager = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>()

  const successNotification = () => {
    if (id) {
      toast.success('El usuario fue editado con exito', {
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
    } else {
      toast.success('El usuario fue creado con exito', {
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
  }

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

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: user?.username || '',
      username: '',
      pass: '',
      accountId: undefined,
      telefono: undefined,
      email: '',
      documento: undefined
    }
  });

  const goBack = () => {
    navigate("/")
  }

  const bringUser = async () => {
    if (id) {
      const res = await userService.getUserById(id)
      setUser(res.data)
    }
  }

  const createUser = async (data: user) => {
    try {
      return await userService.createUser(data)
    } catch (e) {
      throw new Error
    }
  }

  const editUser = async (data: user) => {
    if (!id) {
      throw new Error('No user ID provided for editUser');
    }
    return await userService.editUser(id, data);
  }

  const onSubmit = async (data: user) => {
    const formData = {
      ...data,
      telefono: data.telefono.toString(),
      documento: data.documento.toString(),
      accountId: data.accountId.toString(),
      username: data.username.toLowerCase()
    };
    try {

      if (id) {
        await editUser(formData)
      } else {
        await createUser({ ...formData, isActive: true })
      }
      successNotification()
      setTimeout(() => {
        goBack()
      }, 500);
    }
    catch (e) {
      errorNotification()
    }
    finally {
    }
  };


  useEffect(() => {
    bringUser()
  }, [id])

  useEffect(() => {
    if (user) {
      reset({
        nombre: user.nombre,
        username: user.username,
        pass: user.pass,
        accountId: Number(user.accountId),
        telefono: Number(user.telefono),
        email: user.email,
        documento: Number(user.documento)
      });
    }
  }, [user, reset]);

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
        layout="vertical"
        autoComplete="off"
        className="form"
        onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Nombre"
          name="nombre"
          help={errors.nombre?.message}
          validateStatus={errors.nombre ? "error" : ""}>
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => <Input {...field} className="creation-input" placeholder="Ingresa el nombre completo" />}
          />
        </Form.Item>

        <Form.Item
          label="Nombre de Usuario"
          name="username"
          help={errors.username?.message}
          validateStatus={errors.username ? "error" : ""}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => <Input {...field} className="creation-input" placeholder="Ingresa un nombre de usuario" />}
          />
        </Form.Item>

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
          label="ID de Cuenta"
          name="accountId"
          help={errors.accountId?.message}
          validateStatus={errors.accountId ? "error" : ""}>
          <Controller
            name="accountId"
            control={control}
            render={({ field }) => <InputNumber {...field} className="creation-input" placeholder="Ingresa el ID de cuenta" />}
          />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="telefono"
          help={errors.telefono?.message}
          validateStatus={errors.telefono ? "error" : ""}>
          <Controller
            name="telefono"
            control={control}
            render={({ field }) => <InputNumber {...field} className="creation-input" placeholder="Ingresa el teléfono" />}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          help={errors.email?.message}
          validateStatus={errors.email ? "error" : ""}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} className="creation-input" placeholder="Ingresa el email" />}
          />
        </Form.Item>

        <Form.Item
          label="Documento"
          name="documento"
          help={errors.documento?.message}
          validateStatus={errors.documento ? "error" : ""}
        >
          <Controller
            name="documento"
            control={control}
            render={({ field }) => <InputNumber {...field} className="creation-input" placeholder="Ingresa el documento" />}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="addButton">
          {id ?
            'Editar usuario' : 'Agregar usuario'
          }
        </Button>
      </Form>
    </div>
  )
}

export default UserManager 