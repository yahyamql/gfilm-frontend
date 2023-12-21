import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Film } from '../model/Film';

@Component({
  selector: 'app-ajout-film',
  templateUrl: './ajout-film.component.html',
  styleUrl: './ajout-film.component.css'
})
export class AjoutFilmComponent {

  film: Film = new Film();

  constructor(private dialogRef: MatDialogRef<AjoutFilmComponent>) { }

  onAdd() {
    console.log('Form added:', this.film);
    this.dialogRef.close(this.film);
  }

  onCancel() {
    console.log('Form closed:');
    this.dialogRef.close();
  }
}
