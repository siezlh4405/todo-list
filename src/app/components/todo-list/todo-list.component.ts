import { Component, OnInit } from '@angular/core';
import { listItem } from './todo-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  addText: string = '';
  doneQty: number = 0;
  doneRate: number = 0;
  list: listItem[] = [
    {
      method: '洗澡睡覺',
      isSelected: false,
      isDone: false,
    },
    {
      method: '看電視',
      isSelected: false,
      isDone: false,
    },
  ];

  selectQty = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public selectItem(item: listItem) : void {
    if (item.isSelected) {
      this.selectQty++;
    } else {
      this.selectQty--;
    }
  }

  public addItem(): void {
    const item: listItem = {
      method: this.addText.trim(),
      isSelected: false,
      isDone: false,
    };

    if (item.method !== '') {
      this.list.push(item);
      this.clearAddText();
    }
  }

  public setDone(): void {
    this.list = this.list.map(item => {
      if (item.isSelected) {
        item.isDone = true;
      }

      item.isSelected = false;

      return item;
    });

    this.calcDoneQty();
    this.calcDoneRate();
    this.clearSelected();
  }

  public deleteItem(): void {
    this.list = this.list.filter(item => !item.isSelected);
  }

  public clearDone(): void {
    this.list = this.list.filter(item => !item.isDone);
    this.calcDoneQty();
    this.calcDoneRate();
  }

  private calcDoneQty(): void {
    this.doneQty = this.list.filter(item => item.isDone).length;
  }

  private calcDoneRate(): void {
    if (this.list.length === 0) {
      this.doneRate = 0;
    } else {
      this.doneRate = (this.doneQty / this.list.length) * 100;
    }
  }

  private clearSelected(): void {
    this.selectQty = 0;
  }

  private clearAddText(): void {
    this.addText = '';
  }

  public isAddTextEmpty(): boolean {
    return this.addText.trim() === '';
  }
}
