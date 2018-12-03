/* angular/path imports */
import {Component} from "@angular/core";
import * as path from "path-framework/app/path-framework/path";

/* model imports */
import {GuiModel} from "./gui-model/guimodel";
import * as handler from "./gui-model/form/handlers";
import * as beans from "./gui-model/generated/forms";
import {TranslationService} from "path-framework/app/path-framework/service/translation.service";
import {ExampleTranslationService} from "./example-translation-service";

@Component({
    selector: "path-application",
    templateUrl: "./../../node_modules/path-framework/app/path-framework/path-app.component.html",
    providers: [path.PathService, { provide: TranslationService, useClass: ExampleTranslationService }]
})
export class ExampleAppComponent extends path.PathAppComponent {

    private _appConfig = new GuiModel();

    constructor(pathService: path.PathService, translationService: TranslationService) {
        super(pathService, translationService);
    }

    protected getFrontendVersion(): string {
        return "0.4.5";
    }

    protected getStartPage(): string {
        return "mainmenu";
    }

    protected getOwnUserForm(): string {
        return "UserForm";
    }

    protected getGuiModel() {
        if (this._appConfig != null) {
            return this._appConfig.guiModel;
        }
        return null;
    }

    public getBackendUrl() {
        if (window.location.hostname.indexOf("localhost") !== -1) {
            return "http://localhost:8080/services";
        } else if (window.location.hostname.indexOf("127.0.0.1") !== -1) {
            return "http://127.0.0.1:8080/services";
        }
        let url: string = window.location.href;
        url = url.replace("/#", "");
        if (url.endsWith("/")) {
            return url + "services";
        }
        return url + "/services";
    }

    protected getBeans() {
        return beans;
    }

    protected getHandlers() {
        return handler;
    }

}
