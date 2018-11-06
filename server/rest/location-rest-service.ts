import {AbstractRestService} from "./abstract-rest-service";
import {AbstractDatabase} from "../database/abstract-database";

export class LocationRestService extends AbstractRestService {

    constructor(app, database: AbstractDatabase) {
        super(app, database);
    }

}
