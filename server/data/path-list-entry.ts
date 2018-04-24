import {PathListKey} from "./path-list-key";

export class PathListEntry {
    public key: PathListKey;
    public name: string;
    public color: string;
    public icon: string;
    public url: string;
    public active: boolean = true;
    public details: string[] = [];
}
