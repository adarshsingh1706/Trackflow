import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function PATCH(request, { params }) {
  const { id } = params;
  const { status } = await request.json();
  const db = await connectToDatabase();

  try {
    //update order status
    await db.collection('orders').updateOne(
      { _id: new ObjectId(id) }, //
      { $set: { status } }
    );
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
  }
}