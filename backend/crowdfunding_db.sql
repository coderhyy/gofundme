/*
 Navicat Premium Dump SQL

 Source Server         : wsl_mysql
 Source Server Type    : MySQL
 Source Server Version : 80039 (8.0.39-0ubuntu0.22.04.1)
 Source Host           : localhost:3306
 Source Schema         : crowdfunding_db

 Target Server Type    : MySQL
 Target Server Version : 80039 (8.0.39-0ubuntu0.22.04.1)
 File Encoding         : 65001

 Date: 28/09/2024 21:19:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for CATEGORY
-- ----------------------------
DROP TABLE IF EXISTS `CATEGORY`;
CREATE TABLE `CATEGORY`  (
  `CATEGORY_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of CATEGORY
-- ----------------------------
INSERT INTO `CATEGORY` VALUES (1, 'Education');
INSERT INTO `CATEGORY` VALUES (2, 'Healthcare');
INSERT INTO `CATEGORY` VALUES (3, 'Community');

-- ----------------------------
-- Table structure for FUNDRAISER
-- ----------------------------
DROP TABLE IF EXISTS `FUNDRAISER`;
CREATE TABLE `FUNDRAISER`  (
  `FUNDRAISER_ID` int NOT NULL AUTO_INCREMENT,
  `ORGANIZER` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CAPTION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TARGET_FUNDING` decimal(10, 2) NOT NULL,
  `CURRENT_FUNDING` decimal(10, 2) NOT NULL,
  `CITY` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ACTIVE` tinyint(1) NOT NULL,
  `CATEGORY_ID` int NULL DEFAULT NULL,
  PRIMARY KEY (`FUNDRAISER_ID`) USING BTREE,
  INDEX `CATEGORY_ID`(`CATEGORY_ID` ASC) USING BTREE,
  CONSTRAINT `FUNDRAISER_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `CATEGORY` (`CATEGORY_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of FUNDRAISER
-- ----------------------------
INSERT INTO `FUNDRAISER` VALUES (1, 'Organizer1', 'Fundraiser for School', 10000.00, 1500.00, 'CityA', 1, 1);
INSERT INTO `FUNDRAISER` VALUES (2, 'Organizer2', 'Medical Aid for Patient', 20000.00, 5000.00, 'CityB', 1, 2);
INSERT INTO `FUNDRAISER` VALUES (3, 'Organizer3', 'Community Park', 15000.00, 3000.00, 'CityC', 0, 3);
INSERT INTO `FUNDRAISER` VALUES (4, 'Organizer4', 'Scholarship Fund', 5000.00, 1000.00, 'CityD', 1, 1);
INSERT INTO `FUNDRAISER` VALUES (5, 'Organizer5', 'Relief Fund', 25000.00, 10000.00, 'CityE', 1, 2);

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE DONATION (
    DONATION_ID INT AUTO_INCREMENT PRIMARY KEY,
    DATE DATE NOT NULL,
    AMOUNT DECIMAL(10, 2) NOT NULL,
    GIVER VARCHAR(100) NOT NULL,
    FUNDRAISER_ID INT,
    FOREIGN KEY (FUNDRAISER_ID) REFERENCES FUNDRAISER(FUNDRAISER_ID)
);

INSERT INTO DONATION (DATE, AMOUNT, GIVER, FUNDRAISER_ID)
VALUES
('2023-09-01', 50.00, 'Alice Smith', 1),
('2023-08-02', 75.00, 'John Doe', 2),
('2023-11-05', 20.00, 'Mary Johnson', 3),
('2024-07-04', 100.00, 'James Brown', 4),
('2024-08-05', 10.00, 'Emily Davis', 5),
('2024-09-06', 200.00, 'Alice Smith', 1),
('2024-10-07', 30.00, 'John Doe', 2),
('2024-11-08', 150.00, 'Chris Martin', 3),
('2024-12-09', 25.00, 'David Wilson', 4),
('2024-10-10', 50.00, 'James Brown', 5);