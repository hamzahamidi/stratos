import { schema } from 'normalizr';
import { getAPIResourceGuid, APIAction, ApiActionTypes } from './api.actions';
import { RequestOptions } from '@angular/http';

export const GET = '[Organisation] Get one';
export const GET_SUCCESS = '[Organisation] Get one success';
export const GET_FAILED = '[Organisation] Get one failed';

export const OrganisationSchema = new schema.Entity('organization', {}, {
    idAttribute: getAPIResourceGuid
});

export class GetOrganisation implements APIAction {
    constructor(public guid: string, public cnis: string) {
        this.options = new RequestOptions();
        this.options.url = `organization/${guid}`;
        this.options.method = 'get';
    }
    actions = [
        GET,
        GET_SUCCESS,
        GET_FAILED
    ];
    type = ApiActionTypes.API_REQUEST;
    entity = [OrganisationSchema];
    entityKey = OrganisationSchema.key;
    options: RequestOptions;
}