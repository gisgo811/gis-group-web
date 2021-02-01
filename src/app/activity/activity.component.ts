import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {
    Feature, FeatureClass,
    FeatureLayer, GeometryType,
    Graphic,
    GraphicLayer,
    Map,
    NoopProjection,
    Point, PointAnimation,
    Polyline,
    SimpleLineSymbol,
    SimplePointSymbol
} from 'green-gis';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

    /*notes: any = [
        {
            x: 500,
            y: 200,
            limit: 20,
            color: "#79c4c8",
            lineWidth: 3,
            ring: 2,
            height: 40,
            content: "小老板在一楼，请坐！"
        },
        {
            x: -180,
            y: 250,
            limit: 20,
            color: "#faabab",
            lineWidth: 3,
            ring: 2,
            height: 40,
            content: "鸡丝向右！"
        },
        {
            x: -330,
            y: 350,
            limit: 20,
            color: "#faabab",
            lineWidth: 3,
            ring: 2,
            height: 40,
            content: "屌丝向左！"
        },
        {
            x: -200,
            y: -240,
            limit: 20,
            color: "#9bc9e1",
            lineWidth: 3,
            ring: 2,
            height: 200,
            content: "征集\n1.UI设计师 1枚入\n2.首页设计 1枚\n3.Logo 1枚\n4.社团徽章 1枚\n5.活动海报 若干枚\n\n酬劳 话梅1枚"
        }
    ];

    @ViewChild('container', {static: true}) container: ElementRef;
    @ViewChild('popup', {static: true}) popup: ElementRef;*/

    activities: any = [
        {
            title: "GIS茶话会",
            cover: "https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg",
            image: "https://occ-0-2433-448.1.nflxso.net/art/cd5c9/3e192edf2027c536e25bb5d3b6ac93ced77cd5c9.jpg",
            date: "2021-08-08",
            address: "北京 亦庄",
            content: "喝茶，聊天，此处应该还有100字介绍。。。"
        },
        {
            title: "GIS开发讲座",
            cover: "https://mr.comingsoon.it/imgdb/locandine/235x336/53750.jpg",
            image: "https://fsmedia.imgix.net/cd/c9/5e/ba/4817/4d9a/93f0/c776ec32ecbc/lara-crofts-neck-looks-unnatural-in-the-new-poster-for-tomb-raider.png",
            date: "2021-11-08",
            address: "北京 亦庄",
            content: "喝茶，聊天，此处应该还有100字介绍。。。"
        },
        {
            title: "GIS开发讲座",
            cover: "https://mr.comingsoon.it/imgdb/locandine/235x336/53715.jpg",
            image: "https://www.gannett-cdn.com/-mm-/c03fd140debe8ad4c05cf81a5cad7ad61a12ce52/c=0-1580-2985-3266&r=x803&c=1600x800/local/-/media/2017/06/09/USATODAY/USATODAY/636326272873599176-Black-Panther-Teaser.jpg",
            date: "2021-12-08",
            address: "北京 亦庄",
            content: "喝茶，聊天，此处应该还有100字介绍。。。"
        }
    ]

    constructor() {
    }

    ngOnInit() {
        /*const map = new Map(this.container.nativeElement, {disableInteractive: true, minZoom: 3});
        map.setProjection(new NoopProjection());

        const featureLayer = new FeatureLayer();
        featureLayer.featureClass = new FeatureClass(GeometryType.Point);
        this.notes.forEach(note => {
            const point = new Point(note.x, note.y);
            const transparentSymbol = new SimplePointSymbol();
            transparentSymbol.radius = 20;
            transparentSymbol.fillStyle = "#00000000";
            transparentSymbol.strokeStyle = "#00000000";
            const feature = new Feature(point, note, transparentSymbol);
            featureLayer.featureClass.addFeature(feature);

            const animation = new PointAnimation(point);
            animation.limit = note.limit;
            animation.color = note.color;
            animation.lineWidth = note.lineWidth;
            animation.ring = note.ring;
            map.addAnimation(animation);
        });

        let timer;
        featureLayer.on("click", (event) => {
            const popup = this.popup.nativeElement;
            this.renderer2.setStyle(popup, "height", event.feature.properties["height"] + "px");
            popup.innerHTML = "";
            map.tooltip.show(popup, event.screenX, event.screenY, 320);
            const data = event.feature.properties["content"].split('');
            timer && clearTimeout(timer);
            const writing = (index) => {
                if (index < data.length) {
                    if (data[index] == "\n") {
                        popup.innerHTML += "<br/>";
                    } else {
                        popup.innerHTML += data[index];
                    }
                    timer = setTimeout(writing, 200, ++index);
                }
            }
            timer = writing(0);
        });

        map.addLayer(featureLayer);

        map.setView([0, 0], 3);*/

    }

}
