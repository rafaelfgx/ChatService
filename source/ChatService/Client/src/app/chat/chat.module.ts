import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AppChatComponent } from "./chat.component";

const routes: Routes = [
    { path: "", component: AppChatComponent }
];

@NgModule({
    declarations: [
        AppChatComponent
    ],
    exports: [
        AppChatComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class AppChatModule { }
