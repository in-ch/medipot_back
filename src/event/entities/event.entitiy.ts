import { Column, Entity } from 'typeorm';

import { CommonEntity } from 'src/commons/entities/common.entity';

@Entity()
export class Event extends CommonEntity {
  @Column({ type: 'varchar', length: 30, comment: '이벤트' })
  title: string;

  @Column({ type: 'varchar', comment: '이벤트 기간' })
  date: string;

  @Column({ type: 'varchar', comment: '상세 설명' })
  detail: string;
}
