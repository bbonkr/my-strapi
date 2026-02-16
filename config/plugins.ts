import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  // Meditor (마크다운 에디터)
  meditor: {
    enabled: true,
  },
  // SEO 플러그인
  seo: {
    enabled: true,
  },
  // AWS S3 (Minio 연동)
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          accessKeyId: env('MINIO_ACCESS_KEY'),
          secretAccessKey: env('MINIO_SECRET_KEY'),
          endpoint: env('MINIO_ENDPOINT'),
          forcePathStyle: true,
          region: env('MINIO_REGION', 'us-east-1'),
          params: {
            Bucket: env('MINIO_BUCKET'),
          },
        },
      },
    },
  },    
});

export default config;
