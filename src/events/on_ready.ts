import CClient from "../classes/CClient";

export default async function(client: CClient) {
    console.log(client.user?.tag);
    console.log('Ready!')
}