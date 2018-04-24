import {AbstractRestService} from "./abstract-rest-service";
import {FriendDatabase} from "../database/friend-database";

export class FriendRestService extends AbstractRestService {

    constructor(app, private database: FriendDatabase) {
        super(app, database);
    }

    protected initList() {
        super.initList();

        let service = this;
        this._app.get('/services/activity/:activityKey/friend', async (req, res) => {
            let friends = await service.database.list();
            let activityKey = req.params.activityKey;
            let activity = await service.database.read(activityKey);
            var result = [];
            if (activity.friends) {
                for (let friend of friends) {
                    for (let friendKey of activity.friends) {
                        if (friendKey == friend._id) {
                            result.push(friend);
                        }
                    }
                }
            }
            return service.database.createPathList(result, res);
        });
    }

}