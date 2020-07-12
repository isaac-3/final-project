import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import { Button, Modal, Form, Input, Radio } from 'antd';
import {Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    AutoComplete,
  } from 'antd';
  import { Alert } from 'antd';
  import { message, Space } from 'antd'

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const [toggle, setLog] = useState({toggle: false})

  let switchLog = () => {
      setLog({toggle: toggle.toggle ? false : true})
  }
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const { Option } = Select;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Modal style={{textAlign: 'center'}}
      visible={visible}
      title={toggle.toggle ? 'Sign Up' : 'Login'}
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
    {toggle.toggle ?
    <Form
        {...formItemLayout}
        form={form}
        name="register"
        scrollToFirstError
    >
        <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
        name="email"
        label="E-mail"
        rules={[
            {
            type: 'email',
            message: 'The input is not valid E-mail!',
            },
            {
            required: true,
            message: 'Please input your E-mail!',
            },
        ]}
        >
        <Input />
        </Form.Item>
        <Form.Item
        name="password"
        label="Password"
        rules={[
            {
            required: true,
            message: 'Please input your password!',
            },
        ]}
        hasFeedback
        >
        <Input.Password />
        </Form.Item>
        <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
            {
            required: true,
            message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
            validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
            },
            }),
        ]}
        >
        <Input.Password />
        </Form.Item>
        <Form.Item
      name="agreement"
      valuePropName="checked"
      rules={[
        {
          validator: (_, value) =>
            value ? Promise.resolve() : Promise.reject('Should accept agreement'),
        },
      ]}
      {...tailFormItemLayout}
    >
      <Checkbox>
        I have read the <a href="">agreement</a>
      </Checkbox>
    </Form.Item>
    </Form>
    :
    <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
    >
        <Form.Item
            name="username"
            rules={[
            {
                required: true,
                message: 'Please input your Username!',
            },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your Password!',
            },
            ]}
        >
            <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            />
        </Form.Item>
        <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>
    </Form>
    }
    <a style={{cursor:'pointer', color:'blue', 'textDecoration':'underline'}} onClick={()=>switchLog()}>{toggle.toggle ? 'To Login' : 'To Sign Up!'}</a>
    </Modal>
  );
};

export const LogForm = () => {
  const [visible, setVisible] = useState(false);
  let loguser = useSelector( state => state.user)
  let dispatch = useDispatch()
  let history = useHistory()

  const onCreate = values => {
    if(Object.keys(values).length === 3){
        fetch('http://localhost:3000/login', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password
            })
        })
        .then(res=> res.json())
        .then(result=> {
            if(result.success){
                message.success('Successfully Logged In', 2)
                dispatch({ type: "LOG_IN", user: result.loggeduser })
                history.push('/')
            }else {
                message.error('Incorrect username or password', 4)
            }
        })
    }else if(Object.keys(values).length === 5){
        fetch("http://localhost:3000/users", {
            credentials: "include",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: values.username,
              password: values.password,
              address: '',
              email: values.email,
            }),
        })
        .then(res=> res.json())
        .then(result=> {
            if(result.success){
                message.success('Welcome', 2)
                dispatch({ type: "LOG_IN", user: result.user })
            }else {
                message.error('Username is taken')
            }
        })
    }
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="text"
        onClick={() => {
          setVisible(true);
        }}
      >
        Login/Sign Up
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
