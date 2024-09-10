import {AbstractDatabase} from "./abstract-database";
import {PathButton} from "../data/path-button";

export class ActivityDatabase extends AbstractDatabase {

    public getEntityName() {
        return "activity";
    }

    protected getSort(): any[] {
        return ["name"];
    }

    public getSearchAttributes(): any[] {
        return ["name"];
    }

    public createPathButton(entry: PathButton, entity: any) {
        entry.name = entity.name;
        return super.createPathButton(entry, entity);
    }

}
