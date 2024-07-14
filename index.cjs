"use strict";

const { EventGridPublisherClient, AzureKeyCredential } = require("@azure/eventgrid");
const dotenv = require("dotenv");

const eventgrid = require("@azure/eventgrid");


// Load the .env file if it exists
dotenv.config();

// The URL of the endpoint of the Event Grid topic.
const endpoint = process.env["EVENT_GRID_EVENT_GRID_SCHEMA_ENDPOINT"] || "";

// You can find the access keys in the Azure portal.
// Navigate to Settings > Access keys in your Event Grid topic's menu blade to see both access keys (you may use either).
const accessKey = process.env["EVENT_GRID_EVENT_GRID_SCHEMA_API_KEY"] || "";

async function main() {
    // Create the client used to publish events to the Event Grid Service
    const client = new EventGridPublisherClient(
        endpoint,
        "EventGrid",
        new AzureKeyCredential(accessKey)
    );

    // Send an event to the Event Grid Service, using the Event Grid schema.
    // A random ID will be generated for this event, since one is not provided.
    await client.send([
        {
            eventType: "doctor",
            subject: "azure/sdk/eventgrid/samples/sendEventSample",
            dataVersion: "1.0",
            data: {
                doctorId: "A52921"
            }
        }
    ]);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
