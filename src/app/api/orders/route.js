import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const db = await connectToDatabase();
    const { leadId } = await request.json();

    // Verify lead exists and is 'Won'
    const lead = await db.collection('leads').findOne({
      _id: new ObjectId(leadId),
      stage: 'Won'
    });
    if (!lead) throw new Error('Lead must be in "Won" stage to create order');

    // Create order
    const result = await db.collection('orders').insertOne({
      leadId: new ObjectId(leadId),
      status: 'Order Received',
      createdAt: new Date(),
      trackingInfo: ''
    });

    return new Response(JSON.stringify({
      success: true,
      orderId: result.insertedId
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}


//get req
export async function GET() {
  try {
    const db = await connectToDatabase();
    const orders = await db.collection('orders')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return new Response(JSON.stringify(orders), {
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