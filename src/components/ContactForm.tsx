'use client';

import { Form, Input, Button, message } from 'antd';
import { MailOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/hooks';
import { submitStart, submitSuccess, submitFailure, resetSubmitStatus } from '@/store/features/contactSlice';
import { api } from '@/lib/api';
import { ContactFormData } from '@/types';
import { useEffect } from 'react';

const ContactForm = () => {
  const dispatch = useDispatch();
  const { isSubmitting, submitStatus, errorMessage } = useAppSelector((state) => state.contact);
  const [form] = Form.useForm();

  useEffect(() => {
    if (submitStatus === 'success') {
      message.success('Message sent successfully! I will get back to you soon.');
      form.resetFields();
      dispatch(resetSubmitStatus());
    } else if (submitStatus === 'error') {
      message.error(errorMessage || 'Failed to send message. Please try again.');
      dispatch(resetSubmitStatus());
    }
  }, [submitStatus, errorMessage, dispatch, form]);

  const onFinish = async (values: ContactFormData) => {
    try {
      dispatch(submitStart(values));
      const response = await api.submitContact(values);
      if (response.success) {
        dispatch(submitSuccess());
      } else {
        dispatch(submitFailure(response.message));
      }
    } catch (error) {
      dispatch(submitFailure('Network error. Please try again.'));
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Your name" size="large" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' }
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="your.email@example.com" size="large" />
      </Form.Item>

      <Form.Item
        name="message"
        label="Message"
        rules={[{ required: true, message: 'Please enter your message' }]}
      >
        <Input.TextArea
          placeholder="Tell me about your project..."
          rows={6}
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting} size="large" block>
          Send Message
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
