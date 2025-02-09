const { MongoClient } = require("mongodb");

// Corrected connection string
const uri = "mongodb+srv://smungara713:Shreya16%40@umi.ank4y.mongodb.net/umi?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function testConnection() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB!");

    // Test the connection by listing databases
    const databases = await client.db().admin().listDatabases();
    console.log("Databases:", databases.databases.map((db) => db.name));
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Run the connection test
testConnection();