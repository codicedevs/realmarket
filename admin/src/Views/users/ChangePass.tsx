import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import * as yup from 'yup';
import userService from "../../service/user.service";
import { user } from "../../types/user.type";

// Esquema de validación
const schema = yup.object({
  pass: yup.string().required("La contraseña es obligatoria").min(6, "La contraseña debe tener al menos 6 caracteres"),
}).required();


const ChangePass = ({ userData, onPasswordChanged }: any) => {
  const id = useParams().id
  const [user, setUser] = useState<user>()

  const bringUser = async () => {
    if (id) {
      const res = await userService.getUserById(id);
      setUser(res.data);
    }
  };


  useEffect(() => {
    bringUser();
  }, [id]);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { pass: '' },
  });

  const onSubmit = async (data: any) => {
    const formData = { pass: data.pass };
    try {
      if (id === undefined) {
        toast.error("Error", { position: "bottom-center", autoClose: 3000, hideProgressBar: true, theme: "light", transition: Bounce });
      } else {
        await userService.editUser(id, formData);
        toast.success('La contraseña fue cambiada con éxito', { position: "bottom-center", autoClose: 3000, hideProgressBar: true, theme: "light", transition: Bounce });
        onPasswordChanged(); // Llama la función que maneja el cambio
      }

    } catch (e: any) {
      toast.error(e.response?.data?.message, { position: "bottom-center", autoClose: 3000, hideProgressBar: true, theme: "light", transition: Bounce });
    }
  };

  useEffect(() => {
    if (userData) {
      reset({ pass: '' }); // Resetea el campo de contraseña al abrir el componente
    }
  }, [userData, reset]);

  return (
    <div className="form-container">
      <div className="title-container">
        <span className="title">{`${user?.username}`}</span>
      </div>
      <Form
        layout="vertical"
        autoComplete="off"
        className="form"
        // @ts-ignore
        onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Nueva Contraseña"
          name="pass"
          help={errors.pass?.message}
          validateStatus={errors.pass ? "error" : ""}>
          <Controller
            name="pass"
            control={control}
            render={({ field }) => <Input.Password {...field} className="creation-input" placeholder="Ingresa la nueva contraseña" />}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">Cambiar Contraseña</Button>
      </Form>
    </div>
  );
};

export default ChangePass;
