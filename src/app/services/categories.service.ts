import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public categories = [
    {id: '', name: 'Популярне'},
    {id: '12151', name: 'Суші-сети'},
    {id: '12147', name: 'Роли Філадельфія'},
    {id: '12148', name: 'Роли Каліфорнія'},
    {id: '12150', name: 'Оригінальні роли'},
    {id: '13275', name: 'Спайсі роли'},
    {id: '12149', name: 'Макі роли'},
    {id: '12152', name: 'Додатки'},
    {id: '12153', name: 'Напої'},
  ];

  constructor() { }
}
