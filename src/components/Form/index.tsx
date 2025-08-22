import { useMemo, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Space,
  Popconfirm,
  message,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import type { RowItem } from '@/types';
import { table, state } from '@/constants';
import { Container } from '@/components/Container';
import { SearchInput } from '@/components/SearchInput';

export const UserForm = () => {
  const [data, setData] = useState<RowItem[]>(() => table.defaultRowItems);

  const [isModalOpen, setIsModalOpen] = useState(state.isModalOpen);
  const [editingId, setEditingId] = useState<number | null>(state.editingId);
  const [form] = Form.useForm();

  const [search, setSearch] = useState(state.search);

  const nextId = useMemo(() => {
    return Math.max(0, ...data.map((item) => item.id)) + 1;
  }, [data]);

  const addRowItem = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const editRowItem = (rowItem: RowItem) => {
    setEditingId(rowItem.id);
    form.setFieldsValue({
      title: rowItem.title,
      description: rowItem.description,
      weight: rowItem.weight,
      date: rowItem.date ? dayjs(rowItem.date) : null,
    });
    setIsModalOpen(true);
  };

  const handleDeleteRowItem = (id: number) => {
    setData((items) => items.filter((item) => item.id !== id));
    message.success(table.modalAlerts.delete);
  };

  const handleRowChange = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        weight: Number(values.weight),
        date: values.date ? values.date.toDate() : null,
      };

      if (editingId === null) {
        setData((previousItems) => [{ id: nextId, ...payload }, ...previousItems]);
        message.success(table.modalAlerts.add);
      } else {
        setData((previousItems) =>
          previousItems.map((item) => (item.id === editingId ? { ...item, ...payload } : item)),
        );
        message.success(table.modalAlerts.update);
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error(table.modalAlerts.error);
      console.error(error);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) => {
      const dateString = row.date ? row.date.toLocaleDateString() : '';
      return (
        String(row.title).toLowerCase().includes(search) ||
        String(row.weight).toLowerCase().includes(search) ||
        dateString.toLowerCase().includes(search)
      );
    });
  }, [data, search]);

  const columns: ColumnsType<RowItem> = [
    {
      title: table.tableRowsTitle.id,
      dataIndex: 'id',
      key: 'id',
      sorter: (a: RowItem, b: RowItem) => a.id - b.id,
      sortDirections: ['ascend', 'descend'],
      render: (id: string) => id,
    },
    {
      title: table.tableRowsTitle.title,
      dataIndex: 'title',
      key: 'title',
      sorter: (a: RowItem, b: RowItem) => a.title.localeCompare(b.title),
      sortDirections: ['ascend', 'descend'],
      render: (text: string) => text,
    },
    {
      title: table.tableRowsTitle.description,
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text,
    },
    {
      title: table.tableRowsTitle.weight,
      dataIndex: 'weight',
      key: 'weight',
      sorter: (a: RowItem, b: RowItem) => a.weight - b.weight,
      render: (weight: number) => weight,
    },
    {
      title: table.tableRowsTitle.date,
      dataIndex: 'date',
      key: 'date',
      sorter: (a: RowItem, b: RowItem) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (value: Date) => (value ? value.toLocaleDateString() : ''),
    },
    {
      title: table.tableRowsTitle.action,
      key: 'actions',
      render: (_, record: RowItem) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => editRowItem(record)} />
          <Popconfirm
            title={table.buttonTitles.delete}
            onConfirm={() => {
              handleDeleteRowItem(record.id);
            }}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Container>
      <div className={'table'}>
        <SearchInput addRowItem={addRowItem} setSearch={setSearch} />

        <Table<RowItem>
          className={'table_wrapper'}
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 6 }}
          bordered
          showSorterTooltip={true}
        />

        <Modal
          title={editingId === null ? table.modalTitles.add : table.modalTitles.edit}
          open={isModalOpen}
          onOk={handleRowChange}
          onCancel={handleModalCancel}
          okText={table.modalTitles.save}
        >
          <Form form={form} layout="vertical" preserve={false}>
            <Form.Item
              name="title"
              label={table.tableRowsTitle.title}
              rules={[
                { required: true, message: table.modalTitles.formTitles.title },
                { max: 100 },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label={table.tableRowsTitle.description}
              rules={[
                { required: true, message: table.modalTitles.formTitles.description },
                { max: 100 },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="weight"
              label={table.tableRowsTitle.weight}
              rules={[{ required: true, message: table.modalTitles.formTitles.weight }]}
            >
              <InputNumber style={{ width: '100%' }} min={-999999999} />
            </Form.Item>

            <Form.Item
              name="date"
              label={table.tableRowsTitle.date}
              rules={[{ required: true, message: table.modalTitles.formTitles.date }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Container>
  );
};
