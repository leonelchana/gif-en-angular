import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
get historial(){
return this.gifsService.historial;
}
buscar(argumento:string){
  return this.gifsService.buscarGifs(argumento);
}
constructor(private gifsService: GifsService) {}
}
