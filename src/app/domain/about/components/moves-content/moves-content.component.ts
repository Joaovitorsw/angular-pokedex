import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Move } from 'poke-api-models';
import { BehaviorSubject } from 'rxjs';
import { TableMoveData } from './moves-content.models';

@Component({
  selector: 'px-moves-content',
  templateUrl: './moves-content.component.html',
  styleUrls: ['./moves-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovesContentComponent implements OnInit {
  @Input() moves: Move[];
  movesDataTable: TableMoveData[];
  move$: BehaviorSubject<Move>;
  moveTableData: TableMoveData[];
  displayedColumns: string[] = [
    'id',
    'name',
    'type',
    'category',
    'contest',
    'pp',
    'power',
    'accuracy',
  ];

  ngOnInit(): void {
    this.movesDataTable = this.moves.map((move) => {
      const data = {
        id: move.id,
        name: move.name,
        type: move.type.name ?? '-',
        category: move.damage_class?.name ?? '-',
        contest: move.contest_type?.name ?? '-',
        pp: move.pp ?? '-',
        power: move.power ?? '-',
        accuracy: move.accuracy ?? '-',
      };
      return data;
    });
    this.moveTableData = [this.movesDataTable[0]];
    this.move$ = new BehaviorSubject<Move>(this.moves[0]);
  }

  updateMovesDetail({ id }: any) {
    const moveData = this.moves.find((move) => move.id === id)!;

    const moveTableData = [moveData].map((move) => {
      return {
        id: move.id,
        name: move.name,
        type: move.type.name ?? '-',
        category: move.damage_class?.name ?? '-',
        contest: move.contest_type?.name ?? '-',
        pp: move.pp ?? '-',
        power: move.power ?? '-',
        accuracy: move.accuracy ?? '-',
      };
    });
    this.moveTableData = moveTableData;
    this.move$.next(moveData);
  }
}
