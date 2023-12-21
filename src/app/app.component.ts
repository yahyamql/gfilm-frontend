import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FilmService } from './film.service';
import { MatDialog } from '@angular/material/dialog';
import { AjoutFilmComponent } from './ajout-film/ajout-film.component';
import { Film } from './model/Film';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isClickedSort = false;

  filmsDataApi: Film[] = [];
  displayedColumns: string[] = ['primaryTitle', 'originalTitle', 'startYear'];
  dataSource = new MatTableDataSource(this.filmsDataApi);

  constructor(private filmService: FilmService,
              private dialog: MatDialog
    ) {}


  ngOnInit(): void {
    this.filmService.getAllFilm().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.filmService.searchByKeyword(searchTerm).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  onSortByStartYear() {
    if(this.isClickedSort) {
      this.dataSource.data = this.dataSource.data.sort((a: Film, b: Film) => a.startYear - b.startYear);
    } else {
      this.dataSource.data = this.dataSource.data.sort((a: Film, b: Film) => b.startYear - a.startYear);
    }
    this.isClickedSort = !this.isClickedSort;

  } 

  openPopup(): void {
    const dialogRef = this.dialog.open(AjoutFilmComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with:', result);
        this.filmService.postFilm(result).subscribe((data) => {
          console.log('Film added in backed.');
          this.ngOnInit();
        })
      } else {
        console.log('Dialog closed without result.');
      }
    });
  }
}
