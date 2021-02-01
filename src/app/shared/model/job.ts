import {Entity} from "./entity";
import {Alias, Cascade, Children, Column, Editor, Enum, Relate, Serialize} from "./decorator";

export enum JobCategory {
    GroupWeb = 0,
    GroupActivity = 1,
    GroupRule = 2,
    API = 3,
    APIWeb = 4,
    Server = 5,
    ServerWeb = 6,
    Tool = 7
}

export enum JobStatus {
    Open = 0,
    Close = 1
}

//子任务
export class JobChild extends Entity {
    @Column()
    @Editor("Memo")
    @Alias("子任务内容")
    @Serialize()
    public name: string = "";

    @Editor("Boolean")
    @Alias("是否完成")
    @Serialize()
    public done: boolean = false;
}


//任务流程
export class JobWorkflowItem extends Entity {

    @Editor("Memo")
    @Alias("提交内容")
    @Serialize()
    public content: string = "";

    @Editor("Date")
    @Alias("提交时间")
    @Serialize("date")
    public date: Date = new Date();

    @Editor("User")
    @Alias("提交人")
    @Serialize("user")
    public committer: any = null;

}

export class JobComment extends Entity {
    @Column()
    @Editor("Memo")
    @Alias("评论内容")
    @Serialize()
    public content: string = "";

    @Editor("Date")
    @Alias("评论时间")
    @Serialize("date")
    public date: Date = new Date();

    @Editor("User")
    @Alias("评论人")
    @Serialize("user")
    public user: any = null;

}



//任务
export class Job extends Entity {

    @Column()
    @Editor("LongString")
    @Alias("名称")
    @Serialize()
    public name: string = "";

    @Serialize()
    public code: string = "";

    @Editor("Memo")
    @Alias("描述")
    @Serialize()
    public description: string = "";

    @Editor("Enum")
    @Enum(JobStatus)
    @Alias("任务状态")
    @Serialize("status")
    public status: number = JobStatus.Open;

    @Editor("Enum")
    @Enum(JobCategory)
    @Alias("任务类型")
    @Serialize("category")
    public category: number = JobCategory.GroupWeb;

    @Editor("Date")
    @Alias("开始时间")
    @Serialize("start_date")
    public start_date: Date = new Date();

    @Editor("Date")
    @Alias("完成时间")
    @Serialize("finish_date")
    public finish_date: Date = new Date();

    @Editor("Boolean")
    @Alias("归档")
    @Serialize()
    public close: boolean = false;

    @Editor("User")
    @Alias("创建人")
    @Serialize()
    public creator: any = null;

    @Editor("UserList")
    @Alias("参与人")
    @Serialize()
    public editors: any = [];

    @Editor("UserList")
    @Alias("关注人")
    @Serialize()
    public followers: any = [];

    @Editor("Table")
    @Alias("子任务列表")
    @Children(JobChild)
    @Serialize("children")
    public children: Array<JobChild> = [];

    @Editor("Table")
    @Alias("流程列表")
    @Children(JobWorkflowItem)
    @Serialize("workflow")
    public workflow: Array<JobWorkflowItem> = [];

    @Editor("Table")
    @Alias("评论列表")
    @Children(JobComment)
    @Serialize("comments")
    public comments: Array<JobComment> = [];

    constructor() {
        super();
    }

    clone(): Entity {
        const entity: any = super.clone();
        return entity;
    }

    copy(entity: any) {
        super.copy(entity);
    }

    fromJSON(obj) {
        super.fromJSON(obj);
    }


    toJSON(): any {
        return super.toJSON();
    }

    create() {
        super.create();
    }

    getStatus() {
        switch (this.status){
            case 0:
                return "Open";
            case 1:
                return "Close";
        }
    }

    public role: string = "OTHER";
    public roles: string[] = [];

    getRoles(user){
        this.roles = [];
        if(this.creator && (user._id === this.creator || user._id === this.creator._id)){
            this.roles.push("CREATOR");
        }
        if(Array.isArray(this.editors) && this.editors.find(item => item === user._id || item._id === user._id)){
            this.roles.push("EDITOR");
        }
        if(Array.isArray(this.followers) && this.followers.find(item => item === user._id || item._id === user._id)){
            this.roles.push("FOLLOWER");
        }
        if(this.roles.length === 0){
            this.roles.push("OTHER");
        }
        this.role = this.roles.length > 0 ? this.roles[0] : 'OTHER';
    }

    hasRole(role){
        this.roles = this.roles || [];
        if (Array.isArray(role)) {
            return this.roles.filter(item => role.includes(item)).length > 0;
        } else {
            return this.roles.findIndex( item => item === role ) >= 0;
        }
    }

    hasUser(user) {
        if(this.creator && (user._id === this.creator || user._id === this.creator._id)){
            return true;
        }
        if(Array.isArray(this.editors) && this.editors.find(item => item === user._id || item._id === user._id)){
            return true;
        }
        return false;
    }

    getChildrenDone(){
        return this.children.filter(item => item.done).length || 0;
    }



}


