import {AbstractRestService} from "./abstract-rest-service";
import {PathKey} from "../data/path-key";
import {PathButton} from "../data/path-button";
import {ActivityDatabase} from "../database/activity-database";

export class ActivityRestService extends AbstractRestService {

    constructor(app, private database: ActivityDatabase) {
        super(app, database);
    }

    protected initList() {
        super.initList();

        const service = this;
        this._app.get("/services/friend/:friendKey/activity", async (req, res) => {
            const rows = await service.database.list();
            const friendKey = req.params.friendKey;
            const result = [];
            for (const activity of rows) {
                if (activity.friends) {
                    for (const friend of activity.friends) {
                        if (friend === friendKey) {
                            result.push(activity);
                            break;
                        }
                    }
                }
            }
            return service.database.createPathButtonList(result, res);
        });

        this._app.get("/services/location/:locationKey/activity", async (req, res) => {
            const rows = await service.database.list();
            const locationKey = req.params.locationKey;
            const result = [];
            for (const activity of rows) {
                if (activity.location === locationKey) {
                    result.push(activity);
                    break;
                }
            }
            return service.database.createPathButtonList(result, res);
        });

    }

    protected initRead() {
        super.initRead();

        const service = this;
        this._app.get("/services/friend/:friendKey/activity/:activityKey", async (req, res) => {
            // nop
            res.json("true");
        });

        this._app.get("/services/activity/:activityKey/friend/:friendKey", async (req, res) => {
            // nop
            res.json("true");
        });
    }

    protected initCreate() {
        super.initCreate();

        const service = this;
        this._app.post("/services/friend/:friendKey/activity", async (req, res) => {
            const friendKey = req.params.friendKey;
            const activityKey = req.body.activity;
            res.json(this.updateFriend(service, activityKey, friendKey));
        });

        this._app.post("/services/activity/:activityKey/friend", async (req, res) => {
            const friendKey = req.body.friend;
            const activityKey = req.params.activityKey;
            res.json(this.updateFriend(service, activityKey, friendKey));
        });
    }

    protected initUpdate() {
        super.initUpdate();

        const service = this;
        this._app.put("/services/friend/:friendKey/activity/:activityKey", async (req, res) => {
            const friendKey = req.params.friendKey;
            const activityKey = req.body.activity;
            res.json(this.updateFriend(service, activityKey, friendKey));
        });

        this._app.put("/services/activity/:activityKey/friend/:friendKey", async (req, res) => {
            const friendKey = req.body.friend;
            const activityKey = req.params.activityKey;
            res.json(this.updateFriend(service, activityKey, friendKey));
        });
    }

    private async updateFriend(service: ActivityRestService, activityKey, friendKey) {
        const activity = await service.database.read(activityKey);
        if (!activity.friends) {
            activity.friends = [];
        }
        activity.friends.push(friendKey);
        activity.friends = Array.from(new Set(activity.friends)); // unique
        const result = await service.database.update(activity._id, activity);
        return result;
    }

    protected initDelete() {
        super.initDelete();

        const service = this;
        this._app.delete("/services/friend/:friendKey/activity/:activityKey", async (req, res) => {
            const friendKey = req.params.friendKey;
            const activityKey = req.params.activityKey;
            res.json(this.deleteFriendFromActivity(service, activityKey, friendKey));
        });

        this._app.delete("/services/activity/:activityKey/friend/:friendKey", async (req, res) => {
            const friendKey = req.params.friendKey;
            const activityKey = req.params.activityKey;
            res.json(this.deleteFriendFromActivity(service, activityKey, friendKey));
        });
    }

    private async deleteFriendFromActivity(service: ActivityRestService, activityKey, friendKey) {
        const activity = await service.database.read(activityKey);
        if (!activity.friends) {
            activity.friends = [];
        }
        // remove item from array
        const index = activity.friends.indexOf(friendKey, 0);
        if (index > -1) {
            activity.friends.splice(index, 1);
        }
        activity.friends = Array.from(new Set(activity.friends)); // unique
        const result = await service.database.update(activity._id, activity);
        return result;
    }

}
