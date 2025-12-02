namespace my.training;

entity Students {
    key ID          : UUID;
    name            : String;
    course          : String;
    attendances : Composition of many Attendance
                  on attendances.student = $self;
}

entity Attendance {
    key ID     : UUID;
    student    : Association to Students;
    date       : Date;
    present    : Boolean;
}
