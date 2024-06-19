import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

let cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async () => {
  console.log(global)

  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing')

  if (!cached.conn) {
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
      dbName: 'evently',
      bufferCommands: false
    })
  
    cached.conn = await cached.promise
  }

  return cached.conn
}


/*const { Pool } = require("pg");

if (!global.db) {
  global.db = { pool: null };
}

export function connectToDatabase() {
  if (!global.db.pool) {
    console.log("No pool available, creating new pool.");
    global.db.pool = new Pool();
  }
  return global.db;
}*/