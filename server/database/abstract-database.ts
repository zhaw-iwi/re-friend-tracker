import {PathGroup} from "../data/path-group";
import {PathButton} from "../data/path-button";
import {PathKey} from "../data/path-key";
import {KeyValueDatabase} from "./key-value-database";

export abstract class AbstractDatabase {

    protected static _database: KeyValueDatabase;

    public static initDatabase() {
        this._database = new KeyValueDatabase();
    }

    public abstract getEntityName(): string;

    public abstract getSearchAttributes(): string[];

    protected abstract getSort(): any[];

    public list(): Promise<any> {
        const service = this;
        return AbstractDatabase._database.allDocs(service.getEntityName()).then((rows) => {
            const result: PathButton[] = [];

            // sort
            const compare = (a, b) => {
                for (const sort of service.getSort()) {
                    if (a[sort] < b[sort]) {
                        return -1;
                    } else if (a[sort] > b[sort]) {
                        return 1;
                    }
                }
                return 0;
            };
            rows.sort(compare);
            return rows;
        });
    }

    public prepareCreate(): Promise<any> {
        return Promise.resolve("{}");
    }

    public create(data: any): Promise<any> {
        const service = this;
        return AbstractDatabase._database.create(service.getEntityName(), data).then((doc) => {
            const button = new PathButton();
            button.key = this.createPathKey(doc, this);
            return button;
        });
    }

    public read(key: any): Promise<any> {
        return AbstractDatabase._database.read(key);
    }

    public update(key: any, data: string): Promise<any> {
        return AbstractDatabase._database.update(key, data);
    }

    public delete(key: any): Promise<any> {
        return AbstractDatabase._database.delete(key);
    }

    public createPathButtonList(rows, res) {
        const service = this;
        const promises = [];
        for (const item of rows) {
            const entry: PathButton = new PathButton();
            entry.key = this.createPathKey(item, service);
            promises.push(service.createPathButton(entry, item));
        }
        return Promise.all(promises).then((result) => {
                res.json(result);
            }
        ).catch((err) => {
            console.log(err);
        });
    }

    public createPathGroupList(rows, additionalButtons: PathButton[], res) {
        const service = this;
        const result: PathGroup[] = [];
        const promises = [];
        for (const item of rows) {
            // group
            const group: PathGroup = new PathGroup();
            group.key = this.createPathKey(item, service);
            // first button
            const entry: PathButton = new PathButton();
            entry.key = this.createPathKey(item, service);
            // additional buttons
            for (const additionalButton of additionalButtons) {
                const newAdditionalButton = additionalButton.clone();
                newAdditionalButton.key = entry.key;
                group.buttons.push(newAdditionalButton);
            }
            promises.push(service.createPathButton(entry, item));
            result.push(group);
        }
        Promise.all(promises).then((buttons) => {
                let counter = 0;
                for (const button of buttons) {
                    result[counter].buttons.unshift(button);
                    counter++;
                }
                res.json(result);
            }
        ).catch((err) => {
            console.log(err);
        });
    }

    private createPathKey(item, service): PathKey {
        const key: PathKey = new PathKey();
        key.key = item._id;
        if (item.id) {
            key.key = item.id;
        }
        key.name = service.getEntityName() + "Key";
        return key;
    }

    public createPathButton(entry: PathButton, entity: any): Promise<PathButton> {
        return new Promise((resolve, reject) => {
            resolve(entry);
        });
    }

    public toComplexKey(...keys: any[]): any {
        let complexKey = "complex_";
        for (const key of keys) {
            complexKey += "_" + key;
        }
        return complexKey;
    }

}
