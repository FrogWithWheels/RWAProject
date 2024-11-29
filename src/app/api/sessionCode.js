import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers'

export async function getCustomSession(){
    console.log("Sessions loaded");

    let pw = "VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf";

    const session = await getIronSession(await cookies(), { password: pw, cookieName: "app" });

    return session;
}