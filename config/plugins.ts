import type { Core } from '@strapi/strapi';

const buildUploadSecurity = (env: Core.Config.Shared.ConfigParams['env']) => {
  const allowedTypes = env.array('UPLOAD_ALLOWED_TYPES', ['image/*','application/pdf']);
  const deniedTypes = env.array('UPLOAD_DENIED_TYPES', []);

  const security: { allowedTypes?: string[]; deniedTypes?: string[] } = {};
  if (allowedTypes.length) security.allowedTypes = allowedTypes;
  if (deniedTypes.length) security.deniedTypes = deniedTypes;

  return security;
};

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  // SEO 플러그인
  seo: {
    enabled: true,
  },
  // AWS S3 (Minio 연동)
  upload: {
    config: {      
      security: buildUploadSecurity(env),
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('MINIO_BASE_URL'),
        rootPath: env('MINIO_ROOT_PATH'),
        s3Options: {
          credentials: {
            accessKeyId: env('MINIO_ACCESS_KEY'),
            secretAccessKey: env('MINIO_SECRET_KEY'),
          },
          endpoint: env('MINIO_ENDPOINT'),
          forcePathStyle: env.bool('MINIO_FORCE_PATH_STYLE', true),
          region: env('MINIO_REGION', 'us-east-1'),
          params: {
            Bucket: env('MINIO_BUCKET'),
          },
          tags: {
            application: 'strapi',
            environment: env('NODE_ENV'),
          },          
        },
      },
    },    
  },    
});

export default config;
