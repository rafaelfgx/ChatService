import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { AppLayoutComponent } from "src/app/layout/layout.component";

const routes: Routes = [
    {
        path: "",
        component: AppLayoutComponent,
        children: [
            { path: "", loadComponent: () => import("./chat/chat.component").then((response) => response.AppChatComponent) }
        ]
    },
    { path: "**", redirectTo: "" }
];

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        AppLayoutComponent
    ]
})
export class AppModule { }
