import { Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useProductLineContext } from '../../contexts/ProductLineContext';

const SearchProductLine = (props) => {
  const { page } = props;
  const { handleSearchProductLine } = useProductLineContext();
  const navigate = useNavigate();
  const onValueChange = async (e) => {
    await handleSearchProductLine({ input: e.target.value });
  };
  return (
    <div className="w-1/3 mr-10 mt-5 ml-auto">
      <div className="container rounded-2xl">
        <div className="flex items-center space-x-5">
          <Input placeholder="Tìm kiếm ở đây!" onChange={onValueChange} allowClear />
          {page !== 'import' && (
            <PlusCircleOutlined
              className="text-2xl"
              onClick={() => {
                navigate('/productline/create');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProductLine;
