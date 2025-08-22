import { Button, Input, Space } from 'antd';
import { state, table } from '@/constants';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import type { SearchInputProps } from '@/types';

const delay = 250;

export const SearchInput = ({ addRowItem, setSearch }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState(state.searchQuery);

  useEffect(() => {
    const debounced = debounce((value: string) => setSearch(value.trim().toLowerCase()), delay);
    debounced(searchQuery);
    return () => debounced.cancel();
  }, [searchQuery]);

  return (
    <Space className={'table_search'}>
      <Input
        placeholder={table.buttonTitles.searchPlaceholder}
        prefix={<SearchOutlined />}
        allowClear
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className={'table_search_input'}
      />
      <Button type="primary" icon={<PlusOutlined />} onClick={addRowItem}>
        {table.buttonTitles.add}
      </Button>
    </Space>
  );
};
