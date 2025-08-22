export type RowItem = {
  id: number;
  title: string;
  description: string;
  weight: number;
  date: Date;
};

export type SearchInputProps = {
  addRowItem: VoidFunction;
  setSearch: (value: string) => void;
};
