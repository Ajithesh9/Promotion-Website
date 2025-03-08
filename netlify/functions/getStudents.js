// netlify/functions/getStudents.js
require("dotenv").config(); // Load environment variables from .env
const { MongoClient } = require("mongodb");

// Get your MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;
console.log("MONGODB_URI:", uri); // Debug: Verify the connection string

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient && cachedClient.isConnected && cachedClient.isConnected()) {
    return cachedClient;
  }
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedClient = client;
  return client;
}

exports.handler = async (event, context) => {
  try {
    // Change "ca_foundation_students" to your actual database name if needed.
    const client = await connectToDatabase();
    const db = client.db("ca_foundation_students");

    // --- CA Foundation Students ---
    const caDocs = await db
      .collection("ca_foundation_students")
      .find({})
      .toArray();

    // Flatten the data: if a document has a "ca_foundation_students" array, merge it.
    let caStudents = [];
    caDocs.forEach((doc) => {
      if (
        doc.ca_foundation_students &&
        Array.isArray(doc.ca_foundation_students)
      ) {
        caStudents = caStudents.concat(doc.ca_foundation_students);
      } else {
        caStudents.push(doc);
      }
    });

    // Sort by marks descending.
    caStudents.sort((a, b) => b.marks - a.marks);

    // Set photo URL using absolute path (relative to index.html)
    caStudents = caStudents.map((student) => ({
      ...student,
      photo: student.htno
        ? `/assets/student-photos/${student.htno}.jpg`
        : `/assets/student-photos/default.jpg`,
    }));

    // --- Jr. MEC Students ---
    const jrDocs = await db.collection("jr_mec_students").find({}).toArray();

    let jrMecStudents = [];
    jrDocs.forEach((doc) => {
      if (doc.jr_mec_students && Array.isArray(doc.jr_mec_students)) {
        jrMecStudents = jrMecStudents.concat(doc.jr_mec_students);
      } else {
        jrMecStudents.push(doc);
      }
    });

    // Sort by gainedMarks descending.
    jrMecStudents.sort((a, b) => b.gainedMarks - a.gainedMarks);

    // Set photo URL based on index (jr1.jpg, jr2.jpg, etc.)
    jrMecStudents = jrMecStudents.map((student, index) => ({
      ...student,
      photo: `/assets/MEC/jr${index + 1}.jpg`,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ caStudents, jrMecStudents }),
    };
  } catch (error) {
    console.error("Error in getStudents function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
