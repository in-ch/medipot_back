import { Column, Entity } from 'typeorm';

import { CommonEntity } from 'src/commons/entities/common.entity';

@Entity()
export class Event extends CommonEntity {
  @Column({ type: 'varchar', length: 30, comment: '이벤트' })
  title: string;

  @Column({ type: 'varchar', comment: '이미지' })
  img: string;

  @Column({ type: 'varchar', comment: '링크' })
  href: string;

  @Column({ type: 'varchar', comment: '이벤트 시작 날짜' })
  startDate: string;

  @Column({ type: 'varchar', comment: '이벤트 끝나는 날짜' })
  endDate: string;

  @Column({ type: 'varchar', comment: '상세 설명' })
  detail: string;
}
