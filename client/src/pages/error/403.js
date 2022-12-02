import { Button } from "antd";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Page403 = () => {
  const navigate = useNavigate();
  return (
    <div>
      403
      <Button
        type="primary"
        onClick={() => {
          navigate("/");
        }}>
        Go back
      </Button>
    </div>
  );
};

export default Page403;
