import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-client-home.component',
  imports: [],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss',
})
export class ClientHomeComponent {
promotions = signal([
    {
      id: 1,
      name: 'MacBook Pro M3',
      category: 'Informatique',
      oldPrice: 2499,
      newPrice: 1999,
      discount: '-20%',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Wb0UrOBadnuJnKkOr5Zu3NhkRWc0NlbCaQ&s',
      tag: 'Vente Flash',
      timeLeft: '05h 20m'
    },
    {
      id: 2,
      name: 'Sony WH-1000XM5',
      category: 'Audio',
      oldPrice: 399,
      newPrice: 299,
      discount: '-25%',
      image: 'https://media.electroplanet.ma/media/catalog/product/cache/fe7218fa206f7a550a07f49b9ea052d6/3/0/3024239_2.jpg',
      tag: 'Populaire',
      timeLeft: null
    },
    {
      id: 3,
      name: 'iPhone 15 Pro',
      category: 'Mobile',
      oldPrice: 1299,
      newPrice: 1099,
      discount: '-15%',
      image: 'https://www.iphon.fr/app/uploads/2023/08/fiche-technique-iphone-15-pro-max.jpg',
      tag: 'Nouveau Prix',
      timeLeft: '12h 45m'
    },
    {
      id: 4,
      name: 'iPhone 15 Pro',
      category: 'Mobile',
      oldPrice: 1299,
      newPrice: 1099,
      discount: '-15%',
      image: 'https://www.iphon.fr/app/uploads/2023/08/fiche-technique-iphone-15-pro-max.jpg',
      tag: 'Nouveau Prix',
      timeLeft: '12h 45m'
    },
    {
      id: 5,
      name: 'iPhone 15 Pro',
      category: 'Mobile',
      oldPrice: 1299,
      newPrice: 1099,
      discount: '-15%',
      image: 'https://www.iphon.fr/app/uploads/2023/08/fiche-technique-iphone-15-pro-max.jpg',
      tag: 'Nouveau Prix',
      timeLeft: '12h 45m'
    }
  ]);
}
