import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

    notes: any = [
        {
            left: "40%",
            top: "32%",
            x: 300,
            y: -100,
            limit: 24,
            color: "#79c4c8",
            lineWidth: 3,
            velocity: 0.6,
            ring: 2,
            height: 180,
            content: "左边是你的\n右边是我的"
        },
        {
            left: "22%",
            top: "75%",
            x: 0,
            y: 200,
            limit: 20,
            color: "#79c4c8",
            lineWidth: 3,
            velocity: 0.8,
            ring: 2,
            height: 180,
            content: "等你\n一起\n建设社团\n莫愁前路无知己\n因为知己在这里"
        },
        {
            left: "46%",
            top: "70%",
            x: -500,
            y: 200,
            limit: 24,
            color: "#79c4c8",
            lineWidth: 3,
            velocity: 0.6,
            ring: 2,
            height: 180,
            content: "三流小老板\n平台选择你\n二流小老板\n选择平台\n一流小老板\n创造平台\n小老板，你在第几层？"
        },
        {
            left: "63%",
            top: "48%",
            x: -150,
            y: -250,
            limit: 20,
            color: "#79c4c8",
            lineWidth: 3,
            velocity: 0.5,
            ring: 2,
            height: 70,
            content: "你好\n第一次见到你\n你的面容\n一种久违的感觉\n原来是\n你，你在这里\n你好！"
        },
        {
            left: "70%",
            top: "25%",
            x: 350,
            y: -350,
            limit: 26,
            color: "#faabab",
            lineWidth: 3,
            velocity: 0.8,
            ring: 2,
            height: 250,
            content: "Todo List\n1.确定初步开发计划\n2.志愿者及合作者加入合作开发\n3.初期主要版块及功能\n4.数据库设计\n5.后台API\n6.初步拟定社团基本制度\n7.首批社员招募及加入入口\n8.通过活动页面甑选页面设计及VI\n9.举办一次正式活动\n10.先完成以上再说"
        }
    ];

    member: any;

    /*@ViewChild('container', {static: true}) container: ElementRef;*/
    @ViewChild('popup', {static: true}) popup: ElementRef;

    constructor(private renderer2: Renderer2) {

    }

    ngOnInit() {
    }

    shown: boolean = false;
    timer: any;
    print(event, note) {
        const popup = this.popup.nativeElement;
        this.renderer2.setStyle(popup, "top", event.y + "px");
        this.renderer2.setStyle(popup, "left", event.x + "px");
        popup.innerHTML = "";
        const data = note.content;
        this.shown = true;
        this.timer && clearTimeout(this.timer);
        const writing = (index) => {
            if (index < data.length) {
                if (data[index] == "\n") {
                    popup.innerHTML += "<br/>";
                } else {
                    popup.innerHTML += data[index];
                }
                this.timer = setTimeout(writing, 200, ++index);
            }
        };
        this.timer = writing(0);
    }


}
