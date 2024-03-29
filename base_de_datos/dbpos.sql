CREATE DATABASE  IF NOT EXISTS `dbpos` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci */;
USE `dbpos`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dbpos
-- ------------------------------------------------------
-- Server version	5.5.62-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Entradas'),(2,'Platos'),(3,'Bebidas'),(4,'Postres');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_orden`
--

DROP TABLE IF EXISTS `detalle_orden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalle_orden` (
  `id_orden` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id_orden`,`id_producto`),
  KEY `id_orden` (`id_orden`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `detalle_orden_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detalle_orden_ibfk_2` FOREIGN KEY (`id_orden`) REFERENCES `orden` (`id_orden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_orden`
--

LOCK TABLES `detalle_orden` WRITE;
/*!40000 ALTER TABLE `detalle_orden` DISABLE KEYS */;
INSERT INTO `detalle_orden` VALUES (1,2,51,3.85),(1,7,11,5.99),(1,11,1,9.99),(1,12,2,8.00),(1,16,2,1.00),(1,24,1,1.99),(1,27,3,1.25),(1,29,1,1.99),(9,2,10,3.85),(9,7,25,5.99),(10,2,16,3.85),(10,4,5,3.85),(10,7,5,5.99),(10,11,1,9.99),(11,2,1,3.85),(11,7,1,5.99),(11,11,1,9.99);
/*!40000 ALTER TABLE `detalle_orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden`
--

DROP TABLE IF EXISTS `orden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orden` (
  `id_orden` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `mesero` varchar(80) COLLATE utf8_spanish2_ci DEFAULT ' ',
  `mesa` varchar(80) COLLATE utf8_spanish2_ci DEFAULT ' ',
  `cliente` varchar(80) COLLATE utf8_spanish2_ci DEFAULT ' ',
  `estado` varchar(5) COLLATE utf8_spanish2_ci DEFAULT 'A',
  `total` double NOT NULL DEFAULT '0',
  `observacion` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`id_orden`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden`
--

LOCK TABLES `orden` WRITE;
/*!40000 ALTER TABLE `orden` DISABLE KEYS */;
INSERT INTO `orden` VALUES (1,'2019-07-12','Juan','12',' ','A',45.56,'Sin Cebolla el Choripan'),(9,'2019-07-12','Juan','12',' ','C',45.56,'Sin Cebolla el Choripan'),(10,'2019-07-12','Juan','12',' ','A',120.79,'Sin Cebolla el Choripan'),(11,'2019-07-12','Juan','12',' ','A',45.56,'Sin Cebolla el Choripan');
/*!40000 ALTER TABLE `orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametro`
--

DROP TABLE IF EXISTS `parametro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parametro` (
  `id_parametro` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_parametro` varchar(20) CHARACTER SET utf8 NOT NULL,
  `valor_parametro` varchar(200) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id_parametro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametro`
--

LOCK TABLES `parametro` WRITE;
/*!40000 ALTER TABLE `parametro` DISABLE KEYS */;
/*!40000 ALTER TABLE `parametro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `id_categoria` int(11) NOT NULL,
  `nombre_producto` varchar(100) CHARACTER SET utf8 NOT NULL,
  `precio` double NOT NULL,
  `es_preparado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,1,'Bocas de Chorizo',5.75,1),(2,1,'Nachos',3.85,1),(3,1,'Sopa de Tortilla',3,1),(4,1,'Bocas de Alitas',4.55,1),(5,1,'Tapas de Jamones',5.95,1),(6,2,'Puyaso Argentino',12.5,1),(7,2,'Choripan 30 cm',5.99,1),(8,2,'Chanchopan 30cm',5.5,1),(9,2,'Lomo en Salsa de Hongos',13.75,1),(10,2,'Lomo en Salsa Jalapeña',13.75,1),(11,2,'Milanesa de Pollo',9.99,1),(12,2,'Ensalada Cesar',8,1),(13,2,'Costilla a la Barbacoa',12.99,1),(14,3,'Michelada Nacional',2.75,1),(15,3,'Michelada Extranjera',3.25,1),(16,3,'Pilsener',1,0),(17,3,'Golden',1,0),(18,3,'Corona',1.5,0),(19,3,'Heineken',1.5,0),(20,3,'Coca Cola',1.05,0),(21,3,'Sprite',1.05,0),(22,3,'Fanta',1.05,0),(23,3,'Uva',1.05,0),(24,3,'Copa de Vino Tinto',1.99,0),(25,3,'Copa de Vino Blanco',1.99,0),(26,3,'Botella de Agua',1.05,0),(27,3,'Cafe Americano',1.25,0),(28,3,'Cafe Capuchino',2,1),(29,4,'Tres Leches',1.99,0),(30,4,'Quesadilla',1.75,0),(31,4,'Brownie',1.99,0),(32,4,'Pie de manzana',1.99,0),(33,4,'Pie de Queso',2.25,0);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta_diaria`
--

DROP TABLE IF EXISTS `venta_diaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `venta_diaria` (
  `id_venta_diaria` int(11) NOT NULL AUTO_INCREMENT,
  `id_orden` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `total` double NOT NULL,
  PRIMARY KEY (`id_venta_diaria`),
  KEY `id_orden` (`id_orden`),
  CONSTRAINT `venta_diaria_ibfk_1` FOREIGN KEY (`id_orden`) REFERENCES `orden` (`id_orden`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta_diaria`
--

LOCK TABLES `venta_diaria` WRITE;
/*!40000 ALTER TABLE `venta_diaria` DISABLE KEYS */;
/*!40000 ALTER TABLE `venta_diaria` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-08 11:07:03
