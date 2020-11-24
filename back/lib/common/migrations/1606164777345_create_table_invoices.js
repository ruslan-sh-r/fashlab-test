module.exports = {
  up: `
        CREATE TABLE invoices (
            Id int NOT NULL AUTO_INCREMENT,
            IncomingId int NOT NULL,
            Amount decimal(6,2) NOT NULL,
            DueDate datetime NOT NULL,
            SellingPrice decimal(6,3) DEFAULT NULL,
            PRIMARY KEY (Id),
            UNIQUE KEY Id_UNIQUE (Id)
        )
    `,
  down: 'DROP TABLE invoices'
}
