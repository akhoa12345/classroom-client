import { SortableContainer } from 'react-sortable-hoc';
import { Table } from 'antd';

const SortableTable = SortableContainer((props) => {
  return <Table {...props} />;
});

export default SortableTable;
