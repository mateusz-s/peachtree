import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { BbUIModule } from '../bb-ui.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SortByDatePipe } from '../pipes/sort-by-date.pipe';
import { DateFormatterPipe } from '../pipes/date-formatter.pipe';
import {
  MakeTransferConfirmationDialogComponent
} from './main/make-transfer-confirmation-dialog/make-transfer-confirmation-dialog.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MakeTransferConfirmationDialogComponent,
    SortByDatePipe,
    DateFormatterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    BbUIModule,
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
