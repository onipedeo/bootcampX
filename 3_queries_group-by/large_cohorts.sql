SELECT cohorts.name as cohort_name, count(students.name) as total_students
FROM cohorts
JOIN students ON cohorts.id = students.cohort_id
GROUP BY cohort_name
HAVING count(students.name)  >= 18
ORDER BY total_students;
