import {Entity} from "./entity";
import {Alias, Column, Editor, Serialize} from "./decorator";

//用户（U表）
export class User extends Entity{

    @Editor("String")
    @Alias("用户名称")
    @Serialize("name")
    public name: string = "";

    @Serialize("code")
    public code: string = "";

    @Serialize("date")
    public date: Date = new Date();

    @Editor("Memo")
    @Alias("角色描述")
    @Serialize("description")
    public description: string = "";

    @Serialize("github")
    public github: string = "";

    @Serialize("status")
    public status: number = 0;
    @Serialize("city")
    public city: string = "";
    @Serialize("college")
    public college: string = "";
    @Serialize("major")
    public major: string = "";
    @Serialize("head")
    public head: string = "";
    @Serialize("develop")
    public develop: number = 0;
    @Serialize("language")
    public language: number = 0;


    @Serialize("token")
    public token: string = "";

    @Serialize("authority")
    public authority: any = null;

    public repeat: string;



    constructor() {
        super();
    }

    getDevelop() {
        switch (this.develop){
            case 0:
                return "前端工程师";
            case 1:
                return "后端工程师";
            case 2:
                return "全栈工程师";
            case 3:
                return "界面设计师";
            case 4:
                return "数据分析师";
        }
    }

    getLanguage() {
        switch (this.language){
            case 0:
                return "JavaScript";
            case 1:
                return ".Net(C#)";
            case 2:
                return "Java";
            case 3:
                return "Python";
            case 4:
                return "C++";
        }
    }

}


