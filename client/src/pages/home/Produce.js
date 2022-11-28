import { Button, Input, Select } from "antd";
import Default from "../../Layouts/Default";
import { DownOutlined } from "@ant-design/icons"
function Produce() {

    const handleChange = (e) => {
        console.log('ok');
    }
    const { Option, OptGroup } = Select;

    return (
        <div class="w-full">
            <Default tagName="sx">
                <div className="w-full h-full">
                    <div className="mx-auto mt-5 text-3xl text-inherit text-orange-600"> Đơn sản xuất</div>
                    <div className="w-1/2 mt-20 mx-auto flex flex-col space-y-10">
                        <div className="flex flex-row space-x-10">
                            <div className="w-1/3 text-xl text-right"> Dòng sản phẩm :</div>
                            <div className="w-2/3">
                                <Select
                                    defaultValue="Chọn dòng sản phẩm"
                                    style={{
                                        width: 200,
                                    }}
                                    onChange={handleChange}
                                    status='warning'
                                >
                                    <OptGroup label="ProductLine">
                                        <Option value="Dòng sản phẩm 1">Dòng sản phẩm 1</Option>
                                        <Option value="Dòng sản phẩm 2">Dòng sản phẩm 2</Option>
                                    </OptGroup>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-10">
                            <div className="w-1/3 text-xl text-right">Số lượng : </div>
                            <div className="w-2/3">
                                <Input style={{
                                    width: 200,
                                }}></Input>
                            </div>
                        </div>
                        <div className="mt-20">
                            <Button className="block mr-0 ml-auto">Sản xuất</Button>
                        </div>
                    </div>
                </div>
            </Default>
        </div>
    );
}

export default Produce;