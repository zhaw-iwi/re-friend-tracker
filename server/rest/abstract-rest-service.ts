import {AbstractDatabase} from "../database/abstract-database";

export abstract class AbstractRestService {

    constructor(protected _app, protected _database: AbstractDatabase) {
    }

    public init() {
        this.initList();
        this.initCreate();
        this.initRead();
        this.initUpdate();
        this.initDelete();
    }

    protected initList() {
        const service = this;
        this._app.get("/services/" + service._database.getEntityName() + "", async (req, res) => {
            let rows = await service._database.list();
            if (req.query.search) {
                rows = this.filter(rows, req.query.search, service._database.getSearchAttributes());
            }
            this._database.createPathButtonList(rows, res).catch((error: any) => console.log(error));
        });
    }

    protected filter(list, searchText: string, searchAttributes: string[]) {
        searchText = searchText.toLowerCase();
        const matches = [];
        for (const element of list) {
            for (const key of searchAttributes) {
                if (element[key]) {
                    const value = element[key].toLowerCase();
                    if (value.indexOf(searchText) > -1) {
                        matches.push(element);
                    }
                }
            }
        }
        return matches;
    }

    protected initCreate() {
        this._app.post("/services/" + this._database.getEntityName() + "", async (req, res) => {
            const newDoc = await this._database.create(req.body);
            res.json(newDoc);
        });
    }

    protected initRead() {
        this._app.get("/services/" + this._database.getEntityName() + "/:key", async (req, res) => {
            const key: string = req.params.key;
            if (key !== "null") {
                const doc = await this._database.read(key);
                res.json(doc);
            } else {
                const doc = await this._database.prepareCreate();
                res.json(doc);
            }
        });
    }

    protected initUpdate() {
        this._app.put("/services/" + this._database.getEntityName() + "/:key", async (req, res) => {
            const key: string = req.params.key;
            const doc = await this._database.update(key, req.body);
            res.json(doc);
        });
    }

    protected initDelete() {
        this._app.delete("/services/" + this._database.getEntityName() + "/:key", async (req, res) => {
            const key: string = req.params.key;
            const doc = await this._database.delete(key);
            res.json({message: "deleted"});
        });
    }
}
