# PAY GUARDIAN

Proyecto de billetera digital con pagos, confirmación por token y consulta de saldo.

## Requisitos

- Docker & Docker Compose
- Node.js 20+
- Composer 2+

## Montaje del proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/PeterGabrielVE/pay-guardian.git pay-guardian
cd pay-guardian


2. Crear el archivo .env en cada servicio (wallet-core y wallet-api) con las variables necesarias.

3. Levantar los contenedores:
docker-compose up -d --build

4. Instalar dependencias y migrar base de datos en wallet-core y wallet-api:
docker-compose exec wallet-core composer install
docker-compose exec wallet-core php artisan migrate
docker-compose exec wallet-api composer install
docker-compose exec wallet-api php artisan migrate

5. Instalar dependencias de frontend:
docker-compose exec frontend npm install
docker-compose exec frontend npm run dev -- --host 0.0.0.0


Acceder a:

API Core: http://localhost:8000

API Gateway: http://localhost:8001

Frontend: http://localhost:5173

Mailhog: http://localhost:8025


Flujo de funcionalidades

Registrar cliente http://localhost:5173/register-client

Recargar saldo http://localhost:5173/recharge

Pagar con token http://localhost:5173/payment

Confirmar pago http://localhost:5173/payment

Consultar saldo http://localhost:5173/balance