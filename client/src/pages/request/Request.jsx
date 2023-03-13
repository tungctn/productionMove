import { Button, Input, Modal, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { handleImportRequest, updateRequest } from '../../api/request';
import TableInfo from '../../components/table/TableInfo';
import { useAppContext } from '../../contexts/AppContext';
import { useRequestContext } from '../../contexts/RequestContext';
import Default from '../../layouts/Default';
import { updateProduct } from '../../api/product';
import { useProductContext } from '../../contexts/ProductContext';
import SearchRequest from '../../components/search-filter/SearchRequest';
import Loading from '../../components/loading/Loading';

const Request = (props) => {
  'use strict';
  const { role } = props;
  const { TextArea } = Input;
  const {
    authState: { user },
    convertTypeToName,
    convertStatusToName,
    openNotification,
    convertObjectToArray,
    deadDate,
    checkMiddleware,
  } = useAppContext();
  const {
    requestState: { listRequest, isLoading },
    loadListRequest,
  } = useRequestContext();
  const {
    productState: { listProduct },
    loadUserProduct,
  } = useProductContext();
  const [visible, setVisible] = useState(false);
  const [desc, setDesc] = useState('');
  const [information, setInformation] = useState('');
  const [data, setData] = useState({});
  const [feedback, setFeedback] = useState({});
  const [record, setRecord] = useState({});
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const color = (status) => {
    switch (status) {
      case 1:
        return 'magenta';
      case 2:
        return 'processing';
      case 3:
        return 'success';
      case 4:
        return 'error';
      default:
        throw new Error('status is not match');
    }
  };
  const handleClick = (record) => {
    setVisible(true);
    setDesc(<h1>{convertTypeToName(record.type)}</h1>);
    setNote(record.note);
    if (record.type === 0) {
      setInformation(
        `${record.requester.name} muốn nhập ${record.amount} sản phẩm loại ${record.productLine.name} từ ${record.recipient.name}`,
      );
      setData({
        ...data,
        amount: record.amount,
        store: record.requester._id,
        productLine: record.productLine._id,
      });
    } else if (record.type === 4) {
      setInformation(
        `${record.requester.name} yêu cầu trả sản phẩm từ ${record.recipient.name}`,
      );
      setData({
        ...data,
        amount: record.amount,
        store: record.recipient._id,
        productLine: record.productLine._id,
      });
    } else if (record.type === 1) {
      setInformation(
        `${record.requester.name} yêu cầu bảo hành sản phẩm từ ${record.recipient.name}`,
      );
      setData({
        ...data,
        amount: record.amount,
        store: record.requester._id,
        productLine: record.product.productLine._id,
      });
    } else if (record.type === 2) {
      setInformation(
        `${record.requester.name} yêu cầu nhân sản phẩm bảo hành từ ${record.recipient.name}`,
      );
      setData({
        ...data,
        amount: record.amount,
        store: record.requester._id,
        productLine: record.product.productLine._id,
      });
    } else if (record.type === 5) {
      setInformation(
        `${record.requester.name} yêu cầu ${record.recipient.name} bàn giao sản phẩm mới cho khách hàng do ${record.product.identifier} bị hỏng không thể sửa chữa và đã được gửi về nhà máy.`,
      );
      setData({
        ...data,
        amount: record.amount,
        store: record.recipient._id,
        productLine: record.product.productLine._id,
      });
    } else {
      setInformation('');
      setData({});
    }
  };
  const handleOk = async () => {
    let response;
    if (record.type === 0) {
      response = await handleImportRequest(data);
    } else if (record.type === 4) {
      response = await updateProduct(
        record.product._id,
        convertObjectToArray({
          ...feedback,
          status: 11,
          location: record.product.factory,
        }),
      );
    } else if (record.type === 1) {
      response = await updateProduct(
        record.product._id,
        convertObjectToArray({
          ...feedback,
          status: 4,
          location: user._id,
        }),
      );
    } else if (record.type === 2) {
      response = await updateProduct(
        record.product._id,
        convertObjectToArray({
          ...feedback,
          status: 5,
          location: user._id,
        }),
      );
    } else if (record.type === 3) {
      response = await updateProduct(
        record.product._id,
        convertObjectToArray({
          ...feedback,
          status: 8,
          location: user._id,
          isSold: false,
          customer: {},
        }),
      );
    } else if (record.type === 5) {
      const dataProduct = listProduct?.filter((product) => {
        return (
          product.status === 1 &&
          product.productLine._id === record.product.productLine
        );
      });
      if (dataProduct.length === 0) {
        openNotification('error', 'Không có sản phẩm để bàn giao');
        return;
      } else {
        response = await updateProduct(
          dataProduct[0]._id,
          convertObjectToArray({
            status: 2,
            customer: { ...record.product.customer, soldDate: new Date() },
            isSold: true,
            deadDate: deadDate(dataProduct[0], new Date()),
          }),
        );
      }
    } else if (record.type === 6) {
      const dataProduct = listProduct?.filter((product) => {
        return product.productLine._id === record.productLine._id;
      });
      setLoading(true);
      for (let i = 0; i < dataProduct?.length; i++) {
        const product = dataProduct[i];
        response = await updateProduct(
          product._id,
          convertObjectToArray({
            ...feedback,
            status: 9,
          }),
        );
      }
    }
    if (response?.success) {
      openNotification('success', 'Chấp nhận yêu cầu thành công');
      await updateRequest(
        record._id,
        convertObjectToArray({ ...feedback, status: 3 }),
      );
      await updateRequest(
        record.refRequest,
        convertObjectToArray({ ...feedback, status: 3 }),
      );
      setLoading(false);
      // navigate("/request");
      loadListRequest();
      setVisible(false);
    } else {
      openNotification('error', 'Khong the chấp nhận yêu cầu');
    }
  };
  const handleReject = async () => {
    const response1 = await updateRequest(
      record._id,
      convertObjectToArray({ ...feedback, status: 4 }),
    );
    const response2 = await updateRequest(
      record.refRequest,
      convertObjectToArray({ ...feedback, status: 4 }),
    );
    if (response1.success && response2.success) {
      openNotification('success', response1.msg);
      loadListRequest();
      setVisible(false);
    } else {
      openNotification('error', response1.msg);
      setVisible(false);
    }
  };
  const dataColumn = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Người gửi',
      dataIndex: 'requester1',
      key: 'requester1',
    },
    {
      title: 'Người nhận',
      dataIndex: 'recipient1',
      key: 'recipient1',
    },
    {
      title: 'Loai yêu cầu',
      dataIndex: 'type',
      key: 'type',
      render: (text) => convertTypeToName(text),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Tag
          onClick={() => {
            if (record.status === 2) {
              handleClick(record);
            }
          }}
          color={color(record.status)}
        >
          {convertStatusToName(text)}
        </Tag>
      ),
    },
  ];

  useEffect(() => {
    checkMiddleware(role, () => {
      loadListRequest();
      loadUserProduct();
    });
  }, []);

  const dataSource = listRequest
    ?.sort((a, b) => {
      return new Date(b?.createdAt) - new Date(a?.createdAt);
    })
    .map((request, index) => {
      return {
        ...request,
        key: index + 1,
        requester1: request?.requester?.name,
        recipient1: request?.recipient?.name,
      };
    });
  const onChange = (e) => {
    setFeedback({ feedback: e.target.value });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="w-full">
      <Default tagName="yc">
        <SearchRequest />
        <div className="w-11/12 mx-auto">
          <TableInfo
            onRow={(record) => ({
              onClick: () => {
                if (record.status === 2) {
                  handleClick(record);
                  setRecord(record);
                }
              },
            })}
            dataColumn={dataColumn}
            dataSource={dataSource}
            loading={isLoading}
          />
        </div>
      </Default>
      <Modal
        destroyOnClose={true}
        open={visible}
        title="Thông tin đơn hàng"
        footer={[
          <Button key="1" onClick={handleReject}>
            Từ chối
          </Button>,
          <Button key="2" type="primary" onClick={handleOk}>
            Chấp nhận
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        <Loading spinning={loading}>
          <div>{desc}</div>
          <div>{information}</div>
          <div>Ghi chú: {note}</div>
          Phản hồi:
          <TextArea onChange={onChange} />
        </Loading>
      </Modal>
    </div>
  );
};

export default Request;
