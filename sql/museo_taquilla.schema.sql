CREATE TABLE `exhibiciones` (
  `id` int PRIMARY KEY COMMENT 'Id de la Exhibicion',
  `nombre` varchar(255) NOT NULL COMMENT 'Nombre de la Exhibicion',
  `descripcion` varchar(255) NOT NULL COMMENT 'Descripción de la Exhibición',
  `desde` date NOT NULL COMMENT 'Inicio de la Exhibición',
  `hasta` date NOT NULL COMMENT 'Fin de la Exhibición',
  `precio` DECIMAL(20,2) COMMENT 'Precio por entrada.'
);

CREATE TABLE `tipos_de_cliente` (
  `id` int PRIMARY KEY AUTO_INCREMENT COMMENT 'Id del Tipo de Cliente',
  `nombre` varchar(255) NOT NULL COMMENT 'Tipo de cliente.'
);

CREATE TABLE `promociones` (
  `id` int PRIMARY KEY AUTO_INCREMENT COMMENT 'Id de la Promocion',
  `exhibicion_id` int NOT NULL COMMENT 'Id de la Exhibición',
  `porcentaje` float NOT NULL COMMENT 'Porcentaje que se paga',
  `cantidad` float NOT NULL COMMENT 'Cantidad de boletos que se obtiene',
  `vigencia` date COMMENT 'Fecha límite en la que se puede utilizar la promoción.',
  `dias_semana` varchar(255) COMMENT 'Días de la semana en donde la promoción aplica.',
  `tipo_de_cliente_id` int COMMENT 'Tipo de cliente que puede aprovechar esta exhibición (opcional).'
);

CREATE TABLE `pagos_de_pedidos` (
  `id` int PRIMARY KEY AUTO_INCREMENT COMMENT 'Id del Pago de Pedido',
  `en_efectivo` bool COMMENT 'Indica si el pago fue realizado en efectivo.',
  `terminacion_tarjeta` varchar(4) NOT NULL COMMENT 'Terminación de la tarjeta utilizada (si aplica).',
  `no_transaccion` int NOT NULL COMMENT 'Número de transacción bancaria (si aplica)',
  `fecha` datetime COMMENT 'Fecha en la que se realiza este pago.'
);

CREATE TABLE `pedidos` (
  `id` int PRIMARY KEY AUTO_INCREMENT COMMENT 'Id del Pedido',
  `pago_de_pedido_id` int DEFAULT null COMMENT 'Id del Pago de este Pedido (si existe)',
  `nombre_cliente` varchar(255) COMMENT 'Nombre completo del comprador',
  `correo` varchar(255) COMMENT 'Correo electrónico del comprador',
  `subtotal` DECIMAL(20,2) NOT NULL DEFAULT 0 COMMENT 'Total por boletos sin promoción.',
  `total` DECIMAL(20,2) NOT NULL DEFAULT 0 COMMENT 'Total con descuento de promociones.'
);

CREATE TABLE `detalles_pedidos` (
  `id` int PRIMARY KEY AUTO_INCREMENT COMMENT 'Id del Detalle de Pedido',
  `pedido_id` int NOT NULL COMMENT 'Id del Pedido',
  `exhibicion_id` int NOT NULL COMMENT 'Id de la Exhibición',
  `promocion_id` int DEFAULT null COMMENT 'Id de la Promoción (opcional)',
  `cantidad_boletos` int NOT NULL DEFAULT 1 COMMENT 'Cantidad de boletos pedidos'
);

CREATE TABLE `transacciones_fallidas` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `terminacion_tarjeta` varchar(4) NOT NULL COMMENT 'Terminación de la tarjeta utilizada.',
  `fecha` timestamp NOT NULL COMMENT 'Momento en el que falló la transacción.',
  `pedido_id` int NOT NULL COMMENT 'Id del Pedido'
);

ALTER TABLE `promociones` ADD FOREIGN KEY (`exhibicion_id`) REFERENCES `exhibiciones` (`id`);

ALTER TABLE `promociones` ADD FOREIGN KEY (`tipo_de_cliente_id`) REFERENCES `tipos_de_cliente` (`id`);

ALTER TABLE `pedidos` ADD FOREIGN KEY (`pago_de_pedido_id`) REFERENCES `pagos_de_pedidos` (`id`);

ALTER TABLE `detalles_pedidos` ADD FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`);

ALTER TABLE `detalles_pedidos` ADD FOREIGN KEY (`exhibicion_id`) REFERENCES `exhibiciones` (`id`);

ALTER TABLE `detalles_pedidos` ADD FOREIGN KEY (`promocion_id`) REFERENCES `promociones` (`id`);

ALTER TABLE `transacciones_fallidas` ADD FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`);
