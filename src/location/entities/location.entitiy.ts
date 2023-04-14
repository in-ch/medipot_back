import { CommonEntity } from 'src/commons/entities/common.entity';
import { Question } from 'src/question/entities/question.entitiy';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Location extends CommonEntity {
  @Column({ type: 'varchar', length: 30, comment: '입지 이름' })
  name: string;

  @Column({ comment: '임대보증금' })
  deposit: number;

  @Column({ comment: '월 임대보증금' })
  depositMonly: number;

  @Column({ comment: '권리금' })
  premium: number;

  @Column({ comment: '관리비' })
  manageCost: number;

  @Column({ comment: '중개수수료' })
  brokerage: number;

  @Column('text', { array: true, comment: '진료과들' })
  departments: string[];

  @Column('text', { comment: '키워드', array: true })
  keywords: string[];

  @Column({ comment: '전용 면적' })
  dedicatedArea: number;

  @Column({ comment: '공급 면적' })
  supplyArea: number;

  @Column({ type: 'varchar', length: 300, comment: '추가 정보' })
  etc: string;

  @Column({ type: 'varchar', length: 150, comment: '입지 주소' })
  address: string;

  @Column({ type: 'varchar', comment: '상세 설명' })
  detail: string;

  @Column('text', { comment: '이미지들', array: true })
  imgs: string[];

  @Column('text', { comment: '위도', default: 0 })
  lat: number;

  @Column('text', { comment: '경도', default: 0 })
  lng: number;

  @Column({ comment: '삭제 여부', default: false })
  isDeleted: boolean;

  @Column({ comment: '승인 여부', default: false })
  isApproved: boolean;

  @OneToMany((_) => Question, (question) => question.location)
  question: Question[];
}
