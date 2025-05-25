// import { connectToDatabase } from '@/lib/db';
// import { ObjectId } from 'mongodb';

// export async function PATCH(request, { params }) {
//   const { id } = params;
//   const { status } = await request.json();
//   const db = await connectToDatabase();

//   try {
//     //update order status
//     await db.collection('orders').updateOne(
//       { _id: new ObjectId(id) }, //
//       { $set: { status } }
//     );
//     return new Response(JSON.stringify({ success: true }), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
//   }
// }


import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function PATCH(request, { params }) {
  const { id } = params;
  const updates = await request.json(); // contains status, trackingInfo, dispatchDate, etc.
  const db = await connectToDatabase();

  try {
    // Only allow specific fields to be updated
    const allowedFields = ["status", "trackingInfo", "dispatchDate"];
    const setData = {};

    allowedFields.forEach((field) => {
      if (field in updates) {
        setData[field] = updates[field];
      }
    });

    await db.collection('orders').updateOne(
      { _id: new ObjectId(id) },
      { $set: setData }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
  }
}
