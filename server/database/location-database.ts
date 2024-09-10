import {AbstractDatabase} from "./abstract-database";
import {PathButton} from "../data/path-button";

export class LocationDatabase extends AbstractDatabase {

    public getEntityName() {
        return "location";
    }

    protected getSort(): any[] {
        return ["name"];
    }

    public getSearchAttributes(): any[] {
        return ["name"];
    }

    public createPathButton(entry: PathButton, entity: any): Promise<PathButton> {
        entry.name = entity.name;
        return super.createPathButton(entry, entity);
    }

}
