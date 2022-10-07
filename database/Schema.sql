CREATE TABLE Employee(
	EmployeeId int AUTO_INCREMENT,
	Name VARCHAR(50),
    EmailId VARCHAR(100) UNIQUE,
    ContactNo NUMERIC(10),
    Department VARCHAR(50),
    JoiningDate DATE,
    PasswordHash VARCHAR(128),
    IsBlocked BOOL DEFAULT FALSE,
    IsAdmin BOOL DEFAULT FALSE,
    PRIMARY KEY(EmployeeId)
);

CREATE TABLE Tasks(
	TaskId INT AUTO_INCREMENT,
    EmployeeId INT,
    TaskDescription TEXT,
    StartDate DATETIME,
    TimeTaken INT,
    TaskType ENUM('Break', 'Meeting', 'Work'),
    CONSTRAINT PK1 PRIMARY KEY(TaskId, EmployeeId),
    CONSTRAINT FK1 FOREIGN KEY(EmployeeId) REFERENCES Employee(EmployeeId)
);
drop TABLE Tasks;
drop table Employee;