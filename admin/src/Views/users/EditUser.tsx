import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import * as yup from 'yup';
import userService from "../../service/user.service";

const schema = yup.object({
  // Similar schema as in CreateUser
}).required();

const EditUser = ({ userData, onUserUpdated }: any) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: userData,
  });

  const onSubmit = async (data: any) => {
    const formData = {
      ...data,
      telefono: data.telefono.toString(),
      documento: data.documento.toString(),
      accountId: data.accountId.toString(),
      username: data.username.toLowerCase()
    };
    console.log("zzzzzzzZZZZZZZZZZZZZZZZZZzzzzzzz", userData)

    try {
      await userService.editUser(userData._id, formData);
      toast.success('El usuario fue editado con éxito', { position: "bottom-center", autoClose: 3000, hideProgressBar: true, theme: "light", transition: Bounce });
      onUserUpdated();
    } catch (e: any) {
      toast.error(e.response.data.message, { position: "bottom-center", autoClose: 3000, hideProgressBar: true, theme: "light", transition: Bounce });
    }
  };

  useEffect(() => {
    if (userData) {
      reset({
        nombre: userData.nombre,
        username: userData.username,
        accountId: Number(userData.accountId),
        telefono: Number(userData.telefono),
        email: userData.email,
        documento: Number(userData.documento),
        roles: userData.roles ? userData?.roles?.join(", ") : [],
      });
    }
  }, [userData, reset]);

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
        style={{ width: 300 }}
        name="roles"
        // @ts-ignore
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


      <Button type="primary" htmlType="submit">Editar usuario</Button>
    </Form>
  );
};

export default EditUser;
