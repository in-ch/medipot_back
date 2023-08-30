import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { CommonEntity } from 'src/commons/entities/common.entity';
import { Question } from 'src/question/entities/question.entitiy';
import { User } from 'src/user/entities/user.entitiy';
import { LikeLocation } from 'src/like-location/entities/like-location.entitiy';

@Entity()
export class Location extends CommonEntity {
  @Column({ type: 'varchar', length: 30, comment: '입지 이름' })
  name: string;

  @Column({ comment: '임대보증금' })
  deposit: number;

  @Column({ comment: '월 임대보증금' })
  depositMonly: number;

  @Column({ comment: '권리금', nullable: true, type: 'float' })
  premium: number;

  @Column({ comment: '관리비', nullable: true, type: 'float' })
  manageCost: number;

  @Column({ comment: '중개수수료', default: 0, nullable: true, type: 'float' })
  brokerage: number;

  @Column('text', { array: true, comment: '진료과들' })
  departments: string[];

  @Column('text', { comment: '키워드', array: true })
  keywords: string[];

  @Column({ comment: '전용 면적', type: 'float' })
  dedicatedArea: number;

  @Column({ comment: '공급 면적', type: 'float' })
  supplyArea: number;

  @Column({ type: 'varchar', length: 300, comment: '추가 정보', default: '' })
  etc: string;

  @Column({ type: 'varchar', length: 150, comment: '입지 주소', select: false })
  address: string;

  @Column({ type: 'varchar', length: 50, comment: '동까지만 나오는 입지 주소' })
  simpleAddress?: string;

  @Column({ type: 'varchar', length: 150, comment: '상세 주소', select: false })
  detailAddress: string;

  @Column({ type: 'varchar', length: 10, comment: '주차 댓수', default: '미정' })
  parkingCapacity: number;

  @Column({ type: 'varchar', length: 20, comment: '사용 승인일', default: '미정' })
  approvalDate: string;

  @Column({ type: 'varchar', comment: '상세 설명', select: false })
  detail: string;

  @Column('text', { comment: '이미지들', array: true })
  imgs: string[];

  @Column('text', { comment: '위도', default: 0 })
  lat: number;

  @Column('text', { comment: '경도', default: 0 })
  lng: number;

  @Column({ comment: '승인 여부', default: false })
  isApproved: boolean;

  @OneToMany((_) => LikeLocation, (like) => like.location)
  like: LikeLocation[];

  @OneToMany((_) => Question, (question) => question.location)
  question: Question[];

  @ManyToOne((_) => User, (user) => user.location, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
