"use client";

import { Button, Form, Input, message, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddLinkForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = useForm();
  const [api, contextHolder] = notification.useNotification(); // Add this!

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json();
        api.error({
          message: `Short Link Failed`,
          description: data?.error || "Something went wrong",
          placement: "topRight",
        });
        setLoading(false);
        return;
      }
      const newLink = await res.json();

      api.success({
        message: "Link Created Successfully!",
        description: `Your short code: ${newLink.code}`,
        duration: 3,
        placement: "topRight",
      });

      form.resetFields();

      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (e) {
      message.error("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        onFinish={onFinish}
        className="mb-5 flex flex-wrap gap-3"
      >
        <FormItem
          name="url"
          rules={[
            { required: true, message: "URL is required" },
            { type: "url", message: "Enter a valid URL" },
          ]}
        >
          <Input placeholder="Enter URL" allowClear />
        </FormItem>

        <FormItem name="code">
          <Input placeholder="Enter code" allowClear />
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add
          </Button>
        </FormItem>
      </Form>
    </>
  );
}
