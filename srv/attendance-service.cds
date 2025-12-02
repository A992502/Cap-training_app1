using { my.training as db } from '../db/schema';

service TrainingService {

    entity Students   as projection on db.Students;
    entity Attendance as projection on db.Attendance;

    action calculateAttendance(studentID : UUID) returns {
        percentage : Decimal(5,2);
        eligible   : Boolean;
    };
}

