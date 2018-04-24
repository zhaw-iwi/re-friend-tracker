import {AbstractDatabase} from "./abstract-database";
import {PathListEntry} from "../data/path-list-entry";

export class ActivityDatabase extends AbstractDatabase {

    public getEntityName() {
        return "activity";
    }

    protected getSort(): any[] {
        return ['name'];
    }

    public createPathListEntry(entry:PathListEntry, entity:any) {
        entry.name = entity.name;
        return super.createPathListEntry(entry, entity);
    }

}