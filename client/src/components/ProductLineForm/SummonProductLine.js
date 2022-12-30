import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { createRequest } from "../../api/request";
import { useAppContext } from "../../contexts/AppContext";
import { useRequestContext } from "../../contexts/RequestContext";
import { useUserContext } from "../../contexts/UserContext";
import Loading from "../Loading/Loading";

const SummonProductLine = (props) => {
  const { productLine } = props;
  const [visible, setVisible] = useState(false);
  const { openNotification } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const { handleCreateRequest } = useRequestContext();
  const {
    authState: { user },
  } = useAppContext();
  const {
    userState: { listUser },
    loadListUser,
  } = useUserContext();
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    let response;
    setIsLoading(true);
    listUser?.forEach(async (users) => {
      if (users.role === 3) {
        response = await createRequest({
          requester: user._id,
          productLine: productLine._id,
          recipient: users._id,
          type: 6,
          note: `Yêu cầu triệu hồi sản phẩm loại ${productLine.name}`,
        });
      }
    });
    if (response.success) {
      openNotification("success", "Triệu hồi sản phẩm thành công");
      setIsLoading(false);
    } else {
      openNotification("error", "Triệu hồi sản phẩm thất bại");
    }
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    loadListUser();
  }, []);

  return (
    <Loading spinning={isLoading}>
      <div>
        <Button type="primary" onClick={showModal}>
          Triệu hồi sản phẩm
        </Button>
        <Modal
          title="Triệu hồi sản phẩm"
          visible={visible}
          destroyOnClose={true}
          onOk={handleOk}
          onCancel={handleCancel}>
          <div>Triệu hồi sản phẩm {productLine?.name}?</div>
        </Modal>
      </div>
    </Loading>
  );
};

export default SummonProductLine;
