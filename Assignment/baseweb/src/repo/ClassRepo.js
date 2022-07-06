import { pool } from "../config/db.js";

export class ClassRepo {
  constructor() {}

  save = async ({
    code,
    semesterId,
    courseId,
    classType,
    departmentId,
    teacherId,
    classCode,
  }) => {
    const text = `insert
	into
	edu_class (
	code,
	semester_id,
	course_id,
	class_type,
	department_id,
	teacher_id,
	class_code)
values($1,$2,$3,$4,$5,$6,$7);`;

    const values = [
      code,
      semesterId,
      courseId,
      classType,
      departmentId,
      teacherId,
      classCode,
    ];
    return pool.query(text, values);
  };

  findById = async (id) => {
    const text = `select * from edu_class ec where ec.id = $1`;

    const values = [id];
    return pool.query(text, values);
  };

  updateStatus = async (id, status) => {
    const text = `update
	edu_class ec
set
	status_id = $2
where
	ec.id = $1`;

    const values = [id, status];
    return pool.query(text, values);
  };

  getStudentsOfClass = async (id, status) => {
    const text = `select
	ul.user_login_id id,
	concat(p.first_name , ' ', p.middle_name , ' ', p.last_name ) "name",
	ur.email email
from
	edu_class_registration ecr
inner join user_login ul on
	ecr.student_id = ul.user_login_id
inner join person p on
	ul.party_id = p.party_id
left outer join user_register ur on
	ul.user_login_id = ur.user_login_id
where
	ecr.class_id = $1
	and ecr.status = $2
order by
	p.last_name`;

    const values = [id, status];
    return pool.query(text, values);
  };

  findAll = async () => {
    const text = `select * from edu_class`;

    return pool.query(text);
  };

  findByClassCode = async (classCode) => {
    const text = `select * from edu_class ec where ec.class_code = $1`;

    const values = [classCode];
    return pool.query(text, values);
  };

  findBySemester = async (semesterId, status, page, size) => {
    const text1 = `select
        cast(cl.id as varchar) id,
        code,
        class_code classCode,
        co.id courseId,
        co.course_name courseName,
        cl.class_type classType,
        d.id departmentId
    from
        edu_class as cl
    inner join edu_course as co on
        cl.course_id = co.id
    inner join edu_department as d on
        cl.department_id = d.id
    where
        cl.semester_id = $1
        and cl.status_id = $2
    order by
        co.id
        offset $3 limit $4
        `;

    const values = [semesterId, status, page * size, size];
    return pool.query(text1, values);
  };

  countClass = async (semesterId, status) => {
    const text = `select
        count(cl.id)
    from
        edu_class as cl
    inner join edu_course as co on
        cl.course_id = co.id
    inner join edu_department as d on
        cl.department_id = d.id
    where
        cl.semester_id = $1 
        and cl.status_id = $2`;

    return pool.query(text, [semesterId, status]);
  };

  findBySemesterWithFilters = async (
    semesterId,
    code,
    classCode,
    courseId,
    name,
    type,
    dept,
    page,
    size
  ) => {
    const text1 = `select
        cast(cl.id as varchar) id,
        code,
        class_code classCode,
        co.id courseId,
        co.course_name courseName,
        cl.class_type classType,
        d.id departmentId
    from
        edu_class as cl
    inner join edu_course as co on
        cl.course_id = co.id
    inner join edu_department as d on
        cl.department_id = d.id
    where
        cl.semester_id = $1
        and cast(code as varchar) like concat('%', lower(unaccent($2)), '%')
        and lower(unaccent(co.id)) like concat('%', lower(unaccent($3)), '%')
        and lower(unaccent(co.course_name)) like concat('%', lower(unaccent($4)), '%')
        and lower(unaccent(cl.class_type)) like concat('%', lower(unaccent($5)), '%')
        and lower(unaccent(d.id)) like concat('%', lower(unaccent($6)), '%')`;

    const text2 = `select
        count(cl.id)
    from 
        edu_class as cl
    inner join edu_course as co on
        cl.course_id = co.id
    inner join edu_department as d on
        cl.department_id = d.id
    where
        cl.semester_id = $1
        and cast(code as varchar) like concat('%', lower(unaccent($2)), '%')
        and lower(unaccent(co.id)) like concat('%', lower(unaccent($3)), '%')
        and lower(unaccent(co.course_name)) like concat('%', lower(unaccent($4)), '%')
        and lower(unaccent(cl.class_type)) like concat('%', lower(unaccent($5)), '%')
        and lower(unaccent(d.id)) like concat('%', lower(unaccent($6)), '%')`;

    const values = [
      semesterId,
      code,
      classCode,
      courseId,
      name,
      type,
      dept,
      page,
      size,
    ];
    return [pool.query(text1, values), pool.query(text2, values)];
  };

  getNoStudentsOf = async (classId) => {
    const text = `select
        count(student_id)
    from
        edu_class_registration ecr
    where
        class_id = $1 
        and status = 'APPROVED'`;

    values = [classId];
    return pool.query(text, values);
  };

  getClassesOfTeacher = async (teacherId) => {
    const text = `select
        cast(ecl.id as varchar) id,
        ecl.code code,
        ecl.class_code classCode,
        ecl.status_id statusId,
        ec.id courseId,
        ec.course_name "name",
        ecl.class_type classType,
        ecl.department_id department,
        ecl.semester_id semester
    from
        edu_class ecl
    inner join edu_course ec on ecl.course_id = ec.id
    where
        ecl.teacher_id = $1
    order by 
        ecl.semester_id`;

    const values = [teacherId];
    return pool.query(text, values);
  };

  getClassesDetailOf = async (studentId, status) => {
    const text = `select
        cast(ecl.id as varchar) id,
        ecl.code code,
        ecl.class_code classCode,
        ec.id courseId,
        ec.course_name "name",
        ecl.class_type classType,
        ecl.semester_id semester,
        ecr.status status
    from
        edu_class_registration ecr
    inner join edu_class ecl on
        ecr.class_id = ecl.id
    inner join edu_course ec on
        ecl.course_id = ec.id
    where
        ecr.student_id = $1 
        and (ecr.status = $2 or ecr.status = $3)
    order by 
        ecl.semester_id`;

    const values = [studentId, ...status];
    return pool.query(text, values);
  };

  getDetailOf = async (id) => {
    const text = `select
        cast(ecl.id as varchar) id,
        ecl.code code,
        ec.id courseId,
        ec.course_name "name",
        ecl.class_type classType,
        ecl.semester_id semester,
        concat(p.first_name , ' ', p.middle_name , ' ', p.last_name ) teacherName,
        ur.email email
    from
        edu_class ecl
    inner join edu_course ec on
        ecl.course_id = ec.id
    inner join user_login ul on
        ecl.teacher_id = ul.user_login_id
    inner join person p on
        ul.party_id = p.party_id
    left outer join user_register ur on
        ul.user_login_id = ur.user_login_id
    where
        ecl.id = $1`;

    const values = [id];
    return pool.query(text, values);
  };

  getAssignments4Teacher = async (classId) => {
    const text = `select
        cast(id as varchar) id,
        assignment_name "name",
        open_time openTime,
        close_time closeTime,
        deleted
    from
        edu_assignment ea
    where
        class_id = $1
    order by
        open_time desc`;

    const values = [classId];
    return pool.query(text, values);
  };

  getAllStudentAssignments4Teacher = async (classId) => {
    const text = `select
        ul.user_login_id id,
        concat(p.first_name , ' ', p.middle_name , ' ', p.last_name ) "name",
        cast(ea.id as varchar) assignmentId,
        ea.assignment_name assignmentName,
        cast(eas.id as varchar) assignmentSubmissionId
    from
        edu_class_registration ecr
    inner join user_login ul on
        ecr.student_id = ul.user_login_id
    inner join person p on
        ul.party_id = p.party_id
    left outer join user_register ur on
        ul.user_login_id = ur.user_login_id
    inner join edu_assignment ea on
        ecr.class_id = ea.class_id
    left outer join edu_assignment_submission eas on
        ea.id = eas.assignment_id
        and ecr.student_id = eas.student_id
    where
        ecr.class_id = $1
        and ecr.status = 'APPROVED'
    order by
        p.last_name asc, ea.assignment_name asc`;

    const values = [classId];
    return pool.query(text, values);
  };

  //   getAssignmentsSubmission4Teacher = async (classId) => {
  //     const text = `select
  // 	cast(id as varchar) id,
  // 	assignment_name "name",
  // 	open_time openTime,
  // 	close_time closeTime,
  // 	deleted
  // from
  // 	edu_assignment ea
  // where
  // 	class_id = $1
  // order by
  // 	open_time desc`;

  //     const values = [classId];
  //     return pool.query(text, values);
  //   };

  getAssignments4Student = async (id) => {
    const text = `select
	cast(id as varchar) id,
	assignment_name "name",
	close_time closeTime
from
	edu_assignment
where
	class_id = $1
	and deleted = false
	and open_time <= now()
order by
	open_time`;

    const values = [id];
    return pool.query(text, values);
  };

  getRegisteredClassesIn = async (studentId, classIds) => {
    const text = `select
        cast(class_id as varchar)
    from
        edu_class_registration ecr
    where  
        student_id = $1
        and status in ('WAITING_FOR_APPROVAL', 'APPROVED')
        and class_id in $2`;

    values = [studentId, classIds];
    return pool.query(text, values);
  };

  isClassExist = async (id) => {
    const text = `select
        count(1)
    from
        edu_class ac
    where
        id = $1`;

    values = [id];
    return pool.query(text, values);
  };
}
