
/*
Seed script: sistema academico
Requires: npm i mongodb ioredis
Run: node seed_academico.js
*/
const { MongoClient } = require('mongodb');
const Redis = require('ioredis');

(async () => {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const db = client.db('academico');

  // insert sample students
  const students = [
    { studentId: 'S-2024001', name: { first: 'Laura', last: 'Gomez' }, email: 'laura.gomez@uni.edu', enrolledAt: new Date(), metadata: { creditsCompleted: 45 } },
    { studentId: 'S-2024002', name: { first: 'Juan', last: 'Perez' }, email: 'juan.perez@uni.edu', enrolledAt: new Date(), metadata: { creditsCompleted: 12 } }
  ];
  await db.collection('students').insertMany(students);

  // insert courses
  const courses = [
    { courseCode: 'MATH101', title: 'Cálculo I', credits: 4, department: 'Matemáticas', schedule: [{ day: 'Lunes', start: '08:00', end: '10:00', room: 'A101' }] },
    { courseCode: 'CS102', title: 'Programación I', credits: 3, department: 'Ciencias de la Computación' }
  ];
  await db.collection('courses').insertMany(courses);

  // enrollments
  const enrollments = [
    { studentId: (await db.collection('students').findOne({ studentId: 'S-2024001' }))._id, courseId: (await db.collection('courses').findOne({ courseCode: 'MATH101' }))._id, term: '2025-01', status: 'active', grades: [] },
    { studentId: (await db.collection('students').findOne({ studentId: 'S-2024002' }))._id, courseId: (await db.collection('courses').findOne({ courseCode: 'CS102' }))._id, term: '2025-01', status: 'active', grades: [] }
  ];
  await db.collection('enrollments').insertMany(enrollments);

  // seed redis cache and ranking
  const redis = new Redis();
  // cache course
  await redis.hset('course:cache:MATH101', 'courseCode', 'MATH101', 'title', 'Cálculo I', 'credits', '4');
  await redis.expire('course:cache:MATH101', 3600);
  // ranking
  await redis.zadd('ranking:students', 0, 'S-2024001');
  await redis.zadd('ranking:students', 0, 'S-2024002');

  console.log('Seed académico completo');
  process.exit(0);
})();
