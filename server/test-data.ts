import {FriendDatabase} from "./database/friend-database";
import {LocationDatabase} from "./database/location-database";
import {ActivityDatabase} from "./database/activity-database";
import {GroupDatabase} from "./database/group-database";

export class TestData {

    public static init() {
        const personDatabase = new FriendDatabase();
        const locationDatabase = new LocationDatabase();
        const activityDatabase = new ActivityDatabase();
        const groupDatabase = new GroupDatabase();

        const birthdate1 = new Date();
        const birthdate2 = new Date();
        const birthdate3 = new Date();
        const birthdate4 = new Date();
        birthdate1.setDate(birthdate1.getDate() - 10000);
        birthdate2.setDate(birthdate2.getDate() - 10500);
        birthdate3.setDate(birthdate3.getDate() - 11000);
        birthdate4.setDate(birthdate4.getDate() - 12000);

        let promises = [];
        promises.push(locationDatabase.create({name: "Winterthur"}));
        promises.push(locationDatabase.create({name: "Effretikon"}));
        promises.push(locationDatabase.create({name: "Zürich"}));
        promises.push(locationDatabase.create({name: "Zinal"}));
        Promise.all(promises).then((locations) => {
                promises = [];
                promises.push(personDatabase.create({
                    firstName: "Adam",
                    familyName: "Jones",
                    nickname: "Jony",
                    location: locations[0].key,
                    birthdate: birthdate1
                }));
                promises.push(personDatabase.create({
                    firstName: "Betty",
                    familyName: "Miller",
                    nickname: "Betty",
                    location: locations[2].key,
                    birthdate: birthdate2
                }));
                promises.push(personDatabase.create({
                    firstName: "Chris",
                    familyName: "Connor",
                    nickname: "Con",
                    location: locations[3].key,
                    birthdate: birthdate3
                }));
                promises.push(personDatabase.create({
                    firstName: "Dave",
                    familyName: "Dean",
                    nickname: "Boss",
                    location: locations[3].key,
                    birthdate: birthdate4
                }));
                Promise.all(promises).then((friends) => {
                        activityDatabase.create({name: "Kino", friends: [friends[0].key], location: locations[2].key, date: new Date()});
                        activityDatabase.create({name: "Jogging", location: locations[0].key, date: new Date()});
                        activityDatabase.create({name: "Essen", location: locations[1].key, date: new Date()});
                    }
                ).catch((err) => {
                        console.log(err);
                    }
                );
            }
        ).catch((err) => {
                console.log(err);
            }
        );

        Promise.all(promises).then((persons) => {
                promises = [];
                promises.push(groupDatabase.create({name: "Familie", creationDate: new Date()}));
                promises.push(groupDatabase.create({name: "Freunde", creationDate: new Date()}));
                promises.push(groupDatabase.create({name: "Studium", creationDate: new Date()}));
            }
        ).catch((err) => {
                console.log(err);
            }
        );

    }

}
