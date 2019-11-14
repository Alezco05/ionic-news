import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment,{static: true}) segment: IonSegment; 
  categorias: string[] = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.segment.value = this.categorias[0];
    this.loadNews(this.segment.value);
  }
  changeCategory(e) {
    this.noticias = [];
    this.loadNews(e.detail.value);
  }

  loadNews(categoria: string, event?) {
    this.noticiasService.getTopHeadlineCategory(categoria).subscribe(
      resp => {
        if ( resp.articles.length === 0 ) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.noticias.push( ...resp.articles );
        if ( event ) {
          event.target.complete();
        }
      }
    );
  }
  loadData(event){
    this.loadNews(this.segment.value, event);
  }
}
