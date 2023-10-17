import { Column, Entity } from 'typeorm';

import { CommonEntity } from 'src/commons/entities/common.entity';

@Entity()
export class Hospital extends CommonEntity {
  @Column({ type: 'varchar', length: 50, comment: '병원명' })
  name: string;

  @Column({ type: 'varchar', length: 200, comment: '동', default: '' })
  address: string;

  @Column({ type: 'varchar', length: 20, comment: '개설일자', default: '' })
  registerDate: string;

  @Column('text', { comment: '위도', default: 0 })
  lat: number;

  @Column('text', { comment: '경도', default: 0 })
  lng: number;

  @Column({ type: 'varchar', length: 20, comment: '개설일자', default: '' })
  department: string;
}
