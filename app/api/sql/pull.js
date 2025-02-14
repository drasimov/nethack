"use server"
import connection from "./database";

// allows two types of requests to 'teams' table
export default async function handler(request, result) {
    if (request.method == "GET") {
        try {
            let pullResults = [];

            const { search } = request.query;
            if(search){
                // runs if request is in the form "api/sqlAccess/pull?search=XXX"
                // returns specific entry corresponding to search query
                [pullResults] = await connection.query("SELECT * FROM teams WHERE projectName = ?", [search]);
            }
            else{
                // returns general case of full database
                [pullResults] = await connection.query("SELECT * FROM teams");
            }

            pullResults.forEach(entry => {
                if (entry.profileImage) {
                    entry.profileImage = Buffer.from(entry.profileImage).toString("base64");
                }
            })
            result.status(200).json(pullResults);
        }
        catch (error) {``
            console.log("Error in pulling", error);
            result.status(500).json({ error: "Database error", details: error.message });
        }
    }
    else {
        result.setHeader("Allow", ["GET"]);
        result.status(405).end(`Method ${request.method} Not Allowed`);
    }
}