import {PathListEntry} from "../data/path-list-entry";
import {PathListKey} from "../data/path-list-key";
import {KeyValueDatabase} from "./key-value-database";

export abstract class AbstractDatabase {

    protected static _database:KeyValueDatabase;

    public static initDatabase() {
        this._database = new KeyValueDatabase();
    }

    public abstract getEntityName(): string;

    protected abstract getSort(): any[];

    public list() : Promise<any> {
        let service = this;
        return AbstractDatabase._database.allDocs(service.getEntityName()).then((rows) => {
            let result: PathListEntry[] = [];

            // sort
            let compare = (a, b) => {
                for (let sort of service.getSort()) {
                    if (a[sort] < b[sort]) {
                        return -1;
                    }
                    else if (a[sort] > b[sort]) {
                        return 1;
                    }
                }
                return 0;
            }
            rows.sort(compare);
            return rows;
        })
    }

    public create(data: any): Promise<any> {
        let service = this;
        return AbstractDatabase._database.create(service.getEntityName(), data).then((doc) => {
            doc.key = doc.id;
            delete doc.id;
            return doc;
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

    public createPathList(rows, res) {
        let service = this;
        var promises = [];
        for (let item of rows) {
            let entry: PathListEntry = new PathListEntry();
            let key: PathListKey = new PathListKey();
            key.key = item._id;
            key.name = service.getEntityName() + "Key";
            entry.key = key;
            promises.push(service.createPathListEntry(entry, item));
        }
        return Promise.all(promises).then((result) => {
                res.json(result);
            }
        ).catch((err) => {
            console.log(err);
        });
    }

    public createPathListEntry(entry: PathListEntry, entity: any): Promise<PathListEntry> {
        return new Promise((resolve, reject) => {
            resolve(entry);
        });
    }

    public toComplexKey(...keys: any[]) : any {
        let complexKey:string = 'complex_';
        for (let key of keys) {
            complexKey += '_' + key;
        }
        return complexKey;
    }

}