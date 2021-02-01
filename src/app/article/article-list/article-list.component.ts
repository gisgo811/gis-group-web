import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

    articles: any = [
        {
            title: "GIS基础",
            author: "盛政",
            cover: "../../assets/images/article/cover01.jpg"
        },
        {
            title: "编写GIS JS API",
            author: "盛政",
            cover: "../../assets/images/article/cover02.jpg"
        },
        {
            title: "搭建GIS Server",
            author: "盛政",
            cover: "../../assets/images/article/cover03.jpg"
        },
        {
            title: "GIS闲谈",
            author: "盛政",
            cover: "../../assets/images/article/cover04.jpg"
        },
        {
            title: "GIS社团",
            author: "盛政",
            cover: "../../assets/images/article/cover05.jpg"
        }
    ];
    constructor() {
    }

    ngOnInit() {

    }

}
