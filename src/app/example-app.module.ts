import {NgModule} from '@angular/core';
import {ExampleAppComponent} from './example-app.component';
import {AppModule} from 'path-framework/app/app.module';

@NgModule({
    imports:      [AppModule.forRoot()],
    declarations: [ExampleAppComponent],
    bootstrap:    [ExampleAppComponent],
})
export class ExampleAppModule {}