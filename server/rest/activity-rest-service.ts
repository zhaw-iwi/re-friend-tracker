import {AbstractRestService} from "./abstract-rest-service";
import {PathListKey} from "../data/path-list-key";
import {PathListEntry} from "../data/path-list-entry";
import {ActivityDatabase} from "../database/activity-database";

export class ActivityRestService extends AbstractRestService {

    constructor(app, private database: ActivityDatabase) {
        super(app, database);
    }

    protected initList() {
        super.initList();

        let service = this;
        this._app.get('/services/friend/:friendKey/activity', async (req, res) => {
            let rows = await service.database.list();
            let friendKey = req.params.friendKey;
            var result = [];
            for (let activity of rows) {
                if (activity.friends) {
                    for (let friend of activity.friends) {
                        if (friend == friendKey) {
                            result.push(activity);
                            break;
                        }
                    }
                }
            }
            return service.database.createPathList(result, res);
        });

        this._app.get('/services/location/:locationKey/activity', async (req, res) => {
            let rows = await service.database.list();
            let locationKey = req.params.locationKey;
            var result = [];
            for (let activity of rows) {
                if (activity.location == locationKey) {
                    result.push(activity);
                    break;
                }
            }
            return service.database.createPathList(result, res);
        });

    }

    protected initRead() {
        super.initRead();

        let service = this;
        this._app.get('/services/friend/:friendKey/activity/:activityKey', async (req, res) => {
            // nop
            res.json("true");
        });
    }

    protected initCreate() {
        super.initCreate();

        let service = this;
        this._app.post('/services/friend/:friendKey/activity', async (req, res) => {
            let friendKey = req.params.friendKey;
            let activityKey = req.body.activity;
            console.log("post");
            console.log(friendKey);
            console.log(activityKey);
            let activity = await service.database.read(activityKey);
            if (!activity.friends) {
                activity.friends = [];
            }
            activity.friends.push(friendKey);
            activity.friends = Array.from(new Set(activity.friends)); // unique
            await service.database.update(activity._id, activity);
            res.json("true");
        });
    }

    protected initUpdate() {
        super.initUpdate();

        let service = this;
        this._app.put('/services/friend/:friendKey/activity', async (req, res) => {
            let friendKey = req.params.friendKey;
            let activityKey = req.body.activity;
            let activity = await service.database.read(activityKey);
            if (!activity.friends) {
                activity.friends = [];
            }
            activity.friends.push(friendKey);
            activity.friends = Array.from(new Set(activity.friends)); // unique
            await service.database.update(activity._id, activity);
            res.json("true");
        });
    }

    protected initDelete() {
        super.initDelete();

        let service = this;
        this._app.delete('/services/friend/:friendKey/activity/:activityKey', async (req, res) => {
            let friendKey = req.params.friendKey;
            let activityKey = req.params.activityKey;
            let activity = await service.database.read(activityKey);
            if (!activity.friends) {
                activity.friends = [];
            }
            activity.friends.pop(friendKey);
            activity.friends = Array.from(new Set(activity.friends)); // unique
            let result = await service.database.update(activity._id, activity);
            res.json("true");
        });
    }

}