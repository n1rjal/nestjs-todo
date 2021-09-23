import { Injectable } from '@nestjs/common';

interface Cat {
  name: string;
  breed: string;
  age: number;
  id?: number;
}

@Injectable()
export class AppService {
  private cats: Cat[] = [
    {
      id: 1,
      breed: 'Cat breed 2',
      name: 'abba harmunium',
      age: 29,
    },
    {
      id: 2,
      breed: 'Cat breed 3',
      name: 'abba harmunium',
      age: 29,
    },
    {
      id: 3,
      breed: 'Cat breed 3',
      name: 'abba harmunium',
      age: 30,
    },
  ];

  getCats(): Cat[] {
    return this.cats;
  }

  createCat({
    breed,
    name,
    age,
  }: {
    breed: string;
    name: string;
    age: number;
  }) {
    this.cats.push({ breed, name, age });
    return { breed, age, name };
  }

  updateCat({
    id,
    name,
    breed,
    age,
  }: {
    id: number;
    breed: string;
    name: string;
    age: number;
  }): Cat {
    this.cats[id] = {
      breed,
      age,
      name,
    };
    return {
      breed,
      age,
      name,
    };
  }

  getOneCat(id: number): Cat {
    const cat = this.cats.find((cat, index) => index == id);
    return cat;
  }

  deleteCat(id: number): Cat[] {
    this.cats = this.cats.filter((cat, index) => index != id);
    return this.cats;
  }
}
