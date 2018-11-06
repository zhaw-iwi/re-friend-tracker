import {AbstractDatabase} from "./abstract-database";
import {PathListEntry} from "../data/path-list-entry";

export class FriendDatabase extends AbstractDatabase {

    public getEntityName() {
        return "friend";
    }

    protected getSort(): any[] {
        return ["familyName", "firstName"];
    }

    public createPathListEntry(entry: PathListEntry, entity: any): Promise<PathListEntry> {
        entry.name = entity.firstName + " " + entity.familyName;
        return super.createPathListEntry(entry, entity);
    }
}
