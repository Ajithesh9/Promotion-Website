const { MongoClient } = require("mongodb");

// Get your MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;

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
    // Use the name of the database you created (adjust if needed, e.g., "school")
    const client = await connectToDatabase();
    const db = client.db("ca_foundation_students");

    // Fetch CA Foundation students sorted by marks (highest first)
    let caStudents = await db
      .collection("ca_foundation_students")
      .find({})
      .sort({ marks: -1 })
      .toArray();

    // For CA Foundation students, set the photo URL using the student's htno
    caStudents = caStudents.map((student) => ({
      ...student,
      photo: `./assets/student photos/${student.htno}.jpg`,
    }));

    // Fetch Jr. MEC students sorted by gainedMarks (highest first)
    let jrMecStudents = await db
      .collection("jr_mec_students")
      .find({})
      .sort({ gainedMarks: -1 })
      .toArray();

    // For Jr. MEC students, set the photo URL based on their index: jr1.jpg, jr2.jpg, etc.
    jrMecStudents = jrMecStudents.map((student, index) => ({
      ...student,
      photo: `./assets/student photos/MEC/jr${index + 1}.jpg`,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ caStudents, jrMecStudents }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
