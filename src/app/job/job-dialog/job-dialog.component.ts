import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import {ConfigService} from "../../shared/services/config.service";
import {AuthService} from "../../shared/services/auth.service";
import {JobService} from "../../shared/services/job.service";
import {Job, JobChild, JobComment, JobStatus} from '../../shared/model/job';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';



@Component({
    selector: 'app-job-dialog',
    templateUrl: './job-dialog.component.html',
    styleUrls: ['./job-dialog.component.scss']
})
export class JobDialogComponent implements OnInit {

    @Output() onSave = new EventEmitter();
    @Output() onDelete = new EventEmitter();
    @Output() onCancel = new EventEmitter();

    categories = [
        {label: "社团网站", value: 0, checked: true},
        {label: "社团活动", value: 1, checked: true},
        {label: "社团制度", value: 2, checked: true},
        {label: "API开发", value: 3, checked: true},
        {label: "API网站", value: 4, checked: true},
        {label: "Server开发", value: 5, checked: true},
        {label: "Manager网站", value: 6, checked: true},
        {label: "Tool开发", value: 7, checked: true}
    ];

    job: any;
    users: any;
    source: any;            // input
    mode: any;           //0 for create ,1 for allot, 2 for edit, 3 for look
    shown: boolean = false;
    check_content: string = "";
    child: JobChild;
    comment: JobComment = new JobComment();


    constructor(public configService: ConfigService, public authService: AuthService, public jobService: JobService, private message: NzMessageService, private modal: NzModalService) {
    }

    ngOnInit() {
    }

    /////////////////以下私有函数/////////////////////
    _init(){
        this.job = null;
        this.check_content = "";
        this.child = null;
        this.comment = new JobComment();
    }

    /////////////////以下界面交互/////////////////////
    async create(){
        this._init();
        this.job = new Job();
        this.job.status = 0;
        this.job.creator = this.authService.user;
        this.job.roles = ["CREATOR"];
        this.job.role = "CREATOR";
        this.job.category = 0;
        this.job.change_date = null;
        this.job.finish_date = null;
        this.source = this.job.clone();

        this.mode = 0;
        this.shown = true;
    }

    async edit(object){
        this._init();
        this.source = object;
        const item = await this.jobService.getOne(object._id).toPromise();
        if(item){
            this.job = item;
            this.job.getRoles(this.authService.user);
            this.mode = 1;
            this.shown = true;
        }else{
            this.message.create('warning', "该任务已被删除，请刷新！");
        }
    }

    archive() {
        this.modal.confirm({
            nzTitle: '提醒',
            nzContent: '是否归档任务！',
            nzOkText: '确认',
            nzCancelText: '取消',
            nzOnOk: () => {
                this.job.close = true;
                this.job.status = JobStatus.Close;
                this.jobService.update(this.job).subscribe( res => {
                    if(res.result){
                        this.onSave.emit({
                            job: this.job,
                            mode: this.mode
                        });
                        this.shown = false;
                        this.message.create('success', '任务归档成功！');
                    }else{
                        this.message.create('warning', '任务归档失败！');
                    }
                });
            }
        });
    }

    delete() {
        this.modal.confirm({
            nzTitle: '提醒',
            nzContent: '是否删除任务！',
            nzOkText: '确认',
            nzCancelText: '取消',
            nzOnOk: () => {
                this.jobService.delete(this.job._id).subscribe(res => {
                    this.onDelete.emit({
                        job: this.job
                    });
                    this.shown = false;
                });
            }
        });
    }

    createSubJob() {
        this.child = new JobChild();
        this.child.create();
    }

    addSubJob() {
        if(this.child.name){
            if(this.mode !== 0){
                this.jobService.createSubJob(this.job, this.child).subscribe();
            }
            this.job.children = this.job.children || [];
            this.job.children.push(this.child);
            this.child = null;
        }
    }

    cancelAddSubJob(){
        this.child = null;
    }

    checkSubJobDone(child){
        if(this.mode !== 0){
            this.jobService.updateSubJob(this.job, child).subscribe();
        }
    }

    editSubJob(child){
        child.edit = true;
    }

    saveSubJob(child){
        child.edit = false;
        if(this.mode !== 0){
            this.jobService.updateSubJob(this.job, child).subscribe();
        }
    }

    removeSubJob(index, child){
        this.job.children.splice(index,1);
        if(this.mode !== 0){
            this.jobService.deleteSubJob(this.job._id, child._id).subscribe();
        }
    }

    save(){
        if(this.mode === 0){
            this.jobService.create(this.job).subscribe( res => {
                if(res.result){
                    this.job.code = res.job.code;
                    this.onSave.emit({
                        job: this.job,
                        mode: this.mode
                    });
                    this.shown = false;
                    this.message.create('success', '任务添加成功！');
                }else{
                    this.message.create('warning', '任务添加失败！');
                }
            });
        }else{
            this.jobService.update(this.job).subscribe( res => {
                if(res.result){
                    this.onSave.emit({
                        job: this.job,
                        mode: this.mode
                    });
                    this.shown = false;
                    this.message.create('success', '任务更新成功！');
                }else{
                    this.message.create('warning', '任务更新失败！');
                }
            });
        }
    }

    addComment() {
        this.job.comments = this.job.comments || [];
        this.job.comments.push(this.comment);
        this.jobService.createComment(this.job, this.comment).subscribe(res =>{
            if(res.result){
                this.comment = new JobComment();
                this.message.create("success", "评论添加成功！");
            }
        })
    }

    editComment(comment){
        comment.edit = true;
    }

    saveComment(comment){
        comment.edit = false;
        this.jobService.updateComment(this.job, comment).subscribe();
    }

    deleteComment(index: number, comment) {
        this.modal.confirm({
            nzTitle: '提醒',
            nzContent: '是否删除评论！',
            nzOkText: '确认',
            nzCancelText: '取消',
            nzOnOk: () => {
                this.job.comments.splice(index, 1);
                this.jobService.deleteComment(this.job._id, comment._id).subscribe();
                this.message.create("success", "评论删除成功！");
            }
        });
    }

    addEditor() {
        this.jobService.addEditor(this.job, this.authService.user).subscribe(res => {
            this.job.editors.push(this.authService.user);
            this.job.getRoles(this.authService.user);
        });
    }

    removeEditor() {
        this.jobService.removeEditor(this.job._id, this.authService.user._id).subscribe( res => {
            const index = this.job.editors.findIndex(item => item._id == this.authService.user._id);
            if (index != -1) this.job.editors.splice(index, 1);
            this.job.getRoles(this.authService.user);
        });
    }

    addFollower() {
        this.jobService.addFollower(this.job, this.authService.user).subscribe(res => {
            this.job.followers.push(this.authService.user);
            this.job.getRoles(this.authService.user);
        });
    }

    removeFollower() {
        this.jobService.removeFollower(this.job._id, this.authService.user._id).subscribe( res => {
            const index = this.job.followers.findIndex(item => item._id == this.authService.user._id);
            if (index != -1) this.job.followers.splice(index, 1);
            this.job.getRoles(this.authService.user);
        });
    }


    compareEntity(g1: any, g2: any): boolean {
        return g1 && g2 ? g1._id === g2._id : g1 === g2;
    }

    compareElement(g1: any, g2: any): boolean {
        return g1 && g2 ? g1.code === g2.code : g1 === g2;
    }

    hide() {
        this._init();
        this.onCancel.emit();
        this.shown = false;
    }
}
