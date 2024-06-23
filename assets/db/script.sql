CREATE DATABASE db_merchant;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "users" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fullname VARCHAR(225),
  password VARCHAR(225),
  email VARCHAR(225) UNIQUE,
  -- phone_number VARCHAR(15) NOT NULL,
  point INTEGER DEFAULT 0 ,
  created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "merchants" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID  REFERENCES users(id),
  merchant_name VARCHAR(30) ,
  merchant_address VARCHAR(100) ,
  created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "products" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID  REFERENCES merchants(id),
  name VARCHAR(30) ,
  price DECIMAL(10,2) ,
  description VARCHAR(255) ,
  point INTEGER ,
  created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "transactions" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID  REFERENCES users(id),
  merchant_id UUID  REFERENCES merchants(id),
  transaction_noT INTEGER ,
  point_total INTEGER ,
  subtotal DECIMAL(10,2) 
);

CREATE TABLE IF NOT EXISTS "transactions_detail" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID  REFERENCES transactions(id),
  product_id UUID  REFERENCES products(id),
  qty INTEGER ,
  point INTEGER ,
  total DECIMAL(10,2) ,
  created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);
