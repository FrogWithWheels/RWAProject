import { getCustomSession } from '../sessionCode.js'

export async function GET(req, res) {

  let session = await getCustomSession();

  session.role = 'customer'; // setting the persons role into the session

 
  // random test comment so i can create a commit
  session.email = 'mymail@mail.com';

  await session.save();
  console.log('data save');

  return Response.json({});
}