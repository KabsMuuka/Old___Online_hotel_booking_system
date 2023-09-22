import psycopg2

connection = psycopg2.connect(
    user = 'postgres',
    password = 'kabs',
    port = '5432',
    database = 'HOTEL'
)
cursor = connection.cursor()

create_table_query = """
    CREATE TABLE customers(
    customerID SERIAL PRIMARY KEY,
    firstName char(50) NOT NULL, 
    lastName char(50) NOT NULL,
    Email varchar(255) NOT NULL,
    Gender varchar(255) NOT NULL,
    Nationality varchar(255) NOT NULL,
    phoneNumber varchar(100) NOT NULL
    )
"""
create_table_query = """
    CREATE TABLE images(
    imageID SERIAL PRIMARY KEY,
    path varchar(255) NOT NULL
    )
"""


create_table_query = """
    CREATE TABLE roomtype(
    roomID SERIAL PRIMARY KEY,
    RoomNumber INT NOT NULL, 
    description varchar(255) NOT NULL,
    price varchar(255) NOT NULL,
    imageID INT,
    FOREIGN KEY (imageID) REFERENCES images(imageID)
    )
"""
create_table_query = """
    CREATE TABLE booking(
    bookingID SERIAL PRIMARY KEY,
    checkInDate DATE NOT NULL, 
    checkOutDate DATE NOT NULL,
    price varchar(255) NOT NULL,
    status char(50) NOT NULL,
    customerID INT,
    roomID INT,
    FOREIGN KEY (customerID) REFERENCES customers(customerID),
    FOREIGN KEY (roomID) REFERENCES roomtype(roomID)
    )
"""
create_table_query = """
    CREATE TABLE register(
    userID SERIAL PRIMARY KEY,
    username varchar(255) NOT NULL, 
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
    )
"""
cursor.execute(create_table_query) 
connection.commit()

