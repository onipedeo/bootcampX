const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

console.log(`connected`);
const args = process.argv.slice(2);
const queryString = `SELECT DISTINCT teachers.name AS teacher,
  cohorts.name AS cohort
FROM teachers
  JOIN assistance_requests ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teacher
`;

const cohortName = args[0];
const values = [`${cohortName}`];

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort}: ${user.teacher}`);
    });
  })
  .catch(err => {
    console.log('query error', err.stack);
  });