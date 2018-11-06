import {AbstractRestService} from "./abstract-rest-service";
import {GroupDatabase} from "../database/group-database";

export class GroupRestService extends AbstractRestService {

    constructor(app, private database: GroupDatabase) {
        super(app, database);
    }

}
