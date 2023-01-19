import { Button, Result } from "antd";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const Page404 = () => {
  const {
    gotoMainPage,
    authState: { user },
  } = useAppContext();
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại."
        extra={
          <Button
            type="primary"
            onClick={() => {
              gotoMainPage(user);
            }}>
            Trở về trang chủ
          </Button>
        }
      />
    </div>
  );
};

export default Page404;
