import AdminJSTypeorm from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
// import AdminJS from 'adminjs';
import AdminJS from 'adminjs';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { Organization } from './entities/organization.entity';
import { MovimientosModule } from './movimientos/movimientos.module';
import { PosicionesModule } from './posiciones/posiciones.module';
import { dbSettings } from './settings';
import { UserModule } from './users/user.module';
import { UsersController } from './users/users.controller';

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
})

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      url: dbSettings.DB_URL,
      database: dbSettings.DB_NAME,
      useNewUrlParser: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      entities: [join(__dirname, '**/**.entity{.ts, .js}')],
    }),
    UserModule,
    AuthModule,
    MovimientosModule,
    PosicionesModule,
    import('@adminjs/nestjs').then(({ AdminModule }) => AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [Organization],
        },
        auth: {
          authenticate: async (email, password) => {
            const DEFAULT_ADMIN = { email: 'admin@example.com', password: 'password' };
            if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
              return Promise.resolve(DEFAULT_ADMIN);
            }
            return null;
          },
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    })),
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}




// import { Module, OnModuleInit } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { join } from 'path';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { AuthGuard } from './auth/guards/auth.guard';
// import { Organization } from './entities/organization.entity';
// import { MovimientosModule } from './movimientos/movimientos.module';
// import { PosicionesModule } from './posiciones/posiciones.module';
// import { dbSettings } from './settings';
// import { UserModule } from './users/user.module';
// import { UsersController } from './users/users.controller';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       name: 'default',
//       type: 'mongodb',
//       url: dbSettings.DB_URL,
//       database: dbSettings.DB_NAME,
//       useNewUrlParser: true,
//       autoLoadEntities: true,
//       useUnifiedTopology: true,
//       entities: [join(__dirname, '**/**.entity{.ts, .js}')],
//     }),
//     UserModule,
//     AuthModule,
//     MovimientosModule,
//     PosicionesModule,
//   ],
//   controllers: [AppController, UsersController],
//   providers: [
//     AppService,
//     {
//       provide: APP_GUARD,
//       useClass: AuthGuard,
//     },
//   ],
// })
// export class AppModule implements OnModuleInit {
//   async onModuleInit() {
//     const { default: AdminJS } = await import('adminjs');
//     const  AdminJSTypeorm  = await import('@adminjs/typeorm');
    
//     AdminJS.registerAdapter({
//       Resource: AdminJSTypeorm.Resource,
//       Database: AdminJSTypeorm.Database,
//     });

//     const { AdminModule } = await import('@adminjs/nestjs');
//     this.importAdminModule(AdminModule, AdminJS, Organization);
//   }

//   private importAdminModule(AdminModule: any, AdminJS: any, Organization: any) {
//     return AdminModule.createAdminAsync({
//       useFactory: () => ({
//         adminJsOptions: {
//           rootPath: '/admin',
//           resources: [Organization],
//         },
//         auth: {
//           authenticate: async (email, password) => {
//             const DEFAULT_ADMIN = { email: 'admin@example.com', password: 'password' };
//             if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//               return Promise.resolve(DEFAULT_ADMIN);
//             }
//             return null;
//           },
//           cookieName: 'adminjs',
//           cookiePassword: 'secret',
//         },
//         sessionOptions: {
//           resave: true,
//           saveUninitialized: true,
//           secret: 'secret',
//         },
//       }),
//     });
//   }
// }