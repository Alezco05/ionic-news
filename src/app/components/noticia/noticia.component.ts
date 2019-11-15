import { Component, OnInit, Input } from "@angular/core";
import { Article } from "src/app/interfaces/interfaces";
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: "app-noticia",
  templateUrl: "./noticia.component.html",
  styleUrls: ["./noticia.component.scss"]
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() indice: number;
  constructor(public actionSheetCtlr: ActionSheetController) {}

  ngOnInit() {}
  abrirNoticia() {
    console.log(this.noticia.url);
  }
  async lanzarMenu() {
    const actionSheet = await this.actionSheetCtlr.create({
      buttons: [
        {
          text: "Compartir",
          icon: "share",
          cssClass: 'action-dark',
          handler: () => {
            console.log("Share clicked");
          }
        },
        {
          text: "Favorito",
          icon: "heart",
          cssClass: 'action-dark',
          handler: () => {
            console.log("Favorite clicked");
          }
        },
        {
          text: "Cancelar",
          icon: "close",
          cssClass: 'action-dark',
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }
}
