import dotenv from 'dotenv';
import express from 'express'
import mongoose from 'mongoose';

dotenv.config();

const app = express()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Connection error:', err));

// 2. Define a Mongoose schema & model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
  });

  const User = mongoose.model('User', userSchema);

  // 3. Insert a new user
async function addUser() {
    const newUser = new User({
      name: "Alice Smith",
      email: "alice@example.com",
      age: 28
    });
  
    try {
      const savedUser = await newUser.save();
      console.log("✅ User saved:", savedUser);
    } catch (error) {
      console.error("❌ Error saving user:", error);
    } finally {
    //   mongoose.connection.close(); // optional
    }
  }
  
  addUser();

app.get('/', (req,res)=>{
    res.send("On / route")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
    
})


