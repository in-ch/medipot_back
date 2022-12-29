import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  no: number;

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

  @Column({ type: 'varchar', length: 550, comment: '상세 설명' })
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

  @CreateDateColumn({ name: 'create_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
  deletedAt?: Date | null;
}
