import { connectToDatabase } from '@/lib/db';

export async function POST(request) {
  try {
    const db = await connectToDatabase();
    //destructuring the req
    const { name, contact, company, productInterest, stage, followUpDate } = await request.json();
    //going to leads collection and insert
    const result = await db.collection('leads').insertOne({
      name,
      contact,
      company,
      productInterest,
      stage: stage || 'New', //default=>new
      followUpDate: new Date(followUpDate),
      createdAt: new Date()
    });

    return new Response(JSON.stringify({
      success: true,
      insertedId: result.insertedId
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}


//get all leads
export async function GET() {
  try {
    const db = await connectToDatabase();
    //findinf all documents in leads collection and convert to arr
    const leads = await db.collection('leads').find({}).toArray();
    return new Response(JSON.stringify(leads), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}