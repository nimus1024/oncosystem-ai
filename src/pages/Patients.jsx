import Rgiteact from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Resize } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';

const Patients = () => {
  const toolbarOptions = ['Search'];

  const editing = { allowDeleting: true, allowEditing: true };

  let grid;
  const dataBound = () => {
      if (grid) {
          grid.autoFitColumns(['Имя']);
      }
  };

  return (
    <div className="mt-20">
      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="m-4 md:m-10 p-6 md:p-10 bg-white rounded-3xl">
          <Header category="" title="Пациенты" />
          <GridComponent
            dataBound={dataBound}
            ref={g => grid = g}
            dataSource={employeesData}
            width="auto"
            allowPaging
            allowSorting
            pageSettings={{ pageCount: 5 }}
            editSettings={editing}
            toolbar={toolbarOptions}
          >
            <Inject services={[Resize]} />
            <ColumnsDirective>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
            </ColumnsDirective>
            <Inject services={[Search, Page]} />

          </GridComponent>
        </div>
      </div>
    </div>
  );
};
export default Patients;
