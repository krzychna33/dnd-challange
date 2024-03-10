import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('Characters (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = moduleFixture.get<Connection>(getConnectionToken());
    await app.init();
  });

  afterEach(async () => {
    await connection.close();
    await app.close();
  });

  describe('GET /characters/:name', () => {
    it('should return a character', () => {
      return request(app.getHttpServer())
        .get('/characters/Briv')
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body).toEqual({
            id: expect.any(String),
            name: 'Briv',
            level: 5,
            hitPoints: 25,
            temporaryHitPoints: 0,
            defenses: [
              { type: 'fire', defense: 'immunity' },
              { type: 'slashing', defense: 'resistance' },
            ],
          });
        });
    });
  });

  describe('POST /characters/:name/damage', () => {
    it('should return the updated character with less hit points', () => {
      return request(app.getHttpServer())
        .post('/characters/Briv/damage')
        .send({
          type: 'cold',
          value: 10,
        })
        .expect(HttpStatus.CREATED)
        .then((response) => {
          expect(response.body).toEqual({
            id: expect.any(String),
            name: 'Briv',
            level: 5,
            hitPoints: 15,
            temporaryHitPoints: 0,
            defenses: [
              { type: 'fire', defense: 'immunity' },
              { type: 'slashing', defense: 'resistance' },
            ],
          });
        });
    });
  });

  describe('POST /characters/:name/health', () => {
    it('should return the updated character with more hit points', () => {
      return request(app.getHttpServer())
        .post('/characters/Briv/health')
        .send({
          value: 12,
        })
        .expect(HttpStatus.CREATED)
        .then((response) => {
          expect(response.body).toEqual({
            id: expect.any(String),
            name: 'Briv',
            level: 5,
            hitPoints: 37,
            temporaryHitPoints: 0,
            defenses: [
              { type: 'fire', defense: 'immunity' },
              { type: 'slashing', defense: 'resistance' },
            ],
          });
        });
    });
  });

  describe('POST /characters/:name/temporary-hp', () => {
    it('should return the updated character with more temporary hit points', () => {
      return request(app.getHttpServer())
        .post('/characters/Briv/temporary-hp')
        .send({
          value: 10,
        })
        .expect(HttpStatus.CREATED)
        .then((response) => {
          expect(response.body).toEqual({
            id: expect.any(String),
            name: 'Briv',
            level: 5,
            hitPoints: 25,
            temporaryHitPoints: 10,
            defenses: [
              { type: 'fire', defense: 'immunity' },
              { type: 'slashing', defense: 'resistance' },
            ],
          });
        });
    });
  });
});
