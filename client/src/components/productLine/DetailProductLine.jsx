import { Image, Descriptions, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getProductLine } from '../../api/productline';
import ProductLineDelete from './DeleteProductLine';
import SummonProductLine from './SummonProductLine';
import Loading from '../loading/Loading';
import Slider from '../slider/Image';
import SpecProductLine from './SpecProductLine';

const ProductLineDetail = (props) => {
  const { id, page } = props;
  const navigate = useNavigate();
  const [productLine, setProductLine] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const loadProductLine = async (id) => {
    setIsLoading(true);
    const response = await getProductLine(id);
    if (response.success) {
      setProductLine(response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProductLine(id);
  }, []);

  const data = productLine?.img?.map((img, index) => {
    return (
      <Image
        width={400}
        src={img}
        alt="Ảnh dòng xe"
        style={{ objectFit: 'cover' }}
        key={index}
        className="mb-5 duration-200"
        preview={false}
        height={400}
      />
    );
  });

  return (
    <Loading spinning={isLoading}>
      <Slider data={data} />
      <div className="mt-5 w-11/12 mx-auto">
        {page === 'productline' && (
          <div>
            <div className="text-right text-3xl text-cyan-500">
              <EditOutlined
                onClick={() => {
                  navigate(`/productline/${id}/edit`);
                }}
              />
              <ProductLineDelete id={id} />
            </div>
            <SummonProductLine productLine={productLine} />
          </div>
        )}
        {page === 'import' && (
          <div className="text-right text-2xl text-cyan-500">
            <Button
              onClick={() => {
                navigate(`/import/productline/${id}/factory`);
              }}
              type="primary"
            >
              Đặt hàng
            </Button>
          </div>
        )}
        <SpecProductLine productLine={productLine} />
      </div>
    </Loading>
  );
};

export default ProductLineDetail;
