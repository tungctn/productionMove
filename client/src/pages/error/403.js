import { Button, Result } from "antd";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const Page403 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate(-1);
            }}>
            Quay lại
          </Button>
        }
      />
    </div>
  );
};

export default Page403;
