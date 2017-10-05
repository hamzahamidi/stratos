import { RequestOptions } from '@angular/http';
import { Action, compose, createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { denormalize, Schema } from 'normalizr';
import { Observable } from 'rxjs/Rx';

import { EntitiesState } from '../reducers/entity.reducer';
import { AppState } from './../app-state';
import { EntityRequestState } from './../reducers/api-request-reducer';


export const ApiActionTypes = {
  API_REQUEST: 'API_REQUEST',
  API_REQUEST_START: 'API_REQUEST_START',
  API_REQUEST_SUCCESS: 'API_REQUEST_SUCCESS',
  API_REQUEST_FAILED: 'API_REQUEST_FAILED',
};

export interface APIResource {
  metadata: APIResourceMetadata;
  entity: any;
}

export interface APIResourceMetadata {
  created_at: string;
  guid: string;
  update_at: string;
  url: string;
}

export class APIAction implements Action {
  actions: string[];
  type = ApiActionTypes.API_REQUEST;
  options: RequestOptions;
  entity: Schema;
  entityKey: string;
  paginationKey?: string;
  cnis?: string;
  // For single entity requests
  guid?: string;
  updatingKey?: string;
}

export interface NormalizedResponse {
  entities: {
    [key: string]: any
  };
  result: any[];
}

export class StartAPIAction implements Action {
  constructor(
    public apiAction: APIAction
  ) {
  }
  type = ApiActionTypes.API_REQUEST_START;
}

export class WrapperAPIActionSuccess implements Action {
  constructor(
    public type: string,
    public response: NormalizedResponse,
    public apiAction: APIAction
  ) { }
  apiType = ApiActionTypes.API_REQUEST_SUCCESS;
}

export class WrapperAPIActionFailed implements Action {
  constructor(
    public type: string,
    public message: string,
    public apiAction: APIAction
  ) { }
  apiType = ApiActionTypes.API_REQUEST_FAILED;
}

export const selectEntities = createFeatureSelector<EntitiesState>('entities');

export const createEntitySelector = (entity: string) => {
  return createSelector(selectEntities, (state: EntitiesState) => state[entity]);
};

interface EntityInfo {
  entityRequestInfo: EntityRequestState;
  entity: any;
}

export const getEntityObservable = (
  store: Store<AppState>,
  entityKey: string,
  schema: Schema,
  id: string,
  action: Action
): Observable<EntityInfo> => {
  // This fetching var needs to end up in the state
  return Observable.combineLatest(
    store.select(getEntityState),
    store.select(selectEntity(entityKey, id)),
    store.select(selectEntityRequestInfo(entityKey, id))
  )
    .do(([entities, entity, entityRequestInfo]: [EntitiesState, APIResource, EntityRequestState]) => {
      if (!entity && (!entityRequestInfo || !entityRequestInfo.fetching)) {
        store.dispatch(action);
      }
    }).filter(([entities, entity, entityRequestInfo]) => {
      return (entity && entity.entity) || !!entityRequestInfo;
    })
    .map(([entities, entity, entityRequestInfo]) => {
      return {
        entityRequestInfo,
        entity: entity ? {
          entity: denormalize(entity, schema, entities).entity,
          metadata: entity.metadata
        } : {}
      };
    });
};

export function selectEntity(type: string, guid: string) {
  return compose(
    getAPIResourceEntity,
    getEntityById<APIResource>(guid),
    getEntityType(type),
    getEntityState
  );
}

export function selectEntityRequestInfo(type: string, guid: string) {
  return compose(
    getEntityById<EntityRequestState>(guid),
    getEntityType(type),
    getAPIRequestInfoState,
  );
}

export function getEntityState(state: AppState) {
  return state.entities || {};
}

export function getEntityType(type: string) {
  return (entityState) => {
    return entityState[type] || {};
  };
}

export const getEntityById = <T>(guid: string) => (entities): T => {
  return entities[guid];
};

const getValueOrNull = (object, key) => object ? object[key] ? object[key] : null : null;
export const getAPIResourceMetadata = (resource: APIResource): APIResourceMetadata => getValueOrNull(resource, 'metadata');
export const getAPIResourceEntity = (resource: APIResource): any => getValueOrNull(resource, 'entity');
export const getMetadataGuid = (metadata: APIResourceMetadata): string => getValueOrNull(metadata, 'guid');
export const getAPIResourceGuid = compose(
  getMetadataGuid,
  getAPIResourceMetadata
);

export function getAPIRequestInfoState(state: AppState) {
  return state.apiRequest || {};
}



