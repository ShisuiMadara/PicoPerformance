CREATE TABLE Employee(
	EmployeeId VARCHAR(10) PRIMARY KEY,
	Name VARCHAR(50),
    EmailId VARCHAR(100) UNIQUE,
    ContactNo NUMERIC(10),
    Department VARCHAR(50),
    JoiningDate DATE,
    PasswordHash VARCHAR(128),
    IsBlocked BOOL
);

CREATE TABLE Tasks(
	TaskId VARCHAR(10),
    EmployeeId VARCHAR(10),
    TaskDescription TEXT,
    StartDate DATETIME,
    TimeTaken INT,
    TaskType ENUM('Break', 'Meeting', 'Work'),
    CONSTRAINT PK1 PRIMARY KEY(TaskId, EmployeeId),
    CONSTRAINT FK1 FOREIGN KEY(EmployeeId) REFERENCES Employee(EmployeeId)
);