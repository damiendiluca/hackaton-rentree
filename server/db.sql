CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'seller', 'admin') DEFAULT 'customer',
    is_verified TINYINT DEFAULT 0,
    avatar INT DEFAULT NULL,
    reset_password_expire DATETIME,
    reset_password_token VARCHAR(255),
    address TEXT,
    zip_code VARCHAR(10),
    city VARCHAR(255),
    phone_number VARCHAR(20) CHECK (CHAR_LENGTH(password) >= 8),
    CHECK (is_verified IN (0, 1))
);

ALTER TABLE
    `users`
ADD
    CONSTRAINT `fk_users_avatar` FOREIGN KEY(`avatar`) REFERENCES `images` (`id`) ON DELETE
SET
    NULL ON UPDATE CASCADE;

CREATE TABLE images(
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    seller INT NOT NULL,
    stock_quantity INT,
    price DECIMAL(10, 2) NOT NULL,
    is_visible TINYINT DEFAULT 0,
    image_id INT DEFAULT NULL,
    description TEXT,
    category_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE
    products
ADD
    CONSTRAINT fk_products_seller FOREIGN KEY (seller) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE
    products
ADD
    CONSTRAINT fk_products_image FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE
SET
    NULL ON UPDATE CASCADE;

ALTER TABLE
    products
ADD
    CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE
SET
    NULL ON UPDATE CASCADE;

CREATE TABLE orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    shipping_type VARCHAR(255) NOT NULL,
    shipping_cost DECIMAL(10, 2),
    subtotal DECIMAL(10, 2),
    order_amount DECIMAL(10, 2) NOT NULL,
    status ENUM ('pending', 'paid', 'cancelled'),
    customer_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE
    orders
ADD
    CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE
    orders
ADD
    CONSTRAINT fk_orders_subtotal FOREIGN KEY (subtotal) REFERENCES order_items(total) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE
    order_items
ADD
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE
SET
    NULL ON UPDATE CASCADE;

ALTER TABLE
    order_items
ADD
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE
SET
    NULL ON UPDATE CASCADE;