import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { List, Avatar, Skeleton, Divider } from 'antd';
import { useRequestContext } from '../../contexts/RequestContext';
const Notification = (props) => {

  const { dataSource } = props;
  const { loadListRequest } = useRequestContext();

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'hidden',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
        width: '40%',
        position: 'absolute',
        zIndex: 200,
        right: 10,
        top: 50,
        backgroundColor: 'white',
      }}
    >
      <InfiniteScroll
        dataLength={3}
        next={loadListRequest}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout="horizontal"
          header={<Divider plain>Notifications</Divider>}
          footer={<Divider plain>It is all, nothing more 🤐</Divider>}
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item key={item?._id}>
              <List.Item.Meta
                className="cursor-pointer"
                avatar={<Avatar src={item?.requester?.img} />}
                title={<p>{item?.requester?.name}</p>}
                description={item?.description}
              />
            </List.Item>
          )}
          locale={{ emptyText: 'No notification' }}
        />
      </InfiniteScroll>
    </div>
  );
};

Notification.propTypes = {};

export default Notification;
