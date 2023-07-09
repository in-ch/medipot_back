import { UserCreateInputCrudDto } from 'src/user/dto/user.dto';
export declare class MeInputDto {
    authorization: string;
}
export declare class MeOkOutputDto {
    id: number;
    connected_at: string;
    properties: {
        nickname: string;
        profile_image: string;
        thumbnail_image: string;
    };
    kakao_account: {
        profile_nickname_needs_agreement: boolean;
        profile_image_needs_agreement: boolean;
        profile: {
            nickname: string;
            thumbnail_image_url: string;
            profile_image_url: string;
            is_default_image: boolean;
        };
        has_email: boolean;
        email_needs_agreement: boolean;
        is_email_valid: boolean;
        is_email_verified: boolean;
        email: string;
    };
}
export declare class MeErrorOutputDto {
    msg: string;
    code: number;
}
export declare class RefreshInputDto {
    refresh_token: string;
}
export declare class RefreshOkOutputDto {
    access_token: string;
    token_type: string;
    refresh_token: string;
    id_token: string;
    expires_in: number;
    refresh_token_expires_in: number;
}
export declare class LogoutInputDto extends MeInputDto {
}
export declare class LogoutOutputDto {
    id: number;
}
export declare class KakaoLoginInputDto {
    authorization: string;
}
export declare class KakaoLoginOutputDto extends UserCreateInputCrudDto {
    token?: string;
    refresh_token?: string;
}
