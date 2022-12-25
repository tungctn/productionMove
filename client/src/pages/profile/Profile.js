import { EditTwoTone } from "@ant-design/icons";
import { Avatar, Button, Col, Row } from "antd";
import React, { useEffect } from "react";
import ChangePass from "../../components/Profile/ChangePass";
import { useAppContext } from "../../contexts/AppContext";
import Default from "../../Layouts/Default";

const Profile = () => {
  const {
    authState: { user },
    convertRoleToName,
  } = useAppContext();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div>
      <Default>
        <h1 className="text-5xl clear-both">Hồ sơ: </h1>
        <Row className="mt-10">
          <Col span={12}>
            <Avatar size={200} src={""} className="block mx-auto mb-4" />
            <ChangePass user={user} />
          </Col>
          <div className="relative border-2 border-[#003eb3] px-8 rounded-xl">
            <EditTwoTone className="absolute top-2 right-2" />
            <Row className="flex items-center justify-center h-full">
              <Col span={10}>
                <h1 className="float-right clear-both font-bold">Tên: </h1>
                <h1 className="float-right clear-both font-bold">Email: </h1>
                <h1 className="float-right clear-both font-bold">
                  Nơi làm việc:
                </h1>
              </Col>
              <Col span={2} />
              <Col span={12} className="">
                <h1 className="float-left clear-both">{user.name}</h1>
                <h1 className="float-left clear-both">{user.email}</h1>
                <h1 className="float-left clear-both">
                  {convertRoleToName(user.role)}
                </h1>
              </Col>
            </Row>
          </div>
        </Row>
      </Default>
    </div>
  );
};

export default Profile;
