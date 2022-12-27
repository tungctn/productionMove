import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useRequestContext } from "../../contexts/RequestContext";
import { useUserContext } from "../../contexts/UserContext";

const SummonProductLine = (props) => {
  const { productLine } = props;
  const [visible, setVisible] = useState(false);
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
    listUser?.forEach(async (users) => {
      if (users.role === 3) {
        await handleCreateRequest({
          requester: user._id,
          productLine: productLine._id,
          recipient: users._id,
          type: 6,
          note: `Yêu cầu triệu hồi sản phẩm loại ${productLine.name}`, 
        });
        console.log(users);
      }
    });
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    loadListUser();
    console.log(listUser);
  }, []);

  return (
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
  );
};

export default SummonProductLine;
