export declare class LikeLocationCrudDto {
    locationNo: number;
}
export declare class LikeLocationHeaderDto {
    authorization: string;
}
export declare class UnlikeLocationCrudDto extends LikeLocationCrudDto {
}
export declare class UnlikeLocationHeaderDto extends LikeLocationHeaderDto {
}
export declare class GetLikeLocationsHeaderDto extends LikeLocationHeaderDto {
}
