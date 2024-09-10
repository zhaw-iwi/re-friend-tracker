import {PathButton} from "./path-button";
import {PathKey} from "./path-key";

export class PathGroup {
    public key: PathKey;
    public name: string;
    public buttons: PathButton[] = [];
}
