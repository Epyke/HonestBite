import { Injectable } from '@angular/core';

export interface Restaurant {
  id: string;
  name: string;
  cover: string;
  logo: string;
  distance: string;
  city: string;
  category: string;
  avgPrice: string;
  global: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class Restaurants {
  private restaurants: Restaurant[] = [
    {
      id: '1',
      name: 'O Cantinho do Bacalhau',
      cover: 'assets/restaurants/cantinho-bacalhau-cover.jpg',
      logo: 'assets/restaurants/cantinho-bacalhau-logo.png',
      distance: '1.4 km',
      city: 'Braga',
      category: 'Cozinha Tradicional Portuguesa',
      avgPrice: '18€ - 30€',
      global: 4.8,
      description: 'Especialistas no autêntico Bacalhau à Braga. Um ambiente familiar, acolhedor e com receitas passadas de geração em geração.'
    },
    {
      id: '2',
      name: 'Taberna do Rio',
      cover: 'assets/restaurants/taberna-rio-cover.jpg',
      logo: 'assets/restaurants/taberna-rio-logo.png',
      distance: '2.8 km',
      city: 'Porto',
      category: 'Petiscos & Vinhos',
      avgPrice: '12€ - 22€',
      global: 4.5,
      description: 'A melhor seleção de petiscos tradicionais com vista para o Douro. Não deixe de provar as nossas tábuas de queijos, enchidos e as famosas amêijoas.'
    },
    {
      id: '3',
      name: 'A Tasca do Vigário',
      cover: 'assets/restaurants/tasca-vigario-cover.jpg',
      logo: 'assets/restaurants/tasca-vigario-logo.png',
      distance: '4.1 km',
      city: 'Lisboa',
      category: 'Fados & Grelhados',
      avgPrice: '20€ - 35€',
      global: 4.6,
      description: 'Escondido no coração de Alfama, venha saborear carnes e peixes grelhados no carvão enquanto desfruta de uma noite de Fado Vadio.'
    },
    {
      id: '4',
      name: 'Maré Viva',
      cover: 'assets/restaurants/mare-viva-cover.jpg',
      logo: 'assets/restaurants/mare-viva-logo.png',
      distance: '0.5 km',
      city: 'Matosinhos',
      category: 'Marisqueira & Peixe Fresco',
      avgPrice: '30€ - 50€',
      global: 4.9,
      description: 'Peixe fresco capturado diariamente e grelhado na perfeição por mestres assadores. O verdadeiro sabor do mar no seu prato.'
    },
    {
      id: '5',
      name: 'Sabores do Alentejo',
      cover: 'assets/restaurants/sabores-alentejo-cover.jpg',
      logo: 'assets/restaurants/sabores-alentejo-logo.png',
      distance: '6.3 km',
      city: 'Évora',
      category: 'Cozinha Regional Alentejana',
      avgPrice: '15€ - 28€',
      global: 4.4,
      description: 'Pratos ricos em tradição. Destacam-se as nossas bochechas de porco preto alentejano e as açordas aromáticas com ervas locais.'
    }
  ];

  getAll(): Restaurant[] {
    return this.restaurants;
  }

  getById(id: string): Restaurant | undefined {
    return this.restaurants.find(restaurant => restaurant.id === id);
  }
}
