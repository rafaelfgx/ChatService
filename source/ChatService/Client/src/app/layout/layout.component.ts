import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AppFooterComponent } from "src/app/layout/footer/footer.component";
import { AppHeaderComponent } from "src/app/layout/header/header.component";

@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html",
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        AppFooterComponent,
        AppHeaderComponent
    ]
})
export class AppLayoutComponent { }
