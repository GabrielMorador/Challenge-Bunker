# Etapa 1: Compilar TypeScript y generar Prisma Client
FROM node:17 AS builder

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de configuración de npm y TypeScript
COPY package*.json tsconfig.json ./

# Instalar dependencias de producción y desarrollo
RUN npm install

# Copiar el resto de los archivos de la aplicación, incluyendo los archivos de prueba
COPY . .

# Generar Prisma Client y compilar el código TypeScript a JavaScript
RUN npx prisma generate
RUN npm run build

# Verificar que los archivos generados estén en la carpeta dist
RUN ls -l /usr/src/app/dist

# Verificar que las migraciones estén presentes
RUN ls -l /usr/src/app/prisma/migrations || true

# Verificar que los archivos de prueba estén presentes
RUN ls -l /usr/src/app/src/__tests__ || true

# Etapa 2: Crear la imagen final para producción
FROM node:17-alpine

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de configuración de npm y TypeScript
COPY package*.json tsconfig.json ./

# Instalar solo las dependencias de producción
RUN npm install --production

# Copiar las dependencias de producción instaladas
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copiar los archivos compilados de la etapa de construcción
COPY --from=builder /usr/src/app/dist ./dist

# Copiar el directorio prisma completo, incluidas las migraciones
COPY --from=builder /usr/src/app/prisma ./prisma

# Copiar el archivo .env y .env.testing
COPY .env .env
COPY .env.testing .env.testing

# Copiar los archivos fuente y de prueba
COPY --from=builder /usr/src/app/src ./src

# Exponer el puerto en el que la aplicación estará corriendo
EXPOSE 3000

# Comando por defecto para ejecutar el contenedor
CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && npm run start"]
