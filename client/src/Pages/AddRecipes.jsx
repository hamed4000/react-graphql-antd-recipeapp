import React, { useContext, useState } from 'react';
import { Form, Select, Button, Input, Row, Col, Spin, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router';
import {
  ADD_RECIPE,
  GET_ALL_RECIPES,
  GET_USER_RECIPES,
} from '../queries/Recipes';
import { AuthContext } from '../utils/AuthContext';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MainContainer } from '../Components/styleComponent';

const AddRecipes = ({ form }) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const [instructions, setInstructions] = useState('');
  const history = useHistory();

  const { validateFields, getFieldDecorator } = form;
  const { Option } = Select;

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    const files = [e.fileList[e.fileList.length - 1]];
    setFileList(files[0][['originFileObj']]);
    return e && files;
  };
  const propsForUpload = {
    multiple: false,
    beforeUpload: file => {
      return false; //برای اینکه action را غیرفعال کنیم
    },
    showUploadList: {
      showRemoveIcon: false,
    },
  };
  const handleUploadImage = async () => {
    try {
      setUploading(true);
      const data = new FormData();
      data.append('file', fileList);
      data.append('upload_preset', 'recipe');
      data.append('cloud_name', 'hamed4000');
      const res = await axios.post(process.env.REACT_APP_CLOUDINARY, data);
      return res.data.url;
    } catch (e) {
      setUploading(false);
    }
  };
  const [addRecipe, { loading }] = useMutation(ADD_RECIPE, {
    refetchQueries: [
      {
        query: GET_ALL_RECIPES,
      },
      {
        query: GET_USER_RECIPES,
        variables: { username: user && user.username },
      },
    ],
    onCompleted() {
      history.push('/');
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const url = await handleUploadImage();
        await addRecipe({
          variables: {
            ...values,
            username: user.username,
            imageUrl: url,
            instructions,
          },
        });
        setUploading(false);
      }
    });
  };

  return (
    <MainContainer>
      <Row type="flex" justify="center" align="middle">
        <Col xs={18} sm={12} md={10}>
          <Form onSubmit={handleSubmit} size={'middle'}>
            <Form.Item label="name">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the name of recipe!',
                  },
                ],
              })(<Input placeholder="Recipe name" />)}
            </Form.Item>
            <Form.Item label="Category">
              {getFieldDecorator('category', {
                rules: [
                  { required: true, message: 'Please select your meal!' },
                ],
              })(
                <Select placeholder="Please select a meal">
                  <Option value="Breakfast">Breakfast</Option>
                  <Option value="Lunch">Lunch</Option>
                  <Option value="Dinner">Dinner</Option>
                  <Option value="Snack">Snack</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description')(
                <Input type="textarea" placeholder="add description" />,
              )}
            </Form.Item>
            <Form.Item label="Instructions">
              {getFieldDecorator('instructions', {
                rules: [
                  { required: true, message: 'Please write instructions' },
                ],
              })(
                <CKEditor
                  editor={ClassicEditor}
                  data="<p>instructions</p>"
                  onChange={(event, editor) => {
                    // console.log(editor.getData());
                    setInstructions(editor.getData());
                  }}
                />,
              )}
            </Form.Item>

            <Form.Item label="Upload">
              {getFieldDecorator('upload', {
                rules: [{ required: true, message: 'Please upload image' }],
                valuePropName: 'fileList',
                getValueFromEvent: normFile,
              })(
                <Upload {...propsForUpload} name="logo" listType="picture">
                  <Button>
                    <UploadOutlined /> Click to upload
                  </Button>
                </Upload>,
              )}
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: '7rem',
                  lineHeight: '2',
                  backgroundColor: (loading || uploading) && '#fff',
                }}
              >
                {loading || uploading ? <Spin /> : 'Save'}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default Form.create({ name: 'add_recipe' })(AddRecipes);
