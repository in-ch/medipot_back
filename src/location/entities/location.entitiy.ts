import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Location extends BaseEntity{
    @PrimaryGeneratedColumn()
    no: number;

    @Column({ type: 'varchar', length: 30, comment: '입지 이름' })
    name: string;
  
    @CreateDateColumn({ name: 'create_at', comment: '생성일' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'update_at', comment: '수정일' })
    updatedAt: Date;
  
    @DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
    deletedAt?: Date | null;
}