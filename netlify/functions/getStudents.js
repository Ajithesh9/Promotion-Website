// netlify/functions/getStudents.js
require("dotenv").config(); // Load environment variables from .env
const { MongoClient } = require("mongodb");

// Get your MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;
console.log("MONGODB_URI:", uri);

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    console.log("Using cached MongoDB client");
    return cachedClient;
  }
  console.log("Connecting to MongoDB...");
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Optionally add connectTimeoutMS: 10000 for quicker failures
    });
    cachedClient = client;
    console.log("Connected to MongoDB");
    return client;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

exports.handler = async (event, context) => {
  try {
    const client = await connectToDatabase();
    // IMPORTANT: Ensure that "ca_foundation_students" is the correct database name where your data is stored.
    const db = client.db("ca_foundation_students");
    console.log("Using database:", db.databaseName);

    // --- CA Foundation Students ---
    const caDocs = await db
      .collection("ca_foundation_students")
      .find({})
      .toArray();
    console.log("Fetched CA Docs:", caDocs);
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
    caStudents.sort((a, b) => b.marks - a.marks);
    caStudents = caStudents.map((student) => ({
      ...student,
      photo: student.htno
        ? `/assets/student-photos/${student.htno}.jpg`
        : `/assets/student-photos/default.jpg`,
    }));

    // --- Jr. MEC Students ---
    const jrDocs = await db.collection("jr_mec_students").find({}).toArray();
    console.log("Fetched Jr MEC Docs:", jrDocs);
    let jrMecStudents = [];
    jrDocs.forEach((doc) => {
      if (doc.jr_mec_students && Array.isArray(doc.jr_mec_students)) {
        jrMecStudents = jrMecStudents.concat(doc.jr_mec_students);
      } else {
        jrMecStudents.push(doc);
      }
    });
    jrMecStudents.sort((a, b) => b.gainedMarks - a.gainedMarks);
    jrMecStudents = jrMecStudents.map((student, index) => ({
      ...student,
      photo: `/assets/MEC/jr${index + 1}.jpg`,
    }));

    console.log("Final CA Students count:", caStudents.length);
    console.log("Final Jr MEC Students count:", jrMecStudents.length);
    return {
      statusCode: 200,
      body: JSON.stringify({ caStudents, jrMecStudents }),
    };
  } catch (error) {
    console.error("Error in getStudents function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, stack: error.stack }),
    };
  }
};
