import { BackTop } from 'antd';
import React, { useEffect, useState } from 'react';
import Notification from '../components/request/Notification';
import { useAppContext } from '../contexts/AppContext';
import { useRequestContext } from '../contexts/RequestContext';
import Header from './Header';
import SideBar from './SideBar';

const Default = (props) => {
  const { openSidebar, setOpenSidebar } = useAppContext();
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setOpenSidebar(!openSidebar);
  };
  const {
    requestState: { listRequest },
    loadListRequest,
  } = useRequestContext();

  const {
    authState: { user },
  } = useAppContext();

  const dataSource = listRequest?.filter(
    (item) => item?.status === 2 && item?.recipient?._id === user?._id,
  );
  useEffect(() => {
    loadListRequest();
  }, []);
  return (
    <div className="flex flex-row h-screen w-full">
      <SideBar
        open={openSidebar}
        tag={props.tagName}
        childrenTag={props.childrenName}
        onClick={handleClick}
      />
      <div className={`${openSidebar ? 'basis-5/6' : 'basis-11/12'} h-full`}>
        <Header
          dataSource={dataSource}
          visible={visible}
          setVisible={setVisible}
        />
        {visible && <Notification dataSource={dataSource} />}
        <div
          className="bg-white mt-2 ml-3 rounded-xl h-[calc(100%-75px)] overflow-y-scroll"
          style={{ zIndex: 1 }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Default;
