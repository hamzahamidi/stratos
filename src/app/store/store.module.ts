import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';

import { ActionHistoryEffect } from './effects/action-history.effects';
import { APIEffect } from './effects/api.effects';
import { AppMetadataEffect } from './effects/app-metadata.effects';
import { AppVariablesEffect } from './effects/app-variables.effects';
import { AuthEffect } from './effects/auth.effects';
import { CNSISEffect } from './effects/cnsis.effects';
import { CreateAppPageEffects } from './effects/create-app-effects';
import { PaginationEffects } from './effects/pagination.effects';
import { RouterEffect } from './effects/router.effects';
import { SnackBarEffects } from './effects/snackBar.effects';
import { SystemEffects } from './effects/system.effects';
import { UAASetupEffect } from './effects/uaa-setup.effects';
import { UpdateAppEffects } from './effects/update-app-effects';
import { AppReducersModule } from './reducers.module';


@NgModule({
  imports: [
    AppReducersModule,
    HttpModule,
    HttpClientModule,
    EffectsModule.forRoot([
      APIEffect,
      AuthEffect,
      UAASetupEffect,
      CNSISEffect,
      CreateAppPageEffects,
      AppMetadataEffect,
      UpdateAppEffects,
      PaginationEffects,
      ActionHistoryEffect,
      AppVariablesEffect,
      RouterEffect,
      SystemEffects,
      SnackBarEffects,
    ]),
  ]
})
export class AppStoreModule { }
