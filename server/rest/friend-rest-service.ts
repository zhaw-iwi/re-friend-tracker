import {AbstractRestService} from "./abstract-rest-service";
import {FriendDatabase} from "../database/friend-database";

export class FriendRestService extends AbstractRestService {

    constructor(app, private database: FriendDatabase) {
        super(app, database);
    }

    protected initList() {
        super.initList();

        const service = this;
        this._app.get("/services/activity/:activityKey/friend", async (req, res) => {
            const friends = await service.database.list();
            const activityKey = req.params.activityKey;
            const activity = await service.database.read(activityKey).catch((err) => { console.log(err); });
            const result = [];
            if (activity && activity.friends) {
                for (const friend of friends) {
                    for (const friendKey of activity.friends) {
                        if (friendKey === friend._id) {
                            result.push(friend);
                        }
                    }
                }
            }
            return service.database.createPathButtonList(result, res);
        });
    }

}
