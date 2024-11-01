import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import * as yup from 'yup';
import userService from "../../service/user.service";

const schema = yup.object({
  nombre: yup.string().required('El campo de nombre es obligatorio.'),
  username: yup.string().required('El campo de nombre de usuario es obligatorio.').min(6, 'El nombre de usuario debe tener al menos 6 caracteres'),
  pass: yup.string().required('El campo de contraseña es obligatorio.').min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  accountId: yup.number().typeError('El ID de cuenta debe ser un número.').required('El campo ID de cuenta es obligatorio.').positive('El ID de cuenta debe ser un número positivo.').integer('El ID de cuenta debe ser un número entero.'),
  telefono: yup.number().typeError('El teléfono debe ser un número.').required('El campo de teléfono es obligatorio.').positive('El número de teléfono debe ser positivo.').integer('El número de teléfono debe ser un número entero.'),
  email: yup.string().email('Ingrese un correo electrónico válido.').required('El campo de correo electrónico es obligatorio.'),
  documento: yup.number().typeError('El documento debe ser un numero.').required('El campo de documento es obligatorio.').positive('El número de documento debe ser positivo.').integer('El número de documento debe ser un número entero.'),
  roles: yup.array().required('El campo es obligatorio')
}).required();

const CreateUser = ({ onUserCreated }: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const formData = {
      ...data,
      telefono: data.telefono.toString(),
      documento: data.documento.toString(),
      accountId: data.accountId.toString(),
      username: data.username.toLowerCase()
    };

    try {
      await userService.createUser({ ...formData, isActive: true });
      toast.success('El usuario fue creado con éxito', { position: "bottom-center", autoClose: 3000, hideProgressBar: true, theme: "light", transition: Bounce });
      onUserCreated();
    } catch (e: any) {
      toast.error(e.response.data.message, { position: "bottom-center", autoClose: 3000, hideProgressBar: true, theme: "light", transition: Bounce });
    }
  };

  return (
    <Form
      layout="vertical"
      autoComplete="off"
      className="form"
      // @ts-ignore
      onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Nombre"
        name="nombre"
        // @ts-ignore
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
        // @ts-ignore
        help={errors.username?.message}
        validateStatus={errors.username ? "error" : ""}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => <Input {...field} className="creation-input" placeholder="Ingresa un nombre de usuario" />}
        />
      </Form.Item>
      <Form.Item
        label="ID de Cuenta"
        name="accountId"
        // @ts-ignore
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
        // @ts-ignore
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
        // @ts-ignore
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
        // @ts-ignore
        help={errors.documento?.message}
        validateStatus={errors.documento ? "error" : ""}
      >
        <Controller
          name="documento"
          control={control}
          render={({ field }) => <InputNumber {...field} className="creation-input" placeholder="Ingresa el documento" />}
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
        style={{ width: 300 }}
        name="roles"
        help={errors.roles?.message}
        validateStatus={errors.roles ? "error" : ""}
      >
        <Controller
          name="roles"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              className="creation-input"
              options={[
                { value: "admin", label: "Administrador" },
                { value: "user", label: "Usuario" },
              ]}
              onChange={(value) => field.onChange([value])}
            />
          )}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">Agregar usuario</Button>
    </Form>
  );
};

export default CreateUser;
