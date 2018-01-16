import { ApplicationMonitorService } from '../../application-monitor.service';
import { CfAppInstancesConfigService } from '../../../../shared/list-configs/cf-app-instances-config.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ApplicationData, ApplicationService } from '../../application.service';
import { CfAppEventsConfigService } from '../../../../shared/list-configs/cf-app-events-config.service';
import { ListConfig } from '../../../../shared/components/list/list.component';

// import { CardComponent } from '../../../../shared/components/cards/card/card.component';

@Component({
  selector: 'app-instances-tab',
  templateUrl: './instances-tab.component.html',
  styleUrls: ['./instances-tab.component.scss'],
  providers: [{
    provide: ListConfig,
    useClass: CfAppInstancesConfigService,
  }]
})
export class InstancesTabComponent implements OnInit {

  constructor(private route: ActivatedRoute, private applicationService: ApplicationService,
  private appMonitor: ApplicationMonitorService) { }

  appService = this.applicationService;

  ngOnInit() {
  }

}