import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../service/user.service";
import CreateUser from './CreateUser';
import EditUser from './EditUser';

const UserManager = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  const goBack = () => {
    navigate("/");
  };

  const bringUser = async () => {
    if (id) {
      const res = await userService.getUserById(id);
      setUserData(res.data);
    }
  };

  useEffect(() => {
    bringUser();
  }, [id]);

  return (
    <div className="form-container">
      <div className="title-container">
        <ArrowLeftOutlined className="back-icon" onClick={goBack} />
        <span className="title">{id ? 'Edición de usuario' : 'Creación de usuario'}</span>
      </div>
      {id ? (
        <EditUser userData={userData} onUserUpdated={() => navigate("/")} />
      ) : (
        <CreateUser onUserCreated={() => navigate("/")} />
      )}
    </div>
  );
};

export default UserManager;
