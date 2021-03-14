import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppFooterComponent } from "./footer/footer.component";
import { AppHeaderComponent } from "./header/header.component";
import { AppLayoutComponent } from "./layout.component";

@NgModule({
    declarations: [
        AppFooterComponent,
        AppHeaderComponent,
        AppLayoutComponent
    ],
    exports: [
        AppFooterComponent,
        AppHeaderComponent,
        AppLayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class AppLayoutModule { }
