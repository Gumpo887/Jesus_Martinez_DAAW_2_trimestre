import { Component } from '@angular/core';

interface NewsItem {
  title: string;
  image: string;
  body: string;
  date: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  news: NewsItem[] = [
    {
      title: 'Angular: lanzamiento de la nueva versión',
      image: 'https://angular.io/assets/images/logos/angular/angular.png',
      body: 'Angular lanza una nueva versión con mejoras de rendimiento y herramientas de desarrollo.',
      date: new Date(2025, 9, 15).toISOString()
    },
    {
      title: 'Consejos para mejorar tus componentes',
      image: 'https://picsum.photos/seed/angular/600/300',
      body: 'Aprende buenas prácticas para organizar tus componentes y servicios en Angular.',
      date: new Date(2025, 8, 3).toISOString()
    }
  ];

  newTitle = '';
  newImage = '';
  newBody = '';
  newDate = '';

  errorMessage = '';

  addNews() {
    this.errorMessage = '';

    if (!this.newTitle.trim() || !this.newImage.trim() || !this.newBody.trim() || !this.newDate.trim()) {
      this.errorMessage = 'Todos los campos son obligatorios. Por favor, rellena todos los campos.';
      return;
    }

    if (!/^https?:\/\//i.test(this.newImage.trim())) {
      this.errorMessage = 'La URL de la imagen debe comenzar por http:// o https://';
      return;
    }

    const d = new Date(this.newDate);
    if (isNaN(d.getTime())) {
      this.errorMessage = 'Fecha inválida.';
      return;
    }

    const item: NewsItem = {
      title: this.newTitle.trim(),
      image: this.newImage.trim(),
      body: this.newBody.trim(),
      date: d.toISOString()
    };

    this.news.unshift(item);

    this.newTitle = '';
    this.newImage = '';
    this.newBody = '';
    this.newDate = '';
  }
}
