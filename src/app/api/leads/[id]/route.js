import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic'; 

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { stage } = await request.json();
    const db = await connectToDatabase();

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await db.collection('leads').updateOne(
      { _id: new ObjectId(id) },
      { $set: { stage } }
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}