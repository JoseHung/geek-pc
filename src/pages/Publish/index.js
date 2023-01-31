import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Form, Input, Radio, Select, Upload, Space, Button } from "antd";
import { Link } from "react-router-dom";
import './index.scss'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState, useRef } from "react";
import { http } from "@/utils";

const { Option } = Select;

const Publish = () => {
    // 暂存图片
    // 通过 useRef 声明一个暂存仓库
    const fileListRef = useRef([]);

    // 频道列表
    const [channels, setChannels] = useState([]);
    useEffect(() => {
        async function fetchChannels() {
            const res = await http.get('/channels');
            setChannels(res.data.channels);
        }
        fetchChannels();
    }, []);

    // 上传封面
    const [fileList, setFileList] = useState([]);
    // 上传成功回调
    const onUploadChange = info => {
        const fileList = info.fileList.map(file => {
            if(file.response) {
                return {
                    url: file.response.data.url
                }
            }
            return file;
        })
        setFileList(fileList);
        // 上传图片时，将所有图片存储到 ref 中
        fileListRef.current = fileList;
    }

    // 封面数量
    const [imgCount, setImgCount] = useState(1);
    const changeType = e => {
        const count = e.target.value;
        setImgCount(count);
        if(count === 1) {
            // 单图，只展示第一张
            const firstImg = fileListRef.current[0];
            setFileList(!firstImg ? [] : firstImg);
        } else if(count === 3) {
            setFileList(fileListRef.current);
        }
    }

    // 发布文章
    const onFinish = async (values) => {
        // 数据二次处理
        const { channel_id, content, title, type } = values;
        const params = {
            channel_id,
            content,
            title,
            type,
            cover: {
                type: type,
                images: fileList.map(item => item.url)
            }
        }
        await http.post('/mp/articles?draft=false', params)
    }

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>发布文章</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Form 
                    labelCol={{ span: 4}}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ content: '' }}
                    onFinish={ onFinish }
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题'}]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>

                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道'}]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }} >
                            {channels.map(item => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={changeType}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                            {imgCount > 0 && (
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList
                                    action="http://geek.itheima.net/v1_0/upload"
                                    fileList={fileList}
                                    onChange={onUploadChange}
                                    maxCount={ imgCount }
                                    multiple={ imgCount > 1 }
                                >
                                    <div style={{ marginTop: 8 }}>
                                        <PlusOutlined />
                                    </div>
                                </Upload>
                            )}
                    </Form.Item>

                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default Publish;