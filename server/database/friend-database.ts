import {AbstractDatabase} from "./abstract-database";
import {PathButton} from "../data/path-button";

export class FriendDatabase extends AbstractDatabase {

    public getEntityName() {
        return "friend";
    }

    protected getSort(): any[] {
        return ["familyName", "firstName"];
    }

    public getSearchAttributes(): any[] {
        return ["familyName", "firstName"];
    }

    public createPathButton(entry: PathButton, entity: any): Promise<PathButton> {
        entry.name = entity.firstName + " " + entity.familyName;
        return super.createPathButton(entry, entity);
    }
}
