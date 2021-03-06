import { ITableColumn } from '../components/table/table.types';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  TableCellAppNameComponent,
} from '../components/table/custom-cells/table-cell-app-name/table-cell-app-name.component';
import { CfAppsDataSource } from '../data-sources/cf-apps-data-source';
import { APIResource } from '../../store/types/api.types';
import { Injectable } from '@angular/core';
import { EntityInfo } from '../../store/types/api.types';
import { IListAction, IListConfig, IMultiListAction } from '../components/list/list.component';
import { AppState } from '../../store/app-state';
import { UtilsService } from '../../core/utils.service';
import { ApplicationStateService } from '../../shared/components/application-state/application-state.service';
import { TableCellAppStatusComponent } from '../components/table/custom-cells/table-cell-app-status/table-cell-app-status.component';

@Injectable()
export class CfAppConfigService implements IListConfig<APIResource> {

  constructor(
    private datePipe: DatePipe,
    private store: Store<AppState>,
    private utilsService: UtilsService,
    private appStateService: ApplicationStateService,
  ) {
    this.appsDataSource = new CfAppsDataSource(this.store);
  }
  appsDataSource: CfAppsDataSource;
  columns: Array<ITableColumn<APIResource>> = [
    {
      columnId: 'name', headerCell: () => 'Application Name', cellComponent: TableCellAppNameComponent, cellFlex: '2', sort: true
    },
    {
      columnId: 'status', headerCell: () => 'Status',
      cellFlex: '1',
      cellComponent: TableCellAppStatusComponent,
    },
    {
      columnId: 'instances', headerCell: () => 'Instances', cell: (row: APIResource) => `${row.entity.instances}`, cellFlex: '1'
    },
    {
      columnId: 'disk', headerCell: () => 'Disk Quota',
      cell: (row: APIResource) => `${this.utilsService.mbToHumanSize(row.entity.disk_quota)}`, cellFlex: '1'
    },
    {
      columnId: 'memory', headerCell: () => 'Memory',
      cell: (row: APIResource) => `${this.utilsService.mbToHumanSize(row.entity.memory)}`, cellFlex: '1'
    },
    {
      columnId: 'creation', headerCell: () => 'Creation Date',
      cell: (row: APIResource) => `${this.datePipe.transform(row.metadata.created_at, 'medium')}`, sort: true,
      cellFlex: '2'
    },
  ];
  pageSizeOptions = [9, 45, 90];

  getGlobalActions = () => null;
  getMultiActions = () => null;
  getSingleActions = () => null;
  getColumns = () => this.columns;
  getDataSource = () => this.appsDataSource;
  getFiltersConfigs = () => [{
    key: 'endpoint',
    label: 'Endpoint',
    items: [{
      label: 'All Endpoints',
      value: 'all'
    }]
  }]
}
