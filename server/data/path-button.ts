import {PathKey} from "./path-key";

export class PathButton {
    public key: PathKey;
    public name: string;
    public color: string;
    public icon: string;
    public url: string;
    public type: string;
    public active = true;
    public tooltip: string;
    public width: number;
    public details: string[] = [];

    private form: {
        form: string;
    };
    private page: string;

    public setForm(form: string) {
        const object = new Form();
        object.form = form;
        this.form = object;
    }

    public setPage(page: string) {
        this.page = page;
    }

    public clone(): PathButton {
        const copy = new PathButton();
        copy.name = this.name;
        copy.color = this.color;
        copy.icon = this.icon;
        copy.url = this.url;
        copy.type = this.type;
        copy.active = this.active;
        copy.tooltip = this.tooltip;
        copy.width = this.width;
        copy.details = this.details;
        copy.setForm(this.form.form);
        copy.setPage(this.page);
        return copy;
    }

}

class Form {
    public form: string;
}
