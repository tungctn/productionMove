import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { createRequest } from '../../api/request';
import { useAppContext } from '../../contexts/AppContext';
import { useUserContext } from '../../contexts/UserContext';
import Loading from '../loading/Loading';

const SummonProductLine = (props) => {
  const { productLine } = props;
  const [visible, setVisible] = useState(false);
  const { openNotification } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    listUser?.forEach(async (users) => {
      if (users.role === 3) {
        await createRequest({
          requester: user._id,
          productLine: productLine._id,
          recipient: users._id,
          type: 6,
          note: `Yêu cầu triệu hồi sản phẩm loại ${productLine.name}`,
        });
      }
    });
    openNotification('success', 'Triệu hồi sản phẩm thành công');
    setIsLoading(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    loadListUser();
  }, []);

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Triệu hồi sản phẩm
      </Button>
      <Modal title="Triệu hồi sản phẩm" visible={visible} destroyOnClose={true} onOk={handleOk} onCancel={handleCancel}>
        <Loading spinning={isLoading}>
          <div>Triệu hồi sản phẩm {productLine?.name}?</div>
        </Loading>
      </Modal>
    </div>
  );
};

export default SummonProductLine;
