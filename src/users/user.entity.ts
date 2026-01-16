import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity 자동임포트 autoLoadEntities: true,
@Entity('user') //테이블 user와 class User 매칭됨.
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

}