import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/user';
import {UserService} from '../../services/user.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
    selector: 'app-user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
    validateForm: FormGroup;
    shown: boolean;
    user: User = new User();
    @Output() onSubmit = new EventEmitter();

    constructor(private fb: FormBuilder, private http: HttpClient, private userService: UserService, private messageService: NzMessageService) {
        this.validateForm = this.fb.group({
            github: [this.user.github, [Validators.required]],
            name: [this.user.name, [Validators.required]],
            develop: [this.user.develop, [Validators.required]],
            language: [this.user.language, [Validators.required]],
            city: [this.user.city, [Validators.required]],
            college: [this.user.college, [Validators.required]],
            major: [this.user.major, [Validators.required]]
        });
    }

    ngOnInit(): void {
    }

    show(user) {
        this.user = user;
        this.validateForm.patchValue(this.user);
        this.shown = true;
    }

    quit() {
        this.shown = false;
    }

    submit() {
        Object.assign(this.user, this.validateForm.value);
        this.userService.update(this.user).subscribe(res => {
            this.messageService.create("success", "修改成功");
            this.onSubmit.emit();
            this.shown = false;
        });
    }
}
