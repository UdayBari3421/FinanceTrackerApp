import React from "react";

import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

const AddIncome = ({ isIncomeModalVisible, handleIncomeCancel, onFinish }) => {
  const [form] = Form.useForm();

  return (
    <Modal className="font-semibold" title="Add Income" open={isIncomeModalVisible} onCancel={handleIncomeCancel} footer={null}>
      <Form
        form={form}
        layout="vertical"
        onFinish={(value) => {
          onFinish(value, "income");
          form.resetFields();
        }}
      >
        <Form.Item
          className="font-semibold"
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="-tracking-tighter p-2 transition-all duration-[0.2s] w-full" />
        </Form.Item>
        <Form.Item className="font-semibold" label="Amount" name="ammount" rules={[{ required: true, message: "Please input the amount!" }]}>
          <Input type="number" className="-tracking-tighter p-2 transition-all duration-[0.2s] w-full" />
        </Form.Item>
        <Form.Item className="font-semibold" label="Date" name="date" rules={[{ required: true, message: "Please Select the income date!" }]}>
          <DatePicker className="-tracking-tighter p-2 transition-all duration-[0.2s] w-full" format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item className="font-semibold" label="Tag" name="tag" rules={[{ required: true, message: "Please Select a tag!" }]}>
          <Select className="-tracking-tighter transition-all duration-[0.2s] w-full">
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            className="text-sm m-0 text-center w-full p-2 border-2 border-[var(--theme)] rounded cursor-pointer flex justify-center items-center h-auto hover:bg-[var(--white)] hover:rounded-md hover:text-blue-500 bg-[var(--theme)] text-[var(--white)] "
            type="primary"
            htmlType="submit"
          >
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddIncome;
